export interface Note{
    key?:string,
    title:string,
    description:string

    geolocation:{
        latitude:number,
        longitude:number
    }

}