import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-patient-record',
  templateUrl: './patient-record.component.html',
  styleUrls: ['./patient-record.component.scss']
})
export class PatientRecordComponent implements OnInit {
  isAdmin: boolean = false;
  isPaciente: boolean = false;
  cpfPesquisa: string = ''; // CPF para pesquisa (admin)
  paciente: any = {}; // Dados do paciente
  userCpf: string = ''; // CPF do paciente logado
  editando: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // Verificar se o usuário é admin ou paciente
    const userRole = this.authService.getUserRole();
    this.isAdmin = userRole === 'admin';
    this.isPaciente = userRole === 'paciente';

    // Pegar o CPF do paciente logado
    this.userCpf = this.authService.getUserCpf();

    if (this.isPaciente) {
      console.log("entrou------")
      this.buscarProntuario(); // Buscar dados do paciente logado
    }
  }
  carregarDados = false;
  buscarProntuario() {
    this.carregarDados = true
    if (this.isAdmin && this.cpfPesquisa) {
      console.log('Admin pesquisando por CPF:', this.cpfPesquisa);
      this.authService.getProntuarioPorCpf(this.cpfPesquisa).subscribe(
        (dados) => {
          console.log('Dados do Admin:', dados);
          this.paciente = dados;
          this.paciente.idade = this.calcularIdade(dados.datanascimento);
        },
        (erro) => {
          console.error('Erro ao buscar prontuário:', erro);
          alert('Paciente não encontrado!');
        }
      );
    } else if (this.isPaciente) {
      console.log('Paciente vendo seus próprios dados', this.userCpf);
      this.authService.getProntuarioPorCpf(this.userCpf).subscribe(
        (dados) => {
          console.log('Dados do Paciente:', dados);
          this.paciente = dados;
          this.paciente.idade = this.calcularIdade(dados.datanascimento);
        },
        (erro) => {
          console.error('Erro ao buscar prontuário:', erro);
          alert('Erro ao buscar dados do paciente!');
        }
      );
    }
  }
  calcularIdade(dataNascimento: string): number {
    const nascimento = new Date(dataNascimento);
    const hoje = new Date();

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();

    // Se ainda não fez aniversário este ano, diminui a idade em 1
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }

    return idade;
  }
  formatarCpf() {
    let cpf = this.cpfPesquisa.replace(/\D/g, ''); // Remove tudo que não for número
    if (cpf.length <= 3) {
      cpf = cpf.replace(/(\d{1,3})/, '$1');
    } else if (cpf.length <= 6) {
      cpf = cpf.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    } else if (cpf.length <= 9) {
      cpf = cpf.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else if (cpf.length <= 11) {
      cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    }
    this.cpfPesquisa = cpf;
  }
  permitirApenasNumeros(event: KeyboardEvent) {
    const charCode = event.charCode;
    // Verifica se o caractere é um número
    if (charCode < 48 || charCode > 57) {
      event.preventDefault(); // Impede a digitação de qualquer caractere que não seja número
    }
  }

  habilitarEdicao() {
    this.editando = true;
  }

  salvarEdicao() {
    this.authService.atualizarProntuario(this.paciente).subscribe(
      () => {
        alert('Dados atualizados com sucesso!');
        this.editando = false;
      },
      (erro) => {
        alert('Erro ao atualizar dados.');
      }
    );
  }
  formatarData(data: string): string {
    const dataFormatada = new Date(data);
    return dataFormatada.toLocaleDateString();
  }
}
