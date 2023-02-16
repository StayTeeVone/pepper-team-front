import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SpaBodyComponent } from './spa-body/spa-body.component';
import { SpaHeaderComponent } from './spa-header/spa-header.component';
import { SpaContentComponent } from './spa-content/spa-content.component';
import { SpaFooterComponent } from './spa-footer/spa-footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SpaBodyComponent,
    SpaHeaderComponent,
    SpaContentComponent,
    SpaFooterComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
  ],
  exports: [SpaBodyComponent],
  providers: [],
})
export class SpaModule { }
