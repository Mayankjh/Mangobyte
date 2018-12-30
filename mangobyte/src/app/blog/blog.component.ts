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
  constructor(private bs:BlogService,private cdr:ChangeDetectorRef) {
  }
  refresh(){
    this.refreshed=true;
    console.log('I was called');
    this.cdr.detectChanges();
  }
  ngOnInit() {
    this.bs.child = this;
    var self=this;
    this.bs.getblog(this.do['id'], self);
  }

}
