import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cat } from './model/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatsService {
  private pageNumber = 0;

  constructor(private http: HttpClient) {}

  public getAllCats(): any {
    const catsOnPage = 12;
    return this.http.get<Cat[]>(
      `https://api.thecatapi.com/v1/images/search?limit=${catsOnPage}&page=${this.pageNumber}&order=Desc`
    );
  }

  public getCatsBySelectedBreed(pattern: string): any {
    return this.http.get<Cat[]>(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${pattern}`
    );
  }

  public getCatsByInputBreed(pattern: string): Observable<Cat[]> {
    return this.http.get<Cat[]>(
      `https://api.thecatapi.com/v1/breeds/search?q=${pattern}`
    );
  }

  public getAllBreeds(): Observable<any> {
    return this.http.get<any>('https://api.thecatapi.com/v1/breeds');
  }

  public setPaginationPage(page: number) {
    this.pageNumber = page;
  }
}
