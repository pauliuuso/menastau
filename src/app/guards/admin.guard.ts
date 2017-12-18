import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Injectable()
export class AdminGuard implements CanActivate 
{
  constructor(private userService: UserService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean 
  {
    if(this.userService.isLogged && this.userService.role === this.userService.userRoles.admin)
    {
      return true;
    }
    else
    {
      this.router.navigate(["/"]);
      return false;
    }
  }
}
