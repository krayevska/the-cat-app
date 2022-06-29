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
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('ON INIT');
    this.showCats();
  }

  // public editCats(cats: Cat[]): Cat[] {
  //   console.log('cats in EDIT ', cats);
  //   const catEdited = cats.map((cat) => {
  //     if (cat.height > 100) {
  //       cat.height = 100;
  //     }
  //     return cat;
  //   });
  //   console.log('catEdited ', catEdited);
  //   return catEdited;
  // }

  public getCats(): any {
    console.log('getCats');
    const pageNumber = 0;
    const catsOnPage = 10;
    return this.http.get<Cat[]>(
      `https://api.thecatapi.com/v1/images/search?limit=${catsOnPage}&page=${pageNumber}&order=Desc`
    );
  }

  public showCats(): void {
    console.log('showCats');
    this.getCats().subscribe((data: Cat[]) => {
      console.log('DATA ', data);
      //this.cats = this.editCats(data);
      this.cats = data;
    });
  }

  public setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }
}
