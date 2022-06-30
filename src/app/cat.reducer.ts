import { createReducer, on } from '@ngrx/store';
import { saveCats, setCatsFree } from './cat.actions';

export const initialCatState = [];

export const catReducer = createReducer(
  initialCatState,
  on(saveCats, (state, { cats }) => cats),
  on(setCatsFree, (state) => [])
);
