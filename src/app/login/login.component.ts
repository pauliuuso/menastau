import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorService } from '../validator.service';
import { UserService } from '../user.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  errorMessage: string;
  isUploading = false;
  url = this.userService.baseUrl + "users/login";

  email: FormControl;
  password: FormControl;

  constructor(public validatorService: ValidatorService, public userService: UserService, public http: Http, public router: Router) { }

  ngOnInit()
  {
    this.CreateFormControls();
    this.CreateForm();
  }

  public CreateFormControls()
  {
    this.email = new FormControl('', [Validators.required, Validators.pattern("[^ @]*@[^ @]*"), Validators.minLength(2), Validators.maxLength(50)]);
    this.password = new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9_-]*"), Validators.minLength(4), Validators.maxLength(50)]);
  }

  public CreateForm()
  {
    this.form = new FormGroup
    ({
      email: this.email,
      password: this.password
    });
  }

  public LoginUser()
  {
    this.errorMessage = "";

    Object.keys(this.form.controls).forEach(field =>
    {
      const control = this.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });

    if(this.form.valid)
    {
      this.isUploading = true;

      this.http.post
      (
        this.url,
        {
          password: this.password.value,
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
            this.userService.name = response["name"];
            this.userService.surname = response["surname"];
            this.userService.email = response["email"];
            this.userService.id = response["id"];
            this.userService.token = response["token"];
            this.userService.role = response["role"];

            this.userService.isLogged = true;
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
