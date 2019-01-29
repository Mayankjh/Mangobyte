import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { BlogcategoryService } from 'src/app/blog/create/blogcategory/blogcategory.service';
import { BlogService } from 'src/app/blog/blog.service';
import { LoginService } from 'src/app/login/login.service';
declare var $:any;
@Component({
  selector: 'app-previewdisplayer',
  templateUrl: './previewdisplayer.component.html',
  styleUrls: ['./previewdisplayer.component.scss']
})
export class PreviewdisplayerComponent implements OnInit {
  @Input() parent_bc:string;
  group_list=[]
  blog_list=[]
  constructor(private BCS:BlogcategoryService, 
    private BLS:BlogService,private LS:LoginService, private cdr:ChangeDetectorRef) { 
    BCS.addChild(this);
    BLS.addChild(this);
  }
  editable=false
  refresh(){
    this.group_list=this.BCS.BlogCategories[this.parent_bc].child_categories;
    this.blog_list=this.BCS.BlogCategories[this.parent_bc].child_blogs;
    console.log(this.blog_list, this.group_list);
    this.cdr.detectChanges();
  }
  changeto(v){
    //console.log(v);
    this.parent_bc=v;
    this.refresh();
  }
  ngOnInit() {
    console.log(this.parent_bc);
    this.refresh();
  }
  ngAfterViewInit() {
    $.getScript('../assets/js/main.js');
  }
  update_blog(blog, name, date, username, media_url, disc){
    if(media_url.indexOf("https://drive.google.com/file/d/")!=-1){
      // drive image
      media_url="https://drive.google.com/uc?export=view&id="+media_url.split("/")[5];
      }
      var body = blog.body;
      body.date = date;
      body.username = username;
      body.media_url = media_url;
      body.disc = disc;
    this.editable=false;
    this.BLS.update_blog(blog.url, name, JSON.stringify(body))
  }
  get_id_from_url(url){
    return url.split("/")[5]
  }

}
