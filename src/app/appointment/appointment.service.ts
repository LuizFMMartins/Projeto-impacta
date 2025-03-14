import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
