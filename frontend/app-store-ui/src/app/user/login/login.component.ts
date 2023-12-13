import { Component } from '@angular/core';
import { AuthRequest } from 'client/src/app/api/models';
import { LoginService } from 'client/src/app/api/services';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Output, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @Output() isLogged = new EventEmitter<boolean>();
  @Output() closeLoginDialog = new EventEmitter<void>();
  loginEmail: string = '';
  password: string = '';

  forgotedPasswordEmail?: string;
  forgotedPasswordDialog: boolean = false;

  constructor(
    private authService: AuthService,
    private loginService: LoginService,
    private messageService: MessageService
  ) {}

  login() {
    const credentials: AuthRequest = {
      password: this.password,
      username: this.loginEmail,
    };

    this.loginUser(credentials);
  }

  loginUser(request: AuthRequest) {
    this.loginService.login({ body: request }).subscribe(
      (value) => {
        if (value.token !== undefined) {
          this.authService.setToken(value.token);
          this.authService.setUsername(this.loginEmail)
          this.displayToastMessage('success', 'Sukces', 'Zalogowany');
          this.isLogged.emit(true);
          window.location.reload();
        }
        return false;
      },
      (error) => {
        console.error(error);
        this.displayToastMessage('error', 'Blad', 'Bledne dane');
      }
    );
  }

  send() {
    //just for tests
    this.loginService.testUserResource({ body: {} }).subscribe((v) => {
      console.log(v);
    });
  }

  openTypeEmailDialog() {
    this.forgotedPasswordDialog = true;
  }

  sendNotificationToEmail() {
    this.authService.sendNotificationToEmail();
    this.forgotedPasswordDialog = false;
    this.forgotedPasswordEmail = undefined;
  }

  private displayToastMessage(
    severity: string,
    summary: string,
    detail: string
  ) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
