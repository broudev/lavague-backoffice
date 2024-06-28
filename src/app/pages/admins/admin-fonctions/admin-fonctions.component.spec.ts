import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFonctionsComponent } from './admin-fonctions.component';

describe('AdminFonctionsComponent', () => {
  let component: AdminFonctionsComponent;
  let fixture: ComponentFixture<AdminFonctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFonctionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminFonctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
