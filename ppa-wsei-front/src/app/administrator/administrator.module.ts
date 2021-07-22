import { AdministratorService } from './services/administrator.service';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { RequestsTableComponent } from './components/requests-table/requests-table.component';
import { HttpClientModule } from '@angular/common/http';

const MATERIAL_IMPORTS = [MatTableModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatDialogModule];

const COMPONENTS = [RequestsTableComponent];

@NgModule({
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
  imports: [CommonModule, HttpClientModule, MATERIAL_IMPORTS],
  providers: [AdministratorService],
})
export class AdministratorModule {}
