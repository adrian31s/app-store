import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDeliveryAddressComponent } from './home-delivery-address.component';

describe('HomeDeliveryAddressComponent', () => {
  let component: HomeDeliveryAddressComponent;
  let fixture: ComponentFixture<HomeDeliveryAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeDeliveryAddressComponent]
    });
    fixture = TestBed.createComponent(HomeDeliveryAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
