import { Component } from '@angular/core';
import { AuthService } from './auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend';

  
  constructor(private _authService: AuthService){}


  ngOnInit(): void {
      fetch('https://api.countapi.xyz/update/karankamboj/counter1/?amount=1')
      .then(res => res.json()).then(res => {
        document.getElementById('counter').innerHTML="Counter : "+res.value

      })
  }


  loggedIn() {
    return this._authService.loggedIn()
  }

  logoutUser () {
    this._authService.logoutUser()
  }
}
