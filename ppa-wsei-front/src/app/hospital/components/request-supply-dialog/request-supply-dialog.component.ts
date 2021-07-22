import { CommonSupplyService } from '../../../common/services/common-supply.service';
import { Courier } from 'src/app/common/models/courier';
import { HospitalWorkerService } from '../../services/hospital-worker.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';

@Component({
  selector: 'app-request-supply-dialog',
  templateUrl: './request-supply-dialog.component.html',
  styleUrls: ['./request-supply-dialog.component.scss'],
})
export class RequestSupplyDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<RequestSupplyDialogComponent>,
    private hospitalWorkerService: HospitalWorkerService,
    private toastService: ToastrService
  ) {}

  /**
   * Request permission for the user.
   */
  public requestSupply(count: number) {
    this.hospitalWorkerService.requestSupply(count).subscribe({
      next: (state) => this.handleRequestResponse(state),
      error: () => this.onRequestSupplyError(),
    });
  }

  /**
   * Handle response from the request supply.
   * @param state Whether the operation was successful or not.
   */
  private handleRequestResponse(state: boolean) {
    if (state) {
      this.toastService.success('Operation was successful');
      this.dialogRef.close();
    } else {
      this.onRequestSupplyError();
    }
  }

  /**
   * Display toast notification on error.
   */
  private onRequestSupplyError() {
    this.toastService.error('Error! Unable to request vaccines.');
  }
}
