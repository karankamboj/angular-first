import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import { Router } from '@angular/router'
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = {
    email: "",
    password: ""
  }
  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit(): void {
  }

  registerUser()  {
    this._auth.registerUser(this.registerUserData)
      .subscribe(
        res => {
          console.log(res)
          localStorage.setItem('token',res.token)
          this._router.navigate(['/post-blog'])
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
