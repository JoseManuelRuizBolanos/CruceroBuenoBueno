import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CruceroPage } from './crucero.page';

describe('CruceroPage', () => {
  let component: CruceroPage;
  let fixture: ComponentFixture<CruceroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CruceroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
