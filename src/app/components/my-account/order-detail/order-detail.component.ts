import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderDetail} from 'src/app/models/order-detail';
import {ProductOrder} from 'src/app/models/product-order';
import {OrderService} from '../../../services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  id !: string;
  public orderDetail!: OrderDetail;
  public productOrder: ProductOrder[] = [];
  reviewExists = false;

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

  getOrderDetail(id: string) {
    this.order.getOrderDetail(id).subscribe({
      next: (res: any) => {
        console.log('res order detail', res);
        this.orderDetail = res.data;
        this.productOrder = res.data.product;
      }, error: (err) => {
        console.log('err', err);
      }
    })
  }

  //check Product exists review in list order detail with checkReview
  checkReview(id: string) {
    this.order.checkReview(id).subscribe({
      next: (res: any) => {
        console.log('res check review', res);
        this.reviewExists = res.data;
      }, error: (err) => {
        console.log('err', err);
      }
    })
  }


}
