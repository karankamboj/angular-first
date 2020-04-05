import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  avatarImage="http://localhost:3000/api/get-avatar/"
  email=""
  name=""
  about=""
  designation=""
  college=""

  constructor(private _auth : AuthService,private _router: Router) { }

  ngOnInit(): void {

    this._auth.getProfile()
    .subscribe( res => {
      this.avatarImage+=res._id
      this.email=res.email
      this.about=res.about
      this.name=res.name
      this.designation=res.designation
      this.college=res.college
      console.log(res)
      
    },
    err =>{
      console.log(err)
      alert("Some Error Occured")
    })

  }

  goToEditProfile()
  {
    this._router.navigate(['/edit-profile'])
  }

}
