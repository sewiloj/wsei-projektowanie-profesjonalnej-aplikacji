import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RoleService } from '../../services/role.service';
import { ToastrService } from 'ngx-toastr';
import { USER_PERMISSIONS, UserPermission } from './../../models/user-permission';
import { UserType } from 'src/app/login/models/user-type';

@Component({
  templateUrl: './role-dialog.component.html',
  styleUrls: ['./role-dialog.component.scss'],
})
export class RoleDialogComponent {
  /**
   * Available user permissions in the application.
   */
  public userPermissions: UserPermission[] = USER_PERMISSIONS;

  constructor(
    private dialogRef: MatDialogRef<RoleDialogComponent>,
    private roleService: RoleService,
    private toastService: ToastrService
  ) {}

  /**
   * Request permission for the user.
   */
  public submitRole(permission: UserType, message: string) {
    this.roleService.requestPermission(permission, message).subscribe({
      next: (state) => this.handleSubmitRole(state),
      error: () => this.onError(),
    });
  }

  /**
   * Handle the request from submit role.
   * @param state Whether the operation was successful or not.
   */
  private handleSubmitRole(state: boolean) {
    if (state) {
      this.toastService.success('Operation was successful');
      this.dialogRef.close();
    } else {
      this.onError();
    }
  }

  /**
   * Display toast notification on error.
   */
  private onError() {
    this.toastService.error('Error! Please try requesting your role in few minutes.');
  }
}
