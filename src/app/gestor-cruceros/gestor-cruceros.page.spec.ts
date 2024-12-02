import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestorCrucerosPage } from './gestor-cruceros.page';

describe('GestorCrucerosPage', () => {
  let component: GestorCrucerosPage;
  let fixture: ComponentFixture<GestorCrucerosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GestorCrucerosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
