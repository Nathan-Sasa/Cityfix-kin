import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CityfixPage } from './cityfix.page';

describe('CityfixPage', () => {
  let component: CityfixPage;
  let fixture: ComponentFixture<CityfixPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CityfixPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
