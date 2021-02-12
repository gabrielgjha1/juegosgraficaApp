import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import Swal from 'sweetalert2';
import { Usuario } from './auth/interfaces/usuario.intefaces';
import { UsuarioService } from './auth/services/usuario.service';

interface menu {

  routerLink:string,
  nombre:string

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {



  title = 'Juegos';
  nombre:string = "";
  role:string="user_role";
  comprobarlogin:boolean = false;
  menu:menu[] =[];



  constructor ( private UsuarioServioce:UsuarioService ){}

  ngOnInit(): void {

    this.ComprobarLogin()

  }

  ComprobarLogin(){

    if (localStorage.getItem('token') ){
        let usuario:Usuario = JSON.parse(localStorage.getItem('usuario'));
       this.comprobarlogin = true;
       this.nombre = usuario.name;
       this.role = usuario.role;

      }else{

        this.role = "user_role"
        this.comprobarlogin = false;

      }

      this.Asignarmenu();

  }

  CerrarSesion(){

    Swal.fire({
      title: 'Esta seguro que desea cerrar sesion?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cerrar sesion!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Buen trabajo!',
          'Su sesion ha sido cerrada!',
          'success'
        )
      }
      this.comprobarlogin = false;
      this.UsuarioServioce.CerrarSesion();

    })



  }

  Asignarmenu(){


    if (this.role === 'admin_role'){

      this.menu = [

        { nombre:'Listar Juego',routerLink:'listarjuego' },
        { nombre:'Listar Usuarios',routerLink:'listarusuarios' },
        { nombre:'Crear Juegos',routerLink:'crearJuego' },
      ]

    }
    else{

      this.menu = []


    }




  }


}
