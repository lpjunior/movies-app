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
  private param:string;
  constructor(private mDBService: MoviedbService, private loadingController: LoadingController) { }
  private movie_name:string;

  // método é executado quando se entra na página
  ngOnInit() {
    this.consultaFilmes()
  }

  async consultaFilmes() {
    // loading..
    const loading = await this.loadingController.create({
      message: 'Carregando filmes...'
    });
    // exibir a caixa de dialogo
    await loading.present();

    this.param = (this.movie_name !== undefined) ? `search/movie?query=${this.movie_name}&include_adult=true&` : "movie/popular?";
    await this.mDBService.getMovies(this.param).subscribe(
      data=>{
        this.movies = data;
        loading.dismiss();
      },
      error=>{
        console.log(error);
        loading.dismiss();
      }
    ).add();
  }

  doRefresh(event) {
    this.consultaFilmes();

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}
