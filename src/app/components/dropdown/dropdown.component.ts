import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu',
  standalone: false,
  template: `
    <ul class="dropdown-content">
      <li (click)="select('edit')">Editar</li>
      <li (click)="select('delete')">Eliminar</li>
    </ul>
  `,
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  @Output() optionSelected = new EventEmitter<string>();

  select(option: string) {
    this.optionSelected.emit(option);
  }
}
