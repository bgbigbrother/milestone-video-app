import TreeviewTemplate from './js/template.js';
import Items from './js/items.js';

const moduleName = 'milestone-treeview';

export default class TreeviewModule extends HTMLElement {
  constructor() {
    super(name);
    this.shadow = this.attachShadow({ mode: 'open' });
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

  connectedCallback() {
    XPMobileSDK.getAllViews(this.getAllViewsCallback.bind(this));
  }

  getAllViewsCallback(response) {
    this.items = new Items(response);
    const template = new TreeviewTemplate(moduleName, this.items.getParsedData()).get();
    this.shadow.appendChild(template.content.cloneNode(true));
    setTimeout(() => {
      this.addEventListeners();
    }, 1000)
  }

  addEventListeners() {
    let triggers = this.shadow.querySelectorAll(".trigger");
    for (let i = 0; i < triggers.length; i++) {
      triggers[i].addEventListener("click", function() {
        this.parentElement.querySelector(".nested").classList.toggle("active");
        this.classList.toggle("trigger-down");
      });
    }
    let cameras = this.shadow.querySelectorAll('li[type="Camera"]');
    for(let i = 0; i < cameras.length; i++) {
      cameras[i].addEventListener("click", () => {
        this.dispatchEvent(new CustomEvent("clickCamera", {detail:{from:moduleName, guid:cameras[i].getAttribute('guid')}}));
      });
    }
  }
}

window.customElements.define(moduleName, TreeviewModule);
