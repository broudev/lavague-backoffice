import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LieuVoteDialogComponent } from './lieu-vote-dialog.component';

describe('LieuVoteDialogComponent', () => {
  let component: LieuVoteDialogComponent;
  let fixture: ComponentFixture<LieuVoteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LieuVoteDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LieuVoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
