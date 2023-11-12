import { Component, ViewChild, OnInit } from '@angular/core';
import { NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-photo',
  templateUrl: './product-photo.component.html',
  styleUrls: ['./product-photo.component.css'],
  standalone: true,
  imports: [NgbCarouselModule, NgFor, FormsModule],
})

export class ProductPhotoComponent implements OnInit {
  images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);

  paused = false;

  @ViewChild('carousel', { static: true }) carousel: NgbCarousel | undefined;

  ngOnInit() {
    if (this.carousel) {
      // Inicjalizacja i dostęp do carousel po załadowaniu widoku
    }
  }

  togglePaused() {
    if (this.carousel) {
      if (this.paused) {
        this.carousel.cycle();
      } else {
        this.carousel.pause();
      }
      this.paused = !this.paused;
    }
  }
}
