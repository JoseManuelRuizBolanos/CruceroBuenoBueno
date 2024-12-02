import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditCruceroPage } from './edit-crucero.page';

describe('EditCruceroPage', () => {
  let component: EditCruceroPage;
  let fixture: ComponentFixture<EditCruceroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCruceroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
