import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { iUsers, UserService } from '../users.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  error$: Observable<string>;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    this.userService.signIn(form.value.email, form.value.password).subscribe(() => {
      this.error$ = of('');
      this.router.navigate(['profile'])}, (err) => {
        this.error$ = of(err);
      });
  }

  goToRegister(): void {
    this.router.navigate(['register']);
  }
}
