import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageArtworksComponent } from './manage-artworks.component';

describe('ManageArtworksComponent', () => {
  let component: ManageArtworksComponent;
  let fixture: ComponentFixture<ManageArtworksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageArtworksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageArtworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
