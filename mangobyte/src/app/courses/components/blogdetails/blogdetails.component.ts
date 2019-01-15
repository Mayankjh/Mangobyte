import { Component, OnInit, Input } from '@angular/core';
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
  constructor(private BS:BlogService, private LS:LoginService) {
    this.BS.addChild(this);
  }
  ngOnInit(){
    //this.refresh();
    //console.log("I was here in blg det", this.id);
    if(this.BS.allBlogs==null)this.BS.getAllBlogs();

  }
  
  refresh(){
    this.blog=this.BS.allBlogs[Number(this.id)];
    //console.log(this.blog, this.BS.allBlogs);
    for(let x of this.BS.allBlogs){
      if(x.url==this.LS.serverurl+"blogs/blog/"+this.id+"/")this.blog=x;
    }
    if(this.blog==null)this.blog='404';
    $.getScript('../../../assets/js/main.js');
  }


}
