import { Injectable } from '@angular/core';
import {  ReplaySubject, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { iUser } from '../shared/models/iUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<iUser | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  loadCurrentUser(token: string | null) {
    if (token === null) {
      this.currentUserSource.next(null);
      return of(null);
    }

    let headers = new HttpHeaders();
    //pazi na backticks 
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<iUser>(this.baseUrl + 'account', { headers }).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('Token', user.token);
          this.currentUserSource.next(user); 
          return user;
        } else {
          return null
        }
      })
    )

  }

  login(values: any) {
    return this.http.post<iUser>(this.baseUrl + 'account/login', values).pipe(
      map(user => {
        localStorage.setItem('Token', user.token);
        this.currentUserSource.next(user);
      })
    )
  }

  register(values: any) {
    return this.http.post<iUser>(this.baseUrl + 'account/register', values).pipe(
      map(user => {
        localStorage.setItem('Token', user.token);
        this.currentUserSource.next(user);
      })
    )
  }

  logout() {
    localStorage.removeItem('Token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email: string) {
    return this.http.get<boolean>(this.baseUrl + 'account/emailExists?email=' + email);
  }


}
