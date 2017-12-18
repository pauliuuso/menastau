import { Injectable } from '@angular/core';

@Injectable()
export class UserService 
{
  public isLogged = false;
  public baseUrl = "http://artshop.teroute.com/api/";
  public email = "";
  public name = "";
  public surname = "";
  public token = "";
  public role = "";
  public id = "";

  public userRoles: IRoles =
  {
    user: "user",
    artist: "artist",
    admin: "admin"
  }
  
  constructor() { }

}

export interface IRoles
{
  user: string;
  artist: string;
  admin: string;
}
