import { RoleService } from './services/role.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RequestPermissionComponent } from './components/request-permission/request-permission.component';
import { RoleDialogComponent } from './components/role-dialog/role-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

const MATERIAL_IMPORTS = [MatInputModule, MatFormFieldModule, MatSelectModule, MatDialogModule];

const COMPONENTS = [HeaderComponent, RequestPermissionComponent, RoleDialogComponent];

@NgModule({
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
  imports: [CommonModule, HttpClientModule, FontAwesomeModule, ReactiveFormsModule, MATERIAL_IMPORTS],
  providers: [RoleService],
})
export class WseiCommonModule {}
