import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../interfaces/usuario.intefaces';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  error:boolean=false;
  public usuario:Usuario = {

    email:'',
    password:'',
    password2:'',
    name:'',


  };
  constructor( private _UsuarioService:UsuarioService, private route:Router) { }

  ngOnInit(): void {


    if (this._UsuarioService.token ){

      this.route.navigateByUrl('');

    }

  }

  enviarFormulario(){
    this.error = false;
    let expr = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!expr.test(this.usuario.email)){
     return this.error=true;

    } else {


      if (this.usuario.password.trim().length===0){
       return this.error=true;


      }

      if (this.usuario.name.trim().length===0){
        return this.error=true;

       }

       if (this.usuario.password.trim() != this.usuario.password2.trim()){
        return this.error=true;
       }


      this._UsuarioService.RegistrarUsuario(this.usuario).subscribe(((resp:any)=>{

        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Buen trabajo!',
              'Create tu usuario con el correo: '+this.usuario.email+', Ahora puede iniciar Sesión' ,
              'success'
            )

            this.route.navigateByUrl('login');

          }
        })

      }))

    }



  }

  registro(){

    this.route.navigateByUrl('/login')

  }

}
