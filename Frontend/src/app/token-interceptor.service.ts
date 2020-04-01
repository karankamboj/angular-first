import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'
import { AuthService } from './auth.service'



@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private _auth: AuthService) { }
  // Basically This is a middleware which add JWT in header

  intercept(req,next) {
    let token = this._auth.getToken()
    let tokenizedReq = req.clone({
      setHeaders : {
        Authorization: 'Bearer '+token
      }
    })
    return next.handle(tokenizedReq)
  }
  
}
