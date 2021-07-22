import { BaseUserInformation } from '../../../common/models/base-user-information';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonSupplyService } from 'src/app/common/services/common-supply.service';
import { ToastrService } from 'ngx-toastr';
import { TransferDialogData } from 'src/app/common/models/transfer-dialog-data';
import { TransferSupplyComponent } from 'src/app/common/components/transfer-supply/transfer-supply.component';

@Component({
  selector: 'app-courier-view',
  templateUrl: './courier-view.component.html',
  styleUrls: ['./courier-view.component.scss'],
})
export class CourierViewComponent {
  constructor(
    public dialog: MatDialog,
    private commonSupplyService: CommonSupplyService,
    private toast: ToastrService
  ) {}

  /**
   * Open dialog where user can set hospitalized people count.
   */
  public openTransferDialog() {
    this.commonSupplyService.getHospitalWorkers().subscribe({
      next: (couriers) => this.handleResponse(couriers),
      error: () => this.toast.error("Error! Couldn't get hospital workers."),
    });
  }

  /**
   * Open transfer dialog window with hospital workers.
   * @param hospitalWorkers Hospital workers available in the application.
   */
  private handleResponse(hospitalWorkers: BaseUserInformation[]) {
    const data: TransferDialogData = { selectables: hospitalWorkers, label: 'Hospital workers' };
    this.dialog.open(TransferSupplyComponent, {
      width: '375px',
      height: '310px',
      data,
    });
  }
}
