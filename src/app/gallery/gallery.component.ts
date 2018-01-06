import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { SharedService, IWork } from '../shared.service';
import "rxjs/add/operator/takeUntil";
import { Subject } from "rxjs/Subject";

@Component({
  selector: 'gallery-shop',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnDestroy {

  private sorttype: string;
  private sortvar1: string;
  private sortvar2: string;
  private page: number;
  public errorMessage: string;

  private unsubscribe: Subject<void> = new Subject<void>();

  public works: IWork[];

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, public sharedService: SharedService) { }

  ngOnInit() 
  {
    this.activatedRoute.params.subscribe(params =>
    {
      this.sorttype = params["sorttype"] || "all";
      this.page = params["page"] || 1;

      if(params["sortvar1"])
      {
        this.sortvar1 = params["sortvar1"];
      }
      if(params["sortvar2"])
      {
        this.sortvar2 = params["sortvar2"];
      }

      this.GetArt();
    });
  }

  ngOnDestroy()
  {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public GetArt()
  {

    if(this.sorttype == "all")
    {
      this.sharedService.GetAllWorks(this.page).takeUntil(this.unsubscribe)
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

  }

}
