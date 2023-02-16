import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { tap, catchError, delay, map } from 'rxjs/operators';
import { Observable, throwError } from "rxjs";
import * as bcrypt from 'bcryptjs';

export interface iUsers {
    id_user: number; 
    name: string;
    email: string;
    phone: string;
    password: string;
    role: number;
}

@Injectable()
export class UserService {
    private url = 'http://localhost:3000/users';
    isAutentificated = false;

    constructor(private http: HttpClient) { }

    createWorker(newWorker: iUsers): Observable<any> {
        return this.http.post<any>(this.url, newWorker).pipe(
            tap(() => console.log('added users')),
            catchError((error) => throwError(error))
        );
    }

    signIn(email: string, password: string): Observable<any> {
        return this.http.get<iUsers[]>(this.url).pipe(
            delay(1000),
            map(users => {
                const checkedUser = users.filter(user => {return user.email = email || bcrypt.compareSync(password, user.password)})
                if(checkedUser.length !== 0){
                    this.isAutentificated = true;
                } else {
                    this.isAutentificated = false;
                }
            }),
            catchError(err => throwError('Invalid email or password.'))
        )
    }
}



