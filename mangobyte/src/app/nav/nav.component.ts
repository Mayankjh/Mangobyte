import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  hidelogin(){
    document.getElementById("logindiv").style.display="none";
    console.log("login hidden");
  }
  showlogin(){
    document.getElementById("logindiv").style.display="block";
    console.log("login shown");
  }

}
