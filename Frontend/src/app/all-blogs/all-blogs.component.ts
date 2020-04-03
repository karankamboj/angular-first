import { Component, OnInit } from '@angular/core';
import { GetBlogsService } from '../get-blogs.service';

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.css']
})
export class AllBlogsComponent implements OnInit {
  allBlogs = []
  constructor(private _getBlogsService : GetBlogsService) { }

  ngOnInit(): void {

    this._getBlogsService.getAllBlogs()
      .subscribe(
        res => {
          this.allBlogs = res
          console.log(this.allBlogs)
          
         } ,
        err => console.log(err)
      )

  }

}
