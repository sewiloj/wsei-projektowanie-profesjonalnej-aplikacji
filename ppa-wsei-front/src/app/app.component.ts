import { Component } from '@angular/core';
import { AuthService } from './login/components/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /**
   * Whether to display login modal.
   */
  public isAuthOn: boolean = false;
  /**
   * Whether the user is logged in.
   */
  public isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {
    this.authService.user.subscribe((u) => (this.isAuthOn = u === null));
  }

  public openLogin() {
    this.isAuthOn = true;
  }

  public closeLogin() {
    this.isAuthOn = false;
  }
}
