import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { UserService } from './user.service';

@Injectable()
export class SharedService 
{
  categoriesUrl = this.userService.baseUrl + "art/categories";
  authorsUrl = this.userService.baseUrl + "users/authors";
  getAllWorksUrl = this.userService.baseUrl + "art/getall";
  getWorksByCategoryUrl = this.userService.baseUrl + "art/getbycategory";
  getWorksByAuthorUrl = this.userService.baseUrl + "art/getbyauthor";
  getOneWorkUrl = this.userService.baseUrl + "art/getone";
  getAllUsersUrl = this.userService.baseUrl + "users/allusers";
  getUserInfoUrl = this.userService.baseUrl + "users/userinfo";
  updateUserInfoUrl = this.userService.baseUrl + "users/updateuserinfo";

  constructor(private http: Http, private userService: UserService) { }

  public Decode(text: string)
  {
    return decodeURI(text);
  }

  public DecodeAndRemoveWhite(text: string)
  {
    text = decodeURI(text);
    return text.replace(/\s+/g, '-').toLowerCase();
  }

  public GetCategories(): Observable<ICategory[]>
  {
    return this.http.get(this.categoriesUrl)
    .map
    (
      data => data.json().categories as ICategory[]
    );
  }

  public GetAuthors(): Observable<IAuthor[]>
  {
    return this.http.get(this.authorsUrl)
    .map
    (
      data => data.json().authors as IAuthor[]
    );
  }

  public GetAllWorks(page: number, count: number, getactive: boolean): Observable<IAllWorks>
  {
    return this.http.post(this.getAllWorksUrl, {"page": page, "count": count, "getactive": getactive})
    .map
    (
      data => data.json() as IAllWorks
    );
  }

  public GetWorksByCategory(page: number, count: number, getactive: boolean, category: string): Observable<IAllWorks>
  {
    return this.http.post(this.getWorksByCategoryUrl, {"page": page, "count": count, "getactive": getactive, "category": category})
    .map
    (
      data => data.json() as IAllWorks
    );
  }

  public GetWorksByAuthor(page: number, count: number, getactive: boolean, author_id: string): Observable<IAllWorks>
  {
    return this.http.post(this.getWorksByAuthorUrl, {"page": page, "count": count, "getactive": getactive, "author_id": author_id})
    .map
    (
      data => data.json() as IAllWorks
    );
  }

  public GetOneWork(id: string): Observable<IWork>
  {
    return this.http.post(this.getOneWorkUrl, {"id": id})
    .map
    (
      data => data.json() as IWork
    );
  }

  public GetAllUsers(): Observable<IAllUsers>
  {
    return this.http.post(this.getAllUsersUrl, {"id": this.userService.id, "token": this.userService.token})
    .map
    (
      data => data.json() as IAllUsers
    );
  }

  public GetUserInfo(id: string): Observable<IUser>
  {
    return this.http.post(this.getUserInfoUrl, {"id": id, "token": this.userService.token})
    .map
    (
      data => data.json() as IUser
    );
  }

  public UpdateUserInfo(name: string, surname: string, id: string, role = ""): Observable<IResponse>
  {
    return this.http.post(this.updateUserInfoUrl, 
    {
      "initiator_id": this.userService.id,
      "id": id,
      "token": this.userService.token,
      "name": name,
      "surname": surname,
      "role": role
    })
    .map
    (
      data => data.json() as IResponse
    );
  }

}

export interface IAuthor
{
  id: string;
  name: string;
  surname: string;
}

export interface ICategory
{
  id: string;
  name: string;
}

export interface IWork
{
  work_count: string;
  id: string;
  author_id: string;
  author_name: string;
  author_surname: string;
  title: string;
  category: string;
  year: string;
  description: string;
  price: string;
  active: boolean;
  thumbnail_url: string;
  picture_url: string;
  thumbnail_name: string;
  picture_name: string;
}

export interface IAllWorks
{
  works: IWork[];
  message: string;
  work_count: number;
}

export interface IUser
{
  id: string;
  name: string;
  surname: string;
  email: string;
  active: boolean;
  role: string;
  lastlogin: string;
}

export interface IAllUsers
{
  users: IUser[];
  token: string;
  message: string;
}

export interface IResponse
{
  message: string;
  token: string;
}
