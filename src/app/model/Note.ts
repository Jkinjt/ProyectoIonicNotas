export interface Note{
    key?:string,
    title:string,
    description:string,
    photo?:string,

    geolocation:{
        latitude:number,
        longitude:number
    }

}