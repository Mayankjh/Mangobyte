import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
    $.getScript('../../../assets/js/main.js');
  }


}
