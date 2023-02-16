import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_service/login.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit{

  messages: Array<string> = [];
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.messages = this.loginService.cache$;
  }

}
