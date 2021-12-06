import { Injectable } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { User } from '@codetrix-studio/capacitor-google-auth/dist/esm/user';
import { Platform } from '@ionic/angular';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //almacena los valores del usuario
  public user:any;
  //boleano que indica si se esta en Android o no
  private isAndroid=false;

  constructor(
    //variable para el almacenamiento local
    private storage:LocalStorageService,
    //variable para conocer datos de la plataforma que se usa
    private platform:Platform
  ) { 
    //comprueba si el dispositivo que se usa es Android
    /*
    this.isAndroid=platform.is("android");
    if(!this.isAndroid){
      GoogleAuth.init();//lee la config clientid del meta de index.html
    }
    */
  }

 

  /**
   * Metodo para comprobar si el usuario se ha conectado previamente
   * en caso afirmativo carga los datos del usuario
   * 
   */
  public async loadSession(){
    let user=await this.storage.getItime('user');
    
    if(user){
      user=JSON.parse(user);
      this.user=user;

    }
  }

  /**
   * Método que registra al usuario 
   */
  public async login(){
    let user:User=await GoogleAuth.signIn();
    this.user=user;
     await this.keepSession();

  }

    /**
     * Método que desconecta al usuario
     * 
     */
    public async logout() {
     //se desconecta de Google
      await GoogleAuth.signOut();
      //se remueve del storage local
      await this.storage.removeItem('user');
      //se le da el valor nulo a la varaible usuario
      this.user=null;      
    }

  
  public async keepSession(){
   await this.storage.setItem('user',JSON.stringify(this.user));

  }
  /**
   * Método que se usa para comprobar si el usuario se ha registrado
   * @returns Boolean, verdadero si el usuario esta conectado
   *  y falso si el usuario no se ha registrado previamente
   */
  public isLogged():boolean{
    if(this.user) return true; else return false;
  }

}
