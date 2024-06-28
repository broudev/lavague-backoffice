import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuartiersComponent } from './admin-quartiers.component';

describe('AdminQuartiersComponent', () => {
  let component: AdminQuartiersComponent;
  let fixture: ComponentFixture<AdminQuartiersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminQuartiersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminQuartiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
