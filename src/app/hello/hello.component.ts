import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.scss']
})
export class HelloComponent implements OnInit {
  login: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private oauthService: OAuthService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((p) => {
      this.login = p['login'];
      if (this.login) {
        this.router.navigate(['/login']);
      } else if (this.oauthService.hasValidAccessToken()) {
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
