import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/auth/services/usuario.service';
import { JuegosInterfaces } from '../../interfaces/juegos.interfaces';
import { JuegosService } from '../../serives/juegos.service';

@Component({
  selector: 'app-ver-juego',
  templateUrl: './ver-juego.component.html',
  styleUrls: ['./ver-juego.component.css']
})
export class VerJuegoComponent implements OnInit {
  juegos!:any;
  id:number;
  comprobar:boolean;
  cantidadVotos:number = 0;
  mostrarSpinner:boolean = true;
  token:string = ""


  constructor(private activateroute:ActivatedRoute,private _JuegoService:JuegosService,private _UsuarioSevice:UsuarioService) { }

  ngOnInit(): void {
    this.token = this._UsuarioSevice.token;
    console.log(this.token)
    this.traerId();
    this.TraeCntidadVotos();
  }

  traerId(){

    this.activateroute.params.subscribe(({id})=>{
      this.id = id;
      this.traerJuego();

    });

  }

  traerJuego(){

    this._JuegoService.TraerUnJuego(this.id).subscribe((resp:any)=>{
      this.juegos = resp[0];

      this.comprobar = true;
      this.comprobarvoto();

    })

  }

  realizarvoto(id:number){

    this._JuegoService.RealizarVotacion(id).subscribe(resp=> {


      this.comprobarvoto();
      this.TraeCntidadVotos();
    } )

  }

  comprobarvoto(){


    this._JuegoService.ComprobarVoto(this.id).subscribe((resp:boolean)=>{

      this.comprobar=resp;
      this.mostrarSpinner=false;

    })

  }

  TraeCntidadVotos(){

    this._JuegoService.ContarVotos(this.id).subscribe(resp=>{
      this.cantidadVotos=resp;
    })

  }

}
