import { Component } from '@angular/core';
import {OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private readonly authService: AuthService,
  ) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      return 
    }
    this.redirect();
  }

  redirect(){
    this.router.navigate(['/login']);   
  }

}

