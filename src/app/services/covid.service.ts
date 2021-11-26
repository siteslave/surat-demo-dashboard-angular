import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  constructor (private http: HttpClient,
    @Inject("API_URL") private apiUrl: any
  ) { }

  async getCovidToDayCase() {
    var url = "https://covid19.ddc.moph.go.th/api/Cases/today-cases-all";
    return await this.http.get(url).toPromise();
  }

  async getCovidToDayCaseByProvince() {
    var url = "https://covid19.ddc.moph.go.th/api/Cases/today-cases-by-provinces";
    return await this.http.get(url).toPromise();
  }

  async getCovidToDay() {

    var url = `${this.apiUrl}/mophic/dashboard/target/current`;
    return await this.http.get(url).toPromise();
  }

  async getChartTarget608() {
    var url = `${this.apiUrl}/mophic/dashboard/chart/608`;
    return await this.http.get(url).toPromise();
  }

  async getChartHistoryPerDay() {
    var url = `${this.apiUrl}/mophic/history`;
    return await this.http.get(url).toPromise();
  }

}
