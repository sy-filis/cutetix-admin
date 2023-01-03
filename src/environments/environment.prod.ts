export const environment = {
  production: true,
  backend: {
    api: "https://api.pohles.rudickamladez.cz",
    socketio: "https://api.pohles.rudickamladez.cz/ws"
  },
  keycloak: {
    issuer: 'https://auth.lukasmatuska.cz/realms/pohles',
    clientId: 'admin-v2',
    clientSecret: 'poW7Tr4edeEKUXf8dGQjpTymye6L4rRW',
    responseType: 'code',
    scope: 'openid profile email',
    requireHttps: true,
    showDebugInformation: true,
    disableAtHashCheck: true
  }
};
