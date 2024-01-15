import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string = '';
  username: string = '';

  constructor(private messageService: MessageService) {
    let localToken = localStorage.getItem('token');
    let localUsername = localStorage.getItem('username');
    if (localToken === null || localUsername ===null){
      this.token = '';
      this.username = '';
    } 
    else {
      this.token = localToken;
      this.username = localUsername;
    }  }

  setToken(token: string, username:string) {
    this.token = token;
    localStorage.setItem('token', token);
    this.setUsername(username)
  }

  setUsername(username: string){
    this.username = username;
    localStorage.setItem('username', username);
  }

  getUsername(): string {
    return this.username;
  }

  getToken(): string {
    return this.token;
  }

  logout(){
    this.token='';
    this.username='';
    localStorage.setItem("token",'')
    localStorage.setItem("username",'')
    window.location.reload();
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
