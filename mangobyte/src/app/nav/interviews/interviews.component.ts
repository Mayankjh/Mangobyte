import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.scss']
})
export class InterviewsComponent implements AfterViewInit{

  constructor() { }

  ngAfterViewInit() {
    $.getScript('../assets/js/main.js');
  }

}
