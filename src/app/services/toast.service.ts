import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private miToast:HTMLIonToastElement;
  private miLoading:HTMLIonLoadingElement;

  constructor(
    public toastController: ToastController,
    public loading:LoadingController
  ) { }

  /**
   * Método que genera un tast cuando ocurren determinadas opciones
   * @param msg 
   * @param clr 
   */
  async presentToast(msg:string,clr:string) {
    this.miToast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color:clr

    });
   this.miToast.present();
  }
  /**
 * Método que muestra un cargando mientras se cargan los datos
 */
   async presentLoading() {
    this.miLoading = await this.loading.create({      
      message: '',  
      duration:350    
    });
    await this.miLoading.present();    
  }
}
