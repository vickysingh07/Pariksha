import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NormalGuard implements CanActivate {
  constructor(private login: LoginService, private router:Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable< boolean |UrlTree> |Promise<boolean | UrlTree>|boolean|UrlTree{
    if (this.login.isLoggedIn() && this.login.getUserRole() == 'NORMAL') {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
