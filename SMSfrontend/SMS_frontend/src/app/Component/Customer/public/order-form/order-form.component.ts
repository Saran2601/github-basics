import { Component } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Component/Services/auth.service';
import { CartItem } from '../../interfaces/CartItem';
import { Order } from '../../interfaces/Order';
import { Item } from '../../interfaces/Item';
import { OrderItem } from '../../interfaces/OrderItem';
import { CustomerApiService } from '../../services/customer-api.service';
import { SnackbarService } from 'src/app/Component/Admin/services/snackbar/snackbar.service';
import { Router } from '@angular/router';

function validateMobileNumber(control: { value: string; }) {
  const mobileNumberRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;

  if (control.value && !mobileNumberRegex.test(control.value)) {
    return { 'invalidMobileNumber': true };
  }

  return null;
}

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.sass']
})
export class OrderFormComponent {
  button=true;
  orderForm!: FormGroup;
  subtotal=0;
  delivery_charge=50;
  estimated_tax=10;
  estimated_amount!:number;
  cartitems: CartItem[]=[];
  order: Order=new Order();
  orderitems:OrderItem[]=[]

  constructor(private itemService: ItemService,
    private fb: FormBuilder,
    private authservice: AuthService,
    private customerapiservice: CustomerApiService,
    private snackbarservice: SnackbarService,
    private router: Router) { }

  ngOnInit() {
    this.itemService.selectedItems$.subscribe(items=> {
      this.cartitems= items;
      this.amountCalculation();
      this.initializeForm();
      this.iteminitialization();
    });
  }
  iteminitialization() {
    for (let  i=0;i<this.cartitems.length;i++){
      var orderitem:OrderItem=new OrderItem();
      orderitem.item = new Item();
      orderitem.item.item_id=this.cartitems[i].item.id;
      orderitem.item.cost=this.cartitems[i].item.cost;
      orderitem.item.features=this.cartitems[i].item.features;
      orderitem.item.gen=this.cartitems[i].item.gen;
      orderitem.item.imgurl=this.cartitems[i].item.imgurl;
      orderitem.item.name=this.cartitems[i].item.name;
      orderitem.item.price=this.cartitems[i].item.price;
      orderitem.item.quantity=1;
      orderitem.item.ram=this.cartitems[i].item.ram;
      orderitem.item.refreshrate=this.cartitems[i].item.refreshrate;
      orderitem.item.resolution=this.cartitems[i].item.resolution;
      orderitem.item.rom=this.cartitems[i].item.rom;
      orderitem.item.screensize=this.cartitems[i].item.screensize;
      orderitem.quantity=1;
      orderitem.subtotal=1*this.cartitems[i].item.price;
      this.orderitems.push(orderitem);
    }
  }
  private initializeForm() {
    this.orderForm = this.fb.group({
       name: [this.authservice.getuserName(), Validators.required],
      //name: ['Sarankumar', Validators.required],
       email: [this.authservice.getEmail(), Validators.required],
      //email: ['sarankumar26012002@gmail.com', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      mobileNumber: ['', [Validators.required, validateMobileNumber]],
      payment_type: ['Cash on Delivery', Validators.required],
    });
  }

  amountCalculation(){
    var subtot=0
    var tax=0;
    for (let i = 0; i < this.cartitems.length; i++){
      subtot+=this.cartitems[i].item.price;
      tax+=this.estimated_tax;
    }
    this.estimated_tax=tax;
    this.subtotal=subtot;
    this.estimated_amount=subtot+tax+this.delivery_charge;
  }

  get mobileNumberControl() {
    return this.orderForm.get('mobileNumber');
  }

  onSubmit() {
    this.order.userName=this.orderForm.get('name')?.value;
    this.order.userEmail=this.orderForm.get('email')?.value;
    this.order.address=this.orderForm.get('address')?.value;
    this.order.mobileNumber=this.orderForm.get('mobileNumber')?.value;
    this.order.paymentType=this.orderForm.get('payment_type')?.value;
    this.order.orderStatus='Not-delivered';
    this.order.estimatedTax=this.estimated_tax;
    this.order.estimatedAmount=this.estimated_amount;
    this.order.deliveryCharge=this.delivery_charge;
    this.order.subtotal=this.subtotal;
    this.order.items=this.orderitems;

    console.log(this.order);
    this.customerapiservice.placeOrder(this.order).subscribe(
      (response: any)=>{
        console.log(response);
      },
      (error: any)=>{
        if (error.status==200){
          this.button=false;
          this.snackbarservice.openSnackBar("Successfully Ordered");
          this.router.navigate(['/dashboard/my-order-items']);
        }
        else{
          this.snackbarservice.openSnackBar("Internal Server Error");
        }
      }
    )
  }

}

