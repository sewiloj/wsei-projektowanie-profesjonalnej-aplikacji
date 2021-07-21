import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/login/services/auth.service';
import { getPermissionName } from '../../helpers/get-permission-name';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  /**
   * Logout icon.
   */
  public faSignOutAlt = faSignOutAlt;
  /**
   * Profile picture icon.
   */
  public faUser = faUser;
  /**
   * User first and last name.
   */
  public userName: string;
  /**
   * Label for the user permission.
   */
  public permissionLabel: string;

  constructor(private authService: AuthService, private toastr: ToastrService) {
    this.authService.user.subscribe((user) => {
      this.userName = user.name;
      this.permissionLabel = getPermissionName(user.type);
    });
  }

  /**
   * Logout the user from application. Display notification on error.
   */
  public logOut() {
    this.authService
      .logout()
      .subscribe({ next: (state) => (state ? null : this.onError()), error: () => this.onError() });
  }

  /**
   * Generic error about logout error.
   */
  private onError() {
    this.toastr.error("Error! Couldn't log out. Check your internet connection.");
  }
}
