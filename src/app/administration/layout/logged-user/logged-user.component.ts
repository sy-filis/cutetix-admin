import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-logged-user',
  templateUrl: './logged-user.component.html',
  styleUrls: ['./logged-user.component.scss']
})
export class LoggedUserComponent {
  formatedRoles = 'All';

  constructor(
    private router: Router,
    private oauthService: OAuthService,
    @Inject(DOCUMENT) private document: Document
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

  logout() {
    this.oauthService.logOut(true);
    this.router.navigate(['/home', { login: true }])
  }
  
  public toggleTheme() {
    this.document.body.classList.toggle('light');
    this.document.body.classList.toggle('alt-font');
  }

}