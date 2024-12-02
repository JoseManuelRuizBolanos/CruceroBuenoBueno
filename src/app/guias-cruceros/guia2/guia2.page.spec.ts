import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Guia2Page } from './guia2.page';

describe('Guia2Page', () => {
  let component: Guia2Page;
  let fixture: ComponentFixture<Guia2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Guia2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
