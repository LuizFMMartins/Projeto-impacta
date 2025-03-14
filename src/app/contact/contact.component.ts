import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  isAdmin: boolean = false;
  isPaciente: boolean = false;
  endereco: string = 'Estrada do dentista';
  telefone: string = '(11)4747-4747';
  whatsapp: string = '(11)9999-9999';
  email: string = 'dentsteste@hotmail.com';
  informacoes: string = 'Horário de atendmento segunda a sexta 8:00 ás 18:00. Sábado aberto até 14:00. Domingo e feriados fechado! Horário de almoço: seg a sexta, 12:00 às 14:00';

  constructor(
    private authService: AuthService,
    private contatoService: ContactService // Adiciona o serviço ContatoService
  ) { }

  ngOnInit(): void {
    const userRole = this.authService.getUserRole();
    this.isAdmin = userRole === 'admin';
    this.isPaciente = userRole === 'paciente';

    this.buscarContato(); // Chama o método para buscar os dados se for admin
    if (this.isAdmin) {
    }
  }

  salvarDados() {
    // Cria um objeto com os dados de contato
    const contato = {
      endereco: this.endereco,
      telefone: this.telefone,
      whatsapp: this.whatsapp,
      email: this.email,
      informacoes: this.informacoes
    };
    console.log('data------', contato)

    // Chama o serviço para salvar os dados
    this.contatoService.salvarContato(contato).subscribe(
      response => {
        console.log('Dados salvos:', response);
        alert('Alterações salvas com sucesso!');
      },
      error => {
        console.error('Erro ao salvar dados:', error);
        alert('Erro ao salvar dados.');
      }
    );
  }

  buscarContato() {
    this.contatoService.buscarContato().subscribe(
      (data) => {
        console.log('data------', data)
        if (data && data.length > 0) {
          const contato = data[0];
          this.endereco = contato.endereco;
          this.telefone = contato.telefone;
          this.whatsapp = contato.whatsapp;
          this.email = contato.email;
          this.informacoes = contato.informacoes;
        }
      },
      (error) => {
        console.error('Erro ao buscar dados:', error);
        alert('Erro ao carregar dados.');
      }
    );
  }

}
