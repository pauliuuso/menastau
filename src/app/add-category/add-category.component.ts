import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorService } from '../validator.service';
import { SharedService, ICategory } from '../shared.service';
import { UserService } from '../user.service';
import "rxjs/add/operator/takeUntil";
import { Http } from '@angular/http';
import { Subject } from "rxjs/Subject";
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit, OnDestroy 
{
  form: FormGroup;
  errorMessage: string;
  question: string;
  uploading = false;
  deleteId: string;
  url = this.userService.baseUrl + 'art/categories';

  category: FormControl;
  public categories: ICategory[];

  private unsubscribe: Subject<void> = new Subject<void>();

  @ViewChild(ConfirmComponent)
  confirm: ConfirmComponent;

  @ViewChild("categoryElement")
  categoryElement: ElementRef;


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
            this.categoryElement.nativeElement.value = "";
          }
        },
        error =>
        {
          this.errorMessage = error.message
        }
      )
    }
  }

  public DeleteCategoryClicked(id: string, name: string)
  {
    this.question = "Are you sure you want to delete " + name + " category?";
    this.confirm.ShowConfirmation();
    this.deleteId = id;
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

  Confirm(confirm: boolean)
  {
    if(confirm)
    {
      this.DeleteCategory(this.deleteId);
    }
  }

}
