import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';


@Injectable({
  providedIn: 'root'
})
//esta clase es para guardar datos en local
export class LocalStorageService {

  constructor() { }

  /**
   * La clave es un string se va a formatear un objeto a string
   * @param key 
   * @param value 
   * @returns 
   */
  public async setItem(key:string, value:any):Promise<boolean>{
    let result:boolean=false;
    try{
     await Storage.set({
        key:key,
        value:JSON.stringify(value)
      });
      result=true;
    }catch(err){
      console.log(err);
    }
    console.log("Set item"+value);
    return Promise.resolve(result);
  }



  public async getItime(key:string):Promise<any>{
    let value=null;
    try{
      value=await Storage.get({key:key});
      value=value.value;
      if(value!=null){
        value=JSON.parse(value);
      }
    }catch(err){
      console.log(err);
    }
    console.log("get Item"+value);
    return Promise.resolve(value);
  }
  public async removeItem(key:string):Promise<boolean>{
    let result=false;

    try{
      await Storage.remove({key:key});
      //Lee los  JSON y extrae el campo que le pongamos, en esta caso extrae el campo value
      result=true;
    }catch(err){
      console.error(err);
    }
    return Promise.resolve(result)

  }
}
