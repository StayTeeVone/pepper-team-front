import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { tap, catchError, delay, map } from 'rxjs/operators';
import { Observable, throwError } from "rxjs";
import * as bcrypt from 'bcryptjs';
import { localStorageService } from '../shared-services/local-storage.service';

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

    constructor(private http: HttpClient, private localStorage: localStorageService) { }

    createUser(newWorker: iUsers): Observable<any> {
        return this.http.post<any>(this.url, newWorker).pipe(
            tap(() => console.log('added users')),
            catchError((error) => throwError(error))
        );
    }

    signIn(email: string, password: string): Observable<any> {
        return this.http.get<iUsers[]>(this.url).pipe(
            delay(1000),
            map(users => {
                const checkedUser = users.filter(user => {return user.email === email && bcrypt.compareSync(password, user.password)})
                if(checkedUser.length !== 0){
                    this.isAutentificated = true;
                    this.localStorage.setToStorage('name', checkedUser[0].name);
                    this.localStorage.setToStorage('email', checkedUser[0].email);
                    this.localStorage.setToStorage('phone', checkedUser[0].phone);
                } else {
                    this.isAutentificated = false;
                    throw new Error();
                }
            }),
            catchError(err => throwError('Invalid email or password.'))
        )
    }

    updateUser(updatedUser: Partial<iUsers>): Observable <Partial<iUsers>> {
        return this.http.put<Partial<iUsers>>(this.url + '/' + updatedUser.id_user, updatedUser).pipe(
            tap((partialUser) => console.log(partialUser.name, partialUser.phone, partialUser.email)),
            catchError((error) => throwError(error))
        );
    }
}



