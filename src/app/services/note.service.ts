import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Note } from '../model/Note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
private myCollection:AngularFirestoreCollection;
  constructor(
    private db:AngularFirestore,
    ) { 
    //se conecta a la base de datos y se pasa por parametro la base a la que se quiera conectar
    //el parametro que esta aqui metido el el que corresponde para que debuelva la base de dtos
    this.myCollection=db.collection<any>(environment.firebaseConfig.todoCollection)
  
    }
    /**
     * 
     * @param note 
     * @returns devuelve una promesa con el id del objeto
     */

    public addNote(note:Note):Promise<string>{
      //aqui creamos una promesa para envolver el dato
      return new Promise(async(resolve,rejects)=>{
        try{
          let reponse:DocumentReference<firebase.default.firestore.DocumentData>=
            await this.myCollection.add(note);
            //lo que devuelve la promesa
            resolve(reponse.id);
        }catch(err){
          rejects(err);
        }
      });
      //esto devuelve una promesa Promise<DocumentReference<firebase.firestore.DocumentData>>
      //this.myCollection.add(note)
    }
    /**
     * getNotesByPage() -> pages=1, undefined
     * getNotesByPage(2)-> pages=2, undefined
     * getNotesByPage(2)
     * @param page 
     * @param criteria 
     * 
     */
    
    

    public getNotesByPage(page:number=1,criteria?:any){
      this.db

    }




    /**
     * devuelve todas las notas en un observable
     */

    

    public getNotes():Observable<Note[]>{//tambien puede ponerse Array<Note>
      
      return new Observable((observer)=>{
        //los arrays en ts funcionan como listas
      let result:Note[]=[];
      //si se tipa se puede acceder a los metodos del objeto del que es tipo
      this.myCollection.get().subscribe(
        //querySnapshot es lo que te da la instantanea del documento, que tiene como genérico un documento de firebase
        (data:firebase.default.firestore.QuerySnapshot<firebase.default.firestore.DocumentData>)=>{
          //se usa la función flecha para sacar cada elemento que se ha obtenido de la base de datos
          data.docs.forEach((d:firebase.default.firestore.DocumentData)=>{
            let tmp=d.data();
            let id=d.id;
            result.push({'key':id,...tmp});
          });
          observer.next(result);//este es el return del observable 
          observer.complete();
        });//final del subcribe
      });//final del return observable      
    }//final del metodo getNotes


    public getNote(id:string):Promise<Note>{
      return new Promise(async(resolve,rejects)=>{
        let note:Note=null;
        try{
          //para que no de error en el dato se debe poner el tipo que devuelva la promesa
          let result:firebase.default.firestore.DocumentData=await this.myCollection.doc(id).get().toPromise();
          note={
            key:result.id,
            ...result.data()
          }

          resolve(note);
        }catch(err){
          rejects(err);
        }
      });
      
    }

    public removeNote(id:string){
      return this.myCollection.doc(id).delete();
    }
}
