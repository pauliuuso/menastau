import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorService } from '../validator.service';
import { UserService } from '../user.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;
  errorMessage: string;
  isUploading = false;
  url = this.userService.baseUrl + "users/create";

  name: FormControl;
  surname: FormControl;
  email: FormControl;
  password1: FormControl;
  password2: FormControl;

  constructor(public validatorService: ValidatorService, public userService: UserService, public http: Http, public router: Router) { }

  ngOnInit()
  {
    this.CreateFormControls();
    this.CreateForm();
  }

  public CreateFormControls()
  {
    this.name = new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9_ -]*"), Validators.minLength(2), Validators.maxLength(20)]);
    this.surname = new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9_ -]*"), Validators.minLength(2), Validators.maxLength(50)]);
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
    });
  }

  public CreateUser()
  {
    this.errorMessage = "";

    Object.keys(this.form.controls).forEach(field =>
    {
      const control = this.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });

    if(this.form.valid && this.validatorService.Match(this.password1.value, this.password2.value))
    {
      this.isUploading = true;

      this.http.post
      (
        this.url,
        {
          name: encodeURI(this.name.value),
          surname: encodeURI(this.surname.value),
          password: this.password1.value,
          email: encodeURI(this.email.value)
        }
      )
      .subscribe
      (
        data =>
        {
          this.isUploading = false;
          const response = data.json();
          if(response["message"] === "OK")
          {
            this.userService.Login(response["name"], response["surname"], response["email"], response["id"], response["token"], response["role"]);
            this.router.navigate([""]);
          }
          else
          {
            this.errorMessage = response["message"];
          }
        },
        error =>
        {
          this.isUploading = false;
          this.errorMessage = error.message;
        }
      );
    }
  }

}
