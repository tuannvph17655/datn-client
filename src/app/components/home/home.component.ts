import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { Color } from 'src/app/models/color';
import { Product } from 'src/app/models/product';
import { Size } from 'src/app/models/size';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public listProduct: Product[] = [];
  public colors: Color[] = [];
  public sizes: Size[] = [];
  public colorIds : string [] = [];
  public sizeIds : string [] = [];

  public minPrice !: number;
  public maxPrice !: number;
  public images !: [];
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
    private spinner: NgxSpinnerService,
    private productService: ProductService,

    ) {}

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
    this.getListProduct4CreatedDate(this.req);
  }

  slides= [
    {id: 1, img: "../../assets/img/slider/single-slide-1.png"},
    {id: 2, img: "../../assets/img/slider/single-slide-hm1-2.png"},

  ];

  bannerSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoplayHoverPause:true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  getListProduct4CreatedDate(req: any) {
    this.req.pageReq.sortField = 'createDate';
    this.productService.getListProduct(req).subscribe({
      next : ( response : any) => {
        console.log('response :', response);
        this.listProduct = response.data;
        this.page = response.page;
        this.pageSize = response.pageSize;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
      }
    })
  }

  pageChange(page: any){
    this.req.pageReq.page = page-1;
    console.log('req page change',this.req);
    this.getListProduct4CreatedDate(this.req);
  }

}
