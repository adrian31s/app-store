import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from './auth/service/auth.service';
import { ProductDto, ProductOrderDto } from 'client/src/app/api/models';
import { ApplicationApiService } from 'client/src/app/api/services';
import { validateHeaderName } from 'http';
import { ObjectReceiverService } from './s3/object-receiver.service';
import { MessageService } from 'primeng/api';
import { error } from 'console';

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

  bucketItems?: ProductOrderDto[] = [];
  imagesUrlToBytes: any[] = [];

  isUserLogged: boolean = false;
  visible: boolean = false;

  images = [
    './assets/images/person.svg',
    './assets/images/cart.svg',
    './assets/images/checked-user-512.png',
  ];

  constructor(
    private authService: AuthService,
    private applicationApiService: ApplicationApiService,
    private objectReceiver: ObjectReceiverService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.isUserLogged = this.authService.getToken() !== '';
    this.initBucket();
  }

  //admin dialog
  showDialog() {
    this.visible = true;
  }

  //user log in dialog
  openLoginDialog() {
    this.loginDialogVisible = true;
  }

  openRegisterDialog(visible: boolean) {
    this.registerDialogVisible = visible;
  }

  closeLoginAndOpenRegister() {
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

  initBucket() {
    this.applicationApiService.getActiveBucket().subscribe(
      (value) => {
        this.bucketItems = value.productOrders;
        this.imagesUrlToBytes = new Array(value.productOrders?.length).fill('');
        this.getImagesSrc();
      },
      (error) => console.log(error.error)
    );
  }

  async getImagesSrc() {
    if (this.bucketItems !== undefined)
      for (let i = 0; i < this.bucketItems.length; i++) {
          this.imagesUrlToBytes[i] = await this.getImageSrc(
            this.bucketItems[i].productDTO?.thumbnail
          );
      }
  }

  getImageSrc(imageId?: string) {
    return this.objectReceiver.getS3ImageSrcByImageName(imageId);
  }

  calculatePrice(quantity?: number, price?: number) {
    return quantity !== undefined && price !== undefined ? quantity * price : 0;
  }

  deleteProductFromBucket(productId?:number){
    this.applicationApiService.removeProductFromBucket({productId:productId}).subscribe(
      (value) =>{
        window.location.reload();
      },
      (error)=> console.log(error.error)
    )
  }
}
