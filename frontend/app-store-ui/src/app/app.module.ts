import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ProductPhotoComponent } from './product-photo/product-photo.component';
import { FeedComponent } from './feed/feed.component';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductCreatorComponent } from './admin/product-creator/product-creator.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { KeyFilterModule } from 'primeng/keyfilter';
import { FileUploadModule } from 'primeng/fileupload';
import { ProductUpdaterComponent } from './admin/product-updater/product-updater.component';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthInterceptor } from './auth/AuthInterceptor';
import { LoginComponent } from './user/login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StyleClassModule } from 'primeng/styleclass';
import { RegisterPanelComponent } from "./register-panel/register-panel.component";
import { UserPanelComponent } from './user-panel/user-panel.component';
import { UserDataComponent } from './user-panel/user-data/user-data.component';
import { RatingModule } from 'primeng/rating';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CheckboxModule } from 'primeng/checkbox';
import { FilterComponent } from './products/filter/filter.component';
import { FastFilterComponent } from './home/fast-filter/fast-filter.component';
import { SliderModule } from 'primeng/slider';
import { InputNumberModule } from 'primeng/inputnumber';
import { BucketComponent } from './user/purchase-completion/bucket/bucket.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { HomeDeliveryAddressComponent } from './user/purchase-completion/home-delivery-address/home-delivery-address.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HomeComponent,
    ProductComponent,
    ProductCreatorComponent,
    ProductUpdaterComponent,
    LoginComponent,
    UserPanelComponent,
    FilterComponent,
    RegisterPanelComponent,
    FastFilterComponent,
    BucketComponent,
    HomeDeliveryAddressComponent
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    MessageService,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ProductPhotoComponent,
    FeedComponent,
    DialogModule,
    BrowserAnimationsModule,
    InputTextModule,
    FormsModule,
    ListboxModule,
    DropdownModule,
    ButtonModule,
    KeyFilterModule,
    FileUploadModule,
    TableModule,
    ToastModule,
    StyleClassModule,
    UserDataComponent,
    RatingModule,
    OverlayPanelModule,
    CheckboxModule,
    SliderModule,
    RadioButtonModule,
    InputNumberModule
  ],
})
export class AppModule {}
