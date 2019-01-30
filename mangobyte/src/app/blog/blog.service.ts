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
        x.preview = JSON.parse(x.preview);
        this.Blogs[x.url]=x;
      }
      console.log(this.Blogs);
    }, error=>console.log(error), ()=>{
      this.refresh();
    });
  }
  getBlog(url:string){
    // returns s subscribable that will provide the body as well
    return this.LS.http.get(url);
  }
  create_blog(name:string, category:string, blog_type:string, preview:any){
    this.LS.http.post(this.LS.serverurl+'blogs/blog/', new HttpParams()
      .set('name', name)
      .set('blog_type', blog_type)
      .set('category', category)
      .set('preview', JSON.stringify(preview)), {
        headers:this.LS.getHeaders()
      }).subscribe((data:any)=>{
        this.Blogs[data.url]=data;
        alert('Blog is created successfully');
        this.refresh();
      })
  }
  update_blog(url:string, name:string, preview:any=null){
    // making sure to preserve other datas
    if(preview.med_url.indexOf("https://drive.google.com/file/d/")!=-1){
      // drive image
      preview.med_url="https://drive.google.com/uc?export=view&id="+preview.med_url.split("/")[5];
      }
    //console.log(preview);
    for(let x in preview){
      // body is a {}
      if(preview[x].length == 0) continue;
      this.Blogs[url].preview[x]=preview[x];
    }
    var json_body=JSON.stringify(this.Blogs[url].preview);
    console.log(json_body);
    this.LS.http.patch(url, new HttpParams().set('name', name).set('preview', json_body),{
      headers:this.LS.getHeaders()
    }).subscribe((x:any)=>{
      x.preview = JSON.parse(x.preview);
        this.Blogs[x.url]=x;
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

