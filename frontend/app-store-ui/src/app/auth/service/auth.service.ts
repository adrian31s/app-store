import { Injectable, OnInit } from '@angular/core';
import { AuthRequest } from 'client/src/app/api/models';
import { LoginService } from 'client/src/app/api/services';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string = '';

  constructor(private messageService: MessageService) {
    let localToken = localStorage.getItem('token');
    if (localToken === null) this.token = '';
    else this.token = localToken;  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  sendNotificationToEmail() {
    //need to be implemented later
    this.displayToastMessage('success', 'Sukces', 'Wyslano wiadomosc email');
  }

  getToken(): string {
    return this.token;
  }

  logout(){
    this.token='';
    localStorage.setItem("token",'')
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
