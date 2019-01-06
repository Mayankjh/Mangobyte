import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-mentors',
  templateUrl: './mentors.component.html',
  styleUrls: ['./mentors.component.scss']
})
export class MentorsComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
    $.getScript('../assets/js/main.js');
  }


}
