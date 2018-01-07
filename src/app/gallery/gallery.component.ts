import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  public currentPage: number;
  private workCount = 24;
  public errorMessage: string;

  private unsubscribe: Subject<void> = new Subject<void>();

  public works: IWork[];
  public totalWorks: number;
  public totalPages: Array<number>;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, public sharedService: SharedService, public router: Router) { }

  ngOnInit() 
  {
    this.activatedRoute.params.subscribe(params =>
    {
      this.sorttype = params["sorttype"] || "all";
      this.currentPage = params["page"] || 1;

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
      this.sharedService.GetAllWorks(this.currentPage, this.workCount).takeUntil(this.unsubscribe)
      .subscribe
      (
        data =>
        {
          this.works = data;
          if(data[0])
          {
            this.totalWorks = Number(data[0].work_count) || 0;
            this.SetTotalPages(Math.floor(this.totalWorks / this.workCount));
          }
        },
        error =>
        {
          this.errorMessage = error.message;
        }
      );
    }
  }

  public SetTotalPages(totalWorks: number)
  {
    this.totalPages = [];
    for(let a = 1; a < totalWorks; a++)
    {
      this.totalPages[a - 1] = a;
    }
  }

  public CurrentUrl()
  {
    let url = "";

    if(this.sorttype)
    {
      url += this.sorttype + "/";
    }
    if(this.sortvar1)
    {
      url += this.sortvar1 + "/";
    }
    if(this.sortvar2)
    {
      url += this.sortvar2 + "/";
    }

    return url;
  }


}
