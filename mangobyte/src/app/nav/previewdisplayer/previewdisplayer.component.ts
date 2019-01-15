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
    if(this.BLS.allBlogs==null){
      this.BLS.getAllBlogs();
    }
    
  }
  editable=false
  refresh(){
    //console.clear();
    //console.log(this.parent_bc, this.BCS.BlogCategories);
    this.group_list=[];
    for(var x in this.BCS.BlogCategories){
      if(this.BCS.BlogCategories[x].parent==this.parent_bc){
        this.group_list.push(this.BCS.BlogCategories[x].url);
      }
    }
    //console.log(this.parent_bc, this.BLS.allBlogs);
    //console.log(this.parent_bc, "@@@@@@@@@@@@@@@")
    this.blog_list=[];
    for(var x in this.BLS.allBlogs){
      if(this.BLS.allBlogs[x].category==this.parent_bc)
      {
        this.blog_list.push(x);
        console.log(x);
      }
    }
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
  update_blog(url, name, date, username, media_url, disc){
    if(media_url.indexOf("https://drive.google.com/file/d/")!=-1){
      // drive image
      media_url="https://drive.google.com/uc?export=view&id="+media_url.split("/")[5];
      }
    this.editable=false;
    this.BLS.update_blog(url, name, JSON.stringify(
      {
        date:date,
        username:username,
        media_url:media_url,
        disc:disc
      }
    ))
  }
  get_id_from_url(url){
    return url.split("/")[5]
  }

}
