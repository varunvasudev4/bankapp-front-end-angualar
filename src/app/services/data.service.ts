import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


//global header
const option ={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})



export class DataService {


  constructor(private http:HttpClient) {
   }

  

  login(accno:any,accpwrd:any){
    const data ={
      accno,
      accpwrd
    }
    //login api call
    return this.http.post('http://localhost:3000/login',data)
  }


  register(accno:any,accname:any,accpwrd:any){
    const data = {
      accno,
      accname,
      accpwrd
    }
    //register api call
    return this.http.post('http://localhost:3000/register',data)
  }

 

  getToken(){
    const token = JSON.parse(localStorage.getItem('token')||'')
    let headers = new HttpHeaders()
    if(token){
      headers = headers.append('token',token)
      //impliment overload
      option.headers=headers
    }
    return option
  }

  deposit(accnum:any,accamt:any){
    const data ={
      accno:accnum,
      accamt
    }
    return this.http.post('http://localhost:3000/deposit',data,this.getToken())
  }

  widraw(accnum:any,accamt:any){
    const data ={
      accno:accnum,
      accamt
    }
    return this.http.post('http://localhost:3000/widraw',data,this.getToken())
  }
  
  getTrans(){
    const data ={
     accno:JSON.parse(localStorage.getItem('cuserid')||'')
    }
    return this.http.post('http://localhost:3000/getTrans',data,this.getToken())
  }

  delete(accno:any){
    return this.http.delete('http://localhost:3000/delete/'+accno)
  }

  
}

