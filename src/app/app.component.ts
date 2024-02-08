import { Component } from '@angular/core';
import { FavoriteChangeProps } from './favorite/favorite.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  task = {
    title: 'Review applications',
    assignee: {
      name: null
    }
  }
}
