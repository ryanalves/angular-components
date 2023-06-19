import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.scss'],
})
export class ComponentListComponent {
  @Input() showPaginaInicial = false;
}
