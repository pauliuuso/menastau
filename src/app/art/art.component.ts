import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-art',
  templateUrl: './art.component.html',
  styleUrls: ['./art.component.css']
})
export class ArtComponent implements OnInit 
{

  smallerThanWrapper = false;
  wrapperWidth: number;
  wrapperHeight: number;
  imageWidth: number;
  imageHeight: number;

  loading = true;

  @ViewChild("picture")
  picture: ElementRef;

  @Input()
  thumbnailUrl: string;

  @Input()
  title: string;

  @Input()
  price: string;

  @Input()
  author: string;

  @Input()
  category: string;

  constructor() { }

  ngOnInit()
  {
    console.log(this.author);
    this.wrapperWidth = this.picture.nativeElement.parentNode.offsetWidth;
    this.wrapperHeight = this.picture.nativeElement.parentNode.offsetHeight;
  }

  public ImageLoaded()
  {
    this.imageWidth = this.picture.nativeElement.width;
    this.imageHeight = this.picture.nativeElement.height;
    this.CenterImage();
    this.loading = false;
  }

  public decode(text: string)
  {
    return decodeURI(text);
  }

  public CenterImage()
  {
    if(this.imageWidth > this.wrapperWidth)
    {
      this.smallerThanWrapper = false;
      this.picture.nativeElement.style.left = "-" + (this.picture.nativeElement.width - this.wrapperWidth)/2 + "px";
    }
    else
    {
      this.smallerThanWrapper = true;
    }

    if(this.picture.nativeElement.height > this.wrapperHeight)
    {
      this.picture.nativeElement.style.top = "-" + (this.picture.nativeElement.height - this.wrapperHeight)/2 + "px";
    }
  }

  public OnResize()
  {
    this.wrapperWidth = this.picture.nativeElement.parentNode.offsetWidth;
    this.wrapperHeight = this.picture.nativeElement.parentNode.offsetHeight;
    this.CenterImage();
  }

}
