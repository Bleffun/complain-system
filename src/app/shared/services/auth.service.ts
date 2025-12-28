import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { CallApiService } from './CallApi.service';



const defaultPath = '/';

@Injectable()
export class AuthService {
  private _user = sessionStorage.getItem('fullname') || null;
  checkData : any = {};
  if(_user = null){
    this.logOut();
  }
  get loggedIn(): boolean {
    return !!this._user;
  }
  private _lastAuthenticatedPath: string = defaultPath;
  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(private router: Router,private CallApi:CallApiService) { }

  async logIn(username: string, password: string) {
      // Send request
      this.checkData = await this.CallApi.getUser(username).toPromise();
      this.checkData = this.checkData[0];
      if((this.checkData.USER_NAME == username)&&(this.checkData.USER_PASS == password)){
        this._user = { ...this.checkData};
        sessionStorage.setItem('username',this.checkData.USER_NAME);
        sessionStorage.setItem('fullname',this.checkData.USER_FULLNAME);
      }else{
        return {
        isOk: false,
        message: "Username หรือ รหัสผ่านไม่ถูกต้อง"
      };
      }
      window.location.reload();
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
    sessionStorage.clear();
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
      'reset-password',
      'create-account',
      'change-password/:recoveryCode'
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
