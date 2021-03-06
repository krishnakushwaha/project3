import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class BlogService {

  options;
  domain = this.authService.domain;

  constructor(
    private authService: AuthService,
    private http: Http
  ) { }


  createAuthenticationHeaders() {
    this.authService.loadToken();

    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': this.authService.authToken
      })
    });
  }


  newBlog(blog) {
    this.createAuthenticationHeaders();
    return this.http.post(this.domain + 'blogs/newBlog', blog, this.options).map(res => res.json());
  }

  commentStatus(params) {
    this.createAuthenticationHeaders();
    return this.http.post(this.domain + 'blogs/commentStatus', params, this.options).map(res => res.json());
  }

  getAllBlogs() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'blogs/allBlogs', this.options).map(res => res.json());
  }

  getSingleBlog(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'blogs/singleBlog/' + id, this.options).map(res => res.json());
  }

  editBlog(blog) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.domain + 'blogs/updateBlog/', blog, this.options).map(res => res.json());
  }
  deleteBlog(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.delete(this.domain + 'blogs/deleteBlog/' + id, this.options).map(res => res.json());
  }


}
