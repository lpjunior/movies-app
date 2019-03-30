import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

const URL_API = `http://localhost:3000/rating`;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8' })
};

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  
  constructor(private http: HttpClient) { }
  
  getRate(): any {
    return this.http.get<any>(URL_API, httpOptions).pipe(
      catchError(this.handleError<any>(`Falha no getRating`))
    );
  }

  addRating(rate): Observable<any> {

    return this.http.post(URL_API, rate, httpOptions)
      .pipe(
        catchError(this.handleError<any>(`Falha ao adicionar rating = ${rate.rating}`))
      );
  }

  // método privado para exibir o erro
  private handleError<T>(Operator = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log do erro na console

      // mantem o app rodando por ter retornado o obj vazio
      return of(result as T);
    };
  }
}