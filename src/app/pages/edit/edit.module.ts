import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPageRoutingModule } from './edit-routing.module';

import { EditPage } from './edit.page';
import { Tab1PageModule } from 'src/app/tab1/tab1.module';
import { Tab1Page } from 'src/app/tab1/tab1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditPageRoutingModule,
   
    
  ],
  declarations: [EditPage],
  providers:[
    
  ]
})
export class EditPageModule {}
