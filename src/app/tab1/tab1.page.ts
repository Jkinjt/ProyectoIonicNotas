import { Component } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Note } from '../model/Note';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public notas:Note[]=[];
  private miLoading:HTMLIonLoadingElement;

  constructor(private ns:NoteService,
    private loading:LoadingController,
    private toast:ToastController) {}

 async ionViewDidEnter(){
    await this.cargaNotas();
  }
//La ? hace que sea opcional, si ponemos event=null se no se inyecta, se hace nulo
  public async cargaNotas(event?){

    if(!event){
      await this.presentLoading();

    }
    this.notas=[];
    try{
      this.notas=await this.ns.getNotes().toPromise();
      
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
}
