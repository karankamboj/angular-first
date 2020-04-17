import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import { Router } from '@angular/router'
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginUserData = {
    email : "",
    password : ""
  }
  
  constructor(private _auth: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
    fetch('https://api.countapi.xyz/update/karankamboj/counter1/?amount=1')
      .then(res => res.json()).then(res => console.log(res))
  }
  loginUser() {
    console.log('Login Component')

    this._auth.loginUser(this.loginUserData)
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
