import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from '../../services/product.service';
import { ProductDetail } from '../../models/product-detail';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from 'src/app/models/review';
import { Productoption } from 'src/app/models/productoption';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ProductOptionIdRes } from '../../models/productOptionIdRes';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductImage } from 'src/app/models/productImage';
import { ProductRelated } from '../../models/product-related';
import { FavouriteService } from '../../services/favourite.service';
import { Favourite } from 'src/app/models/favourite';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  public productDetail !: ProductDetail;
  id !: string;
  public reviews !: Review[];
  public productOptions !: Productoption[];
  sizes:any;
  colors:any;
  quantity: number = 1;
  sizeSelected: string = '';
  colorSelected: string = '';
  productOptionId :string = '';
  // images:any;
  priceOption !:number;
  productOptionRes !: ProductOptionIdRes;
  description:string [] = [];
  sizeColorSelected!:boolean;
  quantityProduct!:number;
  priceProduct!:string;

  productRelated : ProductRelated[] = [];

  isFavourite = false;
  starRating = 0;
  ratingForm = false;

  listFavourite : Favourite[] = [];


  public imageProduct!: ProductImage[];

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: true,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      }
    }
  }

  constructor(
    private product: ProductService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private cart: CartService,
    private auth: AuthService,
    private favourite:FavouriteService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.params['id'];
    this.getListSize();
  }


  

  getListSize(){
     this.cart.getListSizeByProductId(this.id).subscribe({
      next:(response:any) => {
        this.sizes = response.data;
      }
    });
  }



  addToCart(){
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['sign-in']);
      return;
    }

    if(this.sizeSelected == '' || this.colorSelected == ''){
      alert('Bạn chưa chọn size và color');
      return;
    }


    this.cart.findProductOptionId(this.colorSelected, this.sizeSelected,this.id).subscribe({
      next: (response:any) => {
        console.log('findProductOptionRes: ', response);
        this.productOptionRes = response.data;
        this.quantityProduct = response.data.quantity;
        console.log('productOptionRes: ', this.productOptionRes);
        this.cart.addToCart(this.productOptionRes.productOptionId, this.quantity).subscribe({
          next: (response) => {
            if(this.quantityProduct < this.quantity || this.quantityProduct == 0){
              this.toastr.error('Số lượng sản phẩm không đủ');
              return ;
            }
            console.log('response: ', response);
            this.toastr.success('Sản phẩm đã được thêm vào giỏ hàng !!');
            this.router.navigate(['/cart']);
          },error: (err) => {
            console.log('err add to cart : ',err);
          }
        })
      },
      error: (err) => {
        console.log('err findProductOption : ',err);
      }
    });
  }

  increase() {
    this.quantity ++;
  }

  decrease() {
    if(this.quantity <= 1){
      return;
    }

    this.quantity --;
  }

  changeSize(e:any){
    this.sizeSelected = e.target.value;
    this.cart.getListColorBySize(this.sizeSelected,this.id).subscribe({
      next:(response:any) => {
        this.colors = response.data;
      },
      error: (err) => {
        console.log('err : ',err)
      }
    });
  }

  changeColor(e: any){
    this.colorSelected = e.target.value;
    console.log('colorSelected: ', this.colorSelected);

    this.sizeColorSelected = true;

    this.cart.findProductOptionId(this.colorSelected, this.sizeSelected,this.id).subscribe({
      next: (response:any) => {
        console.log('findProductOptionRes: ', response);
        this.quantityProduct = response.data.quantity;
        this.priceProduct = response.data.price;
        console.log('priceProduct: ', this.priceProduct);
        console.log('quantityProduct: ', this.quantityProduct);
      },
      error: (err) => {
        console.log('err findProductOption : ',err);
      }
    });
  }

  addToFavourite(){
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['sign-in']);
      return;
    }

    this.favourite.createFavourite(this.id).subscribe({
      next: (response:any) => {
        console.log('response: ', response);
        console.log('response.data: ', response.data);
        this.isFavourite = response.data;
      },error: (err) => {
        console.log('err : ',err);
      }
    });
  }

  //call api get list favourite product , then check productId is favourite set isFavourite = true else set isFavourite = false
  getListFavourite(){
    this.favourite.getListFavourite().subscribe({
      next: (response:any) => {
        console.log('response: ', response);
        console.log('response.data: ', response.data);
        this.listFavourite = response.data;
        this.checkFavourite();
      },error: (err) => {
        console.log('err : ',err);
      }
    });
  }

  //check productId is favourite set isFavourite = true else set isFavourite = false
  checkFavourite(){
    this.listFavourite.forEach(element => {
      if(element.productId == this.id){
        this.isFavourite = true;
      }
    });
  }
}
