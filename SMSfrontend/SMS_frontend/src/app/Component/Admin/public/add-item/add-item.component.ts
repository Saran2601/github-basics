import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Item} from '../../interfaces/item';
import { ItemService } from '../../services/item/item.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { ItemEventListenerService } from '../../services/item-event-listener/item-event-listener.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.sass']
})
export class AddItemComponent implements OnInit {

  itemActionTitle = 'Add Item';
  submitButtonLabel = 'Add';
  Generations: any[] = [
    {value: '2G/3G', viewValue: '2G/3G'},
    {value: '3G/4G', viewValue: '3G/4G'},
    {value: '4G/5G', viewValue: '4G/5G'},
  ];
  RamSpecs: any[] = [
    {value: '3GB', viewValue: '3GB'},
    {value: '4GB', viewValue: '4GB'},
    {value: '6GB', viewValue: '6GB'},
    {value: '8GB', viewValue: '8GB'},
    {value: '12GB', viewValue: '12GB'},
    {value: '16GB', viewValue: '16GB'},
    {value: '18GB', viewValue: '18GB'},
  ];
  RomSpecs: any[] = [
    {value: '64GB', viewValue: '64GB'},
    {value: '128GB', viewValue: '128GB'},
    {value: '256GB', viewValue: '256GB'},
    {value: '512GB', viewValue: '512GB'},

  ];
  Screens: any[] = [
    {value: 'Below 5.5 inch (368)', viewValue: 'Below 5.5 inch (368)'},
    {value: '5.5 inch - 6 inch (579)', viewValue: '5.5 inch - 6 inch (579)'},
    {value: '6 inch - 6.5 inch (1494)', viewValue: '6 inch - 6.5 inch (1494)'},
    {value: '6.5 inch & above (2451)', viewValue: '6.5 inch & above (2451)'},
  ];
 Features: any[] = [
    {value: 'Gorilla Glass (839)', viewValue: 'Gorilla Glass (839)'},
    {value: 'AMOLED (406)', viewValue: 'AMOLED (406)'},
    {value: 'Super AMOLED (320)', viewValue: 'Super AMOLED (320)'},
  ];
  Refreshrate: any[] = [
    {value: '90 Hz (247)', viewValue: '90 Hz (247)'},
    {value: '120 Hz (104)', viewValue: '120 Hz (104)'},
  ];
  Resolution: any[] = [
    {value: 'Full HD Screen (282)', viewValue: 'Full HD Screen (282)'},
    {value: '2K (QHD) (90)', viewValue: '2K (QHD) (90)'},
    {value: '4K (UHD) (6)', viewValue: '4K (UHD) (6)'},
  ];

  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemService,
    private snackbarService: SnackbarService,
    private itemEventListenerService: ItemEventListenerService
  ) {
    this.subscribeForItemEvents();
  }

  textInputValidators = [Validators.required, Validators.maxLength(100)];
  currencyInputValidators = [Validators.required, Validators.pattern(/^\d+(.\d{2})?$/)];
  numberInputValidators = [Validators.required, Validators.pattern(/^\d+$/)];

  itemForm = this.formBuilder.group({
    name: ['', this.textInputValidators],
    cost: ['', this.currencyInputValidators],
    price: ['', this.currencyInputValidators],
    quantity: ['', this.currencyInputValidators],
    imgurl: ['', this.textInputValidators],
    gen: ['',this.textInputValidators],
    ram: ['',this.textInputValidators],
    rom: ['',this.textInputValidators],
    screensize: ['',this.textInputValidators],
    features: ['',this.textInputValidators],
    resolution: ['',this.textInputValidators],
    refreshrate: ['',this.textInputValidators],

  });

  ngOnInit(): void {
  }

  subscribeForItemEvents(): void {
    this.itemEventListenerService.itemEventAddEmit$.subscribe(item => {
      this.onAdded(item);
    });
    this.itemEventListenerService.itemEventFailureEmit$.subscribe(error => {
      this.onFailure(error);
    });
  }

  onAdd(): void {

    const url = 'http://localhost:5000/admin/api/items';

    const costValue = parseFloat(this.itemForm.get('cost')?.value || '0');
    const priceValue = parseFloat(this.itemForm.get('price')?.value || '0');
    const quantityValue = parseFloat(this.itemForm.get('quantity')?.value || '0');

    const itemToAdd: Item = {
      name: this.itemForm.get('name')?.value || '',
      imgurl: this.itemForm.get('imgurl')?.value || '',
      cost: costValue,
      price: priceValue,
      quantity: quantityValue,
      gen: this.itemForm.get('gen')?.value || '',
      ram: this.itemForm.get('ram')?.value || '',
      rom: this.itemForm.get('rom')?.value || '',
      screensize: this.itemForm.get('screensize')?.value || '',
      features: this.itemForm.get('features')?.value || '',
      resolution: this.itemForm.get('resolution')?.value || '',
      refreshrate: this.itemForm.get('refreshrate')?.value || '',
    };
    console.log(itemToAdd);

    this.itemService.addItem(url, itemToAdd)
      .subscribe();
    this.itemForm.reset();
  }



  onAdded(item: Item): void {
    this.snackbarService.openSnackBar('Item Added Successfully!');
  }

  onFailure(error: any): void {
    this.snackbarService.openSnackBar('Request Failed!');
  }
}
