import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user:any;

  constructor() { }

  public isLogged():boolean{
    if(this.user)return true; else return false;
  }
}
