import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { Note } from '../model/Note';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  //para poder usarlo se necesita un formBuilder
  public formNota:FormGroup
  //variable que almacena el elemento que es el loading, para poder cerrarlo luego, es un puntero
  public miLoading:HTMLIonLoadingElement
  //puntero al toast
  private miToast:HTMLIonToastElement

  constructor(private fgb:FormBuilder,
     private noteS:NoteService,
     //para mostrar al usuario que esta ocurriendo algo
     private loadingController: LoadingController,
     //para invocar al toast
     public toastController: ToastController) {
    this.formNota=this.fgb.group({
      title:["",Validators.required],
      description:[""]
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({      
      message: '',  
      duration:350    
    });
    await loading.present();    
  }

  async presentToast(msg:string,clr:string) {
    this.miToast = await this.toastController.create({
      message: 'msg',
      duration: 2000,
      color:clr

    });
   this.miToast.present();
  }

  ionViewDidEnter(){
   
  }

  public async addNote(){
    let newNote:Note={
      title:this.formNota.get("title").value,
      description:this.formNota.get("description").value
    }
    //para que se cargue la página de cargado
    await this.presentLoading();   
    try {
      let id =await this.noteS.addNote(newNote);
      //para que se cierre, esto actua como un if, si se cumple la primera condición se ejecuta la segunda parte
      this.miLoading && this.miLoading.dismiss();
      await this.presentToast("Nota agregada correctamente","succes");
      this.formNota.reset();
    }catch(err){
      console.log(err);
      this.miLoading && this.miLoading.dismiss();
      await this.presentToast("No se ha podido añadir la nota","danger")

    } 

  }

}
