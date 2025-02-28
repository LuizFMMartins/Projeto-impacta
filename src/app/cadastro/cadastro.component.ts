import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})


export class CadastroComponent {
  nome: string = '';
  email: string = '';
  senha: string = '';
  telefone: string = '';
  cpf: string = '';
  dataNascimento: Date | null = null;
  idade: number = 0;
  endereco: string = '';
  sexo: string = '';
  mensagemErro: string = '';
  isAdmin: boolean = false; // Adicionamos a opção para admin
  role: string = 'paciente';

  constructor(private authService: AuthService, private router: Router) { }

  calcularIdade(): number {
    if (this.dataNascimento) {
      const today = new Date();
      const birthDate = new Date(this.dataNascimento);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }
    return 0;
  }

  cadastrar() {


    this.authService
      .register(
        this.nome,
        this.email,
        this.senha,
        this.telefone,
        this.cpf,
        this.dataNascimento,
        this.endereco,
        this.sexo,
        this.role // Enviamos a role
      )
      .subscribe(
        (response) => {
          console.log('resposta---', response)
          alert('Cadastro realizado com sucesso!');
          this.router.navigate(['/login']);
        },
        (error) => {
          this.mensagemErro = error.error.message;
        }
      );
  }
}
