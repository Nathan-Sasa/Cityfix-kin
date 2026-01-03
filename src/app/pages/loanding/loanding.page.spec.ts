import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoandingPage } from './loanding.page';

describe('LoandingPage', () => {
  let component: LoandingPage;
  let fixture: ComponentFixture<LoandingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoandingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
