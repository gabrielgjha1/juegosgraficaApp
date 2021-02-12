import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/auth/services/usuario.service';
import Swal from 'sweetalert2';
import { CategoriasInterfaces } from '../../interfaces/categorias.interfaces';
import { JuegosInterfaces } from '../../interfaces/juegos.interfaces';
import { JuegosService } from '../../serives/juegos.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  MostrarSpinner = false;
  error:boolean= false;
  id:number;
  imagen:File;

  categorias:CategoriasInterfaces[];
  juego:JuegosInterfaces = {

    nombre:"",
    direccion:"",
    descripcion:"",
    precio: 0,
    categoria_id:0,


  }
  constructor(private activateRoute:ActivatedRoute,private _JuegoService:JuegosService) { }

  ngOnInit(): void {

    this.TraerId();
    this.TraerCategorias();
  }

  TraerId(){

    this.activateRoute.params.subscribe(({id})=>{
      this.id= id;
      this._JuegoService.TraerUnJuego(id).subscribe(resp=>{

        this.juego = {

          nombre:resp.nombre,
          direccion:resp.direccion,
          descripcion:resp.direccion,
          precio: resp.precio,
          categoria_id:resp.categoria_id,

        }




      })

    });

  }

  TraerCategorias(){

    this._JuegoService.traerCategorias().subscribe((resp:CategoriasInterfaces[])=>{

      this.categorias=resp;

    });

  }

  GuardarImagen(imagen:File){

    this.imagen = imagen;

  }

  EnviarFormulario(){

    if ( this.juego.nombre && this.juego.direccion && this.juego.precio && this.juego.categoria_id && this.imagen  ){

      Swal.fire({
        title: 'Esta seguro que desea actualizar los datos?',
        text: "Esto no se podra restaurar!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Enviar!'
      }).then((result) => {



        if (result.isConfirmed) {
          this.MostrarSpinner = true;
          this._JuegoService.actualizarJuego(this.id,this.juego).subscribe(resp=>{

            Swal.fire(
              'Buen trabajo!',
              'Los datos han sido actualizados!',
              'success'
            )
            this.MostrarSpinner = false;
            this.error = false;

          },(error=> {

            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Consulte con el desarrollador!',

            })
            this.error = true;
           } ))

        }
      })


    }else{

      this.error = true;
    }

  }


}
