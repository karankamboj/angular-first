import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  avatarImage="http://localhost:3000/api/get-avatar/"
  email=""
  constructor(private _auth : AuthService) { }

  ngOnInit(): void {

    this._auth.getProfile()
    .subscribe( res => {
      this.avatarImage+=res.id
      this.email=res.email
      
    },
    err =>{
      console.log(err)
      alert("Some Error Occured")
    })

  }

}
