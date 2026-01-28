export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: { email: string; password: string }) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

export class SetAuthData {
  static readonly type = '[Auth] SetAuthData';
  constructor(public token: string, public profile: any) {}
}