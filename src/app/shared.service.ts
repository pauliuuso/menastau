import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map'
import { Http } from '@angular/http';
import { UserService } from './user.service';

@Injectable()
export class SharedService 
{
  categoriesUrl = this.userService.baseUrl + "art/categories";
  authorsUrl = this.userService.baseUrl + "users/authors";
  getAllWorksUrl = this.userService.baseUrl + "art/getall";

  constructor(private http: Http, private userService: UserService) { }

  public Decode(text: string)
  {
    return decodeURI(text);
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

  public GetAllWorks(page: number, count: number, getactive: boolean): Observable<IWork[]>
  {
    return this.http.post(this.getAllWorksUrl, {"page": page, "count": count, "getactive": getactive })
    .map
    (
      data => data.json().works as IWork[]
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
  work_count: string,
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
