uinv.layerUserConfig = [{
  name: '显示物体',
  isChecked: false,
  initCB: function (menuItem) {
    menuItem.initCheckState();
  },
  itemClickCB: function (menuItem) {
    // console.warn(menuItem.name);
    var userConfig = uinv.layerManager.getUserParamterConfig(uinv.selectionTools.getSelRootObj(), menuItem.name);//第2个参数为图层名称
    if (!userConfig || !userConfig.query) {
      console.error('未获取到条件！');
      return;
    }
    menuItem.changeCheckState();
    var layer = uinv.layerManager.getLayer(menuItem.name);
    layer.selTypeParam = userConfig.query;
    layer.show(menuItem.isChecked);
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
