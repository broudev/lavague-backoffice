import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FonctionDialogComponent } from './fonction-dialog.component';

describe('FonctionDialogComponent', () => {
  let component: FonctionDialogComponent;
  let fixture: ComponentFixture<FonctionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FonctionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FonctionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
