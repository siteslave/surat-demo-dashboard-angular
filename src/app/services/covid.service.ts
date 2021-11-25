import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  constructor (private http: HttpClient) { }

  async getCovidToDayCase() {
    var url = "https://covid19.ddc.moph.go.th/api/Cases/today-cases-all";
    return await this.http.get(url).toPromise();
  }

}
