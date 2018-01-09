import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { MatCardModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
//import { NgbModule }  from '@ng-bootstrap/ng-bootstrap';
import {ModalModule} from "ngx-bootstrap/modal";






import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';

import { BlogService } from './services/blog.service';

import { MailService } from './services/mail.service';

import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';

import { FlashMessagesModule } from 'angular2-flash-messages';

import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { BlogComponent } from './components/blog/blog.component';
import { EditBlogComponent } from './components/blog/edit-blog/edit-blog.component';
import { DeleteBlogComponent } from './components/blog/delete-blog/delete-blog.component';
import { MyDialogComponent } from './components/my-dialog/my-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    BlogComponent,
    EditBlogComponent,
    DeleteBlogComponent,
    MyDialogComponent,

  ],
  imports: [
    BrowserModule,
    //NgbModule.forRoot(),
    ModalModule.forRoot(),
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule,



  ],
  entryComponents:[MyDialogComponent],
  providers: [AuthService , AuthGuard ,NotAuthGuard,BlogService,MailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
