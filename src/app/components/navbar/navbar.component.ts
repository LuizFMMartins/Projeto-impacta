import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  usuarioNome: string | null = 'Usuário';

  constructor(private router: Router) { }

  ngOnInit() {
    this.usuarioNome = localStorage.getItem('usuarioNome') || 'Usuário';
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioNome');
    this.router.navigate(['/login']);
  }
}
