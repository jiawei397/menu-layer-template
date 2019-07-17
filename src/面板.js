uinv.baseContextMenuTemp = [{
  'name': 'DCV_MONITORING_INFORMATION', //监控信息
  'useInDataPanel': true,
  'buttonImages': ['images/objectPanal/icon/JianKong.png', 'images/objectPanal/icon/JianKong_over.png', 'images/objectPanal/icon/JianKong_down.png'],
  'initCB': function (menuItem) {
  },
  'itemClickCB': function (menuItem) {
    var userConfig = {
      'url': 'tab-monitor.html',
      'sync': false,
      'urlParamType': 'func',
      'urlParamFunc': function (menuItem, obj, func) {
        var menu = menuItem.parent;
        if (!uinv.monitorManager.isMonitorObj(obj)) { //不在监控范围内的，再添加
          uinv.monitorManager.addMonitorObj(obj, null, null, 'MonitorInfo_button_search');
          if (obj.isDimension(uinv.DimensionType.COSMOS)) {
            uinv.monitorManager.remoteData(obj.getMonitorName());
          } else {
            uinv.monitorManager.remoteData(obj.ID);//jw 2017.11.13 修改为id
          }
        }
        var getParam = function () {
          //			uinv.monitorManager.removeMonitorObj(obj);
          var userConfig2 = uinv.contextMenuManager.getUserParamterConfig(obj, menuItem.name);
          if (!menu.getShow()) return;
          if (menu.pickedObj != obj) return;
          if (menuItem.icon != menuItem.buttonImages[2]) return;

          var data = uinv.util.cloneObj(obj.MONITOR, true);
          if (!data) {
            data = {};
          }

          var list = [];
          var newlist = [];
          for (var idx in data) {
            var list2 = [];
            for (var isx in data[idx]) {
              var list3 = [];
              for (var itx in data[idx][isx]) {
                if (userConfig2 && userConfig2['showMapping']) {
                  var showMapping = userConfig2['showMapping'];
                }
                var obj3;
                if (showMapping && showMapping[itx] && showMapping[itx][data[idx][isx][itx]['value']]) {
                  var objBak = data[idx][isx][itx];
                  objBak.value = showMapping[itx][data[idx][isx][itx]['value']];
                  obj3 = {
                    'key': itx,
                    'value': objBak
                  };
                } else {
                  obj3 = {
                    'key': itx,
                    'value': data[idx][isx][itx]
                  };
                }
                if (userConfig2 && userConfig2['iconMapping']) {
                  for (var cur in userConfig2['iconMapping']) {
                    if (obj3.value.value == userConfig2['iconMapping'][cur]['key']) {
                      obj3.value.value = userConfig2['iconMapping'][cur]['value'];
                      break;
                    }
                  }
                }
                list3.push(obj3);
              }
              var obj2 = {};
              obj2.key = isx;
              obj2.value = list3;
              list2.push(obj2);
            }
            var obj1 = {};
            obj1.key = idx;
            obj1.value = list2;
            list.push(obj1);
          }

          //--whj--2014-11-17--监控项排序--start--

          var userConfig2 = uinv.contextMenuManager.getUserParamterConfig(obj, menuItem.name);
          if (userConfig2 && userConfig2['keySort']) {
            var objSort = {};
            objSort.app = [];
            objSort.inst = {};
            objSort.param = {};
            var child;
            for (var i = 0; i < userConfig2['keySort'].length; i++) {
              objSort.app.push(userConfig2['keySort'][i].name);
              if (!userConfig2['keySort'][i].children) continue;
              objSort.inst[userConfig2['keySort'][i].name] = [];
              for (var ii = 0; ii < userConfig2['keySort'][i].children.length; ii++) {
                objSort.inst[userConfig2['keySort'][i].name].push(userConfig2['keySort'][i].children[ii].name);
                if (!userConfig2['keySort'][i].children[ii].children) continue;
                objSort.param[userConfig2['keySort'][i].name] = [];
                child = userConfig2['keySort'][i].children[ii];
                for (var iii = 0; iii < child.children.length; iii++) {
                  objSort.param[userConfig2['keySort'][i].name].push(child.children[iii].name);
                }
              }
            }
            //userConfig2["keySort"] = objSort;
            list = list.sort(function (a, b) {
              var obj1index = 9998;
              var obj2index = 9999;
              for (var ia = 0; ia < objSort.app.length; ia++) {
                if (a.key == objSort.app[ia]) {
                  obj1index = ia;
                }
                if (b.key == objSort.app[ia]) {
                  obj2index = ia;
                }
              }
              if (obj1index > obj2index) return 1;
              return -1;
            });

            for (var i = 0; i < list.length; i++) {
              list[i].value = list[i].value.sort(function (c, d) {
                if (c.key == '_' || d.key == '_') return -1;
                var obj1index = 9998;
                var obj2index = 9999;
                for (var p in objSort.inst) {
                  if (list[i].key == p) {
                    for (var ia = 0; ia < objSort.inst[p].length; ia++) {
                      if (c.key == objSort.inst[p][ia]) {
                        obj1index = ia;
                      }
                      if (d.key == objSort.inst[p][ia]) {
                        obj2index = ia;
                      }
                    }
                    if (obj1index > obj2index) return 1;
                    return -1;
                  }
                }
              });
              for (var j = 0; j < list[i].value.length; j++) {
                list[i].value[j].value = list[i].value[j].value.sort(function (e, f) {
                  var obj1index = 9998;
                  var obj2index = 9999;
                  for (var p in objSort.param) {
                    if (list[i].key == p) {
                      for (var ia = 0; ia < objSort.param[p].length; ia++) {
                        if (e.key == objSort.param[p][ia]) {
                          obj1index = ia;
                        }
                        if (f.key == objSort.param[p][ia]) {
                          obj2index = ia;
                        }
                      }
                      if (obj1index > obj2index) return 1;
                      return -1;
                    }
                  }
                });
              }
            }
          }

          for (var i = 0; i < list.length; i++) {
            var objfirst = {};
            var objsecond = {};
            for (var j = 0; j < list[i].value.length; j++) {
              var objthird = {};
              for (var k = 0; k < list[i].value[j].value.length; k++) {
                var tempKey = list[i].value[j].value[k].key;
                var tempValue = list[i].value[j].value[k].value;
                if (uinv.kpiTranslation) { //jw 2016.10.14 KPI映射，定义在config.js中
                  a:for (var name in uinv.kpiTranslation) {
                    if (name == tempKey) {
                      for (var num in uinv.kpiTranslation[name]) {
                        if (num == tempValue.value) { //jw 2016.11.18 tempValue是个Object，还有type和value
                          tempValue.value = uinv.kpiTranslation[name][num];
                          break a;
                        }
                      }
                    }
                  }
                }
                objthird[tempKey] = tempValue;
              }
              objsecond[list[i].value[j].key] = objthird;
            }
            objfirst[list[i].key] = objsecond;
            newlist.push(objfirst);
          }
          //--whj--2014-11-17--监控项排序--end--
          var imagePath = 'images/';
          if (uinv.MonitorPanalImagePath) imagePath = uinv.MonitorPanalImagePath;
          var param = {
            imagePath: imagePath,
            data: newlist
          };
          var userConfig2 = uinv.contextMenuManager.getUserParamterConfig(obj, menuItem.name);
          if (userConfig2 && userConfig2['clickStr'] && userConfig2['clickUrl']) {
            param['url'] = userConfig2['clickStr'];
          }
          var paramClone = uinv.util.cloneObj(param, true);
          paramClone = uinv.util.toJSON(paramClone);
          if (paramClone != obj._lastMonitorInfo) {
            //			return param;
            obj._lastMonitorInfo = paramClone;
            if (func) func(menuItem, obj, 'tab-monitor.html', param);
          }
        };

        uinv.monitorManager.regRemoteDataFunc('MonitorInfo_default_', getParam);

        if (obj.MONITOR) getParam();

        menu.setCallbackInWeb('clickStr', function () {
          uinv.u3d.funcSet.openWindow();
        });
      }
    };

    contextMenuDefaultItemClickCB(menuItem, 'DCV_MONITORING_INFORMATION', userConfig, 'images/icon/JianKong.png',
      function (menuItem, obj, url, param) {
        var menu = menuItem.parent;
        //liqun
        //menu.executeJavascriptInWeb("changeUrl", [ "" ,"" ]);
        menu.executeJavascriptInWeb('changeUrl', [url, param]);
      }
    );
    var menu = menuItem.parent;
    var obj = menuItem.parent.pickedObj;
    menu.setCallbackWithResultInWeb('clickStr', function () {
      var userConfig = uinv.contextMenuManager.getUserParamterConfig(obj, menuItem.name);
      if (userConfig['clickStrUrl_windowType']) {
        userConfig[userConfig['clickStrUrl_windowType']] = true;
      }
      var url = userConfig['clickUrl'];
      if (!url) {
        return;
      }
      var param = '';
      if (userConfig['clickStrUrl_paramType'] == 'objectName') {
        var param = obj.name;
        if (userConfig['clickStrUrl_encodeParam']) param = encodeURIComponent(param);
        url += param;
      } else if (userConfig['clickStrUrl_paramType'] == 'objectAttribute') {
        var param = uinv.util.getAttribute(obj, userConfig['clickStrUrl_paramObjectAttribute']);
        if (userConfig['clickStrUrl_encodeParam']) param = encodeURIComponent(param);
        url += param;
      } else if (userConfig['clickStrUrl_paramType'] == 'func') {
        if (typeof (userConfig['clickStrUrl_paramFunc']) == 'string') {
          var temp = 'uinv._getFuncFromStrTmp = function(menuItem, obj){' + userConfig['clickStrUrl_paramFunc'] + '}';
          userConfig['clickStrUrl_paramFunc'] = uinv.eval(temp);
        }
        param = userConfig['clickStrUrl_paramFunc'](menuItem, obj);
        if (userConfig['clickStrUrl_encodeParam']) param = encodeURIComponent(param);
        url += param;
      }

      if (userConfig['clickStrUrl_useWebApp']) {
        uinv.contextMenuManager.fadeOutMenu({'closeIEBrowser': false});
        var size = [400, 300];
        if (userConfig['clickStrUrl_size']) size = userConfig['clickStrUrl_size'];
        //var pos = uinv.rootWidget.calculatePositionInParent( 75, - 75 - size[1] );
        var pos = [100, 100];
        if (userConfig['clickStrUrl_pos']) pos = userConfig['clickStrUrl_pos'];
        if (!userConfig['clickStrUrl_posInScreen']) pos = uinv.rootWidget.calculatePositionInParent(pos[0], pos[1]);
        uinv.contextMenuManager.openIEBrowser(pos[0], pos[1], size[0], size[1], url);
      } else if (userConfig['clickStrUrl_openWindow']) {
        //uinv.util.regTimerFunc("探头openWindow延时", 0.5, false, function(){
        //uinv.contextMenuManager.fadeOutMenu();
        var size = [400, 300];
        var pos = [100, 100];
        if (userConfig['clickStrUrl_size']) size = userConfig['clickStrUrl_size'];
        if (userConfig['clickStrUrl_pos']) pos = userConfig['clickStrUrl_pos'];
        if (!userConfig['clickStrUrl_posInScreen']) pos = uinv.rootWidget.calculatePositionInParent(pos[0], pos[1]);

        var param = 'width=' + size[0] + ',height=' + size[1] + ',left=' + pos[0] + ',top= ' + pos[1] + ',toolbar=no,';
        param += 'menubar=no,scrollbars=no,resizable=no,location=no,status=no';

        uinv.u3d.funcSet.closeWindow(menu.camWindow);
        uinv.util.regTimerFunc(menu.name + '_openWindow_delay', 0.01, false, function () {
          uinv.u3d.funcSet.openWindow(url, 'newwindow', param).then(function (key) {
            menu.camWindow = key;
          });

          uinv.util.regIdleFunc('Detection_of_panel' + menu.name, function () {
            if (uinv.selectionTools.getSelCount() == 0) {
              uinv.u3d.funcSet.closeWindow(menu.camWindow);
              uinv.util.unRegIdleFunc('Detection_of_panel' + menu.name);
              return;
            }

            if (menu.camWindow.closed == true) {
              uinv.selectionTools.clearSelection();
              uinv.util.unRegIdleFunc('Detection_of_panel' + menu.name);
            }
          });
        });
      } else {
        menu.executeJavascriptInWeb('changeUrl', [url, '']);
      }
    });
  },
  'itemLeaveCB': function (menuItem) {
    var obj = menuItem.parent.pickedObj;
    var userConfig = uinv.contextMenuManager.getUserParamterConfig(obj, 'DCV_MONITORING_INFORMATION');
    if (!userConfig || userConfig['url'] == 'Default' || !userConfig['url']) {
      if (obj) {
        uinv.monitorManager.removeMonitorObj(obj, 'MonitorInfo_button_search');
        uinv.monitorManager.unRegRemoteDataFunc('MonitorInfo_default__default_');
        if (obj._lastMonitorInfo) {
          obj._lastMonitorInfo = undefined;
        }
      }
    }
    if (userConfig && userConfig['itemLeaveCB']) userConfig['itemLeaveCB'](menuItem);
  },
  'itemConfig': [
    {
      'name': 'url',
      'type': 'string',
      'caption': u.le.get('DCV_NEW_PAGE_URL'),
      'defaultItem': '',
      'desc': ''
    }, {
      'tab': 'others',
      'group': '_system',
      'level': 'top',
      'name': 'keySort',
      'itemkey': 'keySort',
      'uinvInterface': 'keySort',
      'caption': u.le.get('DCV_SHOW_SORTING'),
      'type': 'treeEditSet',
      'tips': '',

      'typeConfig': {
        'propertyConfig': {
          //			'a':[
          //				{'type' : "string", 'style':"title2",'name':"string",  'caption':u.le.get("string类型")}
          //			]

        },
        'createPreciple': {
          //			"root":"a",
          //			 'a':["a"]
        }
      },

      'defaultValue': true,
      'desc': '',
      'defaultItem': false
    },
    {
      tab: 'others',
      group: '_system',
      level: 'top',
      name: 'iconMapping',
      uinvInterface: 'iconMapping',
      itemkey: 'iconMapping',
      caption: u.le.get('DCV_MONITOR_MAPPING'),
      type: 'keyToEditor',
      keyType: 'text',
      valueType: 'text',
      keyText: u.le.get('DCV_VALUE'),
      valueText: u.le.get('DCV_IMAGE_PATH'),
      tips: '',
      saveType: 'objectInList',
      defaultValue: []
    },
    // {
    //   'name': 'url',
    //   'type': 'string',
    //   'caption': u.le.get('DCV_NEW_PAGE_URL'),
    //   'defaultItem': '',
    //   'desc': ''
    // },
    {
      'name': u.le.get('DCV_NEW_PAGE_URL_SETTING'),
      'type': 'line',
      'defaultItem': '',
      'desc': ''
    },
    {
      'name': 'urlParamType',
      'caption': u.le.get('DCV_URL_PARSE_METHOD'),
      'type': 'select',
      'items': ['', 'objectName', 'objectAttribute', 'func'],
      'itemsCaption': [u.le.get('DCV_PARAMETERS_ARE_NOT_TRANSMITTED'), u.le.get('DCV_OBJECT_NAME'), u.le.get('DCV_PROPERTY'), u.le.get('DCV_METHOD_1')],
      'defaultItem': 'objectName',
      'desc': ''
    },
    {
      'name': 'urlParamObjectAttribute',
      'caption': u.le.get('DCV_PROPERTY_NAME_1'),
      'type': 'string',
      'defaultItem': '',
      'desc': ''
    },
    {
      'name': 'urlParamFunc',
      'caption': u.le.get('DCV_METHOD_NAME_1'),
      'type': 'string',
      'defaultItem': '',
      'desc': ''
    },
    {
      'name': 'encodeParam',
      'caption': u.le.get('DCV_ENCODE'),
      'type': 'bool',
      'items': {TRUE: u.le.get('DCV_YES'), FALSE: u.le.get('DCV_NO')},
      'defaultItem': false,
      'desc': ''
    },
    {
      'name': 'windowType',
      'caption': u.le.get('DCV_POPUP_METHOD'),
      'type': 'select',
      'items': ['', 'useWebApp', 'openWindow'],
      'itemsCaption': [u.le.get('DCV_SHOW_ON_PANEL'), u.le.get('DCV_POPUP_WINDOW_SETTING_1'), u.le.get('DCV_NEW_IE_WINDOW')],
      'defaultItem': '',
      'desc': ''
    },
    {
      'name': 'size',
      'caption': u.le.get('DCV_WINDOW_SIZE_1'),
      'type': 'position2d',
      'items': [u.le.get('DCV_LENGTH_1'), u.le.get('DCV_WIDTH_1')],
      'defaultItem': [400, 300],
      'desc': 'Size'
    },
    {
      'name': 'pos',
      'caption': u.le.get('DCV_WINDOW_POSITION'),
      'type': 'position2d',
      'items': [u.le.get('DCV_HORIZONTAL'), u.le.get('DCV_VERTICAL')],
      'defaultItem': [100, 100],
      'desc': 'Location'
    },
    {
      'name': 'posInScreen',
      'caption': u.le.get('DCV_RELATIVE_POSITION'),
      'type': 'bool',
      'items': {TRUE: u.le.get('DCV_YES'), FALSE: u.le.get('DCV_NO')},
      'defaultItem': false
    },
    {
      'name': u.le.get('DCV_SUBTITLE_URL_SETTING'),
      'type': 'line',
      'defaultItem': '',
      'desc': ''
    },
    {
      'name': 'clickUrl',
      'type': 'string',
      'caption': u.le.get('DCV_DEFAULT_SUBTITLE_URL'),
      'defaultItem': '',
      'desc': ''
    },
    {
      'name': 'clickStr',
      'caption': u.le.get('DCV_URL_NAME'),
      'type': 'string',
      'defaultItem': 'More ...',
      'desc': ''
    },
    {
      'name': 'clickStrUrl_paramType',
      'type': 'select',
      'itemsCaption': [u.le.get('DCV_PARAMETERS_ARE_NOT_TRANSMITTED'), u.le.get('DCV_OBJECT_NAME'), u.le.get('DCV_PROPERTY_NAME'), u.le.get('DCV_METHOD_FUNCTION')],
      'items': ['', 'objectName', 'objectAttribute', 'func'],
      'caption': u.le.get('DCV_URL_PARAMETER_TYPE'),
      'defaultItem': 'objectName',
      'desc': ''
    },
    {
      'name': 'clickStrUrl_paramObjectAttribute',
      'caption': u.le.get('DCV_PROPERTY_NAME_2'),
      'type': 'string',
      'defaultItem': '_ID_',
      'desc': ''
    },
    {
      'name': 'clickStrUrl_paramFunc',
      'caption': u.le.get('DCV_METHOD_NAME'),
      'type': 'string',
      'defaultItem': '',
      'desc': ''
    },
    {
      'name': 'clickStrUrl_encodeParam',
      'caption': u.le.get('DCV_ENCODE_1'),
      'type': 'bool',
      'items': {TRUE: u.le.get('DCV_YES'), FALSE: u.le.get('DCV_NO')},
      'defaultItem': false,
      'desc': ''
    },
    {
      'name': 'clickStrUrl_windowType',
      'caption': u.le.get('DCV_POPUP_WINDOW_SETTING'),
      'type': 'select',
      'itemsCaption': [u.le.get('DCV_NO_POPUP'), u.le.get('DCV_POPUP_IN_SCENE'), u.le.get('DCV_NEW_IE_WINDOW')],
      'items': ['', 'clickStrUrl_useWebApp', 'clickStrUrl_openWindow'],
      'defaultItem': 'clickStrUrl_useWebApp',
      'desc': ''
    },
    {
      'name': 'clickStrUrl_size',
      'caption': u.le.get('DCV_WINDOW_SIZE'),
      'type': 'position2d',
      'items': [u.le.get('DCV_LENGTH_1'), u.le.get('DCV_WIDTH_1')],
      'defaultItem': [300, 400],
      'desc': ''
    },
    {
      'name': 'clickStrUrl_pos',
      'caption': u.le.get('DCV_WINDOW_POSITION_1'),
      'type': 'position2d',
      'items': [u.le.get('DCV_HORIZONTAL'), u.le.get('DCV_VERTICAL')],
      'defaultItem': [100, 100],
      'desc': ''
    },
    {
      'name': 'clickStrUrl_posInScreen',
      'caption': u.le.get('DCV_RELATIVE_POSITION'),
      'type': 'bool',
      'items': {TRUE: u.le.get('DCV_YES'), FALSE: u.le.get('DCV_NO')},
      'defaultItem': false,
      'desc': ''
    }
  ]
}];
