import { Component } from '@angular/core';
import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';

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
}
