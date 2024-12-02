import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Preguntas1Page } from './preguntas1.page';

describe('Preguntas1Page', () => {
  let component: Preguntas1Page;
  let fixture: ComponentFixture<Preguntas1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Preguntas1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
