import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:3000/api/register";
  private _loginUrl = "http://localhost:3000/api/login";
  private _getProfileUrl = "http://localhost:3000/api/get-profile";
  private _updateProfileUrl = "http://localhost:3000/api/update-profile"
  constructor(private http: HttpClient, private _router: Router) { 
  }
 
  updateProfileData(data) {
    return this.http.post<any>(this._updateProfileUrl,data)
  }
  getProfile() {
    return this.http.get<any>(this._getProfileUrl)
  }
  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user)
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user)
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }
  
  getToken() {
    return localStorage.getItem('token')
  }

  logoutUser() {
    localStorage.removeItem('token')
    this._router.navigate(['/login'])
  }

}
