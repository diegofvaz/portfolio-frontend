import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { ExperienciaComponent } from './componentes/experiencia/experiencia.component';
import { PersonaComponent } from './componentes/persona/persona.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { SkillsComponent } from './componentes/skills/skills.component';
import { LoginComponent } from './componentes/login/login.component';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    ExperienciaComponent,
    EducacionComponent,
    PersonaComponent,
    ProyectosComponent,
    SkillsComponent,
    LoginComponent,
    PortfolioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
