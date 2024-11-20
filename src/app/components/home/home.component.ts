import { Component, OnInit } from '@angular/core';
import { ArtisanService } from '../../services/artisan.service';  
import { ArtisanModel } from '../../services/artisan.model';  
import { CommonModule } from '@angular/common';  
import { RouterModule } from '@angular/router';  

@Component({
  selector: 'app-home',
  standalone: true,  
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'], 
  imports: [CommonModule, RouterModule,]  
})
export class HomeComponent implements OnInit {
  artisansTop: ArtisanModel[] = [];  
  artisans: ArtisanModel[] = [];  

  constructor(private artisanService: ArtisanService) {}

  ngOnInit(): void {

    // Appel à la méthode getArtisans du service pour obtenir tous les artisans
    this.artisans = this.artisanService.getArtisans();
    
    // Filtrer les artisans du mois (top: true) et les stocker dans artisansTop
    this.artisansTop = this.artisans.filter(artisan => artisan.top);
  }

  getStars(note: number): string[] {
    const fullStars = Math.floor(note); 
    const fraction = note - fullStars; 
    const stars = [];
  
   
    for (let i = 0; i < fullStars; i++) {
      stars.push('bi-star-fill'); 
    }
  
    
    if (fraction >= 0.1) {
      stars.push('bi-star-half'); 
    }
  
    
    while (stars.length < 5) {
      stars.push('bi-star'); 
    }
  
    return stars;
  }
  
}
