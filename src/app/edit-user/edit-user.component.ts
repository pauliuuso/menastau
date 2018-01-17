import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorService } from '../validator.service';
import { UserService } from '../user.service';
import { SharedService, IUser, IResponse } from '../shared.service';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from "rxjs/Subject";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, OnDestroy
{
  form: FormGroup;
  errorMessage: string;
  isUploading = false;
  userInfo: IUser;

  unsubscribe: Subject<void> = new Subject<void>();

  name: FormControl;
  surname: FormControl;

  constructor(public validatorService: ValidatorService, public userService: UserService, private sharedService: SharedService, public http: Http, public router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit()
  {
    this.CreateFormControls();
    this.CreateForm();

    this.activatedRoute.params.subscribe(params =>
    {
      this.GetUserInfo(params["id"]);
    });
  }

  ngOnDestroy()
  {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public CreateFormControls()
  {
    this.name = new FormControl({value: '', disabled: true}, [Validators.required, Validators.pattern("^[a-zA-Z0-9_ -]*"), Validators.minLength(2), Validators.maxLength(20)]);
    this.surname = new FormControl({value: '', disabled: true}, [Validators.required, Validators.pattern("^[a-zA-Z0-9_ -]*"), Validators.minLength(2), Validators.maxLength(50)]);
  }

  public CreateForm()
  {
    this.form = new FormGroup
    ({
      name: this.name,
      surname: this.surname
    });
  }

  public GetUserInfo(id: string)
  {
    this.sharedService.GetUserInfo(id).takeUntil(this.unsubscribe).subscribe
    (
      data => 
      {
        this.userInfo = data;
        this.name.enable();
        this.surname.enable();
      },
      error => 
      {
        this.errorMessage = error.message;
      }
    );
  }

  public UpdateUser()
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

      this.sharedService.UpdateUserInfo(this.name.value, this.surname.value).takeUntil(this.unsubscribe)
      .subscribe
      (
        data =>
        {
          this.isUploading = false;
          if(data.message === "OK")
          {
            this.userService.token = data.token;
            this.userService.WriteCookies();
          }
          else
          {
            this.errorMessage = data.message;
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
