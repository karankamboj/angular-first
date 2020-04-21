import { Component, OnInit } from '@angular/core';
import { GetBlogsService } from '../get-blogs.service';
import { PostBlogService } from '../post-blog.service';
import { Router } from '@angular/router';
import * as $ from 'jquery'

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.css']
})
export class AllBlogsComponent implements OnInit {
  allBlogs = []
  newComment = ""
  constructor(private _getBlogsService : GetBlogsService, private _postBlogService: PostBlogService,private _router:Router) { }

  ngOnInit(): void {

    this._getBlogsService.getAllBlogs()
      .subscribe(
        res => {
          this.allBlogs = res
          console.log(this.allBlogs)
          
         } ,
        err => console.log(err)
      )


      var _postBlogService=this._postBlogService
       var _router=this._router

      // Make Post Req To API with postBlogService Fxn 
      function addCommentToDb(comment,id) {
        var data={comment:comment,id:id}
        console.log(data)
        _postBlogService.addComment(data)
        .subscribe(res=>console.log(res),err=>{
          alert("Please Login")
          _router.navigate(['/login'])
        })
        
      }
   

      // Jquery 
      $(function(){

        // DELETE COMMENT BUTTON SHOW ON HOVER 
        $('.wrap').delegate('.comment','mouseenter',function(){ 
          var id = $(this).attr('id')
          var writer = $(this).attr('data-writer')
          var localEmail = localStorage.getItem('email')
          if(localEmail)
          {
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
          }
          

        })
        // HIDE COMMENT DELETE BUTTON ON MOUSELEAVE 
        $('.wrap').delegate('.comment','mouseleave',function(){ 
          var id = $(this).attr('id')
          var writer = $(this).attr('data-writer')
          var localEmail = localStorage.getItem('email')
          if(localEmail)
          {
            if(localEmail.toLowerCase()==writer.toLowerCase()) {
              $(this).find('button').remove()            
            }
          }
          
        })
          // ADD COMMENT 
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
              $comments.append("<div>"+"NEW : "+comment+"<br></div>")
          }
        })

      })





  }
}
