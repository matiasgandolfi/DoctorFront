import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/interfaces/api-response';
import { environment } from 'src/environment/environment';
import { Paciente } from '../interfaces/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  baseUrl: string = environment.apiUrl + 'paciente/';

  constructor(private http: HttpClient) { }

  lista(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl);
  }

  crear(request: Paciente): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl, request);
  }

  editar(request: Paciente): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.baseUrl}${request.id}`, request);
  }

  eliminar(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.baseUrl}${id}`);
  }
}
