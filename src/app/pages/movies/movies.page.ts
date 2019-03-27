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
  private param:string = "popular";
  constructor(private mDBService: MoviedbService, private loadingController: LoadingController) { }

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

}
