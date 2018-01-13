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
    author: "author",
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

    this.WriteCookies();

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

  public WriteCookies()
  {
    $.cookie("name", this.name);
    $.cookie("surname", this.surname);
    $.cookie("email", this.email);
    $.cookie("id", this.id);
    $.cookie("token", this.token);
    $.cookie("role", this.role);
  }

}


export interface IRoles
{
  user: string;
  author: string;
  admin: string;
}
