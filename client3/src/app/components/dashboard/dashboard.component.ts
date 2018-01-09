import { Component, OnInit,TemplateRef } from '@angular/core';

import { MailService } from '../../services/mail.service';


import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import * as $ from 'jquery';
//import $ from 'jquery/dist/jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
modalRef: BsModalRef;
  constructor(
   private mail:MailService,
   private modalService1: BsModalService
  ) { }

  user:any;
  closeResult;
  users:any[]=[
    {id:1 , name:'Andrew'},
    {id:2 , name:'sigal'},
    {id:3 , name:'jojo'},
    {id:4 , name:'krishna'}
  ];

  openModal(user:any,template: TemplateRef<any>) {
    this.user=user;
    this.modalRef = this.modalService1.show(template);
  }


  ngOnInit() {

    $( document ).ready(function() {
    console.log("jquery is ready to use on angular component");


    });
    $( "#test" ).click(function() {
    alert( "Handler for .click() called." );
    });
  	setTimeout(() => {
  		this.mail.setValue("Hello krishna");
  	}, 5000);
  }

}
