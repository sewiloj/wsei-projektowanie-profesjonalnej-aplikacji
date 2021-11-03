import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AdministratorService } from './../../services/administrator.service';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserPermissionRequest } from '../../models/user-permission-request';
import { UserType } from 'src/app/login/models/user-type';
import { getPermissionName } from 'src/app/common/helpers/get-permission-name';

@Component({
  selector: 'app-requests-table',
  templateUrl: './requests-table.component.html',
  styleUrls: ['./requests-table.component.scss'],
})
export class RequestsTableComponent {
  /**
   * Visible columns.
   */
  public displayedColumns: string[] = ['Name', 'Type', 'Message', 'Actions'];
  /**
   * Data source for the MatTable.
   */
  public dataSource: MatTableDataSource<UserPermissionRequest> = new MatTableDataSource<UserPermissionRequest>();

  constructor(
    private administratorService: AdministratorService,
    private toast: ToastrService,
    private translateService: TranslateService
  ) {
    this.administratorService.getRequestPermissions().subscribe({
      next: (data) => (this.dataSource.data = data),
      error: () => this.toast.error("Couldn't load permission data."),
    });
  }

  /**
   * Get pretty string for enum value.
   */
  public getTypeLabel(type: UserType): string {
    return getPermissionName(type, this.translateService);
  }

  /**
   * Accept or decline the permission.
   * @param isAccepted Whether the administrator accepted or declined the request.
   * @param permissionId Unique ID of the permission.
   */
  public handleClick(isAccepted: boolean, permissionId: number) {
    this.administratorService.handleRequestPermission(isAccepted, permissionId).subscribe({
      next: () => (this.dataSource.data = this.dataSource.data.filter((dataPoint) => dataPoint.id !== permissionId)),
      error: () => this.toast.error("Couldn't handle the permission change."),
    });
  }
}
