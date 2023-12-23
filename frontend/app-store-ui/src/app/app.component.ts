import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from './auth/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class AppComponent implements OnInit {
  title = 'KUPSPRZECIK.PL';
  loginDialogVisible: boolean = false;
  registerDialogVisible: boolean = false;

  isUserLogged: boolean = false;
  visible: boolean = false;

  images = [
    './assets/images/person.svg',
    './assets/images/cart.svg',
    './assets/images/checked-user-512.png',
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isUserLogged = this.authService.getToken() !== '';
  }

  //admin dialog
  showDialog() {
    this.visible = true;
  }

  //user log in dialog
  openLoginDialog() {
    this.loginDialogVisible = true;
  }

  openRegisterDialog(visible:boolean) {
    this.registerDialogVisible = visible;
  }

  closeLoginAndOpenRegister(){
    this.registerDialogVisible = true;
    this.loginDialogVisible = false;
  }

  setIsUserLogged() {
    this.isUserLogged = true;
    this.loginDialogVisible = false;
  }

  logout() {
    this.authService.logout();
    this.isUserLogged = false;
  }
}
