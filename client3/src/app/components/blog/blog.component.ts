import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { BlogService } from '../../services/blog.service';
import { MatDialog } from '@angular/material';
import {MyDialogComponent} from '../my-dialog/my-dialog.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {


  messageClass;
  message;
  newPost =false;
  loadingBlogs =false;
  form;
  processing = false;
  username;
	blogPosts;
	dialogResult;
	processing1=false;
  user_id;
  //blog_id;

	  constructor(
	    private formBuilder: FormBuilder,
	    private authService: AuthService,
			private blogService: BlogService,
			public dialog:MatDialog,
        private router: Router


	  ) {
	     this.createNewBlogForm();
		}

		openDialog(id){
      //console.log(id);

      //this.blog_id=id;
			this.processing1=true;
					let dialogRef=this.dialog.open(MyDialogComponent,{
						width:'400px',
						height: '100px',
						data:'this text is passed in to dialog',

					});
					dialogRef.afterClosed().subscribe(result=>{
            console.log(id);
						this.processing1=false;
						console.log(result);
            if(result=='Confirm'){
              this.blogService.deleteBlog(id).subscribe(data => {
                // Check if delete request worked
                if (!data.success) {
                  this.messageClass = 'alert alert-danger'; // Return error bootstrap class
                  this.message = data.message; // Return error message
                } else {
                  this.messageClass = 'alert alert-success'; // Return bootstrap success class
                  this.message = data.message; // Return success message
                   //this.getAllBlogs();
                  // After two second timeout, route to blog page
                  setTimeout(() => {
                    this.router.navigate(['/profile']); // Route users to blog page
                  }, 2000);
                }
              });
            }
						this.dialogResult=result;


					})
				}

    createNewBlogForm() {
	    this.form = this.formBuilder.group({
	      title: ['', Validators.compose([
	        Validators.required,
	        Validators.maxLength(50),
	        Validators.minLength(5),
	        this.alphaNumericValidation
	      ])],
	      body: ['', Validators.compose([
	        Validators.required,
	        Validators.maxLength(500),
	        Validators.minLength(5)
	      ])]
	    })
    }

    enableFormNewBlogForm() {
	    this.form.get('title').enable();
	    this.form.get('body').enable();
	}


	 disableFormNewBlogForm() {
	    this.form.get('title').disable();
	    this.form.get('body').disable();
	 }

    alphaNumericValidation(controls) {
	    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
	    if (regExp.test(controls.value)) {
	      return null;
	    } else {
	      return { 'alphaNumericValidation': true }
	    }
    }




    newBlogForm() {
    this.newPost = true;
    }

    reloadBlogs() {
    this.loadingBlogs = true;

     this.getAllBlogs();


      setTimeout(()=>{
       this.loadingBlogs=false;
      },4000);
    }


    draftComment() {

    }
    likeComment(blog_id,blog){
      console.log(this.user_id);
      console.log(blog_id);
      blog.processing55=true;

      const params={user_id:this.user_id,blog_id:blog_id,status:1};

          this.blogService.commentStatus(params).subscribe(data => {
          console.log(data);
          //if (!data.success) {
            // this.messageClass = 'alert alert-danger';
            // this.message = data.message;
            // this.processing = false;
            // this.enableFormNewBlogForm();
        //  } else {
            // this.messageClass = 'alert alert-success';
            // this.message = data.message;
            // this.getAllBlogs();


        //  }
        });

    }
    dislikeComment(blog_id){

      const params={user_id:this.user_id,blog_id:blog_id,status:2};

          this.blogService.commentStatus(params).subscribe(data => {
          console.log(data);
          //if (!data.success) {
            // this.messageClass = 'alert alert-danger';
            // this.message = data.message;
            // this.processing = false;
            // this.enableFormNewBlogForm();
        //  } else {
            // this.messageClass = 'alert alert-success';
            // this.message = data.message;
            // this.getAllBlogs();


        //  }
        });


    }
    onBlogSubmit() {
	    this.processing = true;
	    this.disableFormNewBlogForm();

	    const blog = {
	      title: this.form.get('title').value,
	      body: this.form.get('body').value,
	      createdBy: this.username
	    }
       console.log(blog);


	      this.blogService.newBlog(blog).subscribe(data => {

	      if (!data.success) {
	        this.messageClass = 'alert alert-danger';
	        this.message = data.message;
	        this.processing = false;
	        this.enableFormNewBlogForm();
	      } else {
	        this.messageClass = 'alert alert-success';
	        this.message = data.message;
	        this.getAllBlogs();

	        setTimeout(() => {
	          this.newPost = false;
	          this.processing = false;
	          this.message = false;
	          this.form.reset();
	          this.enableFormNewBlogForm();
	        }, 2000);
	      }
	    });

    }

    goBack() {
    window.location.reload();
    }

    getAllBlogs(){


	    this.blogService.getAllBlogs().subscribe(data=>{
	    console.log(data);
	    this.blogPosts=data.blogs;

	    });
    }



  ngOnInit() {

     this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username;
        this.user_id = profile.user.id;
    });

    this.getAllBlogs();
	}



}
