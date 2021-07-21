import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user.pipe(
      take(1),
      map(user => this.authorize(user))
    );
  }

  /**
   * Authorize the user.
   * @param user User login information.
   * @returns Whether the user is authorized.
   */
  private authorize(user: any): boolean | UrlTree {
    const isAuthorized = !!user;
    return isAuthorized ?? this.router.createUrlTree(['/auth']);
  }
}
