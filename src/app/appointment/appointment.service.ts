import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:3000/agendamentos';

  constructor(private http: HttpClient) { }

  agendarConsulta(agendamento: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/novo`, agendamento);
  }

  getAgendamentos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/listar`);
  }
  listarConsultas(cpf: string, role: string): Observable<any[]> {
    const params = new HttpParams()
      .set('cpf', cpf)
      .set('role', role);

    return this.http.get<any[]>(`${this.apiUrl}/consultas`, { params });
  }

  excluirConsulta(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
