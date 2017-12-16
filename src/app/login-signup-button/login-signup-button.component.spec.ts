import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSignupButtonComponent } from './login-signup-button.component';

describe('LoginSignupButtonComponent', () => {
  let component: LoginSignupButtonComponent;
  let fixture: ComponentFixture<LoginSignupButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginSignupButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSignupButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
