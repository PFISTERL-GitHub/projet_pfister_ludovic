import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { tap } from 'rxjs';

import { AuthStateModel } from './auth.model';
import { Login, Logout, SetAuthData } from './auth.actions';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    profile: null,
    isAuthenticated: false
  }
})
@Injectable()
export class AuthState {

  constructor(private authService: AuthService) {}

  /* SELECTORS */

  @Selector()
  static token(state: AuthStateModel) {
    return state.token;
  }

  @Selector()
  static profile(state: AuthStateModel) {
    return state.profile;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel) {
    return state.isAuthenticated;
  }

  /* ACTIONS */

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    return this.authService.login(action.payload).pipe(
      tap((res: any) => {
        ctx.dispatch(new SetAuthData(res.token, res.user));
      })
    );
  }

  @Action(SetAuthData)
  setAuthData(ctx: StateContext<AuthStateModel>, action: SetAuthData) {
    ctx.patchState({
      token: action.token,
      profile: action.profile,
      isAuthenticated: true
    });
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    ctx.setState({
      token: null,
      profile: null,
      isAuthenticated: false
    });
    localStorage.removeItem('auth');
  }
}
