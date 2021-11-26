import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

import {
    CanActivate,
    CanActivateChild,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '@services/app.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor (private router: Router, private appService: AppService) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {

        const token: any = localStorage.getItem("token");

        if (token) {
            const helper = new JwtHelperService();
            const isExpired = helper.isTokenExpired(token);
            if (isExpired) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }

    }

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.canActivate(next, state);
    }

}
