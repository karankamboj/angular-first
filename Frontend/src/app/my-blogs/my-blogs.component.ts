import { Component, OnInit } from '@angular/core';
import { GetBlogsService } from '../get-blogs.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'
import * as $ from 'jquery'
import { PostBlogService } from '../post-blog.service';

@Component({
  selector: 'app-my-blogs',
  templateUrl: './my-blogs.component.html',
  styleUrls: ['./my-blogs.component.css']
})
export class MyBlogsComponent implements OnInit {

  myBlogs = []
  constructor(private _getBlogsService : GetBlogsService,private _router:Router,
    private _postBlogService : PostBlogService) { }

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
      
      var _postBlogService=this._postBlogService
       var _router=this._router
      // Make Post Req To API with postBlogService Fxn to Add Comment
      function addCommentToDb(comment,id) {
        var data={comment:comment,id:id}
        console.log(data)
        _postBlogService.addComment(data)
        .subscribe(res=>console.log(res),err=>{
          alert("Please Login")
          _router.navigate(['/login'])
        })
        
      }
   

      //  JQUERY 
      $(function(){
        
        // DELETE COMMENT BUTTON SHOW ON HOVER 
        $('.wrap').delegate('.comment','mouseenter',function(){ 
          var id = $(this).attr('id')
          var writer = $(this).attr('data-writer')
          var localEmail = localStorage.getItem('email')
          if(localEmail.toLowerCase()==writer.toLowerCase()) {
            $(this).append("<button class='deletecomment'> X </button>")
            $(this).delegate('button','click',()=>{

              _postBlogService.deleteComment({commentid:id,writer:writer})
              .subscribe(res=> console.log(res), err => console.log(err))

              $(this).slideUp(1000, function(){
                $(this).remove()
             }) 
            })
          }
        })
        // HIDE COMMENT DELETE BUTTON ON MOUSELEAVE 
        $('.wrap').delegate('.comment','mouseleave',function(){ 
          var id = $(this).attr('id')
          var writer = $(this).attr('data-writer')
          var localEmail = localStorage.getItem('email')
          if(localEmail.toLowerCase()==writer.toLowerCase()) {
            $(this).find('button').remove()            
          }
        })
        

        // Add Comment 
        $('.wrap').delegate('.btn.btn-default','click',function(){
          var id=$(this).attr('id')
          var $div = $(this).closest('div').parent()
          var comment = $div.find('input.form-control').val().toString()

          if(comment==""){
            alert("Please write comment!")
          }
          else {
              addCommentToDb(comment,id)
              var $comments = $('.comments.'+id)
              $comments.append("<div>"+"-> You :"+comment+"<br></div>")  
          }
        })

        // DELETE BLOG BUTTON
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
