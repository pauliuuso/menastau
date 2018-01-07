import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureAddedComponent } from './picture-added.component';

describe('PictureAddedComponent', () => {
  let component: PictureAddedComponent;
  let fixture: ComponentFixture<PictureAddedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictureAddedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
