import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/Component/Admin/interfaces/menu-item';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.sass']
})
export class SideMenuComponent {
  menuItems: MenuItem[] = [];
  constructor(
    private searchservice: SearchService
  ){}

  ngOnInit(){
  this.menuItems = [
    {id: 1, name: 'Redmi',  matIcon: 'https://cdn1.smartprix.com/rx-iGbJv9eGO-w100-h100/GbJv9eGO.webp'},
    {id: 2, name: 'Samsung', matIcon: 'https://cdn1.smartprix.com/rx-iMpmb153D-w100-h100/Mpmb153D.webp'},
    {id: 3, name: 'Motorola',  matIcon: 'https://cdn1.smartprix.com/rx-ihZnoypHg-w100-h100/hZnoypHg.webp'},
    {id: 4, name: 'Vivo',  matIcon: 'https://cdn1.smartprix.com/rx-iYeBboDh6-w100-h100/YeBboDh6.webp'},
    {id: 5, name: 'Realme',  matIcon: 'https://cdn1.smartprix.com/rx-iHrOF1ejy-w100-h100/HrOF1ejy.webp'},
    {id: 6, name: 'OnePlus',  matIcon: 'https://cdn1.smartprix.com/rx-i0H6IiRiJ-w100-h100/0H6IiRiJ.webp'},
    {id: 7, name: 'Apple',  matIcon: 'https://cdn1.smartprix.com/rx-icwmK02DN-w100-h100/cwmK02DN.webp'},
    {id: 8, name: 'Nokia',  matIcon: 'https://cdn1.smartprix.com/rx-iO4tRzBZT-w100-h100/O4tRzBZT.webp'},
    {id: 9, name: 'Infinix',  matIcon: 'https://cdn1.smartprix.com/rx-igU7oINwv-w100-h100/gU7oINwv.webp'},
  ];

}
performselect(term:string|""){
  this.searchservice.setSearchTerm(term);
  console.log(term)
}
}
