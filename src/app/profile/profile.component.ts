import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Cat } from '../model/interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<{ catsState: Cat[] }>
  ) {
    this.catsState$ = store.select('catsState');
  }

  public catId: string;
  public cats: Cat[];
  catsState$: Observable<Cat[]>;
  public catImgUrl: string;
  public breedsData: any;
  public breeds: string[] = [];

  ngOnInit(): void {
    if (localStorage.getItem('catId')) {
      this.route.params.subscribe((params: Params) => {
        this.catId = params['id'];
        if (localStorage.getItem('catId') === this.catId) {
        }
      });
      this.catId = localStorage.getItem('catId');
      this.catImgUrl = localStorage.getItem('catUrl');
      this.breeds =
        localStorage.getItem('breeds').length > 0
          ? localStorage.getItem('breeds').split(',')
          : [];
    } else {
      this.route.params.subscribe((params: Params) => {
        this.catId = params['id'];
        console.log('this.catId ', this.catId);
        this.catsState$.subscribe((data: Cat[] | []) => {
          console.log('DATA FROM STORE cats', data);
          this.cats = data;
          this.getCatData(this.cats);
        });
      });
    }
  }

  public getCatData(cats: Cat[]): void {
    const cat = cats.find((cat) => cat.id == this.catId);
    console.log('CAT ', cat);
    this.catImgUrl = cat.url;
    this.breedsData = cat.breeds;

    this.breedsData.forEach((breed) => {
      this.breeds.push(breed.name);
    });
    this.setCatToLocalStorage();
  }

  public doesItHaveBreed(): boolean {
    return this.breeds.length > 0;
  }

  public goBack(): void {
    localStorage.removeItem('catId');
    localStorage.removeItem('catUrl');
    localStorage.removeItem('breeds');
    this.router.navigateByUrl('');
  }

  public setCatToLocalStorage(): void {
    const breeds = this.breeds.join(',');
    localStorage.setItem('catUrl', this.catImgUrl);
    localStorage.setItem('catId', this.catId);
    localStorage.setItem('breeds', breeds);
  }
}
