import {LocationService} from './../../services/location.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from 'src/app/models/product';
import {AuthService} from 'src/app/services/auth.service';
import {ProductService} from 'src/app/services/product.service';
import {ColorService} from '../../services/color.service';
import {SizeService} from 'src/app/services/size.service';
import {Size} from 'src/app/models/size';
import {Color} from 'src/app/models/color';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  public listProduct: Product[] = [];
  public colors: Color[] = [];
  public sizes: Size[] = [];
  public colorIds: string [] = [];
  public sizeIds: string [] = [];

  public minPrice !: number;
  public maxPrice !: number;
  public images !: [];
  //page
  page: number = 0;
  pageSize !: number;
  totalPages: number = 0;
  totalElements!: number;


  //request
  req: any = {
    "textSearch": "",
    "minPrice": "",
    "maxPrice": "",
    "sizeIds": [],
    "colorIds": [],
    "pageReq": {
      "page": 0,
      "pageSize": 9,
      "sortField": "",
      "sortDirection": ""
    }
  }

  constructor(
    private productService: ProductService,
    private auth: AuthService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private sizeService: SizeService,
    private colorService: ColorService,
    private locationService: LocationService,
  ) {
  }

  ngOnInit(): void {
    this.getListSize();
    this.getListColor();
    this.getListProduct(this.req);

  }

  getListSize() {
    this.sizeService.getListSize().subscribe({
      next: (response: any) => {
        console.log('size', response);
        this.sizes = response.data;
      }
    })
  }

  getListLocation() {
    this.locationService.getListLocation().subscribe({
      next: (response: any) => {
        console.log('size', response);
        this.sizes = response.data;
      }
    })
  }


  getListColor() {
    this.colorService.getListColor().subscribe({
      next: (response: any) => {
        console.log('color', response);
        this.colors = response.data;
      }
    })
  }

  getListProduct(req: any) {
    this.productService.getListProduct(req).subscribe({
      next: (response: any) => {
        console.log('response', response);
        this.listProduct = response.data;
        this.page = response.page;
        this.pageSize = response.pageSize;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        console.log('page : ', this.page);
        console.log('pageSize : ', this.pageSize);
        console.log('totalPages : ', this.totalPages);
        console.log('totalElements : ', this.totalElements);

        console.log('listProduct', this.listProduct);
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  colorsCheckBox(e: any, colorId: string) {
    console.log(e, colorId);
    if (e.target.checked && !this.colorIds.includes(colorId)) {
      this.colorIds.push(colorId);
    } else {
      this.colorIds.splice(this.colorIds.indexOf(colorId), 1);
    }
    this.req.colorIds = this.colorIds;
    this.getListProduct(this.req);
  }

  sizesCheckBox(e: any, sizeId: string) {
    console.log(e, sizeId);
    if (e.target.checked && !this.sizeIds.includes(sizeId)) {
      this.sizeIds.push(sizeId);
    } else {
      this.sizeIds.splice(this.sizeIds.indexOf(sizeId), 1);
    }
    this.req.sizeIds = this.sizeIds;
    this.getListProduct(this.req);
  }

  sortSelect(e: any) {
    console.log('e : ', e.target.value);
    const value = e.target.value;
    const arr = value.split(',');
    this.req.pageReq.sortField = arr[0];
    this.req.pageReq.sortDirection = arr[1];
    console.log('req : ', this.req);
    this.getListProduct(this.req);
  }


  pageChange(page: any) {
    this.req.pageReq.page = page - 1;
    console.log('req page change', this.req);
    this.getListProduct(this.req);
  }

  //search text input change
  searchTextChange(e: any) {
    this.req.textSearch = e.target.value;
    console.log('search change : ', this.req);
    this.getListProduct(this.req);
  }

  //filter price with priceMin and priceMax
  priceFilter() {

    if (this.minPrice >= this.maxPrice) {
      alert('min price must be less than max price');
      return;
    }

    if (this.minPrice == null || this.maxPrice == null) {
      return;
    }

    this.req.minPrice = this.minPrice;
    this.req.maxPrice = this.maxPrice;
    console.log('req price filter : ', this.req);
    this.getListProduct(this.req);
  }

}
