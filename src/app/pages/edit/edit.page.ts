import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  constructor(
    private modalController:ModalController
  ) { }

  ngOnInit() {
  }
  /**
   * Método para cerrar el modal
   */
  closeModal(){
    this.modalController.dismiss();
  }

}
