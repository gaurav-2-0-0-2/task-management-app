import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'client';
  isAuth = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }
  }

}
