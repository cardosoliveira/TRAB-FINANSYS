import { HttpClient } from '@angular/common/http';
import { Injector } from "@angular/core"
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseResourceModel } from "../models/base-resource.model"


export abstract class BaseResourceService<T extends BaseResourceModel> {

    protected http: HttpClient;
    
    constructor(protected apiPath: string, protected injector: Injector) {
        this.http = injector.get(HttpClient)
    }

    getAll(): Observable<T[]> {
      const userId = localStorage.getItem('userId'); // Obtém o userId do Local Storage
      const url = `${this.apiPath}?userId=${userId}`;
      return this.http.get(url).pipe(
        catchError(this.handleError),
        map(this.jsonDataToResources)
      );
    }
    
      getById(id: number): Observable<T> {
        const userId = localStorage.getItem('userId'); // Obtém o userId do Local Storage
        const url = `${this.apiPath}/${id}?userId=${userId}`;
        return this.http.get(url).pipe(
          catchError(this.handleError),
          map(this.jsonDataToResource)
        );
      }
    
      create(resource: T): Observable<T> {
        return this.http.post(this.apiPath, resource).pipe(
          catchError(this.handleError),
          map(this.jsonDataToResource)
        )
      }
    
      update(resource: T): Observable<T> {
        const userId = localStorage.getItem('userId'); // Obtém o userId do Local Storage
        const url = `${this.apiPath}/${resource.id}?userId=${userId}`;
        return this.http.put(url, resource).pipe(
          catchError(this.handleError),
          map(this.jsonDataToResource)
        );
      }
    
      delete(id: number): Observable<any> {
        const userId = localStorage.getItem('userId'); // Obtém o userId do Local Storage
        const url = `${this.apiPath}/${id}?userId=${userId}`;
        return this.http.delete(url).pipe(
          catchError(this.handleError),
          map(() => null)
        );
      }

        // PROTECTED METHODS
  protected jsonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = [];
    jsonData.forEach(element => resources.push(element as T));
    return resources
  }

  protected jsonDataToResource(jsonData: any): T {
    return jsonData as T
  }

  protected handleError(error: any): Observable<any> {
    console.log("ERRO NA REQUSIÇÃO =>", error);
    return throwError(error);
  }

}