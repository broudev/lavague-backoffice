import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuartiersDialogComponent } from './quartiers-dialog.component';

describe('QuartiersDialogComponent', () => {
  let component: QuartiersDialogComponent;
  let fixture: ComponentFixture<QuartiersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuartiersDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuartiersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
