import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { FriendRequestService } from 'src/app/shared-services/friend-request.service';
import { IFriend } from 'src/app/shared-services/friend.interface';
import { localStorageService } from 'src/app/shared-services/local-storage.service';
import { iUsers, UserService } from '../users.service';

export interface Link {
    id: number;
    mySrc: any;
}

export interface ExtendUser extends iUsers{
  id_friend_request: number;
}

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [UserService, FriendRequestService]
})
export class UserListComponent implements OnInit{

  updated$: BehaviorSubject<boolean> = new BehaviorSubject(false);


  allUsers$ = this.updated$.pipe(
  switchMap(() => {
    return combineLatest(
      this.userService.getAllUsers(), 
      this.friendRequestService.getFriendRequestList(), 
      this.friendRequestService.getFriendList(),
      ).pipe(
        map(([users, requests, friends]) => {
          const id_user = this.localStorage.getFromStorage('id_user');
          this.allRequests = this.getRequestsList(requests, users);
          this.allFriends = this.getFriendsList(friends, users);
  
          return users.filter(user => user.id_user !== +id_user);
        }
      ),
        tap(users => {
          users.forEach(user => this.getPhoto(user.id_user));
          // this.updated$.next(false);
        }));
  }))
  

  isImageLoading = false;
  source: Link[] = [];

  allRequests: iUsers[];
  allFriends: iUsers[];

  constructor(private userService: UserService, 
    private router: Router, 
    private localStorage: localStorageService, 
    private friendRequestService: FriendRequestService) { }

  ngOnInit(): void {
    
  }

  createRequest(id: number): void {
    this.friendRequestService.createRequest(id).subscribe();
  }

  createImageFromBlob(id_user: number, photo: Blob): any {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      let item: Link = {
        id: id_user,
        mySrc: reader.result
      };
      this.source.push(item);
    }, false);
    if (photo) {
      reader.readAsDataURL(photo);
    }
  }

  getSource(id_user: number): any{
    return this.source.find(item => item.id === id_user)?.mySrc;
  }

  getPhoto(id_user: number): void {
    this.isImageLoading = true;
    this.userService.getPhoto(id_user).subscribe(photo => {
      this.createImageFromBlob(id_user, photo);
      this.isImageLoading = false;
    },
    error => {
      this.isImageLoading = false;
      console.error(error);
    });
  }

  goToProfile(): void {
    this.router.navigate(['profile']);
  }

  acceptRequest(id: number): void {
    const id_user = this.localStorage.getFromStorage('id_user');
    const obj: IFriend = {id_friend_request: null, id_user: id, id_friend: +id_user, status: 1};
    this.friendRequestService.updateRequest(obj).subscribe();
  }

  deleteRequest(id_friend: number): void {
    const id_user = this.localStorage.getFromStorage('id_user');
    this.friendRequestService.deleteRequest(+id_user, id_friend).subscribe();
    this.updated$.next(true);
  }

  private getRequestsList(requests: IFriend[], allUsers: iUsers[]): iUsers[] {
    const id_user = this.localStorage.getFromStorage('id_user');
      const ids: [number, boolean][] = [];
      requests.forEach(r => {
        if(r.id_user === +id_user) {
          ids.push([r.id_friend, true]);
        }
        else {
          ids.push([r.id_user, false]);
        }
      });
      return allUsers.filter(user => ids.map(item => item[0]).includes(user.id_user))
      .map(user => ({...user, owner: ids.find(id => id[0] === user.id_user)?.[1]}));
  } 

  private getFriendsList(friends: IFriend[], allUsers: iUsers[]): iUsers[] {
    return allUsers.filter(user => friends.map(r => r.id_user).includes(user.id_user));;
  } 

  sendMessage(id: number): void {
    const id_user = this.localStorage.getFromStorage('id_user');
    this.router.navigate([`chat/${id_user}/${id}`]);
  }

}
