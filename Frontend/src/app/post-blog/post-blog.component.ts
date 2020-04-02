import { Component, OnInit } from '@angular/core';
import { PostBlogService } from '../post-blog.service';
import { Router } from '@angular/router'
import { HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';

@Component({
  selector: 'app-post-blog',
  templateUrl: './post-blog.component.html',
  styleUrls: ['./post-blog.component.css']
})
export class PostBlogComponent implements OnInit {


  blogData = {
    title : "",
    content: ""
  }

  constructor(private _postBlogService: PostBlogService,
    private _router: Router) { }

  ngOnInit(): void {
  }

  postBlog() {
    this._postBlogService.postBlog(this.blogData)
    .subscribe(
      res => {
        console.log(res)
        console.log("Posted")
        alert("Your Blog has been Posted!")
      },
      err =>  {
        if(err instanceof HttpErrorResponse) {
          if(err.status === 401) {
            alert("Please Login First")
            this._router.navigate(['/login'])
          }
        }

      }
    )
  } 
}
