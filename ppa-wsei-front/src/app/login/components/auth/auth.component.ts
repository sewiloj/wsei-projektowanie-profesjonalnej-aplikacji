import { AuthService } from './auth.service';
import { AuthType } from '../../models/auth-type';
import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
   * Required for template usage.
   */
  public authTypeEnum = AuthType;
  /**
   * Whether the user has written some data and we are waiting for back-end to respond.
   */
  public isLoading = false;
  /**
   * Error string message.
   */
  public error: string = null;

  @Output() onCloseEvent = new EventEmitter<void>();

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  /**
   * Use user input to login or sign up.
   * @param form Angular form model from the login screen.
   */
  public onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }

    const { email, name, password } = form.value;

    this.isLoading = true;
    this.error = null;

    this.authType === AuthType.Login ? this.login(email, password) : this.register(email, name, password);
  }

  /**
   * Login with existing user credentials.
   */
  private login(email: string, password: string) {
    this.authService.login(email, password).subscribe((isSuccess) => {
      this.isLoading = false;
      isSuccess ? this.onAuthSuccess() : this.onAuthError('Invalid credentials or no connection to the server.');
    });
  }

  /**
   * Create a new account and display a confirmation message or an error.
   */
  private register(email: string, name: string, password: string) {
    this.authService.register(email, name, password).subscribe((isSuccess) => {
      this.isLoading = false;
      isSuccess ? this.onToggleRegistration() : this.onAuthError("Couldn't create a new account.");
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
