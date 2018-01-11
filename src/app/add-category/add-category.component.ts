import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorService } from '../validator.service';
import { SharedService, ICategory } from '../shared.service';
import { UserService } from '../user.service';
import "rxjs/add/operator/takeUntil";
import { Http } from '@angular/http';
import { Subject } from "rxjs/Subject";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit, OnDestroy 
{
  form: FormGroup;
  errorMessage: string;
  uploading = false;
  url = this.userService.baseUrl + 'art/categories';

  category: FormControl;
  public categories: ICategory[];

  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(private sharedService: SharedService, private http: Http, private userService: UserService) { }

  ngOnInit() 
  {
    this.category = new FormControl('', [Validators.required]);
    this.form = new FormGroup
    ({
      category: this.category
    });

    this.GetCategories();
  }

  ngOnDestroy()
  {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public GetCategories()
  {
    this.sharedService.GetCategories()
    .takeUntil(this.unsubscribe)
    .subscribe
    (
      data =>
      {
        this.categories = data;
        this.category.enable();
      },
      error =>
      {
        this.errorMessage = error.message;
      }
    );
  }

  public AddCategory()
  {
    this.errorMessage = "";

    if(this.form.valid)
    {
      this.http.post(this.url, { "category": this.category.value })
      .subscribe
      (
        data =>
        {
          if(data.json().message == "OK")
          {
            this.GetCategories();
          }
        },
        error =>
        {
          this.errorMessage = error.message
        }
      )
    }
  }

  public DeleteCategory(id: string)
  {
    this.errorMessage = "";

    this.http.delete(this.url + "?id=" + id)
    .subscribe
    (
      data =>
      {
        if(data.json().message == "OK")
        {
          this.GetCategories();
        }
      },
      error =>
      {
        this.errorMessage = error.message
      }
    )
  }

}
