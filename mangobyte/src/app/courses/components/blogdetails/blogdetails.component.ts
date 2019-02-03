import { Component, OnInit, Input } from '@angular/core';
import { BlogcategoryService } from 'src/app/blog/create/blogcategory/blogcategory.service';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/blog/blog.service';
import { LoginService } from 'src/app/login/login.service';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { initDomAdapter } from '@angular/platform-browser/src/browser';
import { HttpParams } from '@angular/common/http';
declare var $:any;
@Component({
  selector: 'app-blogdetails',
  templateUrl: './blogdetails.component.html',
  styleUrls: ['./blogdetails.component.scss']
})
export class BlogdetailsComponent implements OnInit {

  @Input() id:any;
  blog:any=null;
  constructor(private BS:BlogService,private BLS:BlogService, private LS:LoginService) {
    this.BS.addChild(this);
    BLS.addChild(this);
  }
  ngOnInit(){
  }
  editable=false
  refresh(){
    
    this.id = this.LS.serverurl+'blogs/blog/'+this.id+'/'
    this.blog=this.BS.Blogs[this.id];
    console.log("refresh blogdetails was called!", this.blog)
    // if blog doesn't have body, request it from server
    if(!('body' in this.blog)){
      this.BLS.getBlog(this.blog.url).subscribe((data:any)=>{
        this.blog = data;
        console.log("Blog retrived from server", this.blog);
      })
    }
    this.fill_blog();
  }
  fill_blog(){
    document.getElementById("blog-container").innerHTML = this.blog.body;
  }
  update_blog(body){
    
  }
  edit(){
    this.editable=true;
  }
  update(){
    document.getElementById('editor')['contentWindow']['$']('#content-area').keditor('setContent', this.blog.body); 
  }
  get(){
    this.blog.body=document.getElementById('editor')['contentWindow']['$']('#content-area').keditor('getContent'); 
    this.fill_blog();
  }
  close(){
    document.getElementById('editor')['src']='';
  }
  save(){
    this.editable=false;
    this.LS.http.patch(this.blog.url, new HttpParams().set('body', this.blog.body), {
      headers:this.LS.getHeaders()
    }).subscribe(data=>{
      alert("Blog saved, reload to verify!");
    })
  }
  get_id_from_url(url){
    return url.split("/")[5]
  }

}
