import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  usuarioNome: string | null = 'Usuário';
  isAdmin: boolean = false;
  isPaciente: boolean = false;
  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    const userRole = this.authService.getUserRole();
    this.isAdmin = userRole === 'admin';
    this.isPaciente = userRole === 'paciente';
    console.log('é paciente-----', this.isPaciente)
    console.log('é adm-----', this.isAdmin)
    this.usuarioNome = localStorage.getItem('usuarioNome') || 'Usuário';
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioNome');
    this.router.navigate(['/login']);
  }
}
