uinv.layerUserConfig = [{
  name: '显示物体',
  isChecked: false,
  initCB (menuItem) {
    menuItem.initCheckState();
  },
  itemClickCB: (menuItem)=> {
    // console.warn(menuItem.name);
    const userConfig = uinv.layerManager.getUserParamterConfig(uinv.selectionTools.getSelRootObj(), menuItem.name);//第2个参数为图层名称
    if (!userConfig || !userConfig.query) {
      console.error('未获取到条件！');
      return;
    }
    menuItem.changeCheckState();
    const layer = uinv.layerManager.getLayer(menuItem.name);
    layer.selTypeParam = userConfig.query;
    layer.show(menuItem.isChecked);
  },
  itemLeaveCB: function (menuItem) {
    console.log('----------leave----------');
    if (menuItem.isChecked) {
      menuItem.changeCheckState();
    }
  },
  itemConfig: [
    {
      'name': 'query',//获取到整个配置项后的Key
      'type': 'string',//输入类型
      'caption': '条件',//标题
      'defaultItem': '',
      'desc': ''
    }
  ]
}];
