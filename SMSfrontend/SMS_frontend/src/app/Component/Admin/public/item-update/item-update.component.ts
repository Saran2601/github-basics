import { Component, Input } from '@angular/core';
import { Item } from '../../interfaces/item';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ItemService } from '../../services/item/item.service';
import { ItemDetailsFormComponent } from '../item-details-form/item-details-form.component';

@Component({
  selector: 'app-item-update',
  templateUrl: './item-update.component.html',
  styleUrls: ['./item-update.component.sass']
})
export class ItemUpdateComponent {
  @Input() item!: Item;

  constructor(
    private matDialog: MatDialog,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
  }

  onUpdate(): void {
    const dialogRef = this.openDialog();
    dialogRef.afterClosed().subscribe((result: Item) => {
      if (result) {
        this.updateItem(result);
      }
    });
  }

  private openDialog(): MatDialogRef<any> {
    const item: Item = Object.assign({}, this.item);
    return this.matDialog.open(ItemDetailsFormComponent, {
      data: {
        item,
        itemActionTitle: 'Update Item',
        submitButtonLabel: 'Update',
        readonlyFields: {
          name: false,
          cost: false,
          price: false,
          quantity: false,
          gen: false,
          ram: false,
          rom: false,
          features: false,
          screensize: false,
          resolution: false,
          refreshrate: false,
          imgurl: false,

        }
      }
    });
  }

  private updateItem(result: Item): void {
 
    const url = 'http://localhost:5000/admin/api/items/' + this.item.id;
    const item: Item = {
      id: undefined,
      name: result.name,
      cost: result.cost,
      price: result.price,
      quantity: result.quantity,
      imgurl: result.imgurl,
      gen: result.gen,
      ram: result.ram,
      rom: result.rom,
      screensize: result.screensize,
      features: result.features,
      resolution: result.resolution,
      refreshrate: result.refreshrate
    };
    this.itemService.updateItem(url, item)
      .subscribe();
  }
}
