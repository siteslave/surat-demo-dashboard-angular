import { Component } from '@angular/core';
import { CovidService } from '../../services/covid.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

    newCase = 0;
    totalCase = 0;
    newDeath = 0;
    totalDeath = 0;
    newRecovered = 0;
    totalRecovered = 0;
    covidLastUpdateDate = "";

    constructor (private covidService: CovidService) { }

    ngOnInit() {
        this.getCovidTodayCase();
    }

    async getCovidTodayCase() {
        try {
            var res: any = await this.covidService.getCovidToDayCase();
            /*
                 {
                     "txn_date": "2021-11-25",
                     "new_case": 6335,
                     "total_case": 2088327,
                     "new_case_excludeabroad": 6328,
                     "total_case_excludeabroad": 2081586,
                     "new_death": 37,
                     "total_death": 20581,
                     "new_recovered": 7218,
                     "total_recovered": 1987308,
                     "update_date": "2021-11-25 07:32:25"
                 }
            */
            var covidData = res[0];

            this.newCase = covidData.new_case || 0;
            this.newDeath = covidData.new_death || 0;
            this.totalCase = covidData.total_case || 0;
            this.totalDeath = covidData.total_death || 0;
            this.newRecovered = covidData.new_recovered || 0;
            this.totalRecovered = covidData.total_recovered || 0;
            this.covidLastUpdateDate = covidData.update_date;

            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

}
