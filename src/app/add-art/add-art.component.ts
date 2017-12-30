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
  thumbnailError: string;
  thumbnailSelected = false;
  pictureError: string;
  pictureSelected = false;
  url = this.userService.baseUrl + "art/upload";

  title: FormControl;
  category: FormControl;
  author: FormControl;
  price: FormControl;

  art: FormData;

  constructor(public userService: UserService, public sharedService: SharedService, public validatorService: ValidatorService, public http: Http) { }

  ngOnInit() 
  {
    this.CreateFormControls();
    this.CreateForm();
    this.art = new FormData();
  }

  public CreateFormControls()
  {
    this.title = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]);
    this.category = new FormControl();
    this.author = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]);
    this.price = new FormControl('', [Validators.required, Validators.pattern("^[0-9/.]*$")]);
  }

  public CreateForm()
  {
    this.form = new FormGroup
    ({
      title: this.title,
      category: this.category,
      author: this.author,
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

  public AddArt()
  {
    Object.keys(this.form.controls).forEach(field =>
    {
      const control = this.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });

    if(!this.art.get("thumbnail"))
    {
      this.thumbnailError = "Thumbnail is mandatory!";
      return;
    }

    if(!this.art.get("picture"))
    {
      this.pictureError = "Picture is mandatory!";
      return;
    }

    if(this.form.valid)
    {
      this.art.append("title", this.title.value);
      this.art.append("category", this.category.value);
      this.art.append("author", this.author.value);
      this.art.append("price", this.price.value);

      console.log(this.art.get("picture"));
    }
  }

}
