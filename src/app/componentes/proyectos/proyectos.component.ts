import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Proyectos } from 'src/app/modelos/proyectos';
import { LoginService } from 'src/app/servicios/login.service';
import { ProyectosService } from 'src/app/servicios/proyectos.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  public proyectos: Proyectos[]=[];
  public editProyecto: Proyectos | undefined;
  public deleteProyecto: Proyectos | undefined;
  public isUserLogged: Boolean = false;

  constructor(private proyectoService: ProyectosService,
              private loginService: LoginService) { }

  ngOnInit(): void {
    this.isUserLogged = this.loginService.isUserLogged();
    this.getProyectos();
  }

  public getProyectos():void{
    this.proyectoService.getProyecto().subscribe({
      next:(Response: Proyectos[]) =>{
        this.proyectos=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

 public onOpenModal(mode:String, proyecto?: Proyectos):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
      
    button.style.display='none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode==='add'){
      button.setAttribute('data-bs-target', '#addProyectoModal');
    } else if (mode==='delete'){
      this.deleteProyecto=proyecto;
      button.setAttribute('data-bs-target', '#deleteProyectoModal');
    } else if (mode==='edit'){
      this.editProyecto=proyecto;
      button.setAttribute('data-bs-target', '#editProyectoModal');
    }
    container?.appendChild(button);
    button.click();
 }

  public onAddProyecto(addForm: NgForm){
    document.getElementById('add-proyecto-form')?.click();
    this.proyectoService.addProyecto(addForm.value).subscribe({
      next: (Response: Proyectos) =>{
        console.log(Response);
        this.getProyectos();
        addForm.reset();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        addForm.reset();
      }
    })
  }

  public onUpdateProyecto(proyecto: Proyectos){
    this.editProyecto=proyecto;
    document.getElementById('add-proyecto-form')?.click();
    this.proyectoService.updateProyecto(proyecto).subscribe({
      next: (Response: Proyectos) =>{
        console.log(Response);
        this.getProyectos();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  public onDeleteProyecto(id: any):void{
    this.proyectoService.deleteProyecto(id).subscribe({
      next: (Response: void) =>{
        console.log(Response);
        this.getProyectos();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }  

}
