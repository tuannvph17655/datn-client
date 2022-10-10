import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  public products : Product[] = [];

  public categories : Category[] = [];
  // public colors: Color[] = [];
  // public sizes: Size[] = [];
  public colorIds : string [] = [];
  public sizeIds : string [] = [];

  public minPrice !: number;
  public maxPrice !: number;

  //page
  page : number = 0 ;
  pageSize !: number ;
  totalPages : number = 0 ;
  totalElements!: number;

  //request
  req: any = {
    "textSearch": "",
    "minPrice": "",
    "maxPrice": "",
    "sizeIds":[],
    "colorIds": [],
    "pageReq": {
      "page": 0,
      "pageSize": 9,
      "sortField": "",
      "sortDirection": ""
    }
  }

  constructor(
  ) {}

  ngOnInit(): void {
  }



}
