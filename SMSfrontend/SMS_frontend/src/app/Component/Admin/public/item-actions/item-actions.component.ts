import { Component, Input } from '@angular/core';
import { Item } from '../../interfaces/item';

@Component({
  selector: 'app-item-actions',
  templateUrl: './item-actions.component.html',
  styleUrls: ['./item-actions.component.sass']
})
export class ItemActionsComponent {
  @Input() item!: Item;

  constructor() { }

  ngOnInit(): void {
  }

}
