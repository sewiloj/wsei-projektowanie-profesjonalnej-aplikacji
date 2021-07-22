import { HospitalWorkerService } from './services/hospital-worker.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalViewComponent } from './components/hospital-view/hospital-view.component';
import { HttpClientModule } from '@angular/common/http';
import { RequestSupplyDialogComponent } from './components/request-supply-dialog/request-supply-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

const MATERIAL_IMPORTS = [MatInputModule, MatFormFieldModule, MatSelectModule, MatDialogModule];
const COMPONENTS = [HospitalViewComponent];

@NgModule({
  declarations: [COMPONENTS, RequestSupplyDialogComponent],
  exports: [COMPONENTS],
  imports: [CommonModule, HttpClientModule, MATERIAL_IMPORTS],
  providers: [HospitalWorkerService],
})
export class HospitalModule {}
