import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilePostMapPage } from './profile-post-map.page';

describe('ProfilePostMapPage', () => {
  let component: ProfilePostMapPage;
  let fixture: ComponentFixture<ProfilePostMapPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePostMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
