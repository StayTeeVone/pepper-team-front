import { Component, OnInit } from '@angular/core';
import {iUsers, UserService} from '../../../users.service';
import { NgForm } from '@angular/forms';
import {localStorageService} from '../../../../shared-services/local-storage.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  providers: [UserService]
})
export class EditUserComponent implements OnInit {

  id = this.localStorage.getFromStorage('id_user');
  user: iUsers = {id_user: +this.id, name: this.localStorage.getFromStorage('name'), email: this.localStorage.getFromStorage('email'), password: '', phone: this.localStorage.getFromStorage('phone'), role: null};

  allUsers: iUsers[];
  constructor(private userService: UserService, private localStorage: localStorageService) { }

  ngOnInit(): void {
  }


  onSubmit(form: NgForm): void {
   const value = form.value;
   const updatedUser: iUsers = {id_user: +this.id, ...value};
   console.log(updatedUser);
   this.userService.updateUser(updatedUser).subscribe(data => console.log(data));
  }

  update(id: number): void {
    this.user = Object.assign({}, this.allUsers.find(user => user.id_user === id));
    if (!this.user) {
      return;
    }
  }

}
