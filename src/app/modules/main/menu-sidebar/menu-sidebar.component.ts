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
    public menu = MENU;

    constructor (public appService: AppService) { }

    ngOnInit() {
        const helper = new JwtHelperService();
        const token = localStorage.getItem("token")
        const decodedToken = helper.decodeToken(token);

        this.user.name = decodedToken.name;
    }
}

export const MENU = [
    {
        name: 'Dashboard',
        path: ['/']
    },
    {
        name: 'Blank',
        path: ['/blank']
    },
    {
        name: 'Main Menu',
        children: [
            {
                name: 'Sub Menu',
                path: ['/sub-menu-1']
            },

            {
                name: 'Blank',
                path: ['/sub-menu-2']
            }
        ]
    }
];
