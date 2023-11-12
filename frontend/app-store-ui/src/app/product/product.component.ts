import { Component } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  images = ['../assets/images/arrow-left-circle.svg'];
  name = 'title';
  specs = '';
  res = '1920x1080';
  cpu = 'i9 31312132123f';
  ram = '128GB DDR6'
  disk = '100PB SSD';
  gpu = 'RTX 9099';

  price = 19999;
  desc = 'description';
}
