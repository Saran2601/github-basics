import { Component, ViewChild } from '@angular/core';
import { Item } from '../../interfaces/item';
import { ItemAction } from '../../interfaces/item-action';
import { ItemService } from '../../services/item/item.service';
import { ItemEventListenerService } from '../../services/item-event-listener/item-event-listener.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.sass']
})
export class ItemListComponent {
  private items: Item[] = [];
  filteredItems: Item[] = []; // Array to hold filtered items
  dataSource = new MatTableDataSource<Item>(this.filteredItems); // Use filteredItems for the data source
  // displayedColumns: string[] = ['code', 'name', 'cost', 'price', 'quantity', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private itemService: ItemService,
    private snackbarService: SnackbarService,
    private itemEventListenerService: ItemEventListenerService
  ) {
    this.subscribeForItemEvents();
  }

  ngAfterViewInit(): void {
    this.fetchItems();
  }

   subscribeForItemEvents(): void {
    this.itemEventListenerService.itemEventSellEmit$.subscribe(itemAction => {
      this.onSold(itemAction);
    });
    this.itemEventListenerService.itemEventInsertEmit$.subscribe(itemAction => {
      this.onInserted(itemAction);
    });
    this.itemEventListenerService.itemEventUpdateEmit$.subscribe(item => {
      this.onUpdated(item);
    });
    this.itemEventListenerService.itemEventDeleteEmit$.subscribe(() => {
      this.onDeleted();
    });
    this.itemEventListenerService.itemEventFailureEmit$.subscribe(error => {
      this.onFailure(error);
    });
  }

  fetchItems(): void {
    // Todo: Use HATEOAS Urls
    const url = 'http://localhost:5000/admin/api/items';
    this.itemService.getItems(url)
      .subscribe((items: Item[]) => {
        this.items = items;
        this.filteredItems = items; // Initialize filteredItems with all items
        this.updateTableDataSource();
      });
  }

  updateTableDataSource(): void {
    this.dataSource = new MatTableDataSource<Item>(this.filteredItems);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    // Filter items based on the search input
    this.filteredItems = this.items.filter(item =>
      item.name.toLowerCase().includes(filterValue) || // Add more filters as needed
      item.price.toString().toLowerCase().includes(filterValue)||
      item.ram.toLowerCase().includes(filterValue)||
      item.rom.toLowerCase().includes(filterValue)||
      item.gen.toLowerCase().includes(filterValue)||
      item.resolution.toLowerCase().includes(filterValue)||
      item.features.toLowerCase().includes(filterValue)
    );

    // Update the table data source with filtered items
    this.updateTableDataSource();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
    onSold(itemAction: ItemAction): void {
    // Todo Item List needs to be updated without fetching data from the back-end
    this.snackbarService.openSnackBar('Item Sold Successfully!');
    this.fetchItems();
  }

  onInserted(itemAction: ItemAction): void {
    // Todo Item List needs to be updated without fetching data from the back-end
    this.snackbarService.openSnackBar('Item Inserted Successfully!');
    this.fetchItems();
  }

  onUpdated(item: Item): void {
    // Todo Item List needs to be updated without fetching data from the back-end
    this.snackbarService.openSnackBar('Item Updated Successfully!');
    this.fetchItems();
  }

  onDeleted(): void {
    // Todo Item List needs to be updated without fetching data from the back-end
    // this.items = this.items.filter(h => h !== item);
    this.snackbarService.openSnackBar('Item Deleted Successfully!');
    this.fetchItems();
  }

  onFailure(error: any): void {
    this.snackbarService.openSnackBar('Request Failed!');
  }

  // Other methods for handling item events
}

