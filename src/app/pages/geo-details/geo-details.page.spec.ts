import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeoDetailsPage } from './geo-details.page';

describe('GeoDetailsPage', () => {
  let component: GeoDetailsPage;
  let fixture: ComponentFixture<GeoDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
