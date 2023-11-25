import { Component } from '@angular/core';
import { AuthRequest } from 'client/src/app/api/models';
import { LoginService } from 'client/src/app/api/services';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginEmail: string = '';
  password: string = '';

  forgotedPasswordEmail?: string;
  forgotedPasswordDialog: boolean = false;


  constructor(
    private authService: AuthService,
    private loginService: LoginService
  ) {}

  login() {
    const credentials: AuthRequest = {
      password: this.password,
      username: this.loginEmail,
    };

    this.authService.loginUser(credentials);
  }

  send() { //just for tests
    this.loginService.testUserResource({ body: {} }).subscribe((v) => {
      console.log(v);
    });
  }

  openTypeEmailDialog() {
    this.forgotedPasswordDialog = true;
  }

  sendNotificationToEmail() {
    this.authService.sendNotificationToEmail();
    this.forgotedPasswordDialog=false;
    this.forgotedPasswordEmail=undefined;
  }
}
