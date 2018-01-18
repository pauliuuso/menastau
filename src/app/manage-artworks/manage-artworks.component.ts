import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SharedService, IAllWorks } from '../shared.service';
import { UserService } from '../user.service';
import "rxjs/add/operator/takeUntil";
import { Subject } from "rxjs/Subject";
import { Http } from "@angular/http";
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-manage-artworks',
  templateUrl: './manage-artworks.component.html',
  styleUrls: ['./manage-artworks.component.css']
})
export class ManageArtworksComponent implements OnInit, OnDestroy
{
  allWorks: IAllWorks;
  errorMessage: string;
  url = this.userService.baseUrl + "art/activation";
  deleteUrl = this.userService.baseUrl + "art/delete";
  uploading = false;
  deleteId: string;
  deleteIndex: number;
  question: string;

  private unsubscribe: Subject<void> = new Subject<void>();

  @ViewChild(ConfirmComponent)
  confirm: ConfirmComponent;

  constructor(private sharedService: SharedService, private http: Http, private userService: UserService) { }

  ngOnInit() 
  {
    this.sharedService.GetAllWorks(1, 0, false).takeUntil(this.unsubscribe)
    .subscribe
    (
      data =>
      {
        this.allWorks = data;
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
    if(this.allWorks.works[index].active == true)
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
    if(this.allWorks.works[index].active == true)
    {
      return "Active";
    }
    else
    {
      return "Innactive";
    }
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
          this.allWorks.works[index].active = activate;
        }
      },
      error =>
      {
        this.uploading = false;
        this.errorMessage = error.message;
      }
    );
  }

  public DeleteArtworkClicked(id: string, name: string, index: number)
  {
    this.question = "Are you sure you want to delete " + name + " artwork?";
    this.confirm.ShowConfirmation();
    this.deleteIndex = index;
    this.deleteId = id;
  }

  public DeleteArtwork()
  {
    this.errorMessage = "";
    this.uploading = true;
    
    this.http.post(this.deleteUrl, {"id": this.deleteId, "token": this.userService.token, "userid": this.userService.id, "thumbnail_name": this.allWorks.works[this.deleteIndex].thumbnail_name, "picture_name": this.allWorks.works[this.deleteIndex].picture_name })
    .subscribe
    (
      data =>
      {
        this.uploading = false;
        if(data.json().message == "OK")
        {
          this.userService.token = data.json().token;
          this.userService.WriteCookies();
          this.allWorks.works.splice(this.deleteIndex, 1);
        }
      },
      error =>
      {
        this.uploading = false;
        this.errorMessage = error.message;
      }
    )
  }

  public Confirm(confirm: boolean)
  {
    if(confirm)
    {
      this.DeleteArtwork();
    }
  }

}
