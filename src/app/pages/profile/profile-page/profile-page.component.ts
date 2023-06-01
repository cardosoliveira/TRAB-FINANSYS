import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from '../../register/shared/user.model';
import toastr from "toastr";
import { ProfileService } from '../shared/profile.service'; // Importe o serviço adequado para fazer a chamada à API

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  @ViewChild('fullName') fullName: ElementRef = null;
  @ViewChild('email') email: ElementRef = null;
  @ViewChild('userName') userName: ElementRef = null;
  @ViewChild('password') password: ElementRef = null;

  user: User = new User();

  constructor(   
    private profileService: ProfileService,
  ) { }

  public loadProfile() {
    const userId = localStorage.getItem('userId'); // Obtenha o ID do usuário do LocalStorage

    this.profileService.getUserById(+userId).subscribe(
      (user) => {
        this.user = user;
        this.fullName.nativeElement.value = user.fullName;
        this.email.nativeElement.value = user.email;
        this.userName.nativeElement.value = user.userName;
        this.password.nativeElement.value = user.password
      },
      (error) => {
        alert("Ocorreu um erro ao carregar as informações do usuário");
      }
    );
  }

  public updateUser() {
    const userId = localStorage.getItem('userId'); // Obtenha o ID do usuário do LocalStorage

    const updatedUser: User = {
      fullName: this.fullName.nativeElement.value,
      email: this.email.nativeElement.value,
      userName: this.userName.nativeElement.value,
      password: this.password.nativeElement.value
    };

    this.profileService.updateUser(+userId, updatedUser).subscribe(
      () => {
        toastr.success("Solicitação processada com sucesso!");
        this.loadProfile()
      },
      (error) => {
        alert("Ocorreu um erro ao atualizar as informações do usuário");
      }
    );
  }

  ngOnInit() {
    this.loadProfile();
  }
}