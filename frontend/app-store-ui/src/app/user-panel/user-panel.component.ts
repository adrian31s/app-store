import { Component } from '@angular/core';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent {
  images = ['../../assets/images/svg/data-magnifier-search-svgrepo-com.svg', '../../assets/images/cart.svg', '../../assets/images/svg/rate-svgrepo-com.svg', '../../assets/images/svg/hand-money-svgrepo-com.svg', '../../assets/images/svg/settings-shield-svgrepo-com.svg'];

  selectedType: string = 'Dane konta';

  typeSelected(type: string): void {
    this.selectedType = type;
  }
}
