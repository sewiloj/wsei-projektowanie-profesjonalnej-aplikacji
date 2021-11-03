import { TranslateService } from '@ngx-translate/core';
import { AuthType } from '../../models/auth-type';
import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  /**
   * Invoked on successful login.
   */
  @Output() onCloseEvent = new EventEmitter<void>();
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
  /**
   * URL of the image displayed next to the form. Based on translation.
   */
  public imageUrl: string = '../../../../assets/logo_pl.svg';

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private translateService: TranslateService
  ) {
    this.imageUrl = `../../../../assets/logo_${this.translateService.currentLang}.svg`;
  }

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
    this.authService.login(email, password).subscribe({
      next: (user) => this.handleLogin(user),
      error: () => this.onAuthError("Couldn't log in. Please try again later."),
    });
  }

  /**
   * Create a new account and display a confirmation message or an error.
   */
  private register(email: string, name: string, password: string) {
    this.authService.register(email, name, password).subscribe({
      next: (isSuccess) => this.handleRegister(isSuccess),
      error: () => this.onAuthError("Couldn't create a new account."),
    });
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

  private handleRegister(isSuccess: boolean) {
    this.isLoading = false;
    isSuccess ? this.onSignUpSuccess() : this.onAuthError("Couldn't create a new account.");
  }

  private handleLogin(user: User) {
    this.isLoading = false;
    user.token !== undefined ? this.onClose() : this.onAuthError('Invalid credentials or no connection to the server.');
  }

  /**
   * Invoked on register success.
   */
  private onSignUpSuccess() {
    this.toastr.success('Success! You can now log in.');
    this.onToggleRegistration();
  }

  /**
   * Invoked on unsuccessful login or sign up.
   * @param error Error string message.
   */
  private onAuthError(error: string) {
    this.error = error;
    this.isLoading = false;
  }
}
