import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Cat } from '../model/interfaces';

const CAT_KEY = 'theCat';

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

  public cats: Cat[];
  catsState$: Observable<Cat[]>;
  public cat: Cat;

  ngOnInit(): void {
    const catFromStorage = JSON.parse(localStorage.getItem(CAT_KEY));
    this.route.params.subscribe((params: Params) => {
      const catParamsId = params['id'];
      if (catFromStorage?.id === catParamsId) {
        this.cat = catFromStorage;
      } else {
        this.getNewCatData(catParamsId);
      }
    });
  }

  public getNewCatData(id: string): void {
    this.catsState$.subscribe((cats: Cat[]) => {
      this.cat = cats.length > 1 ? cats.find((cat) => cat.id === id) : cats[0];
      if (this.cat) {
        localStorage.setItem(CAT_KEY, JSON.stringify(this.cat));
      }
    });
  }

  public hasBreed(): boolean {
    return !!this.cat?.breeds?.length;
  }

  public goBack(): void {
    this.router.navigateByUrl('');
  }
}
