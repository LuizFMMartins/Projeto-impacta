import { Component } from '@angular/core';
import { AppointmentService } from '../appointment/appointment.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss']
})
export class ConsultasComponent {
  consultas: any[] = [];
  isAdmin: boolean = false;
  isPaciente: boolean = false;
  cpfPesquisa: string = '';
  userCpf: string = '';
  constructor(private agendamentoService: AppointmentService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Verificar se o usuário é admin ou paciente
    const userRole = this.authService.getUserRole();
    this.isAdmin = userRole === 'admin';
    this.isPaciente = userRole === 'paciente';

    // Pegar o CPF do paciente logado
    this.userCpf = this.authService.getUserCpf();
    const role = userRole;
    const cpf = this.userCpf || '';

    this.agendamentoService.listarConsultas(cpf, role).subscribe({
      next: data => this.consultas = data,
      error: err => console.error(err)
    });
  }
  excluirConsulta(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta consulta?')) {
      this.agendamentoService.excluirConsulta(id).subscribe({
        next: () => {
          // Remove da lista local para atualizar a tela
          this.consultas = this.consultas.filter(c => c.id !== id);
        },
        error: err => {
          console.error('Erro ao excluir consulta:', err);
          alert('Erro ao excluir a consulta.');
        }
      });
    }
  }

}
