import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ArtisanService } from '../../services/artisan.service';
import { ArtisanModel } from '../../services/artisan.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  standalone : true,
  imports : [CommonModule]
})
export class SearchResultsComponent implements OnInit {
  searchQuery: string = '';  
  artisans: ArtisanModel[] = [];  

  constructor(private route: ActivatedRoute, private artisanService: ArtisanService) {}

  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'] || '';  

      
      this.artisanService.searchArtisans(this.searchQuery).subscribe(artisans => {
        this.artisans = artisans;
      });
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
