import { Component } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone: false,
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  isOpen = false;
  selected = 'Selecciona una opción';
  options = ['Opción 1', 'Opción 2', 'Opción 3'];

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string) {
    this.selected = option;
    this.isOpen = false;
  }
}
