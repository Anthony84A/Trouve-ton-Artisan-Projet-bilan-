import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtisanService } from '../../services/artisan.service';
import { ArtisanModel } from '../../services/artisan.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-fiche-artisan',
  templateUrl: './fiche-artisan.component.html',
  styleUrls: ['./fiche-artisan.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule]
})
export class FicheArtisanComponent implements OnInit {
  artisan: ArtisanModel | undefined;
  artisanId: string | null = '';
  contactForm: FormGroup; // Formulaire de contact
  isEmailSent: boolean = false; // Indicateur de succès d'envoi

  constructor(
    private route: ActivatedRoute,
    private artisanService: ArtisanService,
    private fb: FormBuilder, // Pour construire le formulaire
    private http: HttpClient // Pour envoyer les données au backend
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.artisanId = this.route.snapshot.paramMap.get('id');

    if (this.artisanId) {
      this.artisan = this.artisanService.getArtisanById(this.artisanId);
    }
  }

  // Fonction pour envoyer le formulaire
  sendEmail(): void {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      this.http.post('http://localhost:3000/api/send-email', formData).subscribe({
        next: () => {
          this.isEmailSent = true; // Indique que l'email a été envoyé avec succès
        },
        error: (err) => {
          console.error('Erreur lors de l\'envoi de l\'email :', err);
        }
      });
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
