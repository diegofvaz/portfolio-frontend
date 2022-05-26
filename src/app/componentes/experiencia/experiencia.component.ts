import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Experiencia } from 'src/app/modelos/experiencia';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  public experiencias: Experiencia[]=[];
  public editExperiencia: Experiencia | undefined;
  public deleteExperiencia: Experiencia | undefined;
  public isUserLogged: Boolean = false;

  constructor(private experienciaService: ExperienciaService,
              private loginService: LoginService) { }

  ngOnInit(): void {
    this.isUserLogged = this.loginService.isUserLogged();
    this.getExperiencias();
  }

  public getExperiencias():void{
    this.experienciaService.getExperiencia().subscribe({
      next:(Response: Experiencia[]) =>{
        this.experiencias=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  public onOpenModal(mode:String, experiencia?: Experiencia):void{
  const container=document.getElementById('main-container');
  const button=document.createElement('button');

  button.style.display='none';
  button.setAttribute('data-bs-toggle', 'modal');
  if (mode==='add'){
    button.setAttribute('data-bs-target', '#addExperienciaModal');
  } else if (mode==='delete'){
    this.deleteExperiencia=experiencia;
    button.setAttribute('data-bs-target', '#deleteExperienciaModal');
  } else if (mode==='edit'){
    this.editExperiencia=experiencia;
    button.setAttribute('data-bs-target', '#editExperienciaModal');
  }
  container?.appendChild(button);
  button.click();
 }

  public onAddExperiencia(addForm: NgForm){
    document.getElementById('add-experiencia-form')?.click();
    this.experienciaService.addExperiencia(addForm.value).subscribe({
      next: (Response: Experiencia) =>{
        console.log(Response);
        this.getExperiencias();
        addForm.reset();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        addForm.reset();
      }
    })
  }

  public onUpdateExperiencia(experiencia: Experiencia){
    this.editExperiencia=experiencia;
    document.getElementById('add-experiencia-form')?.click();
    this.experienciaService.updateExperiencia(experiencia).subscribe({
      next: (Response: Experiencia) =>{
        console.log(Response);
        this.getExperiencias();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  public onDeleteExperiencia(id: any):void{
    this.experienciaService.deleteExperiencia(id).subscribe({
      next: (Response: void) =>{
        console.log(Response);
        this.getExperiencias();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }  


}
