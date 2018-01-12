import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService, IWork } from '../shared.service';
import { UserService } from '../user.service';
import "rxjs/add/operator/takeUntil";
import { Subject } from "rxjs/Subject";
import { Http } from "@angular/http";

@Component({
  selector: 'app-manage-artworks',
  templateUrl: './manage-artworks.component.html',
  styleUrls: ['./manage-artworks.component.css']
})
export class ManageArtworksComponent implements OnInit, OnDestroy
{
  works: IWork[];
  errorMessage: string;
  url = this.userService.baseUrl + "art/activation";
  uploading = false;

  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(private sharedService: SharedService, private http: Http, private userService: UserService) { }

  ngOnInit() 
  {
    this.sharedService.GetAllWorks(1, 0).takeUntil(this.unsubscribe)
    .subscribe
    (
      data =>
      {
        this.works = data;
      },
      error =>
      {
        this.errorMessage = error.message;
      }
    );
  }

  ngOnDestroy()
  {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public GetActivateButtonText(index: number)
  {
    if(this.works[index].active == true)
    {
      return "Deactivate";
    }
    else
    {
      return "Activate";
    }
  }

  public IsActive(index: number)
  {
    if(this.works[index].active == true)
    {
      return "Active";
    }
    else
    {
      return "Innactive";
  }

  public Activation(active: boolean, id: string, index: number)
  {
    this.uploading = true;

    let activate: boolean;
    if(active == true)
    {
      activate = false;
    }
    else
    {
      activate = true;
    }

    this.http.post(this.url, {"id": id, "activate": activate, "token": this.userService.token, "userid": this.userService.id })
    .subscribe
    (
      data =>
      {
        this.uploading = false;
        if(data.json().message == "OK")
        {
          this.userService.token = data.json().token;
          this.userService.WriteCookies();
          this.works[index].active = activate;
        }
      },
      error =>
      {
        this.uploading = false;
        this.errorMessage = error.message;
      }
    )
  }

}
