import {Component, OnInit} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {NgxSpinnerService} from 'ngx-spinner';
import {Product} from 'src/app/models/product';
import {ProductService} from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public products: Product[] = [];

  //page
  page: number = 0;
  pageSize !: number;
  totalPages: number = 0;
  totalElements!: number;

  constructor(
    private spinner: NgxSpinnerService,
    private product: ProductService
  ) {
  }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
    // this.getListProduct();
  }

  slides = [
    {id: 1, img: "../../assets/img/slider/single-slide-1.png"},
    {id: 2, img: "../../assets/img/slider/single-slide-hm1-2.png"},

  ];

  bannerSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoplayHoverPause: true,
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


}
