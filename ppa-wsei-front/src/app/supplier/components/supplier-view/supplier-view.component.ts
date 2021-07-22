import { ToastrService } from 'ngx-toastr';
import { TransferDialogData } from './../../../common/models/transfer-dialog-data';
import { CommonSupplyService } from './../../../common/services/common-supply.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TransferSupplyComponent } from 'src/app/common/components/transfer-supply/transfer-supply.component';
import { AddSupplyDialogComponent } from '../add-supply-dialog/add-supply-dialog.component';
import { Courier } from 'src/app/common/models/courier';

@Component({
  selector: 'app-supplier-view',
  templateUrl: './supplier-view.component.html',
  styleUrls: ['./supplier-view.component.scss'],
})
export class SupplierViewComponent {
  constructor(
    public dialog: MatDialog,
    private commonSupplyService: CommonSupplyService,
    private toast: ToastrService
  ) {}

  /**
   * Open dialog where user can add more vaccines.
   */
  public openAddSupplyDialog() {
    this.dialog.open(AddSupplyDialogComponent, {
      width: '375px',
      height: '310px',
    });
  }

  /**
   * Open dialog where user can set hospitalized people count.
   */
  public openTransferDialog() {
    this.commonSupplyService.getCouriers().subscribe({
      next: (couriers) => this.handleCouriersResponse(couriers),
      error: () => this.toast.error("Error! Couldn't get couriers."),
    });
  }

  /**
   * Open transfer dialog window with couriers.
   * @param couriers Couriers available in the application.
   */
  private handleCouriersResponse(couriers: Courier[]) {
    const data: TransferDialogData = { selectables: couriers, label: 'Couriers' };
    this.dialog.open(TransferSupplyComponent, {
      width: '375px',
      height: '310px',
      data,
    });
  }
}
