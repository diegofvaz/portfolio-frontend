import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Persona } from '../modelos/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private apiServerUrl=environment.apiBaseUrl;

  constructor(private http : HttpClient) { }

  public getUser():Observable<Persona>{
    return this.http.get<Persona>(`${this.apiServerUrl}/usuario/id/1`);
  }
  
  public updateUsuario(usuario: Persona):Observable<Persona> {
    return this.http.put<Persona>(`${this.apiServerUrl}/usuario/update`, usuario);
  }
   
}
