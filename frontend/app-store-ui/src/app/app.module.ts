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

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HomeComponent,
    ProductComponent,
    ProductCreatorComponent,
    ProductUpdaterComponent,
  ],
  providers: [],
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
    
  ],
})
export class AppModule {}
