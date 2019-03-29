import { Component, OnInit } from '@angular/core';
import { MoviedbService } from 'src/app/services/moviedb.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {

  private movie = {};

  constructor(
    private mDBService: MoviedbService, 
    private loadingController: LoadingController,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.consultaFilme();
  }

  async consultaFilme() {
    // loading..
    const loading = await this.loadingController.create({
      message: 'Carregando filme...'
    });
    // exibir a caixa de dialogo
    await loading.present();

    // resgatar o ID passado 'details/:id'
    await this.mDBService.getMovies(`movie/${this.route.snapshot.paramMap.get('id')}?`).subscribe(
      data=>{
        this.movie = data;
        console.log(this.movie);
        loading.dismiss();
      },
      error=>{
        console.log(error);
        loading.dismiss();
      }
    ).add();
  }
}
