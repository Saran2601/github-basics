import { Component, Input } from '@angular/core';
import { Item } from '../../interfaces/item';
import { ItemService } from '../../services/item/item.service';
import { MatDialog } from '@angular/material/dialog';
import { ItemActionDeleteConfirmationComponent } from '../item-action-delete-confirmation/item-action-delete-confirmation.component';

@Component({
  selector: 'app-item-delete',
  templateUrl: './item-delete.component.html',
  styleUrls: ['./item-delete.component.sass']
})
export class ItemDeleteComponent {
  @Input() item!: Item;

  constructor(
    private itemService: ItemService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  onDelete(item: Item): void {
    const dialogRef = this.matDialog.open(ItemActionDeleteConfirmationComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Todo Use HATEOAS Urls
        const url = 'http://localhost:5000/admin/api/items/' + item.id;
        this.itemService.deleteItem(url)
          .subscribe();
      }
    });
  }
}

