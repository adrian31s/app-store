import { Component, ViewChild, OnInit, Input } from '@angular/core';
import {
  NgbCarousel,
  NgbCarouselModule,
  NgbSlideEvent,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ObjectReceiverService } from '../s3/object-receiver.service';

@Component({
  selector: 'app-product-photo',
  templateUrl: './product-photo.component.html',
  styleUrls: ['./product-photo.component.css'],
  standalone: true,
  imports: [NgbCarouselModule, NgFor, FormsModule],
})
export class ProductPhotoComponent implements OnInit {
  @ViewChild('carousel', { static: true }) carousel: NgbCarousel | undefined;

  @Input()
  imagesUrls?: string;
  @Input()
  thumbnailUrl?: string;

  images: any[] = [];
  paused = false;

  constructor(private objectReceiver: ObjectReceiverService) {}

  ngOnInit() {
    this.getImagesSrcs();

    if (this.carousel) {
      // Inicjalizacja i dostęp do carousel po załadowaniu widoku
    }
  }

  async getImagesSrcs() {
    if (this.thumbnailUrl !== undefined) {
      this.images.push(
        await this.objectReceiver.getS3ImageSrcByImageName(this.thumbnailUrl)
      );
    }

    if (this.imagesUrls !== undefined) {
      this.imagesUrls.split(',').forEach(async (img) => {
        if (img !== 'not-found')
          this.images.push(
            await this.objectReceiver.getS3ImageSrcByImageName(img)
          );
      });
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
