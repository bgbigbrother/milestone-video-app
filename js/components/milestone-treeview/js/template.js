export default class TreeviewTemplate {
  constructor(id, data) {
    this.template = document.createElement('template');
    this.tree = "";

    this.template.innerHTML =  `
      <style>
          @import "/js/components/${id}/css/main.css";
      </style>
      <div id="${id}">
        ${this.renderTree(data.Raw)}
      </div>`;
  }

  renderTree(data, nested) {
    if(data.constructor === Array) {
      this.tree += `<ul class="${ nested ? 'nested' : 'root' }">`;
      this.renderElement(data);
      this.tree += `</ul>`;
    }
    return this.tree;
  }

  renderElement(data) {
    data.forEach((item)=>{
      this.tree += `<li guid="${item.Id}" type="${item.Type}" ${item.Items && item.Items.length ? 'class="trigger"' : ''}>${item.Name}</li>`;
      if(item.Items && item.Items.length) {
        this.renderTree(item.Items, true);
      }
    });
  }

  get() {
    return this.template;
  }
}
