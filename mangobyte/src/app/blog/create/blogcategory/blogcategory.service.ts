import { Injectable, ChangeDetectorRef } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { HttpParams, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BlogcategoryService {
  
  BlogCategories:any={};
  constructor(private LS:LoginService){
    this.getAllBlogCategories();
  }
  getAllBlogCategories(){
    this.LS.http.get(this.LS.serverurl+'blogs/blogcategory/').subscribe((data:any)=>{
      for(let x of data){
        x.body = JSON.parse(x.body);
        this.BlogCategories[x.url]=x;
      }
      this.refresh();
    })
  }
  child_elements:any=[];
  refresh(){
    for(let x of this.child_elements){
      x.refresh();
    }
  }
  addChild(x:any){
    if(this.child_elements.indexOf(x)==-1){
      this.child_elements.push(x);
    }
  }
  create_bc(parent_url='', name=''){
      this.LS.http.post(this.LS.serverurl+'blogs/blogcategory/', 
        new HttpParams().set("name", name)
          .set("category", parent_url)
        ,{headers: this.LS.getHeaders()}).subscribe((data:any)=>{
          this.BlogCategories[data.url]=data;
          this.refresh();
          // console.log(data);
        })
  }
  delete_bc(url){
    this.LS.http.delete(url, {headers: this.LS.getHeaders()}).subscribe(data=>{
      delete this.BlogCategories[url];
      this.refresh();
    });
  }
  updateBlog(url:string, name:string, body:any=null){
    // making sure to preserve other datas
    console.log(body);
    for(let x in body){
      // body is a {}
      
      if(body[x].length == 0) continue;
      this.BlogCategories[url].body[x]=body[x];
    }
    var json_body=JSON.stringify(this.BlogCategories[url].body);
    console.log(json_body);
    this.LS.http.patch(url, new HttpParams().set('name', name).set('body', json_body),{
      headers:this.LS.getHeaders()
    }).subscribe(data=>{
      console.log(data);
    })
  }
}
