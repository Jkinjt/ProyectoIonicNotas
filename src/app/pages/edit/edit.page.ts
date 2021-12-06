import { Component, OnInit,Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  //datos que se obtienen desde la pagina donde se llama el modal
  @Input() firstName: string;
  @Input() lastName: string;
  @Input() middleInitial: string;


  constructor(
    private modalController:ModalController
  ) { }

  ngOnInit() {
    console.log("Modal"+this.firstName);
  }
  /**
   * Método para cerrar el modal
   */
  closeModal(){
    this.modalController.dismiss();
  }

}
