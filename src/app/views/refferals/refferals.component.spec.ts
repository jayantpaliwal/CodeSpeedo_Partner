import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefferalsComponent } from './refferals.component';

describe('RefferalsComponent', () => {
  let component: RefferalsComponent;
  let fixture: ComponentFixture<RefferalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefferalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RefferalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
