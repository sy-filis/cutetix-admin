import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  constructor(
    private oauthService: OAuthService
  ) { }

  get username() {
    let claims = this.oauthService.getIdentityClaims();
    if (!claims) return 'undefined';
    return claims['preferred_username']
  }

  get name() {
    let claims = this.oauthService.getIdentityClaims();
    if (!claims) return 'undefined';
    return claims['name']
  }

  get email() {
    let claims = this.oauthService.getIdentityClaims();
    if (!claims) return 'undefined';
    return claims['email']
  }

  get email_verified() {
    let claims = this.oauthService.getIdentityClaims();
    if (!claims) return 'undefined';
    return claims['email_verified']
  }

}
