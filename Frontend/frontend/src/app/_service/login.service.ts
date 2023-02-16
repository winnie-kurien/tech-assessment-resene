import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Weather } from '../_models/weather';
import { shareReplay } from 'rxjs/operators';

const CACHE_SIZE = 1;
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public baseurl: string = "https://localhost:7125/";
  public cache$: Array<string> = [];

  constructor(private http: HttpClient) { }

  postValidate(data: any) {
    return this.http.post(this.baseurl + "Validate", data);
  }
}
