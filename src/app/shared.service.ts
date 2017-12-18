import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {

  constructor() { }

  public Decode(text: string)
  {
    return decodeURI(text);
  }

}
