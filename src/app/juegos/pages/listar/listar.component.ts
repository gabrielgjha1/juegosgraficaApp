import {animate, state, style, transition, trigger} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { JuegosInterfaces } from '../../interfaces/juegos.interfaces';
import { JuegosService } from '../../serives/juegos.service';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListarComponent implements OnInit {

  ELEMENT_DATA:JuegosInterfaces[];
  dataSource;
  columnsToDisplay = ['nombre', 'precio', 'direccion'];
  expandedElement: JuegosInterfaces | null;

  constructor( private _JuevosService:JuegosService, private route:Router ) { }

  ngOnInit(): void {


    this.traerJuego();

  }

  traerJuego(){

    this._JuevosService.TraerJuegos().subscribe((resp:JuegosInterfaces[])=>{

      this.ELEMENT_DATA=resp
      this.dataSource = this.ELEMENT_DATA;
    });

  }

  Editar(id:string){

    this.route.navigateByUrl('editarjuego/'+id);

  }

  Eliminar(id:string){

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

        this._JuevosService.EliminarJUego(id).subscribe(resp=>{

          this.traerJuego()

          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )

        });


      }
    })




  }

}
