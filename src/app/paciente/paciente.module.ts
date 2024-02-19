// paciente.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoPacienteComponent } from './pages/listado-paciente/listado-paciente.component';
import { ModalPacienteComponent } from './modales/modal-paciente/modal-paciente.component';
import { PacienteService } from './servicios/paciente.service';
import { CompartidoModule } from '../compartido/compartido.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    ListadoPacienteComponent,
    ModalPacienteComponent
  ],
  imports: [
    CommonModule,
    CompartidoModule,
    MaterialModule
    ],
  providers: [PacienteService]
})
export class PacienteModule { }
