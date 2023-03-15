import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { localStorageService } from '../shared-services/local-storage.service';
import { Observable, throwError } from 'rxjs';
import { IFriend } from './friend.interface';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class FriendRequestService {
    private url = 'http://localhost:3000/friends';

    constructor(private http: HttpClient, private localStorage: localStorageService) { }

    getFriendRequestList(): Observable<IFriend[]> {
        const id_user = this.localStorage.getFromStorage('id_user');
        return this.http.get<IFriend[]>(this.url + '/' + id_user).pipe(
            tap(() => console.log('fetched friend request list')),
            catchError((error) => throwError(error))
        )
    }

    getFriendList(): Observable<IFriend[]> {
        return this.http.get<IFriend[]>(this.url).pipe(
            tap(() => console.log('get all friends')),
            catchError((error) => throwError(error))
        )
    }
    
    createRequest(id_friend: number): Observable<any> {
        const id_user = this.localStorage.getFromStorage('id_user');
        const friend: IFriend = {id_friend_request: null, id_user: +id_user, id_friend: id_friend, status: 0};
        return this.http.post<any>(this.url, friend).pipe(
            tap(() => console.log('your request was created')),
            catchError((error) => throwError(error))
        );
    }

    updateRequest(updatedRequest: IFriend): Observable <IFriend> {
        return this.http.put<IFriend>(this.url, updatedRequest).pipe(
            tap(() => console.log('request was updated')),
            catchError((error) => throwError(error))
        );
    }

    deleteRequest(id_user: number, id_friend: number): Observable<any> {
        return this.http.delete<any>(this.url + '/' + id_user + '/' + id_friend).pipe(
            tap(() => console.log('request was deleted')),
            catchError((error) => throwError(error))
        );
    }

}
