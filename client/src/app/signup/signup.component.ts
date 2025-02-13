import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyFieldConfig } from "@ngx-formly/core";
import { FormGroup } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { FormlyNgZorroAntdModule } from "@ngx-formly/ng-zorro-antd"; 
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormlyModule, ReactiveFormsModule, FormlyNgZorroAntdModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent {

  constructor(
    private readonly router: Router,
    private readonly httpClient: HttpClient
  ) {}

  signupForm = new FormGroup({});
  model = { name: '', email: '', password: '' };
  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      props: {
        placeholder: 'Enter Your Name',
        required: true,
      }
    },
    {
      key: 'email',
      type: 'input',
      props: {
        placeholder: 'Enter Your Email',
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
    this.httpClient.post('http://localhost:5000/auth/signup', model).subscribe({
      next: (data) => {
        console.log(data);
        alert ('Signup Successful');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
