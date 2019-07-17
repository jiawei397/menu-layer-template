uinv.baseContextMenuTemp = [
  {
    'name': '视频监控',
    'useInDataPanel': true,
    'buttonImages': ['images/objectPanal/icon/DaKaiShePin.png', 'images/objectPanal/icon/DaKaiShePin_over.png', 'images/objectPanal/icon/DaKaiShePin_down.png'],
    'itemClickCB': function (menuItem) {
      contextMenuDefaultItemClickCB(menuItem, 'DCV_VIDEO_SURVEILLANCE', {
        'useWebApp': false,
        'sync': true,
        'url': 'tab-cctv.html',
        'urlParamType': 'func',
        'urlParamFunc': function (menuItem, obj) {
          // var menu = menuItem.parent;

        }
      }, 'images/icon/ShiPin.png');
    },
    'itemConfig': [
      {
        'name': 'url',
        'type': 'string',
        'caption': u.le.get('DCV_NEW_PAGE_URL'),
        'defaultItem': '',
        'desc': ''
      },
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
        'items': ['', 'useWebApp', 'openWindow', 'iframe'],
        'itemsCaption': [u.le.get('DCV_SHOW_ON_PANEL'), u.le.get('DCV_POPUP_WINDOW_SETTING_1'), u.le.get('DCV_NEW_IE_WINDOW'), u.le.get('DCV_IFRAMENEWWIN')],
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
      }
    ]
  }
];
