import { Injectable } from '@angular/core';

@Injectable()
export class SharedService 
{

  constructor() { }

  public categories =
  [
    {name: "Aqua", value: 1},
    {name: "Oil", value: 2},
    {name: "Photography", value: 3}
  ]

  public Decode(text: string)
  {
    return decodeURI(text);
  }

}
