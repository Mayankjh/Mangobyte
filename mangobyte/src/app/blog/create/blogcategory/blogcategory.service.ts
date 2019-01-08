import { Injectable, ChangeDetectorRef } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { HttpParams, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BlogcategoryService {
  public child_elements:any=[]
  BlogCategories=[]
  constructor(private ls:LoginService) {
    this.getAllBlogCategories();
   }
  getAllBlogCategories(){
    this.ls.http.get(this.ls.serverurl+'blogs/blogcategory/').subscribe(
      (data:any)=>{
        //console.log(data);
        data.forEach(element => {
          this.BlogCategories[element.url]=element;
          if(this.BlogCategories[element.url].body[0]=="{")
            this.BlogCategories[element.url].body = JSON.parse(this.BlogCategories[element.url].body)
        });
        //console.log(this.BlogCategories, this.child_elements);
        this.refresh();
      },
      error=>{
        console.log(error);
      }
    )
  }
  refresh(){
    this.child_elements.forEach(element => {
      element.refresh();
    });
  }
  create_bc(parent_url:string, child_name:string){
    
    if(parent_url=="root" || parent_url==null) parent_url=null;
     this.ls.http.post(this.ls.serverurl+"blogs/blogcategory/",
      new HttpParams()
        .set('name', child_name)
        .set('parent', parent_url)
        .set('creator', this.ls.user.url)
        .set('body', "{\"title\":\"Title of description\",\"image\":\"../assets/images/course-5.jpg\",\"disc\":\"Body Of description\"}")
        ,
      {
        headers:new HttpHeaders()
          .set('Authorization', 'Token '+this.ls.data.token)
      }
      ).subscribe(data=>{
        console.log(data);
        this.getAllBlogCategories();
      }, error=>{
    
      });
  }
  update_bc(url:string, name:string, body:string){
    return this.ls.http.patch(url, 
        new HttpParams().set('name', name).set('body', body),
        {headers: this.ls.getHeaders()})
  }
  delete_bc(url:string){
    // delete child blogcategories
    for(let x in this.BlogCategories){
      if(this.BlogCategories[x].parent==url){
        //
        if(x!=null)
          this.delete_bc(x);
        console.log(x);
      }
    }
    //delete child blogs

    //delete self
    this.ls.http.delete(url, {headers: this.ls.getHeaders()}).subscribe(
      data=>{
        console.log(data);
      },
      error=>{
        console.log(error);
      }
    );
  }
}
