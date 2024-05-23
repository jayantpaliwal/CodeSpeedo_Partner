import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-payout-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payout-transactions.component.html',
  styleUrl: './payout-transactions.component.scss'
})
export class PayoutTransactionsComponent {
  records: any = [];
  loaded: boolean = false;
  constructor(private router: Router, private api: ApiService) {
    this.getRequests();
  }
  getRequests() {
    this.api.getUserPayoutRequests(new FormData()).pipe(take(1)).subscribe({
      next: (res: any) => {
        this.loaded =true;
        this.records = res.requests
        console.log(res);
      },
      error: (err) => {
        this.loaded = true
      }
    })
  }
  create() {
    this.router.navigate(['payout-request'])
  }
}
