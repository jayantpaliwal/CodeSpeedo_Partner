import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {
  userData: any;
  transactions: any = [];
  constructor(private router: Router, private api: ApiService) {
    var data: any = this.router.getCurrentNavigation()?.extras.state;
    if (data.hasOwnProperty('UID') && data.UID) {
      this.userData = data;
      this.getData()
    }
  }

  getData() {
    var fd = new FormData();
    fd.append('uid', this.userData.UID)
    this.api.getUserTransactions(fd).pipe(take(1)).subscribe((res: any) => {
      this.transactions = res.transactions;
      console.log(this.transactions)
    })
  }


}
