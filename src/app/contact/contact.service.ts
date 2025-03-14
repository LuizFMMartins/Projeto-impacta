import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:3000/contato';

  constructor(private http: HttpClient) { }

  salvarContato(contato: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/salvar`, contato);
  }

  buscarContato(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/buscar`);
  }
}
