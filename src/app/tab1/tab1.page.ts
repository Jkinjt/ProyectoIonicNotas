import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonInfiniteScroll, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { $ } from 'protractor';
import { Note } from '../model/Note';
import { AuthService } from '../services/auth.service';
import { NoteService } from '../services/note.service';
import {EditPage} from '../pages/edit/edit.page'
import { PartialObserver } from 'rxjs';
import { ToastService } from '../services/toast.service';
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
    
    private authS:AuthService,
    private router:Router,
    public modalController:ModalController,
    private alertController:AlertController,
    private toast:ToastService
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
      await this.toast.presentLoading();

    }
    this.notas=[];
    try{
      this.notas=await this.ns.getNotesByPage('algo').toPromise();
      
    }catch(err){
      console.log(err);
      //notificar un error al usuario, se puede hacer el loading en un servicio para que no se pisen
      //si se muestran dos loading y se cierra, solo se cierra el último, son independientes
     await this.toast.presentToast("Error al cargar los datos","danger");
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
    await this.toast.presentLoading();
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
 * Método que abre un modal y le pasa los datos de la nota
 * @param Note 
 * @returns promise<void>
 */ 
async openModal(note:Note){
  const modal = await this.modalController.create({
    component: EditPage,
    //hoja de estilos
    cssClass: 'my-modal-class',
    //pasar datos al modal
    componentProps: {
      'key': note.key,
      'title': note.title,
      'description': note.description,
      'geolocation':{
        latitude:note.geolocation.latitude,
        longitude:note.geolocation.longitude
      }
    }
  });
  this.ns.setNotes(this.notas);
  this.ns.getNotes$().subscribe(nota=>{
    this.notas=nota;
  });

  return await modal.present();
}


    
    
      /**
       * Metodo que muestra una ventana de confirmación si se quiere borrar la nota
       * @param note 
       */
       async presentAlertConfirm(note:Note) {
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Confirmar',
          message: '¿Estas seguro de que quiere borrar la nota?',
          buttons: [
            {
              text: 'no',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
                
              }
            }, {
              text: 'si',
              //se introduce el método que se quiera realizar una vez pulsado dicho boton
              handler: () => {
                
                this.borra(note);
              }
            }
          ]
        });
    
        await alert.present();
      }
     

     async ionChanges(event){
        let notes:Note[]=[]
        const value:string=event.detail.value;
        const length=value.length;
        if(length>1){
          this.notas.forEach(note=>{
            if(note.title.includes(value)||note.description.includes(value)){
              notes.push(note);
            }
            });
            this.notas=notes;
        }else if(length==0){
         await this.cargaNotas();
         

        }      
        

      }

      
}
