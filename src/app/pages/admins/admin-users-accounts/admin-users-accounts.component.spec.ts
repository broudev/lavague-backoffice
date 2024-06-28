import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersAccountsComponent } from './admin-users-accounts.component';

describe('AdminUsersAccountsComponent', () => {
  let component: AdminUsersAccountsComponent;
  let fixture: ComponentFixture<AdminUsersAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUsersAccountsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminUsersAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
