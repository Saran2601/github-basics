import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Item } from '../../interfaces/item';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-item-details-form',
  templateUrl: './item-details-form.component.html',
  styleUrls: ['./item-details-form.component.sass']
})
export class ItemDetailsFormComponent {
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

  readonlyFields: {
    code?: boolean;
    name?: boolean,
    cost?: boolean,
    price?: boolean,
    quantity?: boolean,
    description?: boolean,
    imgurl?: boolean,
    gen?:boolean,
    ram?:boolean,
    rom?:boolean,
    features?:boolean,
    screensize?:boolean,
    resolution?:boolean,
    refreshrate?:boolean,

  } = {};

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {
      item: Item,
      itemActionTitle: string,
      submitButtonLabel: string,
      readonlyFields: {
        code?: boolean;
        name?: boolean,
        cost?: boolean,
        price?: boolean,
        quantity?: boolean,
        description?: boolean,
        imgurl?: boolean,
        gen?:boolean,
        ram?:boolean,
        rom?:boolean,
        features?:boolean,
        screensize?:boolean,
        resolution?:boolean,
        refreshrate?:boolean,

      }
    }
  ) { }

  textInputValidators = [Validators.required, Validators.maxLength(100)];
  currencyInputValidators = [Validators.required, Validators.pattern(/^\d+(.\d{2})?$/)];
  numberInputValidators = [Validators.required, Validators.pattern(/^\d+$/)];

  itemForm = this.formBuilder.group({

    name: [this.data.item.name, this.textInputValidators],
    imgurl: [this.data.item.imgurl, this.textInputValidators],
    cost: [this.data.item.cost, this.currencyInputValidators],
    price: [this.data.item.price, this.currencyInputValidators],
    quantity: [this.data.item.quantity, this.numberInputValidators],
    features:[this.data.item.features,this.textInputValidators],
    gen:[this.data.item.gen,this.textInputValidators],
    ram:[this.data.item.ram,this.textInputValidators],
    rom:[this.data.item.rom,this.textInputValidators],
    refreshrate:[this.data.item.refreshrate,this.textInputValidators],
    resolution:[this.data.item.resolution,this.textInputValidators],
    screensize:[this.data.item.screensize,this.textInputValidators],
  });

  ngOnInit(): void {
  }
}
