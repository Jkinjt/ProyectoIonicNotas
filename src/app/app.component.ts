import { Component } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { async } from '@firebase/util';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private langsAvailable = ['es', 'en'];
  private isAndroid=false;
  
  constructor(
    private traductor: TranslateService,
    private storage: LocalStorageService,
    private authS:AuthService,
    private platform:Platform
    ) {
      this.isAndroid=this.platform.is("android");
      //no se puede poner await dentro del constructor, se hace una trampa
    let tmp = (async () => {
      //se comprueba que exista un idioma guardaddo
      let lang = await storage.getItime("lang");
      //si es nulo mira el idioma del buscador
      if (lang == null) {
        lang = this.traductor.getBrowserLang();
      }else{
        lang=lang.lang;
      }
      //si el idioma existe en los Json lo pone, si no pone el inglés por defecto
      if (this.langsAvailable.indexOf(lang) > -1) {
        traductor.setDefaultLang(lang);
      } else {
        traductor.setDefaultLang("en");
      }
    });



    /*
      //detecta el lenguage del navegador
    console.log("window.navigator.language");

    //let tmp=(async()=>{
      return await storage.getItime("lang");
    })

   const lang= traductor.setDefaultLang(window.navigator.language.split("-")[0]);
    
  }*/
  }
  async ngOnInit(){
    this.platform.ready().then(async ()=>{
      this.isAndroid=this.platform.is("android");
      if(!this.isAndroid){
        await GoogleAuth.init();
      }
      await this.authS.loadSession();
    })
  }
}
