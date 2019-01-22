import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';

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
  constructor(private AC:AccountService) { }

  ngOnInit() {
  }

}
