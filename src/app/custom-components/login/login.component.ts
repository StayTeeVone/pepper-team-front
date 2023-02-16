import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { iUsers, UserService } from '../users.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {

    this.userService.signIn(form.value.email, form.value.password).subscribe(() => {console.log(this.userService.isAutentificated)});
  }

  goToRegister(): void {
    this.router.navigate(['register']);
  }
}
