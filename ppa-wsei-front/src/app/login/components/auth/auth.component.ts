import { AuthService } from './auth.service';
import { AuthType } from '../../models/auth-type';
import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  /**
   * Type of the authorization. Whether to display sign up or sign in screen.
   */
  public authType: AuthType = AuthType.Register;
  /**
   * Whether the user has written some data and we are waiting for back-end to respond.
   */
  public isLoading = false;
  /**
   * Error string message.
   */
  public error: string = null;

  @Output() onCloseEvent = new EventEmitter<void>();

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Use user input to login or sign up.
   * @param form Angular form model from the login screen.
   */
  public onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }

    const { email, name, password } = form.value;

    let authObservable: Observable<User>;

    this.isLoading = true;
    this.error = null;

    if (this.authType === AuthType.Login) {
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.register(email, name, password);
    }

    authObservable.subscribe({
      next: () => this.onAuthSuccess(),
      error: (error: string) => this.onAuthError(error),
      complete: () => (this.isLoading = false),
    });
  }

  /**
   * Invoked on unsuccessful login or sign up.
   * @param error Error string message.
   */
  private onAuthError(error: string) {
    this.error = error;
  }

  /**
   * Invoked on successful login or sign up.
   */
  private onAuthSuccess() {
    this.onClose();
    this.router.navigate(['/hub']);
  }

  /**
   * Change window from sign in to sign up or the other way around.
   */
  public onToggleRegistration(): void {
    this.authType = this.authType === AuthType.Register ? AuthType.Login : AuthType.Register;
    this.error = null;
  }

  /**
   * Invoked on successful login.
   */
  public onClose(): void {
    this.onCloseEvent.emit();
  }
}
