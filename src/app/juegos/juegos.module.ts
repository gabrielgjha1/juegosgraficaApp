import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { EditarComponent } from './pages/editar/editar.component';
import { ListarComponent } from './pages/listar/listar.component';
import { IndexComponent } from './pages/index/index.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { VerJuegoComponent } from './pages/ver-juego/ver-juego.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopjuegosComponent } from './pages/topjuegos/topjuegos.component';

import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [AgregarComponent, EditarComponent, ListarComponent, IndexComponent, VerJuegoComponent, TopjuegosComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    BrowserAnimationsModule,

    ChartsModule
  ],
  exports:[AgregarComponent, EditarComponent, ListarComponent, IndexComponent,VerJuegoComponent]
})
export class JuegosModule { }
