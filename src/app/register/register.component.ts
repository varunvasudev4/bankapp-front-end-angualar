import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {



  constructor(private ds: DataService, private router: Router, private fb: FormBuilder) { }

  // accname = ""
  // accnum = ""
  // accpwrd = ""

  //register-model
  registerForm = this.fb.group({
    accname: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    accnum: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    accpwrd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })

  ngOnInit(): void {
  }

  register() {


    //console.log(this.registerForm);
    // var accname = this.accname
    // var accnum = this.accnum
    // var accpwrd = this.accpwrd
    var accname = this.registerForm.value.accname
    var accnum = this.registerForm.value.accnum
    var accpwrd = this.registerForm.value.accpwrd



    if (this.registerForm.valid) {
      this.ds.register(accnum, accname, accpwrd)
        .subscribe((result: any) => {
          console.log(result);
          if (result) {
            alert(result.message)
            this.router.navigateByUrl("")
          }
        },
          result => {
            alert(result.error.message)
            this.router.navigateByUrl("")
          }
        )

    } else {
      alert("Invalid Form")
    }


  }
}
