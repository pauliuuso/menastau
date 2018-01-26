import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { SharedService, IAllWorks, ICategory, IAuthor } from '../shared.service';
import "rxjs/add/operator/takeUntil";
import { Subject } from "rxjs/Subject";

@Component({
  selector: 'app-gallery-shop',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnDestroy {

  private sorttype: string;
  private sortvar1 = "";
  private sortvar2 = "";
  public currentPage: number;
  private workCount = 12;
  public errorMessage: string;

  private unsubscribe: Subject<void> = new Subject<void>();

  public allWorks: IAllWorks;
  public totalWorks: number;
  public totalPages: Array<number>;

  public categories: ICategory[] = [{id: "", name: ""}];
  public categoriesError: string;
  public authors: IAuthor[] = [{id: "", name: "", surname: ""}];
  public authorsError: string;

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
    console.log("get art");
    if(this.sorttype === "all")
    {
      this.sharedService.GetAllWorks(this.currentPage, this.workCount, true).takeUntil(this.unsubscribe)
      .subscribe
      (
        data =>
        {
          this.allWorks = data;
          this.totalWorks = Number(this.allWorks.work_count) || 0;
          this.SetTotalPages(Math.ceil(this.totalWorks / this.workCount) + 1);
        },
        error =>
        {
          this.errorMessage = error.message;
        }
      );
    }
    else if(this.sorttype === "kind")
    {
      this.GetWorksByCategory();
    }
    else if(this.sorttype === "artist")
    {
      this.GetWorksByAuthor();
    }
  }

  public GetWorksByCategory(): void
  {
    this.sharedService.GetCategories()
    .takeUntil(this.unsubscribe)
    .subscribe
    (
      data =>
      {
        
        this.categories = data;

        if(this.sortvar1 === "all")
        {
          this.sortvar1 = this.categories[0].name;
        }

        if(this.sortvar1 !== "")
        {
          this.sharedService.GetWorksByCategory(this.currentPage, this.workCount, true, this.GetCategoryId(this.sortvar1)).takeUntil(this.unsubscribe)
          .subscribe
          (
            worksData =>
            {
              this.allWorks = worksData;
              this.totalWorks = Number(this.allWorks.work_count) || 0;
              this.SetTotalPages(Math.ceil(this.totalWorks / this.workCount) + 1);
            },
            error =>
            {
              this.errorMessage = error.message;
            }
          );
        }

      },
      error =>
      {
        this.categoriesError = error.message;
      }
    );
  }

  public GetWorksByAuthor(): void
  {
    this.sharedService.GetAuthors()
    .takeUntil(this.unsubscribe)
    .subscribe
    (

      data =>
      {
        this.authors = data;

        if(this.sortvar1 === "all")
        {
          this.sortvar1 = this.sharedService.Encode(this.authors[0].name) + "-" + this.sharedService.Encode(this.authors[0].surname);
        }

        if(this.sortvar1 !== "")
        {
          this.sharedService.GetWorksByAuthor(this.currentPage, this.workCount, true, this.GetAuthorId(this.sharedService.Decode(this.sortvar1))).takeUntil(this.unsubscribe)
          .subscribe
          (
            worksData =>
            {
              this.allWorks = worksData;
              this.totalWorks = Number(this.allWorks.work_count) || 0;
              this.SetTotalPages(Math.ceil(this.totalWorks / this.workCount) + 1);
            }
          );
        }
      },
      error =>
      {
        this.authorsError = error.message;
      }
    );
  }

  public GetCategoryId(name: string): string
  {
    for(let a = 0; a < this.categories.length; a++)
    {
      if(this.categories[a].name === name)
      {
        return this.categories[a].id;
      }
    }
  }

  public GetAuthorId(name: string): string
  {
    for(let a = 0; a < this.authors.length; a++)
    {
      if(this.authors[a].name + "-" + this.authors[a].surname === name)
      {
        return this.authors[a].id;
      }
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

  public ViewFull(workTitle: string, id: string)
  {
    this.router.navigateByUrl("/artwork/" + this.sharedService.Decode(workTitle) + "/" + id);
  }


}
