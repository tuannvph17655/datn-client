import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderDetail} from 'src/app/models/order-detail';
import {ProductOrder} from 'src/app/models/product-order';
import {OrderService} from 'src/app/services/order.service';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.css']
})
export class CheckoutSuccessComponent implements OnInit {
  id !: string;
  public orderDetail!: OrderDetail;
  public productOrder : ProductOrder[] = [];

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private order: OrderService

  ) {

   }

  ngOnInit() {
    this.id = this.activeRoute.snapshot.params['id'];
    this.getOrderDetail(this.id);
  }


  getOrderDetail(id:string){
    this.order.getOrderDetail(id).subscribe({
      next: (res:any) => {
        console.log('res order detail',res);
        this.orderDetail = res.data;
        this.productOrder = res.data.product;
      },error: (err) => {
        console.log('err', err);
      }
    })
  }

}
