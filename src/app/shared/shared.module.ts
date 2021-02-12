import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavarComponent } from './pages/navar/navar.component';
import { MaterialModule } from '../material/material.module';




@NgModule({
  declarations: [NavarComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    NavarComponent

  ]
})
export class SharedModule { }
