import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'https://localhost:44315/';

@Injectable({
  providedIn: 'root'
})

export class RestService {
  constructor(private http: HttpClient) { }

  private Data(res: Response) {
    let body = res;
    return body || {};
  }

  private Error<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(error + " - " + error.message);
      return of(result as T);
    };
  }

  getAutores(): Observable<any> {
    return this.http.get(endpoint + 'autores').pipe(
      map(this.Data));
  };

  addAutores(autores): Observable<any> {
    return this.http.post(endpoint + 'autores', autores, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: "text"
    }).pipe(
      tap(_ => console.log("Autores inseridos")),
      catchError(this.Error<any>())
    )
  };

}
