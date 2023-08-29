import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { iUser } from '../shared/models/iUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<iUser | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  loadCurrentUser(token: string) {
    let headers = new HttpHeaders();
    //pazi na backticks 
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<iUser>(this.baseUrl + 'account', { headers }).pipe(
      map(user => {
        localStorage.setItem('Token', user.token);
        this.currentUserSource.next(user);
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
