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
import { Favourite } from 'src/app/models/favourite';
import { SignInComponent } from '../authentication/sign-in/sign-in.component';
import { MatDialog } from '@angular/material/dialog';
import { Size } from 'src/app/models/size';
import { Color } from 'src/app/models/color';

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
  sizes!:Size[];
  colors!:Color[];
  quantity: number = 1;
  sizeSelected: string = '';
  colorSelected: string = '';
  productOptionId :string = '';
  // images:any;
  priceOption !: number;
  productOptionRes !: ProductOptionIdRes;
  description:string [] = [];
  sizeColorSelected!:boolean;
  quantityProduct!:number;
  priceProduct!:string;

  productRelateds : ProductRelated[] = [];

  isFavourite = false;
  starRating = 0;
  ratingForm = false;

  listFavourite : Favourite[] = [];
  nrSelect !: string;

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
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.params['id'];
    this.getProductDetail();
    this.getListSize();
    this.getRelatedProduct();

  }


  getProductDetail(){
    this.product.getProductDetails(this.id).subscribe({
      next: (response:any) => {
        console.log('data : ',response.data)
        this.productDetail = response.data;
        this.description = response.data.description.split('.');
        this.reviews = response.data.review;
        this.productOptions = response.data.productOptions;
        console.log('product-detail:',this.productDetail);
        console.log('productOptions:',this.productOptions);
        this.priceOption = response.data.productOptions[0].price;
        console.log("priceOptions : "  + this.priceOption);
        this.imageProduct = response.data.productOptions.map((item:any) => {
          return {
            id: item.id,
            url: item.image
          }
        });
        console.log('imageProduct:',this.imageProduct);
      },
      error: (err) => {
        console.log('err : ',err);
      }
    });
  }

  getListSize(){
     this.cart.getListSizeByProductId(this.id).subscribe({
      next:(response:any) => {
        this.sizes = response.data;
        this.sizeSelected = this.sizes[0].sizeName as string;
        console.log("sizes :" , this.sizes);
      }
    });
  }

  getRelatedProduct(){
    this.product.getProductRelated(this.id).subscribe({
      next: (response:any) => {
        this.productRelateds = response.data;
        console.log('productRelated: ', this.productRelateds);
      },error: (err) => {
        console.log('err getRelatedProduct : ',err);
      }
    });
  }

  addToCart(){
    if (!this.auth.isAuthenticated()) {
      this.openSignIn();
      return;
    }

    if(this.sizeSelected == '' || this.colorSelected == ''){
      this.toastr.warning('B???n ch??a ch???n size v?? color');
      return;
    }
    if(this.quantity < 0 ) {
      this.toastr.error('S??? l?????ng s???n ph???m ph???i l?? s??? nguy??n d????ng !')
      return ;
    }
    if(this.quantity > this.quantityProduct) {
      this.toastr.error('S??? l?????ng s???n ph???m kh??ng ????? !');
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
              this.toastr.error('S??? l?????ng s???n ph???m kh??ng ?????');
              return ;
            }
            console.log('response: ', response);
            this.toastr.success('S???n ph???m ???? ???????c th??m v??o gi??? h??ng !!');
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

  openSignIn() {
    this.dialog.open(SignInComponent, {
      panelClass: 'custom-dialog-container'
    })
  }

  reloadWithProductRelated(id : any) {
    this.router.navigate(['/product-detail', id]);
    window.location.reload();
  }

}
