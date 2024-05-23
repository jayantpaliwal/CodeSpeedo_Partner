import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-refferals',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './refferals.component.html',
  styleUrl: './refferals.component.scss'
})
export class RefferalsComponent {
  records: any = [];
  allRecords: any = [];
  loaded: boolean = false;
  constructor(private api: ApiService, private router: Router) {
    this.getAllRefferals()
  }

  getAllRefferals() {
    this.api.getRefferals(new FormData()).pipe(take(1)).subscribe({
      next: (res: any) => {
        this.records = this.allRecords = res.users;
        this.loaded = true
      },
      error: (err) => {
        this.loaded = true;
      }
    })
  }
  filterUsers(ev: any) {
    if (ev.target.value == 1) {
      this.records = this.allRecords.filter((x: any) => x.Status == 'ACTIVE')
    } else if (ev.target.value == 2) {
      this.records = this.allRecords.filter((x: any) => x.Status != 'ACTIVE')
    } else {
      this.records = this.allRecords
    }
  }

  userDetails(r: any) {
    this.router.navigate(['user-detail'], { state: r })
  }


}
