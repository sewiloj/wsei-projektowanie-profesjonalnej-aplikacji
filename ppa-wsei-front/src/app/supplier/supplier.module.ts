import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierService } from './services/supplier.service';
import { SupplierViewComponent } from './components/supplier-view/supplier-view.component';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddSupplyDialogComponent } from './components/add-supply-dialog/add-supply-dialog.component';

const MATERIAL_IMPORTS = [MatInputModule, MatFormFieldModule, MatDialogModule];
const COMPONENTS = [SupplierViewComponent, AddSupplyDialogComponent];

@NgModule({
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
  imports: [CommonModule, TranslateModule, MATERIAL_IMPORTS],
  providers: [SupplierService],
})
export class SupplierModule {}
