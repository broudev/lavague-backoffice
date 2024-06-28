import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembresFormsDialogComponent } from './membres-forms-dialog.component';

describe('MembresFormsDialogComponent', () => {
    let component: MembresFormsDialogComponent;
    let fixture: ComponentFixture<MembresFormsDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MembresFormsDialogComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MembresFormsDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
