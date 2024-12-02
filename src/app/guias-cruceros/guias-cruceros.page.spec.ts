import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuiasCrucerosPage } from './guias-cruceros.page';

describe('GuiasCrucerosPage', () => {
  let component: GuiasCrucerosPage;
  let fixture: ComponentFixture<GuiasCrucerosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiasCrucerosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
