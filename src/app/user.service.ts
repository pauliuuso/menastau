import { Injectable } from '@angular/core';
declare var $:any;

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
  };
  
  constructor() 
  {
    if($.cookie("name"))
    {
      this.Login($.cookie("name"), $.cookie("surname"), $.cookie("email"), $.cookie("id"), $.cookie("token"), $.cookie("role"));
    }
  }

  public Login(name: string, surname: string, email: string, id: string, token: string, role: string)
  {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.id = id;
    this.token = token;
    this.role = role;

    $.cookie("name", name);
    $.cookie("surname", surname);
    $.cookie("email", email);
    $.cookie("id", id);
    $.cookie("token", token);
    $.cookie("role", role);

    this.isLogged = true;
  }

  public Logout()
  {
    const cookies = $.cookie();

    for(const cookie in cookies)
    {
      if(cookie)
      {
        $.removeCookie(cookie);
      }
    }

    this.isLogged = false;
  }

}


export interface IRoles
{
  user: string;
  artist: string;
  admin: string;
}
