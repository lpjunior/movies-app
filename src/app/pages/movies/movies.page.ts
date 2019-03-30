import { Component, OnInit } from '@angular/core';
import { MoviedbService } from 'src/app/services/moviedb.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss']
})
export class MoviesPage implements OnInit {

  movies = [];
  private arrayCategory = ["popular", "top_rated", "now_playing", "upcoming"];
  private movie_name:string;

  constructor(private mDBService: MoviedbService, private loadingController: LoadingController) { }

  // método é executado quando se entra na página
  ngOnInit() {
    this.consultaFilmes()
  }

  async consultaFilmes(index?) {    
    // verifica se o parametro index está setado, senão ele um valor random

    // usando test if
    //if(index === 'undefined') index = 4;

    // usando if ternario
    index = (typeof index === "undefined") ? 3 : Math.floor(Math.random() * 4);
    let param = (typeof this.movie_name === "undefined") ? `movie/${this.arrayCategory[index]}?` : `search/movie?query=${this.movie_name}&include_adult=false&`;
    console.log(this.movie_name);
    //https://api.themoviedb.org/3/movie/upcoming?api_key=${this.API_KEY}&language=pt-BR
    // loading..
    const loading = await this.loadingController.create({
      message: 'Carregando filmes...'
    });
    // exibir a caixa de dialogo
    await loading.present();

    await this.mDBService.getMovies(param).subscribe(
      data=>{
        this.movies = data.results;
        loading.dismiss();
      },
      error=>{
        console.log(error);
        loading.dismiss();
      }
    ).add();
  }

  doRefresh(event) {
    // número random
    //let index = Math.floor(Math.random() * 5);
    this.consultaFilmes('aleatorio');
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}
