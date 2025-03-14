import { AppointmentService } from './appointment.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  isAdmin: boolean = false;
  isPaciente: boolean = false;
  userCpf: string = '';
  agendamentos: any[] = [];

  selectedDay: number | null = null; // Armazena o dia selecionado do calendário

  novoAgendamento = {
    data: '',
    horario: '',
    motivo: '',
  };

  currentMonth: number = new Date().getMonth();
  currentYear: number = new Date().getFullYear();
  monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  calendarDays: any[] = [];

  constructor(private authService: AuthService, private appointmentService: AppointmentService) { }

  ngOnInit() {
    const userRole = this.authService.getUserRole();
    this.isAdmin = userRole === 'admin';
    this.isPaciente = userRole === 'paciente';
    this.userCpf = this.authService.getUserCpf();

    if (this.isAdmin) {
      this.carregarAgendamentos();
    }

    this.generateCalendar();
  }

  generateCalendar() {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

    this.calendarDays = [];

    for (let i = 0; i < firstDay; i++) {
      this.calendarDays.push({ date: '', disabled: true });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Altera hoje para o começo do dia (00:00)
      const isPast = new Date(this.currentYear, this.currentMonth, i) < today;

      this.calendarDays.push({ date: i, disabled: isPast });
    }
  }

  prevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
  }

  selectDay(day: any) {
    if (!day.disabled) {
      this.selectedDay = day.date;
      this.novoAgendamento.data = `${this.currentYear}-${(this.currentMonth + 1).toString().padStart(2, '0')}-${this.selectedDay != null ? this.selectedDay.toString().padStart(2, '0') : ''}`;
    }
  }


  agendarConsulta() {
    if (!this.novoAgendamento.horario || !this.novoAgendamento.motivo || !this.novoAgendamento.data) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    const agendamento = {
      ...this.novoAgendamento,
      pacienteCpf: this.userCpf,
    };

    this.appointmentService.agendarConsulta(agendamento).subscribe(
      () => {
        alert('Consulta agendada com sucesso!');
        this.novoAgendamento = { data: '', horario: '', motivo: '' };
        this.selectedDay = null; // Resetando a seleção do calendário
      },
      () => alert('Erro ao agendar consulta.')
    );
  }

  carregarAgendamentos() {
    this.appointmentService.getAgendamentos().subscribe(
      (dados) => (this.agendamentos = dados),
      () => alert('Erro ao carregar agendamentos.')
    );
  }
}
