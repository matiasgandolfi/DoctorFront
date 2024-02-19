import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from './servicios/usuario.service';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    UsuarioService
  ]
})
export class UsuarioModule { }
