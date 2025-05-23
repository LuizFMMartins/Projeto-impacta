import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  cpf: string = '';
  senha: string = '';
  mensagemErro: string = '';
  mostrarLogin = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // depois de 3 segundos, mostra o login
    setTimeout(() => {
      this.mostrarLogin = true;
    }, 1000);
  }

  login() {
    this.authService.login(this.cpf, this.senha).subscribe(
      response => {
        // Salvar o token no localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('userRole', response.role); // Armazena a role do usuário
        localStorage.setItem('userCpf', response.cpf); // Armazena a role do usuário
        console.log("tste--------", response)
        if (response.role === 'admin') {
          this.router.navigate(['/admin_home']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error => {
        this.mensagemErro = error.error.message;
      }
    );
  }
}
