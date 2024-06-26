import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutTransactionsComponent } from './payout-transactions.component';

describe('PayoutTransactionsComponent', () => {
  let component: PayoutTransactionsComponent;
  let fixture: ComponentFixture<PayoutTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayoutTransactionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayoutTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
