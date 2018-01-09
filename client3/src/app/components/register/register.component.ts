import { Component, OnInit } from '@angular/core';
import {FormBuilder , FormGroup , Validators } from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

   form : FormGroup;
   message;
   messageClass;
   processing=false;
   emailValid;
  emailMessage;

   constructor(
   private formBuilder:FormBuilder,
   private authService: AuthService

  ) {
    
     this.createForm()

   }
   createForm(){

    this.form=this.formBuilder.group({

      email: ['',Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30)

      ])],
      username: ['',Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30)

      ])],
      password: ['',Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30)

      ])],
      confirm: ['',Validators.required]

    })
   }

   disableForm(){
    this.form.controls['email'].disable();
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();
    this.form.controls['confirm'].disable();


   }

   enableForm(){

   this.form.controls['email'].enable();
    this.form.controls['username'].enable();
    this.form.controls['password'].enable();
    this.form.controls['confirm'].enable();


   }

   onRegisterSubmit(){

   this.processing=true;

   this.disableForm();
    const user={

    email:this.form.get('email').value,
    username:this.form.get('username').value,
    password:this.form.get('password').value

    }

   
    console.log(this.form.get('email').value);
    console.log(this.form.get('username').value);
    console.log(this.form.get('password').value);


    this.authService.registerUser(user).subscribe(data=>{
        if(!data.success){
          this.messageClass='alert alert-danger';
          this.message=data.message;
          this.processing=false;
          this.enableForm();
        }else{
        this.messageClass='alert alert-success';
          this.message=data.message;

        }
    });
   }

    checkEmail() {
   
      this.authService.checkEmail(this.form.get('email').value).subscribe(data => {
       
        if (!data.success) {
          this.emailValid = false; 
          this.emailMessage = data.message;
        } else {
          this.emailValid = true; 
          this.emailMessage = data.message; 
        }
       });
    }
  

  ngOnInit() {
  }

}
