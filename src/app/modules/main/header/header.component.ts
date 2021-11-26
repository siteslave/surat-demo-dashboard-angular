import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppService } from '@services/app.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @Output() toggleMenuSidebar: EventEmitter<any> = new EventEmitter<any>();
    public searchForm: FormGroup;

    isAdmin = false;

    constructor (private appService: AppService) {

    }

    ngOnInit() {

        var token = localStorage.getItem("token");
        if (token) {
            // expired
            const helper = new JwtHelperService();
            const isExpired = helper.isTokenExpired(token);
            if (isExpired) {
                this.isAdmin = false;
            } else {
                this.isAdmin = true;
            }
        } else {
            this.isAdmin = false;
        }
    }

    logout() {
        this.appService.logout();
    }
}
