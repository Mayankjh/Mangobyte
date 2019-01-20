import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoginService } from '../login/login.service';
import { BlogcategoryService } from '../blog/create/blogcategory/blogcategory.service';
import { BlogService } from '../blog/blog.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private ls:LoginService, private BCS:BlogcategoryService, private BS:BlogService, private cdr:ChangeDetectorRef) {
    this.BCS.addChild(this);
    BS.addChild(this);
  }
  nav_list=[
    ["Home", ""],
    ["Create Blog", "pencil"],
    ["Edit a blog category", ""],
    ["Logout", "power-off"]  
  ]
  nav_selected=this.nav_list[0][0]
  updatenav(nav){
    this.nav_selected=nav[0];
    this.cdr.detectChanges();
    if (this.nav_selected=="Logout"){
      this.ls.logout();
      
    }
    //console.log(this.nav_selected, nav);
  }
  selected_blc:any;
  public selected_blog_category(value){
    //document.getElementById('blc-card').style.display='none';
    this.selected_blc = value.url;
    this.cdr.detectChanges();
    document.getElementById("bce_image_prev").style.backgroundImage='url('+this.BCS.BlogCategories[this.selected_blc].body.image+')';

  }
  update_bc(){
    // get all the elements
    var url = this.selected_blc, img = document.getElementById('bce_image').innerText, name = document.getElementById('bce_name').innerText,
      title = document.getElementById('bce_title').innerText, disc = document.getElementById('bce_desc').innerText;
      if(img.indexOf("https://drive.google.com/file/d/")!=-1){
      // drive image
      img="https://drive.google.com/uc?export=view&id="+img.split("/")[5];
      }
      var body = JSON.stringify({
        title:title,
        image:img,
        disc:disc
      })
      this.BCS.update_bc(this.selected_blc, name, body).subscribe(data=>{
        console.log(data);
        this.BCS.getAllBlogCategories();
        
      }, error=>{
        console.log(error)
      });

  }
  delete_bc(){
    var url = this.selected_blc;
    this.selected_blc=null;
    this.BCS.delete_bc(url);
  }
  ngOnInit() {
    if(this.ls.data.islogged==false){
      console.log(this.ls.child_elements);
    }
    console.log()
  }
  refresh(){
    console.log('I was caslled')
    this.cdr.detectChanges();
  }
}
