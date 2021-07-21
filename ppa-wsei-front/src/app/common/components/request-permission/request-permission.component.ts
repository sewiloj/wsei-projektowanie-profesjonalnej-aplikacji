import { RoleDialogComponent } from './../role-dialog/role-dialog.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-request-permission',
  templateUrl: './request-permission.component.html',
  styleUrls: ['./request-permission.component.scss'],
})
export class RequestPermissionComponent {
  constructor(public dialog: MatDialog) {}

  /**
   * Open dialog where user can select his/her role.
   */
  public openRoleDialog() {
    const dialogRef = this.dialog.open(RoleDialogComponent, {
      width: '375px',
      height: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
