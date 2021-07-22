import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SupplierService } from '../../services/supplier.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-supply-dialog',
  templateUrl: './add-supply-dialog.component.html',
  styleUrls: ['./add-supply-dialog.component.scss'],
})
export class AddSupplyDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<AddSupplyDialogComponent>,
    private supplierService: SupplierService,
    private toastService: ToastrService
  ) {}

  /**
   * Request supply for the hospital.
   */
  public addSupply(count: number) {
    this.supplierService.addVaccinesCount(count).subscribe({
      next: (state) => this.handleResponse(state),
      error: () => this.onRequestSupplyError(),
    });
  }

  /**
   * Handle response from the request.
   * @param state Whether the operation was successful or not.
   */
  private handleResponse(state: boolean) {
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
    this.toastService.error('Error! Unable to add vaccines.');
  }
}
