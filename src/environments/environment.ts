// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {

    apiKey: "AIzaSyABAAyRQYC-k0FRxWgJAa3fvpDToygDT9E",
  
    authDomain: "notea-c3988.firebaseapp.com",
  
    projectId: "notea-c3988",
  
    storageBucket: "notea-c3988.appspot.com",
  
    messagingSenderId: "886762821500",
  
    appId: "1:886762821500:web:b1dc3fc3d8bf1595b5f6f9",
  
    measurementId: "G-67MC3N6ZN4",
    //para conectarse a la base de datos y no tenerlo a fuego en el servicio
    todoCollection:"todo"
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
