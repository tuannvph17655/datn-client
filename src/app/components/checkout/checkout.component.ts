import { Component, OnInit } from '@angular/core';
import { Province } from 'src/app/models/province';
import { GhnService } from 'src/app/services/ghn.service';
import { District } from '../../models/district';
import { Ward } from '../../models/ward';
import { Shipping } from '../../models/shipping';
import { Service } from 'src/app/models/service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { REGEX_CUSTOM } from 'src/app/models/constant';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/models/cart';
import { AddressService } from 'src/app/services/address.service';
import { Address } from 'src/app/models/address';
import { OrderService } from 'src/app/services/order.service';
import { CreateOrder } from 'src/app/models/create-order';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  showMe : boolean = true
  provinces!: Province[];
  districts!: District[];
  wards!: Ward[];
  shipping !: Shipping;
  services !: Service[];
  provinceSelected !: number;
  districtSelected !: number;
  wardCodeSelected !: string;
  serviceSelected !: number;

  public cart!: Cart[];
  public address: Address[] = [];

  public addressDefault !: Address;

  addressSelected !: string;

  totalPrice!: any;
  shipPrice!: number;
  total!:number;
  totalQuality !: number;

  order!: CreateOrder;

  height !: number;
  length !: number;
  weight !: number;
  width !: number

  checkoutForm = new FormGroup({
    addressId: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    name: new FormControl('',[Validators.required],),
    phone: new FormControl('',[Validators.required, Validators.pattern(REGEX_CUSTOM.PHONE_NUMBER)],),
    address: new FormControl('',[Validators.required]),
    note: new FormControl(''),
    province: new FormControl('',[Validators.required]),
    district: new FormControl('',[Validators.required]),
    ward: new FormControl('',[Validators.required]),
    // shippingMethod: new FormControl('',[Validators.required]),
    paymentMethod: new FormControl('',[Validators.required]),
    coupon: new FormControl(''),
  })

  constructor(
    private GhnService: GhnService,
    private cartService: CartService,
    private toastr: ToastrService,
    private addressService:AddressService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit() {
    this.getProvinces();
    this.getAllCart();
    this.getListAddress();
    this.togleTag();
    this.getAddressDefault();
  }

  togleTag() {
    if(this.showMe == false) {
      this.showMe = !this.showMe;
    } else  {
      this.showMe = !this.showMe;
    }
  }

  getAddressDefault() {
     this.addressService.getDefaulAddress().subscribe(
      {
        next : (address:any)=> {
          console.log('address get Id default: ',address);
          this.addressDefault = address.data;
          this.addressSelected === this.addressDefault.id;
          this.checkoutForm.patchValue({
            name: address.data.nameOfRecipient,
            address: address.data.addressDetail,
            province: address.data.provinceId,
            district: address.data.districtId,
            ward: address.data.wardCode,
          })
          console.log('checkoutForm by address default: ',this.checkoutForm.value);
          //path provinceId selected
          this.provinceSelected = address.data.provinceId;
          this.getDistricts(this.provinceSelected);
          this.districtSelected = address.data.districtId;
          this.getWards(this.districtSelected);
          // this.getService(this.districtSelected);
          this.getShipping(this.districtSelected, this.wardCodeSelected);
        }
      }
     )
  }

  //if class caddress select addvalue to address
  onChangeAddress(e:any){
    this.addressService.getAddressById(e.target.value).subscribe(
      {
        next: (address:any)=>{
          console.log('address get Id: ',address);
          this.checkoutForm.patchValue({
            name: address.data.nameOfRecipient,
            address: address.data.addressDetail,
            province: address.data.provinceId,
            district: address.data.districtId,
            ward: address.data.wardCode,
          })
          console.log('checkoutForm: ',this.checkoutForm.value);
          //path provinceId selected
          this.provinceSelected = address.data.provinceId;
          this.getDistricts(this.provinceSelected);
          this.districtSelected = address.data.districtId;
          this.getWards(this.districtSelected);
          // this.getService(this.districtSelected);
          this.getShipping(this.districtSelected, this.wardCodeSelected);
        }
      }
    )
  }

  




  get f(){
    return this.checkoutForm.controls;
  }

  getAllCart(){
    this.cartService.getListCart().subscribe({
      next: (response:any) => {
        console.log('res :',response);
        this.cart = response.data.carts;
        this.totalPrice = response.data.totalPrice;
        this.totalQuality = response.data.totalQuality;
        this.weight = 150 * this.totalQuality;
        this.height = this.totalQuality ;
        this.length = 60 ;
        this.width = 50;
        console.log('cart : ',this.cart);
        console.log('totalqality : ',this.totalQuality)

      },error: (err) => {
        console.log('error: ',err);
      }
    });
  }

  getListAddress(){
    this.addressService.getListAddress().subscribe({
      next: (res: any) => {
        console.log('data : ',res);
        this.address = res.data;
        console.log('address:',this.address);
      },error: (err) => {
        console.log('error: ',err);
      }
    })
  }

  getProvinces(){
    this.GhnService.getProvinces().subscribe({
      next: (res: any) => {
        console.log('res province', res);
        console.log('res data provinces', res.data);
        this.provinces = res.data;
        console.log('provinces', this.provinces);
      }
      ,error: (err) => {
        console.log(err);
      }
    })
  }

  onChangeProvince(e:any){
    this.provinceSelected = e.target.value;
    console.log('provinceSelected', this.provinceSelected);
    this.getDistricts(this.provinceSelected);
  }

  getDistricts(provinceId:number){
    if(this.provinceSelected === null){
      return ;
    }
    this.GhnService.getDistricts(provinceId).subscribe({
      next: (res: any) => {
        console.log('res district', res);
        console.log('res data district', res.data);
        this.districts = res.data;
        console.log('districts', this.districts);
      }
      ,error: (err) => {
        console.log(err);
      }
    })
  }

  onChangeDistrict(e:any){
    this.districtSelected = e.target.value;
    console.log('districtSelected', this.districtSelected);
    this.getWards(this.districtSelected);
  }

  getWards(districtId: number){
    if(this.districtSelected === null){
      return ;
    }
    this.GhnService.getWards(districtId).subscribe({
      next: (res: any) => {
        console.log('res ward', res);
        this.wards = res.data;
        console.log('res data ward', res.data);
      }
      ,error: (err) => {
        console.log(err);
      }
    })
  }

  onChangeWard(e:any) {
    this.wardCodeSelected = e.target.value;
    console.log('wardCodeSelected', this.wardCodeSelected);
    // this.getService(this.districtSelected);

  }

  //getShipping
  getShipping(districtId: number, wardCode: string){
    this.GhnService.getShipping(districtId, wardCode, this.height,this.length, this.weight,this.width).subscribe({
      next: (res: any) => {
        console.log('res shipping', res);
        this.shipping = {
          totalShip: res.data.total,
          service_fee: res.data.service_fee
        }
        this.shipPrice = res.data.total;

        //summation total price and ship price set to total
        this.total = this.totalPrice + this.shipPrice;

        console.log('shippingPrice', this.shipPrice);
        console.log('res data shipping', res.data);

      },error: (err) => {
        console.log('err shipping :',err);
      }
    })
  }

  // getService(toDistrict: number){
  //   this.GhnService.getService(toDistrict).subscribe({
  //     next: (res: any) => {
  //       console.log('res service', res);
  //       this.services = res.data;
  //       console.log('res data service', res.data);
  //     }
  //     ,error: (err) => {
  //       console.log(err);
  //     }
  //   })
  // }

  // serviceChange(e:any){
  //   this.serviceSelected = e.target.value;
  //   console.log('serviceSelected', this.serviceSelected);
  //   this.getShipping(this.serviceSelected,this.districtSelected, this.wardCodeSelected);
  // }


  // serviceChanges(value:any){
  //   this.serviceSelected = value;
  //   console.log('serviceSelected', this.serviceSelected);
  //   this.getShipping(this.serviceSelected,this.districtSelected, this.wardCodeSelected);
  // }

  checkout(){

    console.log('checkoutForm', this.checkoutForm.value);

    const myId = uuidv4();
    //set checkoutForm value to order object
    const orders = {
      id :myId ,
      addressId: this.checkoutForm.value.addressId ,
      note: this.checkoutForm.value.note,
      paymentMethod: this.checkoutForm.value.paymentMethod,
      shipPrice: this.shipPrice,
      total: this.total,
      shipMethod: environment.shipMethod
      // coupon : this.checkoutForm.value.coupon
    }


    console.log('order', orders);

     this.orderService.checkout(orders).subscribe({
      next: (res: any) => {
        console.log('res checkout', res);
        this.router.navigate(['/checkout/success']);
      }
     })


  }


}

