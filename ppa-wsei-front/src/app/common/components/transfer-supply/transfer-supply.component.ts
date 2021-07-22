import { CommonSupplyService } from '../../services/common-supply.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TransferDialogData } from './../../models/transfer-dialog-data';
import { TransferSelectable } from '../../models/transfer-selectable';

@Component({
  templateUrl: './transfer-supply.component.html',
  styleUrls: ['./transfer-supply.component.scss'],
})
export class TransferSupplyComponent {
  /**
   * <mat-select> label.
   */
  public label: string;
  /**
   * People that are selectable in the <mat-select>
   */
  public selectables: TransferSelectable[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TransferDialogData,
    public dialogRef: MatDialogRef<TransferSupplyComponent>,
    private commonSupplyService: CommonSupplyService,
    private toast: ToastrService
  ) {
    this.label = data.label;
    this.selectables = data.selectables;
  }

  /**
   * Transfer vaccines to that person.
   */
  public transfer(id: number, count: number) {
    this.commonSupplyService.transferVaccines(id, count).subscribe({
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
      this.toast.success('Operation was successful');
      this.dialogRef.close();
    } else {
      this.onError();
    }
  }

  /**
   * Display toast notification on error.
   */
  private onError() {
    this.toast.error('Error! Unable to transfer the vaccines.');
  }
}
