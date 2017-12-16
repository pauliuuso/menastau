import { Injectable } from '@angular/core';

@Injectable()
export class ValidatorService {

  constructor() { }

  public Match(string1:string, string2:string)
  {
    return string1 === string2;
  }

  public MaxLength(string1:string, maxLength:number)
  {
    if(string1.length > maxLength)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

}