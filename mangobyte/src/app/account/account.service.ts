import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  serverurl = "http://localhost:8000/"
  constructor(public http:HttpClient) { 
    this.serverurl="https://hashbook.herokuapp.com/"
  }
  islogged=false
  user:any=null;
  token:string=null;
  login(){
  }
  googleLogin(id_token){
    return this.http.post(this.serverurl+'logingoogle/', new HttpParams().set('id_token', id_token))
      .subscribe(data=>{
        if(data['token'] != 'failed') {
          this.token=data['token']
          this.islogged=true
          // here 
          this.refresh();
        }
      })
  }
  checkuser(){

  }
  logout(){
    return this.http.post(this.serverurl+'logout/', new HttpParams(), {headers:new HttpHeaders().set('Authorization', 'Token ' + this.token)})
  }
  child_elements:any=[]
  addChild(element:any){
    if(this.child_elements.indexOf(element)==-1)
      this.child_elements.push(element)
    else console.log("Element already existed")
    
  }
  refresh(){
    for(let x of this.child_elements) x.refresh();
  }

}
