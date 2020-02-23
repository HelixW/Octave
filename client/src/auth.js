// Fake Authentication

class Auth {
  constructor() {
    this.authenticated = false;
  }

  login(callback) {
    this.authenticated = true;
    setTimeout(callback, 100); // fake async
  }

  logout(callback) {
    this.authenticated = false;
    setTimeout(callback, 100); // fake async
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
