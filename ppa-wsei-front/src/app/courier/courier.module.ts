import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourierViewComponent } from './components/courier-view/courier-view.component';

const COMPONENTS = [CourierViewComponent];

@NgModule({
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
  imports: [CommonModule, TranslateModule],
})
export class CourierModule {}
