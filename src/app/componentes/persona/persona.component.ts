import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/modelos/persona';
import { LoginService } from 'src/app/servicios/login.service';
import { PersonaService } from 'src/app/servicios/persona.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  public usuario: Persona | undefined;
  public editUsuario: Persona | undefined;
  public isUserLogged: Boolean = false;
  
  constructor(private personaService: PersonaService,
              private loginService: LoginService) { }

  ngOnInit(): void {
    this.isUserLogged = this.loginService.isUserLogged();
    this.getUser();
  }

  public getUser(): void{
    this.personaService.getUser().subscribe({
      next: (response: Persona) => {
        this.usuario=response;
      },
      error:(error:HttpErrorResponse)=> {
        alert(error.message);
      }
    })
  }

  public onOpenModal(mode:String, usuario?: Persona):void{
  const container=document.getElementById('main-container');
  const button=document.createElement('button');
    
  button.style.display='none';
  button.setAttribute('data-bs-toggle', 'modal');
  if (mode==='edit'){
    this.editUsuario=usuario;
    button.setAttribute('data-bs-target', '#editUsuarioModal');
  }
  container?.appendChild(button);
  button.click();
  }

  public onUpdateUsuario(usuario: Persona){
    this.editUsuario=usuario;
    document.getElementById('add-usuario-form')?.click();
    this.personaService.updateUsuario(usuario).subscribe({
      next: (Response: Persona) =>{
        console.log(Response);
        this.getUser();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  public logOut():void {
    this.loginService.logout();
    this.isUserLogged = false;
    window.location.reload();
  }

}
