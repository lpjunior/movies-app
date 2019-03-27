import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class MoviedbService {

  private URL_API:string = "https://api.themoviedb.org/3";
  private API_KEY:string = "9a0dfe183358189bf99b0d7b55564507";
  
  constructor(private http: HttpClient) { }

  // função (método) terá um retorno do tipo Observable
  getMovies(param:string):Observable<any> {
    const url = `${this.URL_API}/movie/${param}?api_key=${this.API_KEY}&language=pt-BR`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`O parametro requisitado foi: ${param} pela URL: ${url}`)),
      catchError(this.handleError<any>(`Falha no getMovies parametro = ${param}`))
    );
  }

  // método privado para exibir o erro
  private handleError<T>(Operator = 'operation', result?: T) {
    return (error: any):Observable<T> => {
      console.error(error); // log do erro na console

      // mantem o app rodando por ter retornado o obj vazio
      return of(result as T);
    };
  }
}