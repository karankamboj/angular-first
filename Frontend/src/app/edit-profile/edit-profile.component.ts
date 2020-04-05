import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import { Router } from '@angular/router'
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  editUserData = {
    email: "",
    password: "",
    name:"",
    designation:"",
    college:"",
    about:"",
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

  updateProfile() {
    let fd=new FormData();
    fd.append('avatar',this.selectedFile, this.selectedFile.name)

    this._auth.updateProfileData(this.editUserData)
    .subscribe(res=>{
      console.log(res)
      let fd=new FormData();
      fd.append('avatar',this.selectedFile, this.selectedFile.name)
      this.http.post<any>("http://localhost:3000/api/upload",fd,{ responseType:'blob' as 'json'})
      .subscribe(res => {
        console.log(res)
        alert("UPDATE SUCCESS")
        this._router.navigate(['/profile'])
      },
          err=>{
            alert("NOT SUCCESS")
            console.log(err)
          }) 
    },err=>console.log(err))

  }

}
