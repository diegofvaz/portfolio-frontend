import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Proyectos } from '../modelos/proyectos';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  private apiServerUrl=environment.apiBaseUrl;

  constructor(private http : HttpClient) { }

  public getProyecto():Observable<Proyectos[]>{
    return this.http.get<Proyectos[]>(`${this.apiServerUrl}/proyecto/all`);
  }

  public addProyecto(proyecto: Proyectos):Observable<Proyectos> {
    return this.http.post<Proyectos>(`${this.apiServerUrl}/proyecto/add`, proyecto);
  }

  public updateProyecto(proyecto: Proyectos):Observable<Proyectos> {
    return this.http.put<Proyectos>(`${this.apiServerUrl}/proyecto/update`, proyecto);
  }

  public deleteProyecto(proyectoId: number):Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/proyecto/delete/${proyectoId}`);
  }
  
}
