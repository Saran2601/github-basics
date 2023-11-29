import { Component, HostListener } from '@angular/core';
import { Item } from 'src/app/Component/Admin/interfaces/item';
import { ItemService } from 'src/app/Component/Admin/services/item/item.service';
import { SearchService } from '../../services/search.service';


@Component({
  selector: 'app-mobiles',
  templateUrl: './mobiles.component.html',
  styleUrls: ['./mobiles.component.sass']
})
export class MobilesComponent {
incrementQuantity(_t12: Item) {
throw new Error('Method not implemented.');
}

decrementQuantity(){
  
}
  private items: Item[] = [];
  filteredItems: Item[] = [];
  searchTerm!: string;

  constructor(private itemService: ItemService, private searchService: SearchService) {}

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    $event.returnValue = true;
  }

  ngAfterViewInit(): void {
    this.fetchItems();
  }

  ngOnInit() {
    this.searchService.searchTerm$.subscribe((term) => {
      this.searchTerm = term;
      console.log(term);
      this.doFilter(term);
    });
  }

  fetchItems(): void {
    const url = 'http://localhost:5000/admin/api/items';
    this.itemService.getItems(url).subscribe((items: Item[]) => {
      this.items = items;
      this.filteredItems = items;
    });
  }

  doFilter(term: string): void {
    const filterValue = term.toLowerCase();
    this.filteredItems = this.items.filter((item) => {
      return (
        (!term || item.name.toLowerCase() === term.toLowerCase()) ||
        item.name.toLowerCase().includes(filterValue)
      );
    });
  }

  onItemAdded(addeditem: Item) {}

}
