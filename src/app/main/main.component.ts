import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Cat } from '../model/interfaces';
import { saveCats, setCatsFree } from '../cat.actions';
import { Store } from '@ngrx/store';
import { CatsService } from '../cats.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  public cats: Cat[];
  public pageSizeOptions: number[] = [5, 10, 25, 100];
  public pageNum = 0;
  public showAllMode = false;

  catsState$: Observable<Cat[]>;

  constructor(
    private http: HttpClient,
    private store: Store<{ catsState: Cat[] }>,
    private catsService: CatsService
  ) {
    this.catsState$ = store.select('catsState');
  }

  ngOnInit(): void {
    console.log('showAllMode ', this.showAllMode);
    console.log('ON INIT');
    this.catsState$.subscribe((data: Cat[] | []) => {
      console.log('DATA FROM STORE ', data);
      this.cats = data;
      this.showAllMode = data.length > 0 ? true : false;
    });
  }

  public handlePageEvent(e): void {
    this.pageNum = e.pageIndex;
    this.catsService.setPage(this.pageNum);
  }
}
