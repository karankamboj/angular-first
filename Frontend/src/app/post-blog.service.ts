import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class PostBlogService {
  
  private _postBlogUrl = "http://localhost:3000/api/post-blog";

  constructor(private http: HttpClient) { }

  postBlog(blogData) {
    console.log("Req Sening from Post-Blog Service")
    console.log(blogData)
     return this.http.post<any>(this._postBlogUrl, blogData,{ responseType:'blob' as 'json'})
  }
}
