import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class GetBlogsService {


  private _getAllBlogsUrl = "http://localhost:3000/api/all-blogs"
  private _getMyBlogsUrl = "http://localhost:3000/api/my-blogs"
  constructor(private http: HttpClient) { }


  getAllBlogs() {
    console.log("Sending GET req for all blogs")
    return this.http.get<any>(this._getAllBlogsUrl)
  }

  getMyBlogs() {
    console.log("Sending GET req for my blogs")
    return this.http.get<any>(this._getMyBlogsUrl)
  }
}
