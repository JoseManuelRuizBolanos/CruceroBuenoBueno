import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Preguntas2Page } from './preguntas2.page';

describe('Preguntas2Page', () => {
  let component: Preguntas2Page;
  let fixture: ComponentFixture<Preguntas2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Preguntas2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
