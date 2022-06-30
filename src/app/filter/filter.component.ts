import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Cat } from '../model/interfaces';
import { Output, EventEmitter } from '@angular/core';
import { saveCats, setCatsFree } from '../cat.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  public breedsList: any;
  public patternFromInput: string;
  public areCatsHere = false;
  public pageNum = 0;
  public cats: Cat[];

  catsState$: Observable<Cat[]>;

  //@Output() pattern = new EventEmitter<String[]>();

  constructor(
    private http: HttpClient,
    private store: Store<{ catsState: Cat[] }>
  ) {
    this.catsState$ = store.select('catsState');
  }

  ngOnInit(): void {
    this.getBreeds();
  }

  public getAllCats(): any {
    const pageNumber = this.pageNum;
    const catsOnPage = 10;
    return this.http.get<Cat[]>(
      `https://api.thecatapi.com/v1/images/search?limit=${catsOnPage}&page=${pageNumber}&order=Desc`
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

  public getCats(info: string[]) {
    if (info[0] === 'all') {
      this.getAllCats().subscribe((data: Cat[]) => {
        console.log('DATA ALL', data);
        this.cats = data;
        this.setCatsToStore(this.cats);
      });
    } else if (info[0] === 'select') {
      //this.showAllMode = false;
      this.getCatsBySelectedBreed(info[1]).subscribe((data: Cat[]) => {
        this.cats = data;
        this.setCatsToStore(this.cats);
      });
    } else {
      console.log('SELECT');
      //this.showAllMode = false;
      this.getCatsByInputBreed(info[1]).subscribe((data: any) => {
        console.log('DATA INPUT  breed', data);
        this.getCatsBySelectedBreed(data[0].id).subscribe((data: Cat[]) => {
          console.log('DATA INPUT CATS ', data);
          this.cats = data;
          this.setCatsToStore(this.cats);
        });
      });
    }
  }

  public handleSelect(name: string): void {
    const breedInfo = this.breedsList.find((breed) => breed.name === name);
    console.log('breedInfo ', breedInfo);
    this.getCats(['select', breedInfo.id]);
  }

  public setCatsToStore(cats: Cat[]) {
    this.store.dispatch(saveCats({ cats }));
  }

  // public showCats(pattern: string[]): void {
  //   if (pattern[1] === 'all') {
  //     this.getAllCats().subscribe((data: Cat[]) => {
  //       console.log('DATA ALL', data);
  //       this.cats = data;
  //       this.onSaveCats(this.cats);
  //     });
  //     this.showAllMode = true;
  //   } else if (pattern[1] === 'select') {
  //     this.showAllMode = false;
  //     this.getCatsBySelectedBreed(pattern[0]).subscribe((data: Cat[]) => {
  //       this.cats = data;
  //       this.onSaveCats(this.cats);
  //     });
  //   } else {
  //     this.showAllMode = false;
  //     console.log('NAME ', pattern[1]);
  //     this.getCatsByInputBreed(pattern[0]).subscribe((data: any) => {
  //       console.log('DATA INPUT  ', data);
  //       console.log('data.id ', data[0].id);
  //       this.getCatsBySelectedBreed(data[0].id).subscribe((data: Cat[]) => {
  //         console.log('DATA INPUT CATS ', data);
  //         this.cats = data;
  //         this.onSaveCats(this.cats);
  //       });
  //     });
  //   }
  // }

  // public setPattern(pattern: string): void {
  //   this.areCatsHere = true;
  //   if (pattern !== 'all') {
  //     const breedInfo = this.breedsList.find((breed) => breed.name === pattern);
  //     this.pattern.emit([breedInfo.id, 'select']);
  //   } else {
  //     this.pattern.emit([pattern, 'all']);
  //   }
  // }

  public getBreeds(): void {
    const url = 'https://api.thecatapi.com/v1/breeds';
    this.http.get<any>(url).subscribe((data: Cat[]) => {
      console.log('BREED DATA ', data);
      this.breedsList = data;
    });
  }

  // public inputPattern(): void {
  //   this.areCatsHere = true;
  //   this.pattern.emit([this.patternFromInput, 'name']);
  // }

  //https://api.thecatapi.com/v1/breeds
}
