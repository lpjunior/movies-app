import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class MoviedbService {

  private URL_API:string = "https://api.themoviedb.org/3";
  private API_KEY:string = "9a0dfe183358189bf99b0d7b55564507";
  
  constructor(private http: Http) { }

  // retornar a lista de top rating movies
  getTopRatedMovies() {
    // retorna o resultado baseado na URL de requisição
    return this.http.get(`${this.URL_API}/movie/top_rated?api_key=${this.API_KEY}`)
  }
}