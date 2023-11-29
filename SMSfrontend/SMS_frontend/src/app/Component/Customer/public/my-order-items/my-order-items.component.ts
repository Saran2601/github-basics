import { OrderItem } from './../../interfaces/OrderItem';
import { Component, Input } from '@angular/core';
import { CustomerApiService } from '../../services/customer-api.service';
import { AuthService } from 'src/app/Component/Services/auth.service';
import { Order } from '../../interfaces/Order';
import { MatTableDataSource } from '@angular/material/table';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { format } from 'date-fns';

@Component({
  selector: 'app-my-wishlist-items',
  templateUrl: './my-order-items.component.html',
  styleUrls: ['./my-order-items.component.sass']
})
export class MyOrderItemsComponent {

 myorders: Order[] = [];
 displayedColumns: string[] = ['serialNumber', 'productDetails', 'estimatedAmount', 'address', 'orderStatus', 'paymentType', 'actions'];
 dataSource!: MatTableDataSource<Order[]>;

  constructor(
    private customerapiService: CustomerApiService,
    private authService: AuthService
  ){

  }
  ngOnInit(){
    console.log("My Order works");
    console.log(this.authService.getEmail());
    this.getmyorderitems();

  }
  getmyorderitems(){
    this.customerapiService.getOrders(this.authService.getEmail()).subscribe(
      (response:any)=>{
        console.log(response);
        this.myorders=response;
        this.dataSource=response;
        console.log(this.dataSource);
      }
    )
  }
  downloadOrder(order: any) {  // Replace 'any' with the actual type of your order
    // Implement the logic to generate and download the receipt for the given order
    // You can use a library like pdfmake or any other PDF generation library for Angular
    // Example using pdfmake:
    const pdfMake = require('pdfmake/build/pdfmake');
    const pdfFonts = require('pdfmake/build/vfs_fonts');

    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const formatDate = (dateArray: number[]) => {
      if (!dateArray || dateArray.length !== 6) return '';

      // Create a Date object using the array values
      const date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4], dateArray[5]);

      if (isNaN(date.getTime())) {
        // Invalid date, handle accordingly
        return '';
      }

      // Format the date as needed
      return format(date, 'dd-MM-yyyy');
    };



    const documentDefinition = {
      content: [
        { text: `SASIKA MOBILES`, style: `header`},
        { text: `INVOICE`, style: 'subtitle' },

        {
          columns: [
            {
              width: '50%',
              stack: [
                { text: `Name: ${order.userName}`, style: 'boldSubheader', margin: [0, 8, 0, 8] },
                { text: `Email: ${order.userEmail}`, style: 'boldSubheader', margin: [0, 8, 0, 8] },
                { text: `Address: ${order.address}`, style: 'boldSubheader', margin: [0, 8, 0, 8] },
                { text: `Mobile Number: ${order.mobileNumber}`, style: 'boldSubheader', margin: [0, 8, 0, 8] },

              ],
            },
            {
              width: '50%',
              stack: [
                { text: `Date: ${formatDate(order.createdDate)}`, style: 'boldSubheader', margin: [0, 8, 0, 8] },
                { text: `Status: ${order.orderStatus}`, style: 'boldSubheader', margin: [0, 8, 0, 8] },
                { text: `Payment Type: ${order.paymentType}`, style: 'boldSubheader', margin: [0, 8, 0, 8] },
              ],
            },
          ],
        },
        { text: 'Product Details:', style: 'boldSubheader', margin: [0, 6, 0, 6] },
    {
      table: {
        headerRows: 1,
        widths: ['*', '*', '10%'],
        body: [
          [
            { text: 'Product Name', style: 'tableHeader' },
            { text: 'Quantity', style: 'tableHeader' },
            { text: 'Subtotal', style: 'tableHeader' }
          ],
          ...order.items.map((item: any) => [
            { text: item.item.name, style: 'item' },
            { text: item.quantity, style: 'item' },
            { text: item.subtotal, style: 'item' }
          ])
        ],


      },
      margin: [0, 18, 0, 18],
      layout: {
        fillColor: function (rowIndex: number, node: any, columnIndex: number) {
          return rowIndex === 0 ? '#f2f2f2' : null; // Light gray background for header row
        },
        hLineStyle: function (i: number, node: any) {
          return { dash: { length: 5, space: 2 } }; // Dashed horizontal lines
        },
        vLineWidth: () => 0, // Set to 0 to hide vertical lines
      },
      styles: {
        tableHeader: { bold: true, fontSize: 12, fillColor: '#f2f2f2' },
        item: { fontSize: 10 },
      },
    },
    { text: `Subtotal           :            Rs.${order.subtotal.toLocaleString('en-IN')}`, style: 'subheader' },
    { text: `Delivery Charge   :                  Rs.${order.deliveryCharge.toLocaleString('en-IN')}`, style: 'subheader' },
    { text: `Estimated Tax     :                  Rs.${order.estimatedTax.toLocaleString('en-IN')}`, style: 'subheader' },
    { text: `------------------------------------------------------------------------`, style: 'dash'},
    { text: `Estimated Amount      :        Rs.${order.estimatedAmount.toLocaleString('en-IN')}`, style: 'Subheader' },
    { text: `Thank you!`, style: 'greet' },

  ],
      styles: {
        header: {
          fontSize: 25,
          bold: true,
          margin: [0, 14, 0, 14],
          alignment: 'center',
        },
        subtitle: {
          fontSize: 22,
          bold: true,
          margin: [0, 14, 0, 14],
          alignment: 'center',
        },
        dash: {
          alignment: 'right',
        },
        greet: {
          bold: true,
          fontSize: 18,
          alignment: 'center',
          margin: [0, 25, 0, 25],

        },
        subheader:{
          alignment: 'right',
          bold: true,
          fontSize: 13,
          margin: [0, 10, 0, 10],


        },
        Subheader:{
          alignment: 'right',
          bold: true,
          fontSize: 15,
          margin: [0, 10, 0, 10],

        },

        boldSubheader: {
          fontSize: 13,
          bold: true,
          margin: [0, 10, 0, 10],
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          margin: [0, 10, 0, 10],
          color: 'black',
          fillColor: '#F2F2F2', // Background color for header
        },
        item: {
          fontSize: 14,
          margin: [0, 10, 0, 10]
        },
        defaultStyle: {
          font: 'Courier' // Use a monospaced font for all text
        }
      }
    };


    pdfMake.createPdf(documentDefinition).download(`Order_${order.orderId}_Receipt.pdf`);
  }
}

