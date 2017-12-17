import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorService } from '../validator.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;

  name: FormControl;
  surname: FormControl;
  email: FormControl;
  password1: FormControl;
  password2: FormControl;

  constructor(public validatorService: ValidatorService) { }

  ngOnInit() 
  {
    this.CreateFormControls();
    this.CreateForm();
  }

  public CreateFormControls() 
  {
    this.name = new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9_-]*"), Validators.minLength(2), Validators.maxLength(20)]);
    this.surname = new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9_-]*"), Validators.minLength(2), Validators.maxLength(50)]);
    this.email = new FormControl('', [Validators.required, Validators.pattern("[^ @]*@[^ @]*"), Validators.minLength(2), Validators.maxLength(50)]);
    this.password1 = new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9_-]*"), Validators.minLength(4), Validators.maxLength(50)]);
    this.password2 = new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9_-]*"), Validators.minLength(4), Validators.maxLength(50)]);
  }

  public CreateForm()
  {
    this.form = new FormGroup
    ({
      name: this.name,
      surname: this.surname,
      email: this.email,
      password1: this.password1,
      password2: this.password2
    })
  }

  public CreateUser()
  {

  }

}
