import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { localStorageService } from '../shared-services/local-storage.service';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IMessage } from './message.interface';

@Injectable()
export class ChatService {
    private url = 'http://localhost:3000/chat';

    constructor(private http: HttpClient, private localStorage: localStorageService) { }

    getMessageList(id_user: number, id_friend: number): Observable<IMessage[]> {
        return this.http.get<IMessage[]>(this.url + '/get-messages/' + id_user + '/' + id_friend).pipe(
            tap(() => console.log('fetched message list')),
            catchError((error) => throwError(error))
        )
    }

    createMessage(message: IMessage): Observable<any> {
        return this.http.post<any>(this.url, message).pipe(
            tap((result) => console.log(result.data)),
            catchError((error) => throwError(error))
        );
    }

}
