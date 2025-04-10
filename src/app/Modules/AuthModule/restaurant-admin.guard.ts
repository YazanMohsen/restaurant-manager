import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "../Services/auth.service";
import {Injectable} from "@angular/core";
@Injectable({providedIn:"root"})

export class RestaurantAdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router:Router,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean |
    UrlTree |
    Promise<boolean | UrlTree> |
    Observable<boolean | UrlTree> {
    if (this.authService.isRestaurantAdmin())
      return true;
    return this.router.createUrlTree(['/auth/sign-in'])


  }


}
