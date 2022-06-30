import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cat } from './model/interfaces';
import { Store } from '@ngrx/store';
import { saveCats, setCatsFree } from './cat.actions';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatsService {
  private pageNumber = 0;
  public pageSubject = new Subject<number>();

  constructor(private http: HttpClient, private store: Store) {}

  public getAllCats(): any {
    const catsOnPage = 10;
    return this.http.get<Cat[]>(
      `https://api.thecatapi.com/v1/images/search?limit=${catsOnPage}&page=${this.pageNumber}&order=Desc`
    );
  }

  public getCatsBySelectedBreed(pattern: string): any {
    return this.http.get<Cat[]>(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${pattern}`
    );
  }

  public getCatsByInputBreed(pattern: string): any {
    return this.http.get<Cat[]>(
      `https://api.thecatapi.com/v1/breeds/search?q=${pattern}`
    );
  }

  public setPage(page: number) {
    console.log('PAGE IN SERVICE ', page);
    this.pageNumber = page;
    this.pageSubject.next(this.pageNumber);
  }
}
