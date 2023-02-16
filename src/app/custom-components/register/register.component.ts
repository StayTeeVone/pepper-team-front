import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { iUsers, UserService } from '../users.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  user: iUsers = {id_user: 0, name: "", email: "", phone: "", password: "", role: 0};

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    this.user = {
      id_user: 0,
      name: form.value.name,
      email: form.value.email,
      phone: form.value.phone,
      password: form.value.password,
      role: 0
    }
    // console.log(this.user);
    this.userService.createUser(this.user).subscribe(() => this.goToLogin());
  };

  goToLogin(): void {
    this.router.navigate(['login']);
  }
}
