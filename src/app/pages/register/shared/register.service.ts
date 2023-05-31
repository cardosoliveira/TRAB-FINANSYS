import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

import { User } from './user.model'; 

@Injectable({
  providedIn: 'root'
})
export class RegisterService{

private apiPath = 'http://localhost:8080/v1/cadastrar'

constructor(private http: HttpClient) {}


criarUsuario(newUser: any): Observable<number> {
  return this.http.post<number>(this.apiPath, newUser).pipe(
    catchError(this.handleError),
    map((response: any) => {
      const userId = response.id;
      return userId;
    })
  );
}

  private handleError(error: any): Observable<any> {
    console.error('Erro na requisição:', error);
    return throwError(error);
  }

}
