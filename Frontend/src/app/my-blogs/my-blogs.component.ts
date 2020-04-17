import { Component, OnInit } from '@angular/core';
import { GetBlogsService } from '../get-blogs.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'
import * as $ from 'jquery'

@Component({
  selector: 'app-my-blogs',
  templateUrl: './my-blogs.component.html',
  styleUrls: ['./my-blogs.component.css']
})
export class MyBlogsComponent implements OnInit {

  myBlogs = []
  constructor(private _getBlogsService : GetBlogsService,private _router:Router) { }

  ngOnInit(): void {


    this._getBlogsService.getMyBlogs()
      .subscribe(
        res => {
          this.myBlogs = res
          console.log(this.myBlogs)
          
         } ,
        err => 
        {
          console.log(err)
          if(err instanceof HttpErrorResponse ) {
            if(err.status === 401) {
              alert("Please Login")
              this._router.navigate(['/login'])
            }
          }
        }
      )  
      
      $(function(){
        $('.wrap').delegate('.remove','click',function() {
          console.log($(this).attr('id'))
          var $cur=$(this)
          var $box = $(this).closest('.box')
          
          $.ajax({
            type: 'delete',
            url: "http://localhost:3000/api/delete-blog/"+$cur.attr('id'),
            success: function() {
              console.log("Deleted")
              
              console.log("YES")
              
              $box.slideUp(1000, function(){
                $(this).remove()
             })
            },
            error : function() {
              alert('Error in Deletion')
            }
          })
        })
      })
  }
}
