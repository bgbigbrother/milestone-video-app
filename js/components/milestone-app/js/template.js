export default class AppTemplate {
  constructor(id) {
    this.template = document.createElement('template');

    this.template.innerHTML =  `
      <style>
          @import "/js/components/${id}/css/main.css";
      </style>
      <div id="${id}">
        <slot name="content"></slot>
      </div>`;
  }

  get() {
    return this.template;
  }
}
