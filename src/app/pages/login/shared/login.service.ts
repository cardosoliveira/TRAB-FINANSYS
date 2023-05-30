import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

import { Login } from './login.model'; 

@Injectable({
  providedIn: 'root'
})
export class LoginService{

private apiPath = 'http://localhost:8080/v1/logar'

constructor(private http: HttpClient) {}

   logar(user: Login): Observable<number> {
    return this.http.post<number>(this.apiPath, user).pipe(
      catchError(this.handleError),
      map((response: any) => {
        const userId = response.id;
        localStorage.setItem('userId', userId);
        return userId;
      })
    );
  }

  private handleError(error: any): Observable<any> {
    console.error('Erro na requisição:', error);
    return throwError(error);
  }

}
