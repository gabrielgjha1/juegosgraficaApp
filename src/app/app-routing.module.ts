import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarUsuariosComponent } from './auth/pages/listar-usuarios/listar-usuarios.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { AgregarComponent } from './juegos/pages/agregar/agregar.component';
import { EditarComponent } from './juegos/pages/editar/editar.component';
import { IndexComponent } from './juegos/pages/index/index.component';
import { ListarComponent } from './juegos/pages/listar/listar.component';
import { TopjuegosComponent } from './juegos/pages/topjuegos/topjuegos.component';
import { VerJuegoComponent } from './juegos/pages/ver-juego/ver-juego.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [

  { path: '', component: IndexComponent,  pathMatch: 'full'},
  { path: 'crearJuego', component: AgregarComponent,canActivate:[AuthGuard] },
  { path: 'editarjuego/:id', component: EditarComponent,canActivate:[AuthGuard] },
  { path: 'listarjuego', component: ListarComponent,canActivate:[AuthGuard] },
  { path: 'listarusuarios', component: ListarUsuariosComponent,canActivate:[AuthGuard] },
  { path: 'juegostop', component: TopjuegosComponent },
  { path: 'verjuego/:id', component: VerJuegoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: "**", pathMatch: "full", redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
