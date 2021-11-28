import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private traductor:TranslateService) {
    console.log("window.navigator.language");

   const lang= traductor.setDefaultLang(window.navigator.language.split("-")[0]);
    
  }
}
