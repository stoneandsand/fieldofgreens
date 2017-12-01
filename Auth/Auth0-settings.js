export const AUTH_SETTINGS = {
  domain: 'field-of-greens.auth0.com',
  clientId:'cx8oFJZb3bPmXbNq51tV3hKDu5BP1Bct',
  callbackUrl: 'http://localhost:3000/callback',
  options: {
    languageDictionary: {
      title: "fieldOfGreens"
    },
    theme: {
      primaryColor: '#71d839',
      socialButtonStyle:'small'
    },
    allowedConnections: [/*'Username-Password-Authentication', */'facebook'],
    allowLogin: true,
    loginAfterSignUp: true,
    closable: true,
    autoclose: true,
    oidcConformant: false,
  }
}