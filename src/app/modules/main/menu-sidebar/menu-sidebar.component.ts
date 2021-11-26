import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppService } from '@services/app.service';

@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
    public user: any = {};
    public menuAdmin: any;
    public menuUser: any;

    isAdmin = false;

    constructor (public appService: AppService) { }

    ngOnInit() {
        const helper = new JwtHelperService();
        const token = localStorage.getItem("token")

        if (token) {
            // expired
            const isExpired = helper.isTokenExpired(token);
            if (isExpired) {
                this.isAdmin = false;
            } else {
                this.isAdmin = true;
                const decodedToken = helper.decodeToken(token);
                this.user.name = decodedToken.name;
            }
        } else {
            this.isAdmin = false;
        }

        this.menuAdmin = [
            {
                name: 'Dashboard',
                path: ['/'],
            },
            {
                name: 'Admin menu',
                children: [
                    {
                        name: 'Sub Menu',
                        path: ['/sub-menu-1'],
                    },

                    {
                        name: 'Blank',
                        path: ['/sub-menu-2'],
                    }
                ]
            }
        ];

        this.menuUser = [
            {
                name: 'Login',
                path: ['/login'],
            }
        ];

    }
}
