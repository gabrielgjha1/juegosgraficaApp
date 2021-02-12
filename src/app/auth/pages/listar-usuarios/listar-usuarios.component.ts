import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import {Usuario} from '../../interfaces/usuario.intefaces';
import Swal from 'sweetalert2';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {

  usuario:Usuario[];

  ELEMENT_DATA: Usuario[] = [];
  displayedColumns: string[] = ['email', 'name', 'role', 'created_at','Botones'];

  dataSource = this.ELEMENT_DATA;

  constructor(private _UsuarioService:UsuarioService) { }

  ngOnInit(): void {

    this.traerUsuarios();

  }

  traerUsuarios(){

    this._UsuarioService.TraerUsuarios().subscribe(resp=>{

      this.usuario = resp;
      this.dataSource = this.usuario;

    })

  }

  eliminar(id:number){

    Swal.fire({
      title: 'Esta seguro que desea eliminar este usuario?',
      text: "Estos cambios no son revesibles!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si,Borrar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this._UsuarioService.EliminarUsuario(id).subscribe(resp=>{
          this.traerUsuarios();

          Swal.fire(
            'Borrar!',
            'Tu archivo a sido borrado.',
            'success'
          )

        })


      }
    })




  }

  CambiarRol(id:number){


    Swal.fire({
      title: 'Segugo que desea cambiar el rol?',
      text: "El usuario podra realizar todas las acciones del administrador!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si,Cambiar rol!'
    }).then((result) => {


      if (result.isConfirmed) {

        this._UsuarioService.CambiarRol(id).subscribe(resp=>{
          this.traerUsuarios();
          Swal.fire(
            'Actualizado!',
            'El usuario a sido actualizado.',
            'success'
          )
        });

      }
    })





  }

}
