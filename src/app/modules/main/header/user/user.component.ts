import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppService } from '@services/app.service';
import { DateTime } from 'luxon';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    public user: any = {};

    constructor (private appService: AppService) {

    }

    ngOnInit(): void {
        const helper = new JwtHelperService();
        const token = localStorage.getItem("token")
        const decodedToken = helper.decodeToken(token);

        this.user.name = decodedToken.name;
    }

    logout() {
        this.appService.logout();
    }

    formatDate(date) {
        return DateTime.fromISO(date).toFormat('dd LLL yyyy');
    }
}
