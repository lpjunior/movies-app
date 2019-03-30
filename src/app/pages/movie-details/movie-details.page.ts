import { Component, OnInit } from '@angular/core';
import { MoviedbService } from 'src/app/services/moviedb.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {

  private movie = {};

  private rate = {
    "movie_id": "",
    "rating": ""
  };

  constructor(
    private mDBService: MoviedbService, 
    private loadingController: LoadingController,
    private route: ActivatedRoute,
    private router: Router,
    private rateService: RatingService) {}
    
  ngOnInit() {
    this.consultaFilme();
    this.addRate();
    this.getRate();
  }

  async addRate() {

    this.rate.movie_id = this.route.snapshot.paramMap.get('id');
    this.rate.rating = (Math.random() * 6).toFixed();
    // resgatar o ID retornado do método para redirecionar para página do filme 'details/:id'
    await this.rateService.addRating(this.rate).subscribe(
      result=>{
        //let id = result['id'];
        //this.router.navigate(['/details/' + id]);
      },
      error=>{
        console.log(error);
      }
    )
  }
  async getRate() {
    // resgatar o ID passado 'details/:id'
    await this.rateService.getRate().subscribe(
      data=>{
        console.log(data);
      },
      error=>{
        console.log(error);
      }
    )
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
        loading.dismiss();
      },
      error=>{
        console.log(error);
        loading.dismiss();
      }
    )
  }
}
