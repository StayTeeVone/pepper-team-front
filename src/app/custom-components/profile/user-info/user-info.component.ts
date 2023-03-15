import { Component, OnInit } from '@angular/core';
import { localStorageService } from 'src/app/shared-services/local-storage.service';
import {iUsers, UserService} from '../../users.service';
import {map, switchMap, tap} from 'rxjs/operators';
import {Observable} from "rxjs";

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  name: string;
  email: string;
  phone: string;

  constructor(private localStorage: localStorageService) { }

  ngOnInit(): void {
    this.name = this.localStorage.getFromStorage('name');
    this.email = this.localStorage.getFromStorage('email');
    this.phone = this.localStorage.getFromStorage('phone');
  }
}
