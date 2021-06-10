let parsedData = {
  All: {},
  Raw: {}
};

export default class Items {
  constructor(response) {
    this.parseData(response);
    parsedData.Raw = response;
  }

  parseData(data, parent) {
    if(data.constructor === Array) {
      this.parseArray(data, parent);
    }
  }

  parseArray(data, parent) {
    data.forEach((item)=>{
      if(!parsedData[item.Type]) {
        parsedData[item.Type] = {};
      }
      let itemData = {
        Id: item.Id,
        Name: item.Name,
        Type: item.Type,
        Parent: parent ? parent : '/'
      };
      parsedData[item.Type][item.Id] = itemData;
      parsedData.All[item.Id] = itemData;
      if(item.Items) {
        this.parseData(item.Items, item.Id);
      }
    });
  }

  getParsedData() {
    return parsedData;
  }
}
