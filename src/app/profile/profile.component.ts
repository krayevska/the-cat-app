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
  cat: Cat;

  ngOnInit(): void {
    if (localStorage.getItem('theCat')) {
      this.route.params.subscribe((params: Params) => {
        this.catId = params['id'];
        const cat = JSON.parse(localStorage.getItem('theCat'));
        if (cat.id === this.catId) {
          this.cat = cat;
        } else {
          this.getNewCatData(this.catId);
        }
      });
    } else {
      this.route.params.subscribe((params: Params) => {
        this.catId = params['id'];
        this.getNewCatData(this.catId);
      });
    }
  }

  public getNewCatData(id: string): void {
    this.catsState$.subscribe((data: Cat[] | []) => {
      this.cats = data;
      this.cat =
        this.cats.length > 1
          ? this.cats.find((cat) => cat.id === id)
          : this.cats[0];
      this.setCatToLocalStorage(this.cat);
    });
  }

  public doesItHaveBreed(): boolean {
    return this.cat.breeds && this.cat.breeds.length > 0;
  }

  public goBack(): void {
    this.router.navigateByUrl('');
  }

  public setCatToLocalStorage(cat: Cat): void {
    if (cat) {
      localStorage.setItem('theCat', JSON.stringify(cat));
    }
  }
}
