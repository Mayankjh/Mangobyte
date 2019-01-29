import { Injectable } from '@angular/core';
import {LoginService} from '../login/login.service';
import { HttpBackend, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  Blogs:any={}
  constructor(private LS:LoginService){
    this.getAllBlogs();
  }
  getAllBlogs(){
    // only the previews will be loaded
    this.LS.http.get(this.LS.serverurl+'blogs/blog/', {
        headers: this.LS.getHeaders()
    }).subscribe( (data:any)=>{
      for(let x of data){
        this.Blogs[x.url]=x;
      }
      console.log(this.Blogs);
    }, error=>console.log(error), ()=>{
      this.refresh();
    });
  }
  getBlog(url:string){
    // returns s subscribable that will provide the body as well
    return this.LS.http.get(url)
  }
  create_blog(name:string, category:string, blog_type:string, body:any){
    this.LS.http.post(this.LS.serverurl+'blogs/blog/', new HttpParams()
      .set('name', name)
      .set('blog_type', blog_type)
      .set('category', category)
      .set('body', JSON.stringify(body)), {
        headers:this.LS.getHeaders()
      }).subscribe((data:any)=>{
        this.Blogs[data.url]=data;
        alert('Blog is created successfully');
        this.refresh();
      })
  }


  //refresh childs
  child_elements=[];
  refresh(){
    for(let x in this.child_elements){
      this.child_elements[x].refresh();
    }
  }
  addChild(x:any){
    if(this.child_elements.indexOf(x)==-1){
      this.child_elements.push(x);
    }
  }

}

