import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService, IAllUsers, IUser } from '../shared.service';
import { UserService } from '../user.service';
import "rxjs/add/operator/takeUntil";
import { Subject } from "rxjs/Subject";
import { Http } from "@angular/http";

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit, OnDestroy 
{
  allUsers: IAllUsers;
  errorMessage: string;
  uploading = false;
  url = this.userService.baseUrl + "users/activation";

  private unsubscribe: Subject<void> = new Subject<void>();

  constructor( private sharedService: SharedService, private userService: UserService, private http: Http ) { }

  ngOnInit() 
  {
    this.sharedService.GetAllUsers().takeUntil(this.unsubscribe)
    .subscribe
    (
      data =>
      {
        this.allUsers = data;
        this.userService.token = data.token;
        this.userService.WriteCookies();
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

    this.http.post(this.url, {"id": id, "activate": activate, "token": this.userService.token, "initiator_id": this.userService.id })
    .subscribe
    (
      data =>
      {
        this.uploading = false;
        if(data.json().message === "OK")
        {
          this.userService.token = data.json().token;
          this.userService.WriteCookies();
          this.allUsers.users[index].active = activate;
        }
      },
      error =>
      {
        this.uploading = false;
        this.errorMessage = error.message;
      }
    );
  }

  public GetActivateButtonText(index: number)
  {
    if(this.allUsers.users[index].active == true)
    {
      return "Deactivate";
    }
    else
    {
      return "Activate";
    }
  }

}
