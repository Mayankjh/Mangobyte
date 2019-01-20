import { Component, OnInit, Input } from '@angular/core';
import { BlogcategoryService } from 'src/app/blog/create/blogcategory/blogcategory.service';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/blog/blog.service';
import { LoginService } from 'src/app/login/login.service';
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
    if(this.BLS.allBlogs==null){
      this.BLS.getAllBlogs();
    }
  
  }
  ngOnInit(){
    //this.refresh();
    //console.log("I was here in blg det", this.id);
    if(this.BS.allBlogs==null)this.BS.getAllBlogs();

  }
  editable=false
  refresh(){
    this.blog=this.BS.allBlogs[Number(this.id)];
    //console.log(this.blog, this.BS.allBlogs);
    for(let x of this.BS.allBlogs){
      if(x.url==this.LS.serverurl+"blogs/blog/"+this.id+"/")this.blog=x;
    }
    if(this.blog==null)this.blog='404';
    $.getScript('../../../assets/js/main.js');
    console.log(this.blog);
  }
  update_blog(head, author,disc1, authorimg,authdesc, media_url, disc2){
    if(media_url.indexOf("https://drive.google.com/file/d/")!=-1){
      // drive image
      media_url="https://drive.google.com/uc?export=view&id="+media_url.split("/")[5];
      }
    this.editable=false;
    
    var body = this.blog.body;
    body.head = head;
    body.author = author;
    body.disc1 = disc1
    body.authorimg = authorimg
    body.authdesc = authdesc
    body.media_url = media_url
    body.disc2 = disc2
    this.BS.update_blog(this.blog.url, this.blog.name, JSON.stringify(body))
  }
  get_id_from_url(url){
    return url.split("/")[5]
  }

}
