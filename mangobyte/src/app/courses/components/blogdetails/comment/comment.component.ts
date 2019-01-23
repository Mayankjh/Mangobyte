import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { CommentService } from './comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() blog:any
  @Input() position:any=''
  @Input() comments:any
  commentor_list:any={}
  commentors_details:any
  constructor(private AC:AccountService, private CS:CommentService) { }

  ngOnInit() {
    //console.log(this.comments);
    

  }
  hidecomment(){
    document.getElementById("comment123").style.display="none";
    console.log("comment hidden");
  }
  showcomment(){
    document.getElementById("comment123").style.display="block";
    console.log("comment shown");
  }
}
