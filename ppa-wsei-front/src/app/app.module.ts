import { MatSidenavModule } from '@angular/material/sidenav';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginModule } from './login/login.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { WseiCommonModule } from './common/wsei-common.module';

/**
 * Angular material imports.
 */
const MATERIAL_IMPORTS = [MatSidenavModule];
@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    LoginModule,
    WseiCommonModule,
    MATERIAL_IMPORTS,
    ToastrModule.forRoot(),
    FontAwesomeModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
