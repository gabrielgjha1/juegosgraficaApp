import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/auth/services/usuario.service';
import Swal from 'sweetalert2';
import { JuegosInterfaces } from '../../interfaces/juegos.interfaces';
import { juegostop } from '../../interfaces/juegosTop.intefaces';
import { JuegosService } from '../../serives/juegos.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  mostrarspinner:boolean = true;
  juegos:juegostop[];
  token:string = "sd";



  constructor(private _UsuarioService:UsuarioService,private _JuegosService:JuegosService,private route:Router) { }

  ngOnInit(): void {
    this.token = this._UsuarioService.token;
    console.log(this.token);
    this.TraerJuegos();

  }

  TraerJuegos(){


    this._JuegosService.TraerJuegosTop().subscribe(resp=>{

      this.mostrarspinner=false
      this.juegos = resp;

    })


  }

  verjuego(id:string){

    if (!this.token){

      this.route.navigateByUrl('login');

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Inicia sesion para poder votar!',
      })

      return
    }

    this.route.navigateByUrl('verjuego/'+id);


  }

}
