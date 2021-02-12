import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CategoriasInterfaces } from '../../interfaces/categorias.interfaces';
import { JuegosInterfaces } from '../../interfaces/juegos.interfaces';
import { JuegosService } from '../../serives/juegos.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {
  MostrarSpinner = false;
  error:boolean= false;

  imagen:File;

  categorias:CategoriasInterfaces[];
  juego:JuegosInterfaces = {

    nombre:"",
    direccion:"",
    descripcion:"",
    precio: 0,
    categoria_id:0,


  }
  constructor(private _JuegoService:JuegosService) { }

  ngOnInit(): void {

    this.TraerCategorias();
    this.TraerJuegos();
  }

  TraerCategorias(){

    this._JuegoService.traerCategorias().subscribe((resp:CategoriasInterfaces[])=>{

      this.categorias=resp;


    });

  }

  TraerJuegos(){

    this._JuegoService.TraerJuegos().subscribe((resp:JuegosInterfaces[])=>{


    });

  }
  GuardarImagen(imagen:File){



    this.imagen = imagen;


  }

  EnviarFormulario(){

    // nombre:"",
    // direccion:"",
    // descripcion:"",
    // precio: 0,
    // categoria_id:0,


    if ( this.juego.nombre && this.juego.direccion && this.juego.precio && this.juego.categoria_id && this.imagen  ){


        const formData = new FormData();

        formData.append('img',this.imagen);

        formData.append('nombre',this.juego.nombre);
        formData.append('direccion',this.juego.direccion);
        formData.append('descripcion',this.juego.descripcion);
        formData.append('precio','2');
        formData.append('categoria_id','1');


        Swal.fire({
          title: 'Esta seguro que desea añadir estos datos?',
          text: "Si desea eliminarlo despues vaya a listar!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Enviar!'
        }).then((result) => {
          this.MostrarSpinner=true
          this._JuegoService.GuardarJuego(this.juego,formData).subscribe(resp=>{
            Swal.fire(
              'Buen trabajo!',
              'Los datos se han añadido!',
              'success'
            )

            this.error = false;

            this.MostrarSpinner=false
            this.juego = {

              nombre:"",
              direccion:"",
              descripcion:"",
              precio: 0,
              categoria_id:0,


            }

          })


        })

    }else{

      return this.error = true;

    }




  }

}
