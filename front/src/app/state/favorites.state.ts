import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Pollution } from '../models/pollution.model';

export class AddFavorite {
  static readonly type = '[Favorite] Add';
  constructor(public payload: Pollution) {}
}

export class RemoveFavorite {
  static readonly type = '[Favorite] Remove';
  constructor(public id: number) {}
}

export interface FavoriteStateModel {
  items: Pollution[];
}

@State<FavoriteStateModel>({
  name: 'favorites',
  defaults: {
    items: []
  }
})
export class FavoriteState {

  @Selector()
  static items(state: FavoriteStateModel) {
    return state.items;
  }

  @Selector()
  static count(state: FavoriteStateModel) {
    return state.items.length;
  }

  @Action(AddFavorite)
  add({ getState, patchState }: StateContext<FavoriteStateModel>, action: AddFavorite) {
    const state = getState();

    // éviter les doublons
    if (!state.items.some(p => p.id === action.payload.id)) {
      patchState({
        items: [...state.items, action.payload]
      });
    }
  }

  @Action(RemoveFavorite)
  remove({ getState, patchState }: StateContext<FavoriteStateModel>, action: RemoveFavorite) {
    const state = getState();
    patchState({
      items: state.items.filter(p => p.id !== action.id)
    });
  }
}
