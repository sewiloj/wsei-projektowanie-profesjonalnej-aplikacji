import { RequestSupplyDialogComponent } from './../request-supply-dialog/request-supply-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { HospitalWorkerService } from './../../services/hospital-worker.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-hospital-view',
  templateUrl: './hospital-view.component.html',
  styleUrls: ['./hospital-view.component.scss'],
})
export class HospitalViewComponent {
  /**
   * Number of people hospitalized.
   */
  public patientsCount: number;

  constructor(
    public dialog: MatDialog,
    private hospitalWorkerService: HospitalWorkerService,
    private toast: ToastrService
  ) {
    this.hospitalWorkerService.getPatientsCount().subscribe({
      next: (count) => (this.patientsCount = count),
      error: () => this.toast.error("Couldn't load patients count"),
    });
  }
  /**
   * Open dialog where user can request more vaccines.
   */
  public openRequestDialog() {
    this.dialog.open(RequestSupplyDialogComponent, {
      width: '375px',
      height: '285px',
    });
  }
}
