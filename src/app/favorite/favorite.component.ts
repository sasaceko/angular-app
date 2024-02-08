import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

export interface FavoriteChangeProps {
  newValue: boolean
}

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class FavoriteComponent {
  @Input() isFavorite: boolean | undefined;
  @Output() change = new EventEmitter();

  onClick() { 
    this.isFavorite = !this.isFavorite;
    this.change.emit({ newValue: this.isFavorite });
  }
}
