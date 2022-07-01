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

  @Input() pageNumber: number;

  constructor(private store: Store, private catsService: CatsService) {}

  ngOnInit(): void {
    this.catsService.getAllBreeds().subscribe((allBreeds: Cat[]) => {
      this.breedsList = allBreeds;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.pageNumber.currentValue) {
      this.getAllCats();
    }
  }

  public getAllCats(): void {
    this.areCatsHere = true;
    this.catsService.getAllCats().subscribe((data: Cat[]) => {
      this.cats = data;
      this.setCatsToStore(this.cats);
    });
  }

  public getCatsBySelectedBreed(id: string): void {
    this.catsService.getCatsBySelectedBreed(id).subscribe((data: Cat[]) => {
      this.cats = data;
      this.setCatsToStore(this.cats);
    });
  }

  public getCatsByBreedName(name: string): void {
    this.catsService.getCatsByInputBreed(name).subscribe((breeds: any) => {
      this.getCatsBySelectedBreed(breeds[0].id);
    });
  }

  public handleSelect(name: string): void {
    const breedInfo = this.breedsList.find((breed) => breed.name === name);
    this.getCatsBySelectedBreed(breedInfo.id);
  }

  public setCatsToStore(cats: Cat[]) {
    this.store.dispatch(saveCats({ cats }));
  }

  public getCatsOut(): void {
    this.store.dispatch(setCatsFree());
    this.patternFromInput = '';
    this.areCatsHere = false;
  }
}
