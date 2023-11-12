import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ProductPhotoComponent } from "./product-photo/product-photo.component";
import { FeedComponent } from './feed/feed.component';

@NgModule({
    declarations: [
        AppComponent,
        ProductsComponent,
        HomeComponent,
        ProductComponent,
    ],
    providers: [],
    bootstrap: [AppComponent, HomeComponent, ProductComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        ProductPhotoComponent,
        FeedComponent,
    ]
})
export class AppModule { }
