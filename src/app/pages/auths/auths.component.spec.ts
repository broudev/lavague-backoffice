import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthsComponent } from './auths.component';

describe('AuthsComponent', () => {
  let component: AuthsComponent;
  let fixture: ComponentFixture<AuthsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
