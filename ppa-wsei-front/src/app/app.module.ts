import { AuthInterceptor } from './login/services/auth.interceptor';
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
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdministratorModule } from './administrator/administrator.module';
import { HospitalModule } from './hospital/hospital.module';
import { SupplierModule } from './supplier/supplier.module';
import { CourierModule } from './courier/courier.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Observable, from } from 'rxjs';

class AppTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return from(import(`../assets/translations/${lang}/translations.json`));
  }
}

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
    TranslateModule.forRoot({
      defaultLanguage: 'pl',
      loader: {
        provide: TranslateLoader,
        useClass: AppTranslateLoader,
        deps: [HttpClient],
      },
    }),
    FontAwesomeModule,
    AdministratorModule,
    HospitalModule,
    SupplierModule,
    CourierModule,
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
})
export class AppModule {}
