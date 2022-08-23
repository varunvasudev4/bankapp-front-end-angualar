import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  trans:any
  constructor(private ds:DataService) {
    this.ds.getTrans().subscribe((result: any) => {
      console.log(result);
      if (result) {
        this.trans = result.transaction
      }
    },
      result => {
        alert(result.error.message)
      }
    )
     
   }
  
  ngOnInit(): void {
  }



}
