import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { CallApiService } from './api/call-api.service';
import { Cache } from '../services/cache';
import { AuthApiService } from './api/auth-api.service';

const defaultPath = '/';

@Injectable()
export class AuthService {
  private _user = null;
  checkData: any = {};
  if(_user = null) {
    this.logOut();
  }
  get loggedIn(): boolean {
    this._user = Cache.Get('fullname');
    return !!this._user;
  }
  private _lastAuthenticatedPath: string = defaultPath;
  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(private router: Router, private CallApi: CallApiService, private AuthApi: AuthApiService) { }

  async logIn(username: string, password: string) {
    // Send request
    const UandP = {
      username: username,
      password: password
    };
    this.AuthApi.Login(UandP).subscribe(req => {
      Cache.Set('accesstoken', req.AccessToken);
      Cache.Set('Refreshtoken', req.RefreshToken);
    });

    if (Cache.Get('Refreshtoken')) {
      if ((this.checkData.USER_NAME == username) && (this.checkData.USER_PASS == password)) {
        this.checkData = await this.CallApi.getUser(username).toPromise() || null;
        this.checkData = this.checkData.body[0];
        Cache.Set('username', this.checkData.USER_NAME);
        Cache.Set('fullname', this.checkData.USER_FULLNAME);
        Cache.Set('role', this.checkData.ROLE_NAME);
        Cache.Set('UserID', this.checkData.USER_ID);
        Cache.Set('roleId', this.checkData.ROLE_ID);
      }
    } else {
      return {
        isOk: false,
        message: "Username หรือ รหัสผ่านไม่ถูกต้อง"
      };
    }
    this.router.navigate([this._lastAuthenticatedPath]);

    return {
      isOk: true,
      data: this._user
    };

  }

  async getUser() {
    try {
      // Send request
      return {
        isOk: true,
        data: this._user
      };
    }
    catch {
      return {
        isOk: false,
        data: null
      };
    }
  }

  async createAccount(email: string, password: string) {
    try {
      // Send request

      this.router.navigate(['/create-account']);
      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to create account"
      };
    }
  }

  async changePassword(email: string, recoveryCode: string) {
    try {
      // Send request

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to change password"
      }
    }
  }

  async resetPassword(email: string) {
    try {
      // Send request

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to reset password"
      };
    }
  }

  async logOut() {
    this._user = null;
    Cache.ClearCache();
    this.router.navigate(['/login-form']);
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.loggedIn;
    const isAuthForm = [
      'login-form',
      'guest-form'
    ].includes(route.routeConfig?.path || defaultPath);

    if (isLoggedIn && isAuthForm) {
      this.authService.lastAuthenticatedPath = defaultPath;
      this.router.navigate([defaultPath]);
      return false;
    }

    if (!isLoggedIn && !isAuthForm) {
      this.router.navigate(['/login-form']);
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath = route.routeConfig?.path || defaultPath;
    }

    return isLoggedIn || isAuthForm;
  }
}
