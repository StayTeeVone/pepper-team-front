import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {iUsers, UserService} from '../../../users.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [UserService],
})
export class SidebarComponent implements OnInit {

  status: string;
  user: iUsers = {id_user: null, name: '', email: '', password: '', phone: '', role: null};
  allUsers: iUsers[];
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  goToEdit(): void {
    this.router.navigate(['profile/main-info-edit']);
  }
  update(id: number): void {
    this.user = Object.assign({}, this.allUsers.find(user => user.id_user === id));
    if (!this.user) {
      return;
    }
  }
  onSelectChange(): void {
    if (this.status === 'edit') {
      this.goToEdit();
    }
  }
}
