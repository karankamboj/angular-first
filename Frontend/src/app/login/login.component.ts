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

  sendEmailData={email:"",
                  longitude:"",
                latitude:""}
  
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
          localStorage.setItem('email',res.email)
           navigator.geolocation.getCurrentPosition((position) => {
            //  console.log(position.coords.latitude.toString())
            this.sendEmailData.latitude=position.coords.latitude.toString()
            this.sendEmailData.longitude=position.coords.longitude.toString()
            this.sendEmailData["email"]=this.loginUserData.email
            this._auth.sendEmail(this.sendEmailData)
            .subscribe( res => console.log("MAIL SEND"), err =>console.log("MAIL NOT SENT"))
            this._router.navigate(['/post-blog'])
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
