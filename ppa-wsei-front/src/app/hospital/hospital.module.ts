import { TranslateModule } from '@ngx-translate/core';
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
import { UpdateCountDialogComponent } from './components/update-count-dialog/update-count-dialog.component';

const MATERIAL_IMPORTS = [MatInputModule, MatFormFieldModule, MatSelectModule, MatDialogModule];
const COMPONENTS = [HospitalViewComponent, UpdateCountDialogComponent, RequestSupplyDialogComponent];

@NgModule({
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
  imports: [CommonModule, TranslateModule, HttpClientModule, MATERIAL_IMPORTS],
  providers: [HospitalWorkerService],
})
export class HospitalModule {}
