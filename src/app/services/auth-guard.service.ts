import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private authS:AuthService,
    private router:Router
  ) { }

  /**
   * Método que comprueba si el usuario esta conectado para que permitirle el acceso al resto de la página
   * @param route 
   * @param state 
   * @returns Booleano que devuelve verdadero si el usuario esta conectado
   * y falso si el usuario no se ha conectado
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
   let result=this.authS.isLogged();
   if(result){
     return true;
   }else{
     this.router.navigate(['']);
     return false;
   }
  }
}
