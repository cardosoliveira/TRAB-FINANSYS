import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LoginService } from '../shared/login.service'; 
import { Login } from '../shared/login.model'; 

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  hideHeader: boolean;
  @ViewChild('username') username: ElementRef = null;
  @ViewChild('password') password: ElementRef = null;

  constructor(private router: Router, private loginService: LoginService) {
  }

  logar() {
    const username = this.username.nativeElement.value;
    const password = this.password.nativeElement.value;
  
    if (!username || !password) {
      alert("Você precisa colocar seu email e senha para acessar o sistema");  
    } else {
      const user: Login = {
        userName: username,
        password: password
      };
  
      this.loginService.logar(user).subscribe(
        userId => {
          console.log('ID do usuário:', userId);
          localStorage.setItem('userId', userId.toString());
          this.router.navigate(['/reports']);
         
        },
        error => {
          console.error('Erro ao criar usuário:', error);
          // Lidar com o erro aqui
        }
      );
    }
  }
}