import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment.development'
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url: string = environment.url;
  get_url: string = environment.get_url;
  constructor(private http: HttpClient) { }

  login(fd: FormData) {
    return this.http.post(`${this.url}/Login`, fd);
  }
  getAccountDetails(fd: FormData) {
    return this.http.post(`${this.url}/GetPartnerAccount`, fd);
  }

  updateAccountDetails(fd: FormData) {
    return this.http.post(`${this.url}/updateAffilateAccount`, fd);
  }

  getRefferals(fd: FormData) {
    return this.http.post(`${this.url}/GetAllRefferals`, fd);
  }

  getPartnerDashboard(fd: FormData) {
    return this.http.post(`${this.url}/GetPartnerDashboard`, fd);
  }

  getPartnerAccountBalance(fd: FormData) {
    return this.http.post(`${this.url}/GetPartnerAccountBalance`, fd);
  }

  createPayoutRequest(fd: FormData) {
    return this.http.post(`${this.url}/createPayoutRequest`, fd);
  }

  getUserPayoutRequests(fd: FormData) {
    return this.http.post(`${this.url}/getUserPayoutRequests`, fd);
  }
  getUserTransactions(fd:FormData){
    return this.http.post(`${this.url}/getUserTransactions`, fd);
  }


}
