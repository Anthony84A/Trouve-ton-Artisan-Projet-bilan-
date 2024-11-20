import { Component, OnInit } from '@angular/core';
import { ArtisanService } from '../../services/artisan.service'; 
import { ArtisanModel } from '../../services/artisan.model';  
import { CommonModule } from '@angular/common';  
import { RouterModule } from '@angular/router';  

@Component({
  selector: 'app-batiment',
  templateUrl: './batiment.component.html',
  styleUrls: ['./batiment.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class BatimentComponent implements OnInit {
  artisansBatiment: ArtisanModel[] = [];

  constructor(private artisanService: ArtisanService) {}

  ngOnInit(): void {
    this.artisanService.getArtisansByCategory('Bâtiment').subscribe({
      next: (data) => {
        this.artisansBatiment = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des artisans :', err);
      },
    });
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
