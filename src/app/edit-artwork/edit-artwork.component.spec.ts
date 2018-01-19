import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArtworkComponent } from './edit-artwork.component';

describe('EditArtworkComponent', () => {
  let component: EditArtworkComponent;
  let fixture: ComponentFixture<EditArtworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditArtworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditArtworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
