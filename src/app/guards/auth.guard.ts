import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

import {
    CanActivate,
    Router
} from '@angular/router';
import { AppService } from '@services/app.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor (private router: Router) { }

    canActivate() {

        const token: any = localStorage.getItem("token");

        if (token) {
            const helper = new JwtHelperService();
            const isExpired = helper.isTokenExpired(token);
            if (isExpired) {
                this.router.navigateByUrl("/login")
                return false;
            } else {
                return true;
            }
        } else {
            this.router.navigateByUrl("/login")
            return true;
        }

    }

}
