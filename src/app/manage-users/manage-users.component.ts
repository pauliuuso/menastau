import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService, IAllUsers, IUser } from '../shared.service';
import { UserService } from '../user.service';
import "rxjs/add/operator/takeUntil";
import { Subject } from "rxjs/Subject";

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit, OnDestroy 
{
  allUsers: IAllUsers;
  errorMessage: string;

  private unsubscribe: Subject<void> = new Subject<void>();

  constructor( private sharedService: SharedService, private userService: UserService ) { }

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

}
