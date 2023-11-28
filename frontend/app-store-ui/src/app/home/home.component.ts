import { Component } from '@angular/core';

interface Category {
  value: string;
  label: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  choose = 'Do grania';
  images = ['../assets/images/svg/search.svg', '../assets/images/svg/pc.svg', '../assets/images/svg/laptop.svg', '../assets/images/svg/mouse.svg', '../assets/images/svg/pc-display.svg', ''];

  /*do wyświetlania z menu wyboru*/
  selectedCategory: Category | null = null;

  onCategorySelected(category: Category): void {
    this.selectedCategory = category;
  }
}
