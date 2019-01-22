import { Injectable, ChangeDetectorRef } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { HttpParams, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BlogcategoryService {
  public child_elements: any = []
  BlogCategories : any;
  constructor(private ls: LoginService) {
    this.getAllBlogCategories();
  }
  getAllBlogCategories() {
    console.log("Get all blg cat called", this.BlogCategories)
    this.BlogCategories={}
    this.ls.http.get(this.ls.serverurl + 'blogs/blogcategory/').subscribe(
      (data: any) => {
        //console.log(data);
        data.forEach(element => {
          this.BlogCategories[element.url] = element;
          if (this.BlogCategories[element.url].body[0] == "{")
            this.BlogCategories[element.url].body = JSON.parse(this.BlogCategories[element.url].body)
        });
        //console.log(this.BlogCategories, this.child_elements);
        this.refresh();
      },
      error => {
        console.log(error);
      },
      ()=>{
        console.log("Get all blg cat final", this.BlogCategories)
      }
    )
  }
  create_bc(parent_url: string, child_name: string) {

    if (parent_url == "root" || parent_url == null) parent_url = '';
    this.ls.http.post(this.ls.serverurl + "blogs/blogcategory/",
      new HttpParams()
        .set('name', child_name)
        .set('parent', parent_url)
        .set('creator', this.ls.user.url)
        .set('body', '{"title":"Title of description","image":"../assets/images/course-5.jpg","disc":"Body Of description"}')
      ,
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Token ' + this.ls.data.token)
      }
    ).subscribe(data => {
      //console.log(data);
      this.getAllBlogCategories();
    }, error => {
      console.log(error);
    });
  }
  update_bc(url: string, name: string, body: string) {
    return this.ls.http.patch(url,
      new HttpParams().set('name', name).set('body', body),
      { headers: this.ls.getHeaders() })
  }
  delete_bc(url: string, fun=()=>{}) {
    // delete child blogcategories
    //console.log(this.BlogCategories);
      this.ls.http.delete(url, { headers: this.ls.getHeaders() }).subscribe(
        data => {
          console.log("Blog category {" + url + "} was deleted");
        },
        error => {
          console.log("Error in deleting the blog:", error);
        },
        ()=>{
          //finally 
          this.getAllBlogCategories();
          fun();
        
        }
      );
    
  }

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
}
