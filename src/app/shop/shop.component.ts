import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  private type: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() 
  {
    this.activatedRoute.params.subscribe(params =>
    {
      this.type = params["type"];
    })
  }

}
