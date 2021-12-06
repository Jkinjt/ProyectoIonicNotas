import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { $ } from 'protractor';
import { Note } from '../model/Note';
import { AuthService } from '../services/auth.service';
import { NoteService } from '../services/note.service';
import {EditPage} from '../pages/edit/edit.page'
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild(IonInfiniteScroll) infinite:IonInfiniteScroll;
  public notas:Note[]=[];
  private miLoading:HTMLIonLoadingElement;

  constructor(
    private ns:NoteService,
    private loading:LoadingController,
    private toast:ToastController,
    private authS:AuthService,
    private router:Router,
    public modalController:ModalController
    ) {}

 async ionViewDidEnter(){
    await this.cargaNotas();
  }
  /**
   * Método que carga las notas secuencialmente
   * @param event 
   */
//La ? hace que sea opcional, si ponemos event=null se no se inyecta, se hace nulo
  public async cargaNotas(event?){
    if (this.infinite){
      this.infinite.disabled=false;
    }

    if(!event){
      await this.presentLoading();

    }
    this.notas=[];
    try{
      this.notas=await this.ns.getNotesByPage('algo').toPromise();
      
    }catch(err){
      console.log(err);
      //notificar un error al usuario, se puede hacer el loading en un servicio para que no se pisen
      //si se muestran dos loading y se cierra, solo se cierra el último, son independientes
     await this.presentToast("Error al cargar los datos","danger");
    }finally{
      if(event){
        event.target.complete();
      }else{
        //se cierra el loading
      await  this.miLoading.dismiss();

      }

    }
  }

  /**
   * Metodo que se usa para borrar notas de la base de datos
   * @param nota que se desa borrar
   */
  public async borra(nota:Note){
    await this.presentLoading();
    await this.ns.removeNote(nota.key);
    //carga la nota
   let i= this.notas.indexOf(nota,0);
   if(i>-1){
     this.notas.splice(i,1);
   }
   await this.miLoading.dismiss();
  }

  //sintaxis then, aquie el hilo no se para, continua
      /*
      this.ns.getNotes().toPromise().then((result)=>{
        console.log(result);
      }).catch(err=>{
        console.log(err);
      })
      
       */
      /**
       * Método que va añadiendo 10 notas a la lista de notas cada vez que el usuario desliza hacia abajo el dedo
       * @param $event 
       */
      public async cargaInfinita($event){
        console.log("CARGANDO");
        let nuevasNotas=await this.ns.getNotesByPage().toPromise();
        if(nuevasNotas.length<10){
          $event.target.disable=true;
        }
        this.notas=this.notas.concat(nuevasNotas);
        $event.target.complete();
      }


      public async logout(){
        await this.authS.logout();
        this.router.navigate(['']);
      }

/**
 * Método que abre un modal
 * @returns promise<void>
 */ 
async openModal(){
  const modal = await this.modalController.create({
    component: EditPage,
    cssClass: 'my-modal-class'
  });
  return await modal.present();
}

      async presentLoading() {
        this.miLoading = await this.loading.create({      
          message: '',  
          duration:350    
        });
        await this.miLoading.present();    
      }
    
      async presentToast(msg:string,clr:string) {
        const miToast = await this.toast.create({
          message: 'msg',
          duration: 2000,
          color:clr
    
        });
       miToast.present();
      }

      //crear metodo carga infinita
}
