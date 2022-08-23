import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //variables or properties
  aim = "Money you can trust"

  acc = "Plese enter account number"


  //database
  // accounts:any = {
  //   1000:{accno:1000,accname:"Max",accpwrd:1000,accbal:5000},
  //   1001:{accno:1001,accname:"Maxwell",accpwrd:1001,accbal:6000},
  //   1002:{accno:1002,accname:"Alan",accpwrd:1002,accbal:4000}

  // }
  //dependency injection
  constructor(private router: Router, private ds: DataService, private fb: FormBuilder) { }

  // accnum = ""
  // accpwrd = ""

  lform = this.fb.group({
    accnum: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    accpwrd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })


  ngOnInit(): void {
  }

  login() {
    var acno = this.lform.value.accnum
    var pwrd = this.lform.value.accpwrd
    if (this.lform.valid) {
      this.ds.login(acno, pwrd).subscribe((result: any) => {
        console.log(result);
        if (result) {
          localStorage.setItem("cuserid",JSON.stringify(result.currentUserID))
          localStorage.setItem("cusername",JSON.stringify(result.currentUserName))
          localStorage.setItem("token",JSON.stringify(result.token))
          alert(result.message)
          this.router.navigateByUrl("dashboard")
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

  //event binding
  // accnumChg(event:any){
  //   this.accnum = event.target.value
  // }
  // accpwrdChg(event:any){
  //   this.accpwrd = event.target.value
  // }

  //templete reference variable binding
  // login(a:any,b:any){
  //   var acno = a.value
  //   var pwrd = b.value
  //   let accs = this.accounts
  //   if(acno in accs){
  //     if(pwrd == accs[acno]['accpwrd']){
  //       alert("login successfull")
  //     }else{
  //       alert("incorrect password")
  //     }
  //   }else{
  //     alert("user dosen't excist")
  //   }
  // }
}
