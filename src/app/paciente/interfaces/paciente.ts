export interface Paciente {
  id: number;
  nombre: string;
  apellido: string;
  fechaDeNacimiento: Date; // o Date si prefieres trabajar con objetos de fecha
  genero: string;
  direccion: string;
  telefono: string;
  email: string;
  historialMedico: string;
  estado: boolean;
  fechaCreacion: Date; // o Date
  fechaActualizacion: Date; // o Date
}
