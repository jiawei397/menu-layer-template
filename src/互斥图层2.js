uinv.layerUserConfig = [{
  'name': 'jw2',
  'mutexField': 'jw',
  'icon': 'images/layer/icon/hideEnv.png', //左侧图片
  'isChecked': false,
  'ignoreRecoverDefault': true,
  'initCB': function (menuItem) {
    menuItem.initCheckState();
  },
  'itemClickCB': function (menuItem) {
    menuItem.changeCheckState();
    console.warn(menuItem.name);
  }
}];
