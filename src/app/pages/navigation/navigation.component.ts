import { Component } from '@angular/core';
import { LAYOUT } from 'src/app/mocks/layout.mock';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: [ './navigation.component.scss' ]
})
export class NavigationComponent {
  layout = LAYOUT;

  constructor() {}
}
