import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService, IWork } from '../shared.service';
import { UserService } from '../user.service';
import { Subject } from "rxjs/Subject";
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-artwork',
  templateUrl: './artwork.component.html',
  styleUrls: ['./artwork.component.css']
})
export class ArtworkComponent implements OnInit, OnDestroy
{
  unsubcribe: Subject<void> = new Subject<void>();
  workId: string;
  work: IWork;
  errorMessage: string;

  constructor(private sharedService: SharedService, private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() 
  {
    this.activatedRoute.params.subscribe(params =>
    {
      this.workId = params["id"];
      this.GetWorkInfo(this.workId);
    });
  }

  ngOnDestroy()
  {
    this.unsubcribe.next();
    this.unsubcribe.complete();
  }

  public GetWorkInfo(id: string)
  {
    this.sharedService.GetOneWork(id).takeUntil(this.unsubcribe).subscribe
    (
      data =>
      {
        this.work = data;
      },
      error =>
      {
        this.errorMessage = error.message;
      }
    );
  }

}
