import { Component, OnInit, ViewChild } from '@angular/core';
import { Address } from 'src/app/models/address';
import { District } from 'src/app/models/district';
import { Province } from 'src/app/models/province';
import { Ward } from 'src/app/models/ward';

@Component({
  selector: 'app-my-address',
  templateUrl: './my-address.component.html',
  styleUrls: ['./my-address.component.css']
})
export class MyAddressComponent implements OnInit {
  provinces: Province[] = [];
  districts : District[] = [];
  wards: Ward[] = [];
  provinceSelected !: any;
  districtSelected !: any;
  wardCodeSelected !: string;

  @ViewChild('exampleModal') modal:any;

  public address: Address[] = [];

  provinceNameSelected!:string;
  districtNameSelected!:string;
  wardNameSelected!:string;
  constructor() { }

  ngOnInit(): void {
  }

}
