import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListadoEspecialidadComponent } from '../especialidad/pages/listado-especialidad/listado-especialidad.component';
import {} from '../especialidad/especialidad.module';
import {} from '../medico/medico.module'
import { ListadoMedicoComponent } from '../medico/pages/listado-medico/listado-medico.component';
import { AuthGuard } from '../_guards/auth.guard';
import { ListadoPacienteComponent } from '../paciente/pages/listado-paciente/listado-paciente.component';


const routes: Routes = [
  {
    path:'', component: LayoutComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      // {path: 'dashboard', component: DashboardComponent, pathMatch: 'full', canActivate: [AuthGuard]},
      {path: 'dashboard', component: DashboardComponent, pathMatch: 'full', canActivate: [AuthGuard]},
      {path: 'especialidades', component: ListadoEspecialidadComponent, pathMatch: 'full'},
      {path: 'medicos', component: ListadoMedicoComponent, pathMatch: 'full'},
      {path: 'pacientes', component: ListadoPacienteComponent, pathMatch: 'full'},
      {path: '**', redirectTo: '', pathMatch: 'full'}
    ]
  }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LayoutRoutingModule { }
