import { GenericResponse } from './../../common/models/api/generic-response';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserLoginRequest, UserLoginResponse } from '../models/api/user-login';
import { UserRegisterRequest, UserRegisterResponse } from '../models/api/user-register';
import { UserType } from '../models/user-type';

@Injectable()
export class AuthService {
  /**
   * Currently logged in user.
   */
  public user = new BehaviorSubject<User>({ type: UserType.None, name: 'Grzegorz', token: 'lala', id: 0 });

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Register user in the application.
   * @param email User unique email address.
   * @param name User first name.
   * @param password User's password.
   * @returns Whether the operation was successful.
   */
  public register(email: string, name: string, password: string): Observable<boolean> {
    const body: UserRegisterRequest = { name, email, password, password_confirmation: password };
    const url = `${environment.webApiURL}/api/register`;

    return this.http.post<UserRegisterResponse>(url, body).pipe(map((response) => response.success === 'success'));
  }

  /**
   * Login the user with given credentials.
   * @param email User's unique email address.
   * @param password User's password.
   * @returns User data.
   */
  public login(email: string, password: string): Observable<User> {
    const body: UserLoginRequest = { email, password };
    const url = `${environment.webApiURL}/api/login`;

    return this.http
      .post<UserLoginResponse>(url, body)
      .pipe(map((user: UserLoginResponse) => this.handleAuthentication(user)));
  }

  /**
   * Remove user data and navigate to the login screen.
   */
  public logout(): Observable<boolean> {
    const url = `${environment.webApiURL}/api/logout`;

    return this.http.post<GenericResponse>(url, null).pipe(
      map((response: GenericResponse) => response.success === 'success'),
      tap(() => this.handleLogout())
    );
  }

  /**
   * Save the user information within the local storage.
   * @param user Current user data.
   */
  private handleAuthentication(userResponse: UserLoginResponse): User {
    const user: User = {
      token: userResponse.api_token,
      name: userResponse.name,
      type: UserType.None,
      id: userResponse.user_id,
    };
    this.user.next(user);
    localStorage.setItem('token', JSON.stringify(user.token));
    return user;
  }

  /**
   * Clear local storage and remove any user information.
   */
  private handleLogout() {
    this.user.next(null);
    this.router.navigate(['/home']);
    localStorage.removeItem('token');
  }
}
