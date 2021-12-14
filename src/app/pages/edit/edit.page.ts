import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Note } from 'src/app/model/Note';
import { NoteService } from 'src/app/services/note.service';




@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  private oldNote: Note;
  public formNota: FormGroup;
  public miLoading: HTMLIonLoadingElement;
  private miToast: HTMLIonToastElement;

  //datos que se obtienen desde la pagina donde se llama el modal
  @Input() note:Note
  


  constructor(
    private modalController: ModalController,
    private noteS: NoteService,
    private fgb: FormBuilder,
    private loadingController: LoadingController,
    public toastController: ToastController,
    
  ) {
   


  }
  async ionViewDidEnter(){
     
    this.oldNote={
      key: this.note.key,
      title: this.note.title,
      description: this.note.description,
     // photo:this.photo,
      geolocation: {
        latitude:this.note.geolocation.latitude,
        longitude:this.note.geolocation.longitude
  }

    }
  }

  ngOnInit() {
    this.formNota = this.fgb.group({
      title: [this.note.title, Validators.required],
      description: [this.note.description]
    });

  }

  public async editNote() {
    let note: Note = {
      key: this.note.key,
      title: this.formNota.get("title").value,
      description: this.formNota.get("description").value,
     // photo:this.photo,
      geolocation: {
        latitude:this.note.geolocation.latitude,
        longitude:this.note.geolocation.longitude
  }
    }
    //para que se cargue la página de cargado
    await this.presentLoading();
    try {
      if (await this.noteS.editNote(this.oldNote,note)) {
        //para que se cierre, esto actua como un if, si se cumple la primera condición se ejecuta la segunda parte
        
        await this.presentToast("Nota agregada correctamente", "succes");
        this.formNota.reset();
        this.closeModal();
      }

    } catch (err) {
      console.log(err);
      this.miLoading && this.miLoading.dismiss();
      await this.presentToast("No se ha podido añadir la nota", "danger")

    }

  }

  /**
   * Método para cerrar el modal
   */
  closeModal() {
    this.modalController.dismiss();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: '',
      duration: 350
    });
    await loading.present();
  }

  async presentToast(msg: string, clr: string) {
    this.miToast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: clr

    });
    this.miToast.present();
  }


}
