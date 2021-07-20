import { UserType } from './../../models/user-type';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { User } from '../../models/user';

@Injectable()
export class AuthService {
  /**
   * Currently logged in user.
   */
  public user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Register user in the application.
   * @param email User unique email address.
   * @param name User first name.
   * @param password User's password.
   * @returns User data.
   */
  public register(email: string, name: string, password: string): Observable<User> {
    const user = { email, name, password };
    const url = '';

    return of({ id: '1', name: 'Greg', type: UserType.Administrator, token: 'token' });
    // return this.http.post<User>(url, user).pipe(tap((user: User) => this.handleAuthentication(user)));
  }

  /**
   * Login the user with given credentials.
   * @param email User's unique email address.
   * @param password User's password.
   * @returns User data.
   */
  public login(email: string, password: string): Observable<User> {
    const user = { email, password };
    const url = '';

    return of({ id: '1', name: 'Greg', type: UserType.Administrator, token: 'token' });
    // return this.http.post<User>(url, user).pipe(tap((user: User) => this.handleAuthentication(user)));
  }

  /**
   * Remove user data and navigate to the login screen.
   */
  public logout(): void {
    this.user.next(null);
    this.router.navigate(['/home']);
    localStorage.removeItem('userData');
  }

  /**
   * Save the user information within the local storage.
   * @param user Current user data.
   */
  private handleAuthentication(user: User): void {
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
