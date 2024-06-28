import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMembresComponent } from './detail-membres.component';

describe('DetailMembresComponent', () => {
  let component: DetailMembresComponent;
  let fixture: ComponentFixture<DetailMembresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailMembresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailMembresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
