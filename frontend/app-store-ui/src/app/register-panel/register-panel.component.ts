import { Component, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register-panel.component.html',
  styleUrls: ['./register-panel.component.css']
})
export class RegisterPanelComponent {
  private modalService: NgbModal;

  constructor(modalServiceArg: NgbModal) {
    this.modalService = modalServiceArg;
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }
}
