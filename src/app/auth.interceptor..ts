import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private oauthService: OAuthService
    ) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (
            this.oauthService.hasValidAccessToken() &&
            request.url.includes(environment.backend.api)
        ) {

            let headers = new HttpHeaders({
                'Authorization': this.oauthService.authorizationHeader()
            });

            if (request.headers.has("Content-Type")) {
                //@ts-ignore
                headers = headers.append('Content-Type', request.headers.get('Content-Type'));
            }
            const authRequest = request.clone(
                {
                    headers: headers
                }
            );
            return next.handle(authRequest);
        }
        return next.handle(request);
    }
}
