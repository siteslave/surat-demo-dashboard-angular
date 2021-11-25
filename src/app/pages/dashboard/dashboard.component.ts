import { Component } from '@angular/core';
import moment from 'moment';
import * as numeral from 'numeral';
import * as Highcharts from 'highcharts';

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

    snewCase = 0;
    stotalCase = 0;
    snewDeath = 0;
    stotalDeath = 0;
    snewRecovered = 0;
    stotalRecovered = 0;

    covidLastUpdateDate = "";

    totalToday: any = {};

    isLoading = false;

    reportDate: any = "";

    options: any;

    constructor (private covidService: CovidService) {
        var date = `${moment().subtract(1, "day").locale("th").format("dddd D MMM")} ${moment().get("year") + 543}`;
        this.reportDate = date;

    }

    ngOnInit() {
        this.getCovidTodayCase();
        this.getCovidTodayCaseByProvince();
        this.getCovidToday();

        this.getChartTarget608();
    }


    async getCovidToday() {
        this.isLoading = true;
        try {
            var res: any = await this.covidService.getCovidToDay();
            this.isLoading = false;
            var data: any = res.rows[0];
            this.totalToday = data;
        } catch (error) {
            this.isLoading = false;
            console.log(error);
        }
    }

    async getChartTarget608() {
        try {
            var res: any = await this.covidService.getChartTarget608();
            var chartData: any = res.rows;

            var categories: any = [];
            var data: any = [];

            chartData.forEach((v: any) => {
                categories.push(v.amphur_name);
                data.push(+v.result_608);
            });

            this.options = {
                chart: {
                    type: 'column',
                    // height: 200
                },
                title: {
                    text: 'ผลงานการฉีดเข็ม 1 กลุ่ม 608'
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        tooltip: {
                            pointFormatter: function () { return numeral(this.y).format('0,0') + '%'; }
                        },
                        dataLabels: {
                            enabled: true,
                            formatter: function () {
                                return numeral(this.y).format('0,0') + '%'
                            }
                        }
                    }
                },
                xAxis: {
                    categories: categories,
                    crosshair: true
                },
                series: [
                    {
                        name: 'ร้อยละ',
                        data: data
                    }
                ]
            };

            Highcharts.chart('chart-608', this.options).yAxis[0].addPlotLine({
                value: 95,
                color: 'red',
                width: 3
            });

        } catch (error) {
            console.log(error);
        }
    }

    async getCovidTodayCase() {
        try {
            var res: any = await this.covidService.getCovidToDayCase();
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

    async getCovidTodayCaseByProvince() {
        try {
            var res: any = await this.covidService.getCovidToDayCaseByProvince();
            var covidData: any;

            res.forEach((v: any) => {
                if (v.province === "สุราษฎร์ธานี") {
                    covidData = v;
                }
            });

            this.snewCase = covidData.new_case || 0;
            this.snewDeath = covidData.new_death || 0;
            this.stotalCase = covidData.total_case || 0;
            this.stotalDeath = covidData.total_death || 0;
            this.snewRecovered = covidData.new_recovered || 0;
            this.stotalRecovered = covidData.total_recovered || 0;
        } catch (error) {
            console.log(error);
        }
    }

}
