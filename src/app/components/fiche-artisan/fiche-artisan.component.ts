import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtisanService } from '../../services/artisan.service';
import { ArtisanModel } from '../../services/artisan.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-fiche-artisan',
  templateUrl: './fiche-artisan.component.html',
  styleUrls: ['./fiche-artisan.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class FicheArtisanComponent implements OnInit {
  artisan: ArtisanModel | undefined;
  artisanId: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private artisanService: ArtisanService
  ) {}

  ngOnInit(): void {
    this.artisanId = this.route.snapshot.paramMap.get('id');

    if (this.artisanId) {
      this.artisan = this.artisanService.getArtisanById(this.artisanId);
    }
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
