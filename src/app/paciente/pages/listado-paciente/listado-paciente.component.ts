import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Paciente } from '../../interfaces/paciente';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PacienteService } from '../../servicios/paciente.service';
import { CompartidoService } from 'src/app/compartido/compartido.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalPacienteComponent } from '../../modales/modal-paciente/modal-paciente.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-paciente',
  templateUrl: './listado-paciente.component.html',
  styleUrls: ['./listado-paciente.component.css']
})
export class ListadoPacienteComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'apellido',
    'nombre',
    'telefono',
    'genero',
    'email',
    'estado',
    'acciones'
  ];

  dataInicial: Paciente[] = [];
  dataSource = new MatTableDataSource(this.dataInicial);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _pacienteServicio: PacienteService,
    private _compartidoServicio: CompartidoService,
    private dialog: MatDialog
  ) {}

  obtenerPacientes() {
    this._pacienteServicio.lista().subscribe({
      next: (data) => {
        if (data.isExitoso) {
          this.dataSource = new MatTableDataSource(data.resultado);
          this.dataSource.paginator = this.paginator;
        } else {
          this._compartidoServicio.mostrarAlerta('No se encontraron datos', 'Advertencia!');
        }
      }
    });
  }

  nuevoPaciente() {
    this.dialog
      .open(ModalPacienteComponent, { disableClose: true, width: '600px' })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'true') this.obtenerPacientes();
      });
  }

  editarPaciente(paciente: Paciente) {
    this.dialog
      .open(ModalPacienteComponent, { disableClose: true, width: '600px', data: paciente })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'true') this.obtenerPacientes();
      });
  }

  removerPaciente(paciente: Paciente) {
    Swal.fire({
      title: '¿Desea eliminar al paciente?',
      text: `${paciente.apellido} ${paciente.nombre}`,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No'
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this._pacienteServicio.eliminar(paciente.id).subscribe({
          next: (data) => {
            if (data.isExitoso) {
              this._compartidoServicio.mostrarAlerta('El paciente fue eliminado', 'Completo');
              this.obtenerPacientes();
            } else {
              this._compartidoServicio.mostrarAlerta('No se pudo eliminar el paciente', 'Error!');
            }
          }
        });
      }
    });
  }

  aplicarFiltroListado(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit(): void {
    this.obtenerPacientes();
  }
}
