import { Component } from '@angular/core';
import { ItemEventListenerService } from '../../services/item-event-listener/item-event-listener.service';
import { ItemService } from '../../services/item/item.service';
import { ItemSummary } from '../../interfaces/item-summary';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-item-list-summary',
  templateUrl: './item-list-summary.component.html',
  styleUrls: ['./item-list-summary.component.sass']
})
export class ItemListSummaryComponent {
  itemSummary$!: Observable<ItemSummary>;

  constructor(
    private itemService: ItemService,
    private itemEventListenerService: ItemEventListenerService
  ) {
    this.subscribeForItemEvents();
  }

  ngOnInit(): void {
    this.fetchSummary();
  }

  subscribeForItemEvents(): void {
    this.itemEventListenerService.itemEventSellEmit$.subscribe(itemAction => {
      this.fetchSummary();
    });
    this.itemEventListenerService.itemEventInsertEmit$.subscribe(itemAction => {
      this.fetchSummary();
    });
    this.itemEventListenerService.itemEventUpdateEmit$.subscribe(item => {
      this.fetchSummary();
    });
    this.itemEventListenerService.itemEventDeleteEmit$.subscribe(() => {
      this.fetchSummary();
    });
  }

  fetchSummary(): void {
    // Todo Use HATEOAS Urls
    const url = 'http://localhost:5000/admin/api/items/summary';
    this.itemSummary$ = this.itemService.getItemSummary(url);
  }
}
