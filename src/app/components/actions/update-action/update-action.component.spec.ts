import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateActionComponent } from './update-action.component';

describe('UpdateActionComponent', () => {
  let component: UpdateActionComponent;
  let fixture: ComponentFixture<UpdateActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateActionComponent]
    });
    fixture = TestBed.createComponent(UpdateActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
