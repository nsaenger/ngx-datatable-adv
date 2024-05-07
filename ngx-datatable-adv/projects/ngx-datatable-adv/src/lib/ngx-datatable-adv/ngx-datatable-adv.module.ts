import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DatatableComponent} from "./components/datatable/datatable.component";



@NgModule({
  declarations: [
    DatatableComponent
  ],
  exports: [
    DatatableComponent
  ],
  imports: [
    CommonModule
  ]
})
export class NgxDatatableAdvModule { }
