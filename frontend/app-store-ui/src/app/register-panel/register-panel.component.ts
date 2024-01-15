import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import {
  ApplicationApiService,
  LoginService,
  PersonApiService,
} from 'client/src/app/api/services';
import { AuthRequest, Person } from 'client/src/app/api/models';
import { MessageService } from 'primeng/api';
import { error } from 'console';
import { AuthService } from '../auth/service/auth.service';

@Component({
  selector: 'app-register-panel',
  templateUrl: './register-panel.component.html',
  styleUrls: ['./register-panel.component.css'],
})
export class RegisterPanelComponent {
  @ViewChild('content') contentTemplate!: TemplateRef<any>;

  @Output() closeDialog = new EventEmitter<void>();

  @Input()
  openDialog?: boolean;

  modalRef!:NgbModalRef

  images = [
    '../../assets/images/svg/chat-square.svg',
    '../../assets/images/svg/search-page-svgrepo-com.svg',
    '../../assets/images/svg/hand-money-svgrepo-com.svg',
    '../../assets/images/svg/fast-delivery-svgrepo-com.svg',
    '../../assets/images/svg/rate-svgrepo-com.svg',
  ];

  username: string = '';
  password: string = '';
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  acceptTerms: boolean = false;

  constructor(
    private modalServiceArg: NgbModal,
    private applicationApi: ApplicationApiService,
    private messageService: MessageService,
    private authService: AuthService,
    private loginService: LoginService
  ) {}

  ngAfterViewInit() {
    if (this.openDialog)
      this.modalServiceArg.open(this.contentTemplate, {
        ariaLabelledBy: 'modal-basic-title',
      });
  }

  ngOnChanges(): void {
    if (this.openDialog) {
      this.modalRef = this.modalServiceArg.open(this.contentTemplate, {
        ariaLabelledBy: 'modal-basic-title',
      });

      this.modalRef.result.then(
        (result) => {
          this.openDialog=false;
          this.closeDialog.emit();
        },
        (reason) => {
          this.openDialog=false;
          this.closeDialog.emit();
        }
      );
    }
  }

  register() {
    if (this.acceptTerms !== true) {
      this.displayToastMessage('error', 'Blad', 'zaakceptuj regulamin sklepu');
      return;
    }

    let person: Person = {
      email: this.email,
      lastName: this.lastName,
      name: this.firstName,
      username: this.username,
      password: this.password,
    };
    this.applicationApi.createPerson({ body: person }).subscribe(
      (value) => {
        this.loginUser({ password: this.password, username: this.username });
      },
      (error) => {
        this.displayToastMessage('error', 'Blad', error.error);
      }
    );
  }

  loginUser(request: AuthRequest) {
    this.loginService.login({ body: request }).subscribe(
      (value) => {
        if (value.token !== undefined) {
          this.authService.setToken(value.token,this.username);
          this.displayToastMessage(
            'success',
            'Sukces',
            'Zostałeś zarejestrowany!'
          );
          window.location.reload();
        }
        return false;
      },
      (error) => {
        this.displayToastMessage('error', 'Blad', error.error);
      }
    );
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
