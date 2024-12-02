import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreguntasFecuentesPage } from './preguntas-frecuentes.page';

describe('PreguntasFecuentesPage', () => {
  let component: PreguntasFecuentesPage;
  let fixture: ComponentFixture<PreguntasFecuentesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PreguntasFecuentesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
