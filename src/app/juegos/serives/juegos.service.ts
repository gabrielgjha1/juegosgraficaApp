import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsuarioService } from 'src/app/auth/services/usuario.service';
import { environment } from 'src/environments/environment';
import { CategoriasInterfaces } from '../interfaces/categorias.interfaces';
import { JuegosInterfaces } from '../interfaces/juegos.interfaces';
import { juegostop} from '../interfaces/juegosTop.intefaces';

@Injectable({
  providedIn: 'root'
})
export class JuegosService {

  constructor(private http:HttpClient,private _UsuarioService:UsuarioService) { }



  public traerCategorias(){
    let url = environment.apiUrl+'/categoria';

   return this.http.get<CategoriasInterfaces[]>(url).pipe(

      map((resp:any)=>resp.data)

    )


  }

  public TraerJuegos(){

    let url = environment.apiUrl+'/juegos';
    return this.http.get<JuegosInterfaces[]>(url).pipe(

      map((resp:any)=>resp.data)

    )

  }

  public TraerJuegosTop():Observable <juegostop[]> {
    let url = environment.apiUrl+'/juegosmasvotados';
    return this.http.get<juegostop[]>(url).pipe(

      map((resp:any)=>resp.data)

    )

  }

  public GuardarJuego(juego:JuegosInterfaces,data){
    let token = this._UsuarioService.token;

    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data',
      'Authorization': `Bearer ${token}`,
    })


    let url = environment.apiUrl+'/auth/juegos';
    return this.http.post(url,data,{headers:headers});


  }

  public EliminarJUego(id:string){
    let token = this._UsuarioService.token;
    let url = environment.apiUrl+'/auth/juegos/'+id;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.http.delete(url,{headers:headers});




  }

  public  TraerUnJuego(id:number){

    let url = environment.apiUrl+'/traerjuego/'+id;

    return this.http.get(url).pipe(

      map((resp:any)=>resp.data)

    );

  }


  public actualizarJuego(id:number,juego:JuegosInterfaces) {
    let token = this._UsuarioService.token;
    let url = environment.apiUrl+'/auth/juegos/'+id;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(url,juego,{headers:headers});


  }



  public RealizarVotacion(id:number){


    let token = this._UsuarioService.token;
    let url = environment.apiUrl+'/auth/votacion/'+id;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(url,{},{headers:headers});
  }

  public ComprobarVoto(id:number):Observable<boolean>{

    let token = this._UsuarioService.token;
    let url = environment.apiUrl+'/auth/cvotacion/'+id;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(url,{headers:headers}).pipe(

      map((resp:any)=>resp.data)

    )
  }

  public ContarVotos( id:number ):Observable <number>{

    let token = this._UsuarioService.token;
    let url = environment.apiUrl+'/cuentovotos/'+id;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<number>(url,{headers:headers}).pipe(

      map((resp:any)=>resp.data)

    )

  }

  public traerTop3Juegos(){


    let token = this._UsuarioService.token;
    let url = environment.apiUrl+'/juegostop';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<juegostop>(url,{headers:headers}).pipe(


      map((resp:any)=> resp.data )

    )


  }




}
