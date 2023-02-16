import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../_service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  protected loginForm: FormGroup;
  hide: boolean = true;
  
  constructor(private loginService: LoginService,
    private fb: FormBuilder, private router: Router) {
      this.loginForm = fb.group({
        "csno": [null, Validators.compose([Validators.required, Validators.pattern(new RegExp(/^[0-9]+$/))])]
      });
  }
  
  ngOnInit(): void { 
    this.loginService.cache$.push("Welcome to Customer Application");
    this.loginService.cache$.push("Feel free to contact us on +64 492898");
   }

  onSubmit() {
    console.warn(this.loginForm.getRawValue());
    this.loginService.postValidate(this.loginForm.getRawValue()).subscribe((response: any) => {
      console.log(response);
      this.loginService.cache$.push(response.msg);
      this.router.navigateByUrl('/customer-details');
    })
  }
}
