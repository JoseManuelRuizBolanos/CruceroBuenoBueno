import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Guia1Page } from './guia1.page';

describe('Guia1Page', () => {
  let component: Guia1Page;
  let fixture: ComponentFixture<Guia1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Guia1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
