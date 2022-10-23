import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/models/cart';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public cart!: Cart[];
  totalPrice!: string;
  quantity!:number;

  constructor(
    private spinner: NgxSpinnerService,
    private cartService: CartService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getAllCart();
  }

  getAllCart(){
    this.cartService.getListCart().subscribe({
      next: (response:any) => {
        console.log('res :',response);
        this.cart = response.data.carts;
        this.totalPrice = response.data.totalPrice;
        console.log('cart : ',this.cart);

      },error: (err) => {
        console.log('error: ',err);
      }
    });
  }

  increment(cart: Cart) {
    this.cartService.updateCart(cart.productOptionId!, cart.quantity! + 1).subscribe({
      next: (response:any) => {
        this.getAllCart();
      }
    });
  }

  decrement(cart: Cart): void {

    //if quantity = 1 then click decrement will delete item
    if(cart.quantity == 1){
      this.deleteItem(cart.productOptionId);
    }

    this.cartService.updateCart(cart.productOptionId!, cart.quantity! - 1).subscribe({
      next: (response:any) => {
        this.getAllCart();
        this.toastr.success('Update cart success !!!');
      }
    });
  }

  deleteItem(id:any){
    this.cartService.deleteCart(id).subscribe({
      next: (response:any) => {
        console.log('res :',response);
        this.getAllCart();
      },error: (err) => {
        console.log('error: ',err);
      }
    });
  }

  changeQuantity(e : any,cart: Cart){
    console.log('e : ',e);
    console.log('cart : ',cart);

    if(e.target.value > Number(cart.quantityAvailable)){
      this.toastr.error('Số lượng sản phẩm không được lớn hơn ' + cart.quantityAvailable);
      e.target.value = cart.quantity;
      return;
    }

    if(e.target.value < 0){
      this.toastr.error('Số lượng phải lớn hơn 0');
      this.getAllCart();
      return ;
    }

    if(e.target.value == 0) {
      this.deleteItem(cart.productId);
      this.getAllCart();
      return;
    }

    //check quantity
    this.cartService.updateCart(cart.productOptionId!, e.target.value).subscribe({
      next: (response:any) => {
        this.getAllCart();
        this.toastr.success('Update cart success !!!');
      }
    });


    if(e.target.value == ''){
      this.cartService.updateCart(cart.productOptionId!, 1).subscribe({
        next: (response:any) => {
          this.getAllCart();
          this.toastr.success('Update cart success !!!');
        }
      });
    }
  }

  deletedAllCart() {
    this.cartService.clearAllCart().subscribe({
      next: (response:any) => {
        console.log('res :',response);
        this.getAllCart();
      },error: (err) => {
        console.log('error: ',err);
    }
  });
  }

}
