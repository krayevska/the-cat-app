import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Cat } from '../model/interfaces';
import { saveCats, setCatsFree } from '../cat.actions';
import { Store } from '@ngrx/store';
import { CatsService } from '../cats.service';

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
  public noCats: string;

  @Input() pageNumber: number;

  constructor(
    private http: HttpClient,
    private store: Store,
    private catsService: CatsService
  ) {}

  ngOnInit(): void {
    this.getBreeds();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes ', changes);
    console.log('changes ', changes.pageNumber.currentValue);
    if (changes.pageNumber.currentValue) {
      this.getCats(['all', 'all']);
    }
  }

  public getCats(info: string[]) {
    this.areCatsHere = true;
    if (info[0] === 'all') {
      this.catsService.getAllCats().subscribe((data: Cat[]) => {
        console.log('DATA ALL', data);
        this.cats = data;
        this.setCatsToStore(this.cats);
      });
    } else if (info[0] === 'select') {
      this.catsService
        .getCatsBySelectedBreed(info[1])
        .subscribe((data: Cat[]) => {
          this.cats = data;
          this.setCatsToStore(this.cats);
        });
    } else {
      this.catsService.getCatsByInputBreed(info[1]).subscribe((data: any) => {
        this.catsService
          .getCatsBySelectedBreed(data[0].id)
          .subscribe((data: Cat[]) => {
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

  public getBreeds(): void {
    const url = 'https://api.thecatapi.com/v1/breeds';
    this.http.get<any>(url).subscribe((data: Cat[]) => {
      console.log('BREED DATA ', data);
      this.breedsList = data;
    });
  }

  public getCatsOut(): void {
    this.store.dispatch(setCatsFree());
    this.areCatsHere = false;
  }
}
