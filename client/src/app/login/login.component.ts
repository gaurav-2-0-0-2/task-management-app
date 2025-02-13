import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyFieldConfig } from "@ngx-formly/core";
import { FormGroup } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { FormlyNgZorroAntdModule } from "@ngx-formly/ng-zorro-antd"; 
import { HttpClient } from '@angular/common/http';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormlyModule, ReactiveFormsModule, FormlyNgZorroAntdModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errMessage: string = ''; 
  constructor(
    private router: Router,
    private readonly httpClient: HttpClient,
    private readonly authService: AuthService
  ) {}

  loginForm = new FormGroup({});
  model = { email: '', password: '' };
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      props: {
        placeholder: 'Enter email',
        required: true,
      }
    },
    {
      key: 'password',
      type: 'input',
      props: {
        placeholder: 'Enter Password',
        required: true,
        type: 'password' 
      }
    }
  ];

  onSubmit(model: any) {
    console.log(model);
    this.httpClient.post('http://localhost:5000/auth/login', model).subscribe({
      next: (data: any) => {
        console.log(data);
        alert ('Login Successful');
        this.authService.setToken(data.token);
        this.authService.setUserId(data.user.id);
        this.router.navigate(['/tasks']);
      },
      error: (error) => {
        console.log(error);
        this.errMessage = error.error.message;
      }
    })
  }
}
