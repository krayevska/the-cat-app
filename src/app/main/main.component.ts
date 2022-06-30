import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Cat } from '../model/interfaces';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  public cats: Cat[];
  public pageSizeOptions: number[] = [5, 10, 25, 100];
  public pageNum = 0;
  public showAllMode: boolean;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('ON INIT');
  }

  public handlePageEvent(e): void {
    console.log('handlePageEvent');
    console.log('EVENT ', e);
    this.pageNum = e.pageIndex;
    this.showCats(['all', 'all']);
  }

  public getAllCats(): any {
    console.log('getCats');
    const pageNumber = this.pageNum;
    const catsOnPage = 10;
    return this.http.get<Cat[]>(
      `https://api.thecatapi.com/v1/images/search?limit=${catsOnPage}&page=${pageNumber}&order=Desc`
    );
  }

  public getCatsBySelectedBreed(pattern: string): any {
    console.log('SELECT ', pattern);
    return this.http.get<Cat[]>(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${pattern}`
    );
  }

  public getCatsByInputBreed(pattern: string): any {
    console.log('NAME ', pattern);
    return this.http.get<Cat[]>(
      `https://api.thecatapi.com/v1/breeds/search?q=${pattern}`
    );
  }

  // public showAllCats(onPage: number): void {
  //   this.getAllCats().subscribe((data: Cat[]) => {
  //     console.log('DATA ALL', data);
  //     this.cats = data;
  //   });
  // }

  public showCats(pattern: string[]): void {
    console.log('PATERN ', pattern);
    if (pattern[1] === 'all') {
      this.getAllCats().subscribe((data: Cat[]) => {
        console.log('DATA ALL', data);
        this.cats = data;
      });
      this.showAllMode = true;
    } else if (pattern[1] === 'select') {
      this.showAllMode = false;
      this.getCatsBySelectedBreed(pattern[0]).subscribe((data: Cat[]) => {
        this.cats = data;
      });
    } else {
      this.showAllMode = false;
      console.log('NAME ', pattern[1]);
      this.getCatsByInputBreed(pattern[0]).subscribe((data: any) => {
        console.log('DATA INPUT  ', data);
        console.log('data.id ', data[0].id);
        this.getCatsBySelectedBreed(data[0].id).subscribe((data: Cat[]) => {
          console.log('DATA INPUT CATS ', data);
          this.cats = data;
        });
      });
    }
  }

  public setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }
}
