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
    "id": null,
    "movie_id": this.route.snapshot.paramMap.get('id'),
    "rating": null
  };

  constructor(
    private mDBService: MoviedbService, 
    private loadingController: LoadingController,
    private route: ActivatedRoute,
    private router: Router,
    private rateService: RatingService) {}
    
    ngOnInit() {
      this.getRate();
      this.consultaFilme();
    }
    
    async addRate() {
      // resgatar o ID retornado do método para redirecionar para página do filme 'details/:id'
      await this.rateService.addRating(this.rate).subscribe(
        result=>{
          this.consultaFilme();
        },
        error=>{
        console.log(error);
      }
    )
  }

  async updateRate() {
    // resgatar o ID retornado do método para redirecionar para página do filme 'details/:id'
    await this.rateService.updateRating(this.rate).subscribe(
      result=>{
        let id = result['movie_id'];
        this.router.navigate(['/details/' + id]);
      },
      error=>{
        console.log(error);
      }
    )
  }

  async getRate() {
    let param = `?movie_id=${this.route.snapshot.paramMap.get('id')}`;
    await this.rateService.getRate(param).subscribe(
      data => {
        if (data.length > 0) {
          this.rate = {
            "id": data[0].id,
            "movie_id": data[0].movie_id,
            "rating": data[0].rating
          };
        }
      },
      error => {
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

  private customActionSheetOptions: any = {
    header: 'Avaliação',
    subHeader: 'Defina uma avaliação para esse filme'
  };
}
