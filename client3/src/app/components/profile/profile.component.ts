import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MailService } from '../../services/mail.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  

   username = '';
  email = '';
  constructor(
   private authService: AuthService,
    private mail:MailService

  ) {  }

  ngOnInit() {

    this.authService.getProfile().subscribe(profile => {

    console.log(profile.success);
      this.username = profile.user.username; 
      this.email = profile.user.email; 
    });
  }

}
