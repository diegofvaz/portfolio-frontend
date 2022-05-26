import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Educacion } from 'src/app/modelos/educacion';
import { EducacionService } from 'src/app/servicios/educacion.service';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  public educations: Educacion[]=[];
  public editEducation: Educacion | undefined;
  public deleteEducation: Educacion | undefined;
  public isUserLogged: Boolean = false;

  constructor(private educacionService: EducacionService,
              private loginService: LoginService ) { }

  ngOnInit(): void {
    this.getEducations();
    this.isUserLogged = this.loginService.isUserLogged();
  }

  public getEducations():void{
    this.educacionService.getEducation().subscribe({
      next:(Response: Educacion[]) =>{
        this.educations=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  public onOpenModal(mode:String, educacion?: Educacion):void{
  const container=document.getElementById('main-container');
  const button=document.createElement('button');
    
  button.style.display='none';
  button.setAttribute('data-bs-toggle', 'modal');
  if (mode==='add'){
    button.setAttribute('data-bs-target', '#addEducationModal');
  } else if (mode==='delete'){
    this.deleteEducation=educacion;
    button.setAttribute('data-bs-target', '#deleteEducationModal');
  } else if (mode==='edit'){
    this.editEducation=educacion;
    button.setAttribute('data-bs-target', '#editEducationModal');
  }
  container?.appendChild(button);
  button.click();
  }

  public onAddEducation(addForm: NgForm){
    document.getElementById('add-education-form')?.click();
    this.educacionService.addEducation(addForm.value).subscribe({
      next: (Response: Educacion) =>{
        console.log(Response);
        this.getEducations();
        addForm.reset();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        addForm.reset();
      }
    })
  }

  public onUpdateEducation(educacion: Educacion){
    this.editEducation=educacion;
    document.getElementById('add-education-form')?.click();
    this.educacionService.updateEducation(educacion).subscribe({
      next: (Response: Educacion) =>{
        console.log(Response);
        this.getEducations();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  public onDeleteEducation(id_edu: any):void{
    this.educacionService.deleteEducation(id_edu).subscribe({
      next: (Response: void) =>{
        console.log(Response);
        this.getEducations();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }  

}
