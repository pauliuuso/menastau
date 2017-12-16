import { Injectable } from '@angular/core';

@Injectable()
export class UserService 
{
  public isLogged = false;
  public email = "";
  public name = "";
  public token = "";
  public id = "";

  constructor() { }

}
