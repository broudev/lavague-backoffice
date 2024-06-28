import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLieuVoteComponent } from './admin-lieu-vote.component';

describe('AdminLieuVoteComponent', () => {
  let component: AdminLieuVoteComponent;
  let fixture: ComponentFixture<AdminLieuVoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLieuVoteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminLieuVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
