import {Component, OnInit, ViewChild} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Order} from 'src/app/models/order';
import {OrderService} from 'src/app/services/order.service';
import {FormControl, FormGroup} from "@angular/forms";
import {FilterOrderForm, PageReq} from "../../../models/filter-order-form";

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
    "status": "PENDING",
    "pageReq": {
      "page": 0,
      "pageSize": 5,
      "sortField": "",
      "sortDirection": ""
    }
  }
  filterForm = new FormGroup({
    textSearch : new FormControl('')
  })

  constructor(
    private orderService: OrderService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit() {
    this.searchListOrder(this.req);
  }


  searchListOrder(req: any) {
    this.req.textSearch = this.filterForm.value.textSearch;
    console.log('textSearch = ', this.req.textSearch);
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

  fillStatusOrder(status : String) {
    this.req.status = status;
    this.searchListOrder(this.req);
    console.log("status " , this.req.status )
  }



}
