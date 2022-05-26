import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Skills } from 'src/app/modelos/skills';
import { LoginService } from 'src/app/servicios/login.service';
import { SkillsService } from 'src/app/servicios/skills.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  public skills: Skills[]=[];
  public editSkills: Skills | undefined;
  public deleteSkills: Skills | undefined;
  public isUserLogged: Boolean = false;

  constructor(private skillsService: SkillsService,
              private loginService: LoginService) { }

  ngOnInit(): void {
    this.isUserLogged = this.loginService.isUserLogged();
    this.getSkills();
  }

  public getSkills():void{
    this.skillsService.getSkills().subscribe({
      next:(Response: Skills[]) =>{
        this.skills=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

 public onOpenModal(mode:String, skills?: Skills):void{
  const container=document.getElementById('main-container');
  const button=document.createElement('button');
    
  button.style.display='none';
  button.setAttribute('data-bs-toggle', 'modal');
  if (mode==='add'){
    button.setAttribute('data-bs-target', '#addSkillsModal');
  } else if (mode==='delete'){
    this.deleteSkills=skills;
    button.setAttribute('data-bs-target', '#deleteSkillsModal');
  } else if (mode==='edit'){
    this.editSkills=skills;
    button.setAttribute('data-bs-target', '#editSkillsModal');
  }
  container?.appendChild(button);
  button.click();
}

  public onAddSkills(addForm: NgForm){
    document.getElementById('add-skills-form')?.click();
    this.skillsService.addSkills(addForm.value).subscribe({
      next: (Response: Skills) =>{
        console.log(Response);
        this.getSkills();
        addForm.reset();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        addForm.reset();
      }
    })
  }

  public onUpdateSkills(skills: Skills){
    this.editSkills=skills;
    document.getElementById('add-skills-form')?.click();
    this.skillsService.updateSkills(skills).subscribe({
      next: (Response: Skills) =>{
        console.log(Response);
        this.getSkills();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  public onDeleteSkills(id: any):void{
    this.skillsService.deleteSkills(id).subscribe({
      next: (Response: void) =>{
        console.log(Response);
        this.getSkills();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }  

}
