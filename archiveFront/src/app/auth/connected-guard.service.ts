import{Injectable} from "@angular/core"
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";


@Injectable({
    providedIn: 'root'
})


export class ConnectedGuardService implements CanActivate {
    constructor(private router : Router){
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        const isConnected = sessionStorage.getItem('isConnected') === 'true';
        if (!isConnected) {
          return this.router.parseUrl('/sign-in');
        }
        return isConnected;
      }
    
}