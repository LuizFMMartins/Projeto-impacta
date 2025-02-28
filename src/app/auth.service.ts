import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Método para login
  login(cpf: string, senha: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { cpf, senha }).pipe(tap(response => {
      localStorage.setItem('token', response.token);
      localStorage.setItem('usuarioNome', response.nome);
      localStorage.setItem('usuarioCPF', response.CPF);
    })
    );
  }

  // Método para cadastro

  register(nome: string, email: string, senha: string, telefone: string, cpf: string, dataNascimento: Date | null, endereco: string, sexo: string, role: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { nome, email, senha, telefone, cpf, dataNascimento, endereco, sexo, role });
  }

  // Método para pegar o prontuário pelo CPF
  getProntuarioPorCpf(cpf: string): Observable<any> {
    const apiUrl = `http://localhost:3000/api/prontuario/${cpf}`;
    return this.http.get<any>(apiUrl);
  }
  // Método para pegar o tipo de usuário (admin ou paciente)
  getUserRole(): string {
    return localStorage.getItem('userRole') || ''; // Role do usuário armazenada no localStorage
  }

  // Método para pegar o CPF do paciente logado
  getUserCpf(): string {
    return localStorage.getItem('userCpf') || ''; // CPF do paciente armazenado no localStorage
  };
  atualizarProntuario(paciente: any) {
    return this.http.put('http://localhost:3000/atualizarProntuario', paciente);
  }

}
