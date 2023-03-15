import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ChatService } from 'src/app/shared-services/chat.service';
import { IMessage } from 'src/app/shared-services/message.interface';
import { UserService, iUsers } from '../users.service';

export interface Link {
  id: number;
  mySrc: any;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [UserService, ChatService]
})
export class ChatComponent implements OnInit {

  userID: number = this.activatedRoute.snapshot.params.id_user;
  friendID: number = this.activatedRoute.snapshot.params.id_friend;

  friend$: Observable<iUsers>;
  user$: Observable<iUsers>;
  messages$: Observable<IMessage[]> = this.chatService.getMessageList(this.userID, this.friendID);

  isImageLoading = false;
  source: Link[] = [];

  msgField = new FormControl('', Validators.required);
  chatForm = new FormGroup({
    message: this.msgField
  });

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private chatService: ChatService) { }

  ngOnInit(): void {
    this.friend$ = this.userService.getUserByID(this.friendID).pipe(
      tap(friend => {
        this.getPhoto(friend.id_user);
      })
    );
    this.user$ = this.userService.getUserByID(this.userID).pipe(
      tap(user => {
        this.getPhoto(user.id_user);
      })
    );
    
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

  onSubmit(): void {
    const obj: IMessage = {
      id_messages: null,
      message: this.chatForm.value.message,
      id_user: this.userID,
      id_friend: this.friendID,
      status: null
    };
    this.chatService.createMessage(obj).subscribe();
  }

}
