
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuario.intefaces';
import {tap, map, catchError} from 'rxjs/operators'
import { Observable } from 'rxjs';
import Swal from 'sweetalert2'


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario:Usuario;
  token:string;

  constructor(private http:HttpClient) {  this.AsignarValores();  }

  public guardarLocalstorage(data,token){

    localStorage.setItem('usuario',JSON.stringify(data));
    localStorage.setItem('token',token);
  }

  public AsignarValores(){

    if (JSON.parse(localStorage.getItem('usuario')) && localStorage.getItem('token') ){

      console.log(JSON.parse(localStorage.getItem('usuario')));

      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.token = localStorage.getItem('token') ;
    }else{


      this.token = "";
      localStorage.removeItem('usuario');
      localStorage.removeItem('token');

    }



  }

  public CerrarSesion(){

    this.token = "";
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');

  }

  public RegistrarUsuario (datos:Usuario){
    let url = environment.apiUrl+'/auth/signup';
    return this.http.post(url,datos);

  }

  public Login(usuario:Usuario):Observable<Usuario>{
    let url = environment.apiUrl+'/auth/login';

      return this.http.post<Usuario>(url,usuario).pipe(
        tap((resp:any)=>{
          this.guardarLocalstorage(resp.data,resp.access_token);

        }),
        map((resp:any)=>resp.data)

      )

  }

  public TraerUsuarios():Observable<Usuario[]>{

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })

    let url = environment.apiUrl+'/auth/usuarios';
    return this.http.get<Usuario[]>(url,{headers:headers}).pipe(

      map((resp:any)=>resp.Data)

    );
  }

  public EliminarUsuario(id:number) {
    let url = environment.apiUrl+'/auth/usuarios/'+id;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

   return this.http.delete(url,{headers:headers})

  }

  public CambiarRol(id:number){
    let url = environment.apiUrl+'/auth/usuarios/'+id;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.put(url,{},{headers:headers})

  }






}
