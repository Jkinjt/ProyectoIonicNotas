import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LocalStorageService } from './services/local-storage.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';


export function loadTraslator(http:HttpClient){
  return new TranslateHttpLoader(http,'./assets/i18n/','.json');
}


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(),
     AppRoutingModule,
     //levanta un modulo con el servicio al backend
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireModule,
      HttpClientModule,
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: environment.production,
        // Register the ServiceWorker as soon as the app is stable
        // or after 30 seconds (whichever comes first).
        registrationStrategy: 'registerWhenStable:30000'
      }),
      //se agregan los formularios, se debe importat en cada modulo que se use, si solo se necesita en una página se mete en el module de la página
      /*
      FormsModule,
      ReactiveFormsModule
      */
      //lo que traduce, forRoot, es para que este disponible para todos
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:(loadTraslator),
        deps:[HttpClient]
      }
    })
    ],
  providers: [{ 
    provide: RouteReuseStrategy,
    useClass: IonicRouteStrategy,    
  },
  LocalStorageService,
  AuthService,
  AuthGuardService
  
  
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
