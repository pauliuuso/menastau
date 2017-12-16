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

  constructor(public validatorService: ValidatorService) { }

  ngOnInit() 
  {
    this.CreateFormControls();
    this.CreateForm();
  }

  public CreateFormControls() 
  {
    this.name = new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9_-]*"), Validators.minLength(2), Validators.maxLength(20)]);
  }

  public CreateForm()
  {
    this.form = new FormGroup
    ({
      name: this.name
    })
  }

  public CreateUser()
  {

  }

}
