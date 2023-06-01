import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

import { User } from '../../register/shared/user.model'; 

@Injectable({
  providedIn: 'root'
})
export class ProfileService{

private apiPath = 'http://localhost:8080/v1/user'

constructor(private http: HttpClient) {}

getUserById(userId: number): Observable<User> {
    const url = `${this.apiPath}/${userId}`; // Construa a URL correta para a requisição
  
    return this.http.get<User>(url).pipe(
      catchError(this.handleError)
    );
  }

updateUser(userId: number, updatedUser: User): Observable<any> {
const url = `${this.apiPath}/${userId}`; // Construa a URL correta para a requisição

return this.http.put(url, updatedUser).pipe(
    catchError(this.handleError)
);
}

  private handleError(error: any): Observable<any> {
    console.error('Erro na requisição:', error);
    return throwError(error);
  }

}
