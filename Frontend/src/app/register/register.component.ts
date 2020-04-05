import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import { Router } from '@angular/router'
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = {
    email: "",
    password: "",
    avatar: null
  }
  selectedFile:File = null;
  constructor(private _auth: AuthService,
              private _router: Router, private http : HttpClient) { }

  ngOnInit(): void {
  }
  onFileSelectedEvent(event)
  {
    this.selectedFile = <File>event.target.files[0]
    console.log(this.selectedFile)
    
  }

  // Delete 
  upload () {
    
    
  }

  registerUser()  {
    if(this.selectedFile==null)
    {
      alert("Please Select Profile Pic")
      return 
    }

    this._auth.registerUser(this.registerUserData)
      .subscribe(
        res => {
          console.log(res)
          localStorage.setItem('token',res.token)
          let fd=new FormData();
          fd.append('avatar',this.selectedFile, this.selectedFile.name)
          this.http.post<any>("http://localhost:3000/api/upload",fd,{ responseType:'blob' as 'json'})
          .subscribe(res => {
            console.log(res)
            alert("REGISTER SUCCESS")
            this._router.navigate(['/post-blog'])
          },
          err=>{
            alert("NOT SUCESS")
            console.log(err)
          }) 

          
        },
        err => {
          console.log(err)
          if(err instanceof HttpErrorResponse) {
            if(err.status === 401) {
             
              alert(err.error)
            }

          }
        }
      )
  }

}
