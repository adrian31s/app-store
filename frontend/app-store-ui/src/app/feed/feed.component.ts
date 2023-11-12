import { Component } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  standalone: true,
})
export class FeedComponent {
  images = ['../assets/images/person-workspace.svg'];

  username = 'username';
  rating = 1;
  text = 'Supersprzęcik.pl';

  ratingColor() {
    if (this.rating === 1) {
      return 'green';
    } else {
      return 'red';
    }
  }

  ratingText() {
    if (this.rating === 1) {
      return 'POZYTYWNA';
    } else {
      return 'NEGATYWNA';
    }
  }
}
