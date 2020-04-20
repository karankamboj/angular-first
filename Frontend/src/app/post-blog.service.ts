import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class PostBlogService {
  
  
  private _postBlogUrl = "http://localhost:3000/api/post-blog";
  private _addCommentUrl = "http://localhost:3000/api/add-comment/"

  constructor(private http: HttpClient) { }

  postBlog(blogData) {
    console.log("Req Sending from Post-Blog Service")
    console.log(blogData)
     return this.http.post<any>(this._postBlogUrl, blogData,{ responseType:'blob' as 'json'})
  }
  addComment(data) {
    console.log(data)
    return this.http.post<any>(this._addCommentUrl, data)
  }
}
