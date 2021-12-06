import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Note } from '../model/Note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  //variable para almacenar la última nota vista
  private last:any=null;
  //variable que almacena la collección de firestore
  private myCollection: AngularFirestoreCollection;
  constructor(
    //variable que permite el acceso a firestore
    private db: AngularFirestore,
  ) {
    //se conecta a la base de datos y se pasa por parametro la base a la que se quiera conectar
    //el parametro que esta aqui metido el el que corresponde para que debuelva la base de datos
    this.myCollection = db.collection<any>(environment.firebaseConfig.todoCollection);

  }
  /**
   * Método usado para añadir notas a la base de datos
   * @param note Nota que se quiera añadir a la base de datos
   * @returns devuelve una promesa con el id del objeto
   */

  public addNote(note: Note): Promise<string> {
    //aqui creamos una promesa para envolver el dato
    return new Promise(async (resolve, rejects) => {
      try {
        let reponse: DocumentReference<firebase.default.firestore.DocumentData> =
        //se crea el objeto JSON con los datos de la nota  
        await this.myCollection.add({
            title:note.title,
            description:note.description
          });
        //lo que devuelve la promesa
        resolve(reponse.id);
      } catch (err) {
        rejects(err);
      }
    });
    //esto devuelve una promesa Promise<DocumentReference<firebase.firestore.DocumentData>>
    //this.myCollection.add(note)
  }
  /**
   * Método que carga las notas conforme el usuario desliza hacia abajo la página
   * En caso de que se recargue la página vuelve a cargar las notas desde el principio
   * @param page 
   * @param criteria 
   * 
   */



  public getNotesByPage(all?):Observable<Note[]> {
    
    if(all){
      this.last=null;      
    }
    return new Observable((observer)=>{
      //variable que almacena las notas que serán devueltas
      let result:Note[]=[];
      let query=null;
      //comprueba si la última nota es nula
      if(this.last){

        query=this.db.collection<any>(environment.firebaseConfig.todoCollection,
          //Se trae diez notas cada vez que se haga la consulta y se empieda desde la última nota descargada
          //en caso de ser nula se trae desde el principio
          ref=> ref.limit(10).startAfter(this.last));

      }else{
        query=this.db.collection<any>(environment.firebaseConfig.todoCollection,
          ref=> ref.limit(10));
      }
      query.get().subscribe(
        (data: firebase.default.firestore.QuerySnapshot<firebase.default.firestore.DocumentData>)=>{
          data.docs.forEach((d:firebase.default.firestore.DocumentData)=>{
            this.last=d;
            let tmp =d.data()//devuelve la nota con su titulo y su descripción
            let id=d.id;//devuelve la clave de la nota
            result.push({'key':id, ...tmp});//se guarda la nota en la lista de notas
          });
          observer.next(result);// return del observable
          observer.complete();
        });
    });

  }




  /**
   * devuelve todas las notas en un observable
   */



  public getNotes(): Observable<Note[]> {//tambien puede ponerse Array<Note>

    return new Observable((observer) => {
      //los arrays en ts funcionan como listas
      let result: Note[] = [];
      //si se tipa se puede acceder a los metodos del objeto del que es tipo
      this.myCollection.get().subscribe(
        //querySnapshot es lo que te da la instantanea del documento, que tiene como genérico un documento de firebase
        (data: firebase.default.firestore.QuerySnapshot<firebase.default.firestore.DocumentData>) => {
          //se usa la función flecha para sacar cada elemento que se ha obtenido de la base de datos
          data.docs.forEach((d: firebase.default.firestore.DocumentData) => {
            let tmp = d.data();
            let id = d.id;
            result.push({ 'key': id, ...tmp });
          });
          observer.next(result);//este es el return del observable 
          observer.complete();
        });//final del subcribe
    });//final del return observable      
  }//final del metodo getNotes


  public getNote(id: string): Promise<Note> {
    return new Promise(async (resolve, rejects) => {
      let note: Note = null;
      try {
        //para que no de error en el dato se debe poner el tipo que devuelva la promesa
        let result: firebase.default.firestore.DocumentData = await this.myCollection.doc(id).get().toPromise();
        note = {
          key: result.id,
          ...result.data()
        }

        resolve(note);
      } catch (err) {
        rejects(err);
      }
    });

  }
  /**
   * Método que borra las notas de la base de datos
   * @param id  de la nota
   * @returns 
   */
  public removeNote(id: string) {
    return this.myCollection.doc(id).delete();
  }

  public editNote(){

  }

}
