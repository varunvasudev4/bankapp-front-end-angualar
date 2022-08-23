import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {




  user = ""

  constructor(private ds: DataService, private fb: FormBuilder,private router:Router) {
    if(localStorage.getItem('cusername')){
      this.user = JSON.parse(localStorage.getItem('cusername') || '')
    }
    this.logdate = Date();
  }

  // accnum = ""
  // accpwrd = ""
  // accamt = ""

  dform = this.fb.group({
    accnum :['',[Validators.required,Validators.pattern('[0-9]*')]],
    accpwrd :['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    accamt:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })

  // accnum2 = ""
  // accpwrd2 = ""
  // accamt2 = ""

  wform = this.fb.group({
    accnum2 :['',[Validators.required,Validators.pattern('[0-9]*')]],
    accpwrd2 :['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    accamt2:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })


  ngOnInit(): void {
    if(!localStorage.getItem('cuserid')){
      //alert("Please Login")
      this.router.navigateByUrl('')
    }

  }


  deposit() {

    if(this.dform.valid){
      this.ds.deposit(this.dform.value.accnum, this.dform.value.accamt)
      .subscribe((result: any) => {
        //console.log(result);
        if (result) {
          alert(result.message)
        }
      },
        result => {
          alert(result.error.message)
        }
      )
      
  }else{
    alert("Invalid Form")
  }

  }

  widraw() {
    if(this.wform.valid){
      this.ds.widraw(this.wform.value.accnum2, this.wform.value.accamt2)
      .subscribe((result: any) => {
       // console.log(result);
        if (result) {
          alert(result.message)
        }
      },
        result => {
          alert(result.error.message)
        }
      )
  }else{
    alert("Invalid Form")
  }
  }

  logout(){
    localStorage.removeItem('cuserid');
    localStorage.removeItem('cusername')
    localStorage.removeItem('token')
    this.router.navigateByUrl('')
  }

  //acno to child
  acno:any

  delpar(){
    this.acno= JSON.parse(localStorage.getItem('cuserid') || "")
  }

  cancel(){
    this.acno=""
  }

  confirm(event:any){
    this.ds.delete(event)
    .subscribe(
      (result: any) => {
          alert(result.message)
          this.logout()
       },
      result => {
           alert(result.error.message)
         }
       )
  }

  logdate: any
}
