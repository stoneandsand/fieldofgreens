import Auth0Lock from 'auth0-lock';
import auth0 from 'auth0-js';
import { AUTH_SETTINGS } from './Auth0-settings.js';
const lock = new Auth0Lock(AUTH_SETTINGS.clientId, AUTH_SETTINGS.domain, AUTH_SETTINGS.options);

export default class Auth {
  constructor() {
  this.login = this.login.bind(this);
  this.logout = this.logout.bind(this);
  this.handleAuth = this.handleAuth.bind(this);
  // this.isAuthenticated = this.isAuthenticated.bind(this);
  this.setSession = this.setSession.bind(this);
  }

  login (email, password, cb) {
    lock.show();
  }

  handleAuth () {
    lock.on('authenticated', this.setSession);
    lock.on('authorization_error', (err) => {
      console.log('error of: ',err);
      history.replace('/login');
    });
  }

  setSession (authInfo) {
    if (authInfo && authInfo.accessToken && authInfo.idToken) {
      lock.getUserInfo(authInfo.Token, (err, profile) => {
        if (err) {
          console.log('error : ' + err);
        }
        localStorage.setItem('profile', JSON.stringify(profile));
        localStorage.setItem('accessToken', authInfo.accessToken);
        localStorage.setItem('idToken', authInfo.idToken);
        console.log('profile');
        console.log(profile);
      });
    }
  }

  logout () {
    const isLocal = !process.env.PORT;
    let callbackURL = isLocal ? 'http://localhost:5000' : 'https://fieldofgreens.herokuapp.com/';

    localStorage.removeItem('profile');
    window.location.replace('https://field-of-greens.auth0.com/v2/logout?returnTo=https://fieldofgreens.herokuapp.com/');
    console.log('logged out');
    // localStorage.removeItem('accessToken');
    // localStorage.removeItem('idToken');
  }

  isAuthenticated () {
    return (!!localStorage.getItem('accessToken') && !!localStorage.getItem('idToken'));
  }
}

module.exports.Lock = lock;
