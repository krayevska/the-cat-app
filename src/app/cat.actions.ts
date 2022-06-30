import { createAction, props } from '@ngrx/store';
import { Cat } from './model/interfaces';

export const saveCats = createAction(
  '[Cat Component] SaveCats',
  props<{ cats: Cat[] }>()
);
export const setCatsFree = createAction('[Cat Component] SetCatsFree');
