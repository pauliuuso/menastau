import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedService, IWork, ICategory, IAuthor } from '../shared.service';
import { ValidatorService } from '../validator.service';
import { UserService } from '../user.service';
import { Subject } from "rxjs/Subject";
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
declare var $:any;

@Component({
  selector: 'app-edit-artwork',
  templateUrl: './edit-artwork.component.html',
  styleUrls: ['./edit-artwork.component.css']
})
export class EditArtworkComponent implements OnInit, OnDestroy
{
  unsubscribe: Subject<void> = new Subject<void>();
  url = this.userService.baseUrl + "art/edit";
  pictureError: string;
  pictureSelected = false;
  thumbnailError: string;
  thumbnailSelected = false;
  uploading = false;
  errorMessage: string;
  loading = true;

  workId: string;
  work: IWork = 
  {
    work_count: "",
    id: "",
    author_id: "",
    author_name: "",
    author_surname: "",
    title: "",
    category: "",
    year: "",
    description: "",
    price: "",
    active: true,
    thumbnail_url: "",
    picture_url: "",
    thumbnail_name: "",
    picture_name: ""
  };

  form: FormGroup;
  title: FormControl;
  category: FormControl;
  author: FormControl;
  description: FormControl;
  year: FormControl;
  price: FormControl;
  art: FormData;

  public categories: ICategory[];
  public categoriesError: string;
  public authors: IAuthor[];
  public authorsError: string;

  constructor(public sharedService: SharedService, private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute, private http: Http) { }

  ngOnInit() 
  {
    this.CreateFormControls();
    this.CreateForm();

    this.GetCategories();
    this.GetAuthors();

    this.art = new FormData();
    this.title.disable();
    this.category.disable();
    this.author.disable();
    this.description.disable();
    this.year.disable();
    this.price.disable();

    this.activatedRoute.params.subscribe(params =>
    {
      this.workId = params["id"];
      this.GetWorkInfo(params["id"]);
    });
  }

  ngOnDestroy()
  {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public CheckIfSame(first: string, second: string)
  {
    return first === second;
  }

  public GetCategories(): void
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
        this.categoriesError = error.message;
      }
    );
  }

  public GetAuthors(): void
  {
    this.sharedService.GetAuthors()
    .takeUntil(this.unsubscribe)
    .subscribe
    (
      data =>
      {
        this.authors = data;
        this.author.enable();
      },
      error =>
      {
        this.authorsError = error.message;
      }
    );
  }

  public GetWorkInfo(id: string)
  {
    this.sharedService.GetOneWork(id).takeUntil(this.unsubscribe).subscribe
    (
      data =>
      {
        this.work = data;
        this.SetWorkData();
      },
      error =>
      {
        this.errorMessage = error.message;
      }
    );
  }

  public SetWorkData(): void
  {
    this.title.setValue(this.sharedService.Decode(this.work.title));
    this.title.enable();
    this.description.setValue(this.sharedService.Decode(this.work.description));
    this.description.enable();
    this.year.setValue(this.work.year);
    this.year.enable();
    this.price.setValue(this.work.price);
    this.price.enable();
  }

  public CreateFormControls()
  {
    this.title = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]);
    this.category = new FormControl('', [Validators.required]);
    this.author = new FormControl('', [Validators.required]);
    this.description = new FormControl('', [Validators.maxLength(1000)]);
    this.year = new FormControl('', [Validators.required, Validators.pattern("^[0-9/.]*$")]);
    this.price = new FormControl('', [Validators.required, Validators.pattern("^[0-9/.]*$")]);
  }

  public CreateForm()
  {
    this.form = new FormGroup
    ({
      title: this.title,
      category: this.category,
      author: this.author,
      description: this.description,
      year: this.year,
      price: this.price
    });
  }

  public ThumbnailChanged(event)
  {
    this.thumbnailSelected = false;
    const fileList: FileList = event.target.files;

    if(fileList && fileList.length > 0)
    {
      this.art.delete("thumbnail");
      this.art.append("thumbnail", fileList[0]);

      // picture validation
      const type = this.art.get("thumbnail")["type"];
      const size = this.art.get("thumbnail")["size"];

      if(type !== "image/jpeg" && type !== "image/jpg" && type !== "image/png")
      {
        this.thumbnailError = "Supported images are jpg and png";
        return;
      }

      if(size > 512000)
      {
        this.thumbnailError = "Image size has to be less than 500Kb!";
        return;
      }

      // show selected image in browser
      const imageFile: any = document.querySelector("#thumbnailFile");
      imageFile.file = fileList[0];

      const reader = new FileReader();
      reader.onload = (function(tempImg)
      {
        return function(e)
        {
          tempImg.src = e.target.result;
        };
      })(imageFile);

      reader.readAsDataURL(fileList[0]);

      this.thumbnailSelected = true;
      this.thumbnailError = "";
    }
  }

  public PictureChanged(event)
  {
    this.pictureSelected = false;
    const fileList: FileList = event.target.files;

    if(fileList && fileList.length > 0)
    {
      this.art.delete("picture");
      this.art.append("picture", fileList[0]);

      // picture validation
      const type = this.art.get("picture")["type"];
      const size = this.art.get("picture")["size"];

      if(type !== "image/jpeg" && type !== "image/jpg" && type !== "image/png")
      {
        this.pictureError = "Supported images are jpg and png";
        return;
      }
      
      if(size > 5242880)
      {
        this.pictureError = "Image size has to be less than 5Mb!";
        return;
      }

      // show selected image in browser
      const imageFile: any = document.querySelector("#pictureFile");
      imageFile.file = fileList[0];

      const reader = new FileReader();
      reader.onload = (function(tempImg)
      {
        return function(e)
        {
          tempImg.src = e.target.result;
        };
      })(imageFile);

      reader.readAsDataURL(fileList[0]);

      this.pictureSelected = true;
      this.pictureError = "";
    }
  }

  public UpdateArt()
  {
    Object.keys(this.form.controls).forEach(field =>
    {
      const control = this.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });

    if(this.form.valid)
    {
      this.uploading = true;

      this.art.append("id", this.workId);
      this.art.append("title", encodeURI(this.title.value));
      this.art.append("category", this.category.value);
      this.art.append("authorid", this.author.value);
      this.art.append("description", encodeURI(this.description.value));
      this.art.append("year", this.year.value);
      this.art.append("price", this.price.value);
      this.art.append("token", this.userService.token);
      this.art.append("userId", this.userService.id);
      this.art.append("picture_name", this.work.picture_name);
      this.art.append("thumbnail_name", this.work.thumbnail_name);

      this.http.post(this.url, this.art).subscribe
      (
        data => 
        {
          this.uploading = false;
          const response = data.json();
          if(response.message == "OK")
          {
            this.userService.token = response.token;
            this.userService.WriteCookies();
            this.router.navigate(["picture-added"]);
          }
          else
          {
            this.errorMessage = "Something went wrong, try logging out and logging in";
          }
        },
        error =>
        {
          this.uploading = false;
          this.errorMessage = error.message;
        }
      );

    }
  }

}
