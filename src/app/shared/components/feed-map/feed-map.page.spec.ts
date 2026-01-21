import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedMapPage } from './feed-map.page';

describe('FeedMapPage', () => {
  let component: FeedMapPage;
  let fixture: ComponentFixture<FeedMapPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
