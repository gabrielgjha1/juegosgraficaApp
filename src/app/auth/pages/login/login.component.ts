import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../interfaces/usuario.intefaces';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error:boolean=false;

  public usuario:Usuario = {

    email:'',
    password:''

  };



  constructor(private _UsuarioService:UsuarioService, private route:Router) { }

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

      this._UsuarioService.Login(this.usuario).subscribe(resp=>{



        this.route.navigateByUrl('');

        console.log(resp);
      },(error)=>{

        Swal.fire({
          title: 'Error!',
          text: 'Revisa tu informacion, Si no tienes cuenta registrate!',
          icon: 'error',
          confirmButtonText: 'Enviar'
        })

      });

    }



  }


  registro(){

    this.route.navigateByUrl('/registro')

  }



}
