import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';

export const authPasswordFlowConfig: AuthConfig = {

    // Url of the Identity Provider
    issuer: environment.keycloak.issuer,

    // URL of the SPA to redirect the user to after login
    redirectUri: window.location.origin + '/admin/dashboard',

    // URL of the SPA to redirect the user after silent refresh
    // silentRefreshRedirectUri: window.location.origin + '/admin/dashboard?silent-refresh=true',

    // The SPA's id. 
    // The SPA is registerd with this id at the auth-server
    clientId: environment.keycloak.clientId,

    dummyClientSecret: environment.keycloak.clientSecret,

    // set the scope for the permissions the client should request
    // The first three are defined by OIDC. The 4th is a usecase-specific one
    scope: environment.keycloak.scope,

    // Remove the requirement of using Https to simplify the demo
    // THIS SHOULD NOT BE USED IN PRODUCTION
    // USE A CERTIFICATE FOR YOUR IDP
    // IN PRODUCTION
    requireHttps: environment.keycloak.requireHttps,

    showDebugInformation: environment.keycloak.showDebugInformation,
    disableAtHashCheck: environment.keycloak.disableAtHashCheck,

    oidc: false,
};