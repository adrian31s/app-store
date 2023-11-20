import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCreatorComponent } from './product-creator.component';

describe('ProductCreatorComponent', () => {
  let component: ProductCreatorComponent;
  let fixture: ComponentFixture<ProductCreatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCreatorComponent]
    });
    fixture = TestBed.createComponent(ProductCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
