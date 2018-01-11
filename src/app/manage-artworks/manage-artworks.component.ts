import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService, IWork } from '../shared.service';
import "rxjs/add/operator/takeUntil";
import { Subject } from "rxjs/Subject";

@Component({
  selector: 'app-manage-artworks',
  templateUrl: './manage-artworks.component.html',
  styleUrls: ['./manage-artworks.component.css']
})
export class ManageArtworksComponent implements OnInit, OnDestroy
{
  works: IWork[];
  errorMessage: string;

  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(private sharedService: SharedService) { }

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

}
