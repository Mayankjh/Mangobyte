import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { BlogService } from './blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  @Input() do:any;
  public blog:any;
  refreshed=false;
  constructor(private BS:BlogService,private cdr:ChangeDetectorRef) {
    BS.addChild(this);
  }
  refresh(){
    this.refreshed=true;
    //console.log('I was called');
    this.cdr.detectChanges();
  }
  ngOnInit() {
    var self=this;
    //if(this.do.show!="create")
      //this.BS.getblog(this.do['id'], self);
  }

}
