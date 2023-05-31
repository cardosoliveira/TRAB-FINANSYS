import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RegisterService } from '../shared/register.service';
import { User } from '../shared/user.model'; 

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  @ViewChild('fullName') fullName: ElementRef = null;
  @ViewChild('email') email: ElementRef = null;
  @ViewChild('userName') userName: ElementRef = null;
  @ViewChild('password') password: ElementRef = null;

  constructor(private router: Router, private registerService: RegisterService) {
  }

  criarUsuario() {
    const fullname = this.fullName.nativeElement.value;
    const email = this.email.nativeElement.value;
    const username = this.userName.nativeElement.value;
    const password = this.password.nativeElement.value;
  
    if (!fullname || !email || !username || !password) {
      alert("Por favor, preencha todos os campos");
    } else {
      const newUser: User = {
        fullName: fullname,
        email: email,
        userName: username,
        password: password
      };
  
      this.registerService.criarUsuario(newUser).subscribe(
        userId => {
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

  ngOnInit() {
  }

}
