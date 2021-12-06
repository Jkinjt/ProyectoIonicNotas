import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {GoogleAuth} from '@codetrix-studio/capacitor-google-auth'
import { User } from '@codetrix-studio/capacitor-google-auth/dist/esm/user';
import { Platform } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  //variable que almacena los datos del usuario
  public userinfo:User;
  //booleano que dice si el dispositivo usado es android 
  private isAndroid:boolean;
    constructor(
    private platform:Platform,
    private authS:AuthService,
    private router:Router
  ) { }

  ngOnInit() {
    
    if(this.authS.isLogged()){
      this.router.navigate(['private/tabs/tab1']);
    }
  }
  ionViewWillEnter(){
    
    if(this.authS.isLogged()){
      this.router.navigate(['private/tabs/tab1']);
    }
  }


   //en ionViewDialEnter(){}
  //poner google init
  //this.platform.ready().then((){ await googleInit() await load sesion})

  /**
   * Método que registra al usuario
   */
  public async signin(){
    try{

      await this.authS.login();
      this.router.navigate(['private/tabs/tab1']);

    }catch(err){
      console.error(err);

    }finally{
      console.log(this.authS.user);
    }
    
  }
}
