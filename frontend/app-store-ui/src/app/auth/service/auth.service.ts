import { Injectable } from '@angular/core';
import { AuthRequest } from 'client/src/app/api/models';
import { LoginService } from 'client/src/app/api/services';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string = '';

  constructor(private loginService: LoginService,
    private messageService:MessageService
    ) {}

  loginUser(request: AuthRequest) : boolean {
    this.loginService.login({ body: request }).subscribe(
      (value) => {
        if (value.token !== undefined) {
          this.token = value.token;
          this.displayToastMessage('success', 'Sukces', "Zalogowany");
        }
      },
      (error) => {
        console.log('unauthorized');
        console.error(error);
        this.token = '';
        this.displayToastMessage('error', 'Blad', "Bledne dane");
        return false;
      }
    );
    return true;
  }

  sendNotificationToEmail(){ //need to be implemented later
    this.displayToastMessage('success', 'Sukces', "Wyslano wiadomosc email");
  }

  getToken(): string {
    return this.token;
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
