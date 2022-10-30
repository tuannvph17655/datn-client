import {Component, OnInit, ViewChild} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Order} from 'src/app/models/order';
import {OrderService} from 'src/app/services/order.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {

  public orders: Order[] = [];
  reason: string = '';
  orderId: string = '';
  @ViewChild('exampleModal') modal: any;

  //page
  page: number = 0;
  pageSize !: number;
  totalPages: number = 0;
  totalElements!: number;
  totalOrder: number = 0;

  req: any = {
    "textSearch": "",
    "status": "",
    "pageReq": {
      "page": 0,
      "pageSize": 5,
      "sortField": "",
      "sortDirection": ""
    }
  }

  constructor(
    private orderService: OrderService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit() {
    // this.getListOrder();
    this.searchListOrder(this.req);
  }

  getListOrder() {
    this.orderService.getListOrder().subscribe({
      next: (res: any) => {
        this.orders = res.data.orderRes;
      }, error: (err) => {
        console.log('error: ', err);
      }
    })
  }

  searchListOrder(req: any) {
    this.orderService.listOrder(req).subscribe({
      next: (res: any) => {
        console.log('res list search order: ', res);
        this.orders = res.data;
        this.totalOrder = this.orders.length;
        this.page = res.page;
        this.pageSize = res.pageSize;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;

      }, error: (err) => {
        console.log('error: ', err);
      }
    })
  }

  cancelOrder(id: string) {
    console.log('orderId: ', id);
    this.orderId = id;
    console.log('reason CHECKED: ', this.reason);
  }

  confirmReasonOrder() {
    console.log('orderId value:', this.orderId);
    console.log('reason: ', this.reason);

    const data = {
      orderId: this.orderId,
      note: this.reason
    }

    this.orderService.cancelOrder(data).subscribe({
      next: (res: any) => {
        console.log('res: ', res);
        this.toastr.success('Hủy đơn hàng thành công !');
        //this.getListOrder();
        this.searchListOrder(this.req);
      }, error: (err) => {
        console.log('error: ', err);
      }
    })

    this.resetReason();
    this.hideModal();

  }

  pageChange(page: any) {
    this.req.pageReq.page = page - 1;
    console.log('req page change', this.req);
    this.searchListOrder(this.req);
  }


  hideModal() {
    this.modal.nativeElement.click();
  }

  resetReason() {
    this.reason = '';
  }


}
