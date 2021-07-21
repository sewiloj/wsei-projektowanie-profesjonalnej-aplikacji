import { MenuItem, MenuItemType, MENU_ITEMS } from './common/models/menu-item';
import { Component } from '@angular/core';
import { User } from './login/models/user';
import { UserType } from './login/models/user-type';
import { AuthService } from './login/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /**
   * Whether to display login modal.
   */
  public isAuthOn: boolean = true;
  /**
   * Selected menu item in the sidebar.
   */
  public activeMenuItem: MenuItemType = MenuItemType.Dashboard;
  /**
   * Available menu items in the sidebar.
   */
  public menuItems: MenuItem[] = MENU_ITEMS;
  /**
   * Enum for the template.
   */
  public MenuItemType = MenuItemType;
  /**
   * Enum for the template.
   */
  public UserType = UserType;

  public user: User;

  constructor(private authService: AuthService) {}

  public closeLogin() {
    this.authService.user.subscribe((user) => {
      this.isAuthOn = user === null;
      this.user = user;
    });
  }
}
