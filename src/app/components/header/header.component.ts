import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArtisanService } from '../../services/artisan.service';
import { ArtisanModel } from '../../services/artisan.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class HeaderComponent {
  searchQuery: string = '';  // Valeur de la recherche
  artisans: ArtisanModel[] = [];  // Liste des artisans filtrés

  constructor(private artisanService: ArtisanService, private router: Router) {}

  onSearch(): void {
    if (this.searchQuery.trim()) {
      // Appelez le service pour rechercher les artisans
      this.artisanService.searchArtisans(this.searchQuery).subscribe(artisans => {
        this.artisans = artisans;
        
        if (this.artisans.length > 0) {
          // Si des artisans sont trouvés, redirigez vers la page des résultats de recherche
          this.router.navigate(['/search-results'], { queryParams: { query: this.searchQuery } });
        } else {
          alert('Aucun artisan trouvé pour votre recherche');
        }
      });
    }
  }
}
