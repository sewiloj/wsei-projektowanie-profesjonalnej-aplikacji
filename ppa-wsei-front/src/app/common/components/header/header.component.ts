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

  constructor(private authService: AuthService) {
    this.authService.user.subscribe((user) => {
      this.userName = user.name;
      this.permissionLabel = getPermissionName(user.type);
    });
  }
}
