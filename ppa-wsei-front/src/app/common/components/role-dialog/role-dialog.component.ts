import { AuthService } from 'src/app/login/services/auth.service';

import { ToastrService } from 'ngx-toastr';
import { UserPermission, USER_PERMISSIONS } from './../../models/user-permission';
import { Component } from '@angular/core';
import { UserType } from 'src/app/login/models/user-type';
import { RoleService } from '../../services/role.service';

@Component({
  templateUrl: './role-dialog.component.html',
  styleUrls: ['./role-dialog.component.scss'],
})
export class RoleDialogComponent {
  /**
   * Available user permissions in the application.
   */
  public userPermissions: UserPermission[] = USER_PERMISSIONS;
  /**
   * Unique user id of the person using the application.
   */
  private userId: number;

  constructor(private authService: AuthService, private roleService: RoleService, private toastService: ToastrService) {
    this.authService.user.subscribe((user) => (this.userId = user.id));
  }

  /**
   * Request permission for the user.
   */
  public submitRole(permission: UserType, message: string) {
    this.roleService.requestPermission(permission, message).subscribe({
      next: (state) => (state ? this.toastService.success('Operation was successful') : this.onError()),
      error: () => this.onError(),
    });
  }

  /**
   * Display toast notification on error.
   */
  private onError() {
    this.toastService.error('Error! Please try requesting your role in few minutes.');
  }
}
