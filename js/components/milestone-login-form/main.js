import LoginFormTemplate from './js/template.js';

const moduleName = 'milestone-login-form';

export default class LoginFormModule extends HTMLElement {
  constructor() {
    super(name);
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const template = new LoginFormTemplate(moduleName).get();
    this.shadow.appendChild(template.content.cloneNode(true));
    this.shadow.getElementById('loginButton').addEventListener('click', this.onLoginButtonClick.bind(this))
  }

  get show() {
	   return this.hasAttribute('show');
  }

  set show(value) {
    if (value) {
      this.setAttribute('show', value);
    } else {
      this.removeAttribute('show');
    }
  }

  onLoginButtonClick(e) {
    XPMobileSDK.addObserver({
      connectionDidConnect: this.onSDKConnect.bind(this),
      connectionDidLogIn: this.onSDKLogin.bind(this)
    });
    XPMobileSDK.connect();
  }

  onSDKConnect() {
    XPMobileSDK.login(this.shadow.getElementById('username').value, this.shadow.getElementById('password').value);
  }

  onSDKLogin() {
    this.show = false;
	  this.dispatchEvent(new CustomEvent('login'));
  }

}

window.customElements.define(moduleName, LoginFormModule);
