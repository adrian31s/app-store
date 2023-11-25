import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'KUPSPRZECIK.PL';
  images = ['./assets/images/person.svg', './assets/images/cart.svg'];
  visible: boolean = false;
  loginDialogVisible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  openLoginDialog() {
    this.loginDialogVisible = true;
  }
}
