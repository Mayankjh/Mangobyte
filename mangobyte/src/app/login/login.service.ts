import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public serverurl:string="https://hashblog.herokuapp.com/";
  public csrfmiddleware:string;
  public cookietoken:string;
  public logdetails={}
  public refreshfunctions=[]
  constructor(private http: HttpClient) { 
    /**
     * 1 . Contact server to get details of cookies and all....
     * 2 . Save those details in local variable
     */
    http.get(this.serverurl+"cookiestoken/", {
      withCredentials:true
      } ).subscribe((data)=>{
      this.csrfmiddleware = data['csrfmiddlewaretoken'];
      console.log(data);
      if(data['loginstatus']==true){
        this.logdetails['loginstatus']=true;
        this.logdetails['id']=data['id'];
      } else this.logdetails['loginstatus']=false;
      //this.login('govindsingh', 'g1234567g');
      this.refreshfunctions.forEach(element => {
        element();
      });
    });
    
    //console.log('I was here');
  }
  login(username:string, password:string){
    let enco : any = new HttpHeaders()
    .set('X-CSRFToken', this.csrfmiddleware)
    .set('Content-type', 'application/x-www-form-urlencoded')
    

    let body : any = new HttpParams()
    .set('csrfmiddlewaretoken', this.csrfmiddleware)
      .set('username', username)
      .set('password', password);
      console.log(body);
    this.http.post(this.serverurl+'login/',
        body,
        {
          headers: enco,withCredentials:true
        }
      ).subscribe((data)=>{console.log(data);
        this.logdetails['loginstatus']=true;
        this.logdetails['id']=data['id'];
        this.refreshfunctions.forEach(element => {
          element();
        });
      });
  }

  logout(sub=(data)=>{console.log(data);}){
    this.http.get(this.serverurl+"logout/", {
      withCredentials:true
      } ).subscribe((data)=>{
      //sub(data);
     
      this.logdetails['loginstatus']=false;
      this.logdetails['id']=-1;


      this.refreshfunctions.forEach(element => {
        element();
      });
    });
  }
}
