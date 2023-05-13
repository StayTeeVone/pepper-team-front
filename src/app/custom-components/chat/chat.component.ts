import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ChatService } from 'src/app/shared-services/chat.service';
import { IMessage } from 'src/app/shared-services/message.interface';
import { UserService, iUsers } from '../users.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [UserService, ChatService]
})
export class ChatComponent implements OnInit {

  userID: number = this.activatedRoute.snapshot.params.id_user;
  friendID: number = this.activatedRoute.snapshot.params.id_friend;
  friendSource: any;
  userSource: any;

  friend$: Observable<iUsers>;
  user$: Observable<iUsers>;
  friend: iUsers;
  user: iUsers;
  messages$: Observable<IMessage[]>; // = this.chatService.getMessageList(this.userID, this.friendID);

  isImageLoading = false;

  msgField = new FormControl('', Validators.required);
  chatForm = new FormGroup({
    message: this.msgField
  });

  update = false;
  id_msg = null;

  @HostListener('keydown', ['$event'])
  keyBind(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.clearForm();
      this.id_msg = null;
      this.update = false;
    }
    // console.log(event);
  }

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private chatService: ChatService) { }

  ngOnInit(): void {
    
    this.friend$ = this.userService.getUserByID(this.friendID).pipe(
      tap(friend => {
        this.getPhoto(friend.id_user, false);
      })
    );
    this.user$ = this.userService.getUserByID(this.userID).pipe(
      tap(user => {
        this.getPhoto(user.id_user, true);
      })
    );
    this.messages$ = this.getMessages();
  }

  createImageFromBlob(id_user: number, photo: Blob, userPhoto = true): any {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      if(userPhoto) {
        this.userSource = reader.result;
      } else {
        this.friendSource = reader.result;
      }
    }, false);
    if (photo) {
      reader.readAsDataURL(photo);
    }
  }

  getPhoto(id_user: number, userPhoto = true): void {
    this.isImageLoading = true;
    this.userService.getPhoto(id_user).subscribe(photo => {
      this.createImageFromBlob(id_user, photo, userPhoto);
      this.isImageLoading = false;
    },
    error => {
      this.isImageLoading = false;
      console.error(error);
    });
  }

  clearForm(): void {
    this.msgField.setValue("");
    this.chatForm = new FormGroup({
      message: this.msgField
    });
  }

  onSubmit(): void {
    if (this.update) {
      this.chatService.updateMessage(this.id_msg, this.chatForm.value.message).subscribe(() => {
        this.messages$ = this.getMessages();
        this.clearForm();
      });
      this.id_msg = null;
      this.update = false;
    } else {
      const obj: IMessage = {
        id_messages: null,
        message: this.chatForm.value.message,
        id_user: this.userID,
        id_friend: this.friendID,
        status: null,
        messageDate: '',
        unFormatDate: ''
      };
      this.chatService.createMessage(obj).subscribe(() => { 
        this.messages$ = this.getMessages();
        this.clearForm();
      });
    }
  }

  deleteMessage(id: number): void {
    this.chatService.deleteMessage(id).subscribe(() => {this.messages$ = this.getMessages();});
  }

  getMessages(): Observable<IMessage[]> {
    return combineLatest(this.chatService.getMessageList(this.userID, this.friendID), this.friend$, this.user$).pipe(
      map(([message, friend, user]) => {
        this.friend = friend;
        this.user = user;
        return message;
      })
    );
  }

  updateMessage(id: number, msg: string): void {
    this.msgField = new FormControl(msg, Validators.required);
    this.chatForm = new FormGroup({
      message: this.msgField
    });
    this.id_msg = id;
    this.update = true;
  }

  closeEdit(): void {
    this.clearForm();
    this.id_msg = null;
    this.update = false;
  }

}
