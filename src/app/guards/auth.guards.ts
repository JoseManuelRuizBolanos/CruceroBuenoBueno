import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { GlobalService } from '../global.service';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: Auth,
    private global:GlobalService
  ) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise(async (resolve, reject) => {

      this.auth.onAuthStateChanged(async user => {
        if (user) {
          this.global.uid= user.uid
          
        
       

          const value: any = await Preferences.get({ key: 'modoOscuro' })
        this.global.isDark=value.value
            if(value.value == 'true'){
              this.global.initializeDarkPalette(value.value)
            }

          resolve(true);
         
        } else {
          console.log('resolve(false)');
          this.router.navigate(['login']);
          resolve(false);


        }

      }, error => {
        console.error('ERROR GUARD', error);
        this.router.navigate(['login']);
        resolve(false);

      })
    });
  }
}
