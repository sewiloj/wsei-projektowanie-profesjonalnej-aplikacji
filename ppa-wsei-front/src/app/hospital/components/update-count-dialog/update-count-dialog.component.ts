import { Component } from '@angular/core';
import { HospitalWorkerService } from '../../services/hospital-worker.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-count-dialog',
  templateUrl: './update-count-dialog.component.html',
  styleUrls: ['./update-count-dialog.component.scss'],
})
export class UpdateCountDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<UpdateCountDialogComponent>,
    private hospitalWorkerService: HospitalWorkerService,
    private toastService: ToastrService
  ) {}

  /**
   * Request permission for the user.
   */
  public updateCount(count: number) {
    this.hospitalWorkerService.updatePatientsCount(count).subscribe({
      next: (state) => this.handleUpdateResponse(state),
      error: () => this.onError(),
    });
  }

  /**
   * Handle response from the request supply.
   * @param state Whether the operation was successful or not.
   */
  private handleUpdateResponse(state: boolean) {
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
    this.toastService.error('Error! Unable to update count of patients.');
  }
}
