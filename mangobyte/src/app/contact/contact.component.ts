import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
    $.getScript('../assets/js/main.js');
  }


}
