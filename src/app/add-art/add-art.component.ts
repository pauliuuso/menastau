import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorService } from '../validator.service';
import { UserService } from '../user.service';
import { SharedService } from '../shared.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-add-art',
  templateUrl: './add-art.component.html',
  styleUrls: ['./add-art.component.css']
})
export class AddArtComponent implements OnInit 
{
  form: FormGroup;
  errorMessage: string;
  isUploading = false;
  url = this.userService.baseUrl + "art/upload";

  title: FormControl;
  category: FormControl;

  constructor(public userService: UserService, public sharedService: SharedService, public validatorService: ValidatorService, public http: Http) { }

  ngOnInit() 
  {
    this.CreateFormControls();
    this.CreateForm();
  }

  public CreateFormControls()
  {
    this.title = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)])
    this.category = new FormControl();
  }

  public CreateForm()
  {
    this.form = new FormGroup
    ({
      title: this.title,
      category: this.category
    })
  }

  public AddArt()
  {

  }

}
