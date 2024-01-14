import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/service/auth.service';

interface Category {
  value: string;
  label: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isAdmin: boolean = false;
  choose = '';
  images = [
    '../assets/images/svg/search.svg',
    '../assets/images/svg/pc.svg',
    '../assets/images/svg/laptop.svg',
    '../assets/images/svg/mouse.svg',
    '../assets/images/svg/pc-display.svg',
    '../assets/images/svg/message-square-chat-svgrepo-com.svg',
  ];
  visible: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    console.log(this.authService.getUsername())
    this.isAdmin = this.authService.getUsername() === 'admin';
  }

  /*do wyświetlania z menu wyboru*/
  selectedCategory: Category | null = null;

  onCategorySelected(category: Category): void {
    this.selectedCategory = category;
  }

  redirectToProducts() {
    this.router.navigate(['/products']);
  }

  showDialog() {
    this.visible = true;
  }
}
