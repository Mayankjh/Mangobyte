import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AccountService } from './account.service';
//import { AccountService } from '../about/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  @Input() show: any;
  
  constructor(private cdr:ChangeDetectorRef, private AC:AccountService) { 
    AC.addChild(this);  
  }
  googleUser = {};

  startApp
  ngOnInit() {
    
  }
  ngAfterViewInit() {
    this.AC.startApp();
  }
  refresh(){
    var self=this;
    this.cdr.detectChanges();
    //console.log(this);
  }
}
