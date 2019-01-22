import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() blog:any={
    url:'',
    name:'',
    body:''
  }
  @Input() parent:any=null;
  comments=[
    {image:'', time:'', comment:''}
  ]
  constructor() { }

  ngOnInit() {
  }

}
