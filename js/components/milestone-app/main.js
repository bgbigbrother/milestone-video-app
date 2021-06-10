import AppTemplate from './js/template.js';

const moduleName = 'milestone-app';

export default class AppModule extends HTMLElement {
  constructor() {
    super(name);
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const template = new AppTemplate(moduleName).get();
    this.shadow.appendChild(template.content.cloneNode(true));
	  this.loginElement = document.querySelector('milestone-login-form');
	  this.loginElement.setAttribute('show', 'true');
	  this.loginElement.addEventListener('login', this.onLogin.bind(this));
  }

  onLogin() {
    let treeviewElement = document.createElement('milestone-treeview');
    treeviewElement.setAttribute('show', 'true');
    treeviewElement.addEventListener('clickCamera', this.onClickCamera.bind(this));
    document.querySelector('div').appendChild(treeviewElement);
  }

  onClickCamera(e) {
    let cameraElement = document.createElement('videos-stream');
    cameraElement.cameraId = e.detail.guid;
    document.querySelector('div').appendChild(cameraElement);
    cameraElement.dispatchEvent(new CustomEvent('start'));
  }
}

window.customElements.define(moduleName, AppModule);
