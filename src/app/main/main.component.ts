import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Cat } from '../model/interfaces';
import { Store } from '@ngrx/store';
import { CatsService } from '../cats.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  public cats: Cat[];
  public catsPerPage = 12;
  public pageNum = 0;
  public showAllMode = false;

  catsState$: Observable<Cat[]>;

  constructor(
    private store: Store<{ catsState: Cat[] }>,
    private catsService: CatsService,
    private router: Router
  ) {
    this.catsState$ = store.select('catsState');
  }

  ngOnInit(): void {
    this.catsState$.subscribe((data: Cat[] | []) => {
      this.cats = data;
      this.showAllMode = data.length > 1 ? true : false;
    });
  }

  public handlePageEvent(e): void {
    this.pageNum = e.pageIndex;
    this.catsService.setPaginationPage(this.pageNum);
  }

  public onCatClick(id: string): void {
    this.router.navigateByUrl('/profile/' + id);
  }
}
