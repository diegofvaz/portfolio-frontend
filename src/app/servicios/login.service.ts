import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Login } from '../modelos/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public login(credentials:Login) : Observable<Boolean> {
    return this.http.post<Boolean>(`${this.apiServerUrl}/login`, credentials).pipe(
      tap((response: Boolean) => {
        if (response)
          sessionStorage.setItem("user", "admin");
      })
    );
  }

  public logout() {
    sessionStorage.removeItem("user");
  }

  public isUserLogged():boolean {
    return sessionStorage.getItem("user") !== null;
  }
}

