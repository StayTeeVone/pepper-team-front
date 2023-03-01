import { Component, OnInit } from '@angular/core';
import { localStorageService } from 'src/app/shared-services/local-storage.service';
import {iUsers, UserService} from '../../users.service';
import {map, switchMap, tap} from 'rxjs/operators';
import {Observable} from "rxjs";

export interface Link {
    id: number;
    mySrc: any;
  }
  export interface ExtendUser extends iUsers{
  source: any;
  }

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  providers: [UserService]
})
export class UserInfoComponent implements OnInit {


  allUsers$ = this.userService.getAllUsers().pipe(tap(users => {
  users.forEach(user => this.getPhoto(user.id_user));
  }));
  isImageLoading = false;
  source: Link[] = [];
  name: string;
  email: string;
  phone: string;

  constructor(private localStorage: localStorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.name = this.localStorage.getFromStorage('name');
    this.email = this.localStorage.getFromStorage('email');
    this. phone = this.localStorage.getFromStorage('phone');
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

}
