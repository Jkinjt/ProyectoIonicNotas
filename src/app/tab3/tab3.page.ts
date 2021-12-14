import { Component, ViewChild } from '@angular/core';

import { IonToggle } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { map, Map, Marker, marker, tileLayer } from 'leaflet';
import { Note } from '../model/Note';
import { LocalStorageService } from '../services/local-storage.service';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  @ViewChild('mitoogle', { static: false })
  mitoogle: IonToggle;
  public notes: Note[];


 
  constructor(private traductor: TranslateService,
    private storage: LocalStorageService,
    private noteS: NoteService) {

    traductor.setDefaultLang("en");
    traductor.use("en");
    traductor.get("HELLO").toPromise().then(data => {
      console.log(data);
    })




  }

  ionViewDidEnter() {
    const lang = this.traductor.getDefaultLang();
    if (lang == 'es') {
      this.mitoogle.checked = false;
    } else {
      this.mitoogle.checked = true;
    }
    //constante para crear el mapa
    const map = new Map('map').setView([37.8550964 , -4.7086738 ], 13);
    //capa que se muestra con un mapa geográfico
    tileLayer.wms('http://www.ign.es/wms-inspire/pnoa-ma', {
	layers: 'OI.OrthoimageCoverage',
	format: 'image/png',
	transparent: false,
	
	attribution: 'PNOA cedido por © <a href="http://www.ign.es/ign/main/index.do" target="_blank">Instituto Geográfico Nacional de España</a>'
}).addTo(map);
    
    
    this.noteS.getNotes().subscribe(notes => {
      notes.forEach(note => {
        marker([note.geolocation.latitude, note.geolocation.longitude]).addTo(map).bindPopup(note.description);

      });
    });
    console.log(this.traductor.getDefaultLang());


  }
  /**
   * Método que cambia el idioma
   * @param event 
   */
  public async cambiaIdioma(event) {

    if (event && event.detail && event.detail.checked) {
      await this.storage.setItem('lang', { lang: 'en' });
      this.traductor.use('en');

    } else {
      await this.storage.setItem('lang', { lang: 'es' });
      this.traductor.use('es');
    }
  }

  


}
function tileLaye(arg0: string, arg1: { attribution: string; }) {
  throw new Error('Function not implemented.');


}



