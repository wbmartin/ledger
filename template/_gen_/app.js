'use strict';
/**
*
*/

goog.provide('app');

goog.require('goog.History');
goog.require('goog.Uri');
goog.require('goog.debug');
goog.require('goog.debug.DivConsole');
goog.require('goog.debug.ErrorHandler');
goog.require('goog.debug.FancyWindow');
goog.require('goog.debug.Logger');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.dom.forms');
goog.require('goog.dom.query');
goog.require('goog.events');
goog.require('goog.events.EventHandler');
goog.require('goog.history.EventType');
goog.require('goog.json');
goog.require('goog.net.XhrIo');
goog.require('goog.net.cookies');
goog.require('goog.object');
goog.require('goog.string');
goog.require('goog.userAgent');
goog.require('soy');
goog.require('soydata');


/**
 *
 * GLOBALS
 *
 */

var LL = {};
/**
 * @type {boolean}
 * @const
 */
LL.ON = true;

/**
 * @type {boolean}
 * @const
 */
LL.INFO = true;

/**
 * @type {boolean}
 * @const
 */
LL.FINEST = true;

/**
 * @type {boolean}
 * @const
 */
LL.ALL = true;

goog.provide('app.GLOBAL');

/**
 * target page after login unless changed later
 * @type string
 */
app.GLOBAL.TARGET_PAGE = 'MainLauncher';

/** @type {boolean} */
app.GLOBAL.TRUSTED_DEVICE = false;
/** @type {Object} */
app.dispatch = {};

app.lastTran = new Date();

/**
 *
 * SRC: _navWeb.js
 * @param {goog.events.Event} e the event.
 */
app.navCallback = function(e) {
  if (e.token === 'LOGIN') { return; }
  if (app.authenticate()) {
    app.dispatcher(e.token);
  } else {
    app.GLOBAL.TARGET_PAGE = location.hash.substr(1);
    location.hash = 'LOGIN';
    LoginWeb.show(null);
  }
};
/**
 *_navWeb.js
 *
 * @param {string} page_ the page to show.
 */
app.showPage = function(page_) {
  if (LL.FINEST) {app.logger.finest('showPage called:' + page_);}
  app.hist.setToken(page_);
  window['_gaq'].push(['_trackPageview', page_]);
  return;
};

goog.provide('app.dispatcher');
/**
 *
 * SRC: _navWeb.js
 * @param {string} request_ the request to dispatch.
 *
 */
app.dispatcher = function(request_) {
  if (LL.FINEST) app.logger.finest('dispatcher Called');
  /** @type {goog.Uri} */
  var urlData = goog.Uri.parse(request_);
  /** @type string*/
  var key;
  /** @type {Object} */
  var qdObject = {};
  for (key in urlData.queryData_.getKeys()) {
    qdObject.key = urlData.queryData_.getValues(key);
  }
  if (urlData.path_ == undefined || urlData.path_ == '') {
    urlData.path_ = 'MainLauncher';
  }
  app.dispatch[urlData.path_](qdObject);

};


/**
 * SRC: _navWeb.js
 * @param {string} contentBlock the div content to replace.
 */
app.setMainContent = function(contentBlock) {
  goog.dom.getElement('mainContent').innerHTML = contentBlock;
};


/**
 *
 * SRC: _navWeb.js
 * @param {string} session_ the session string.
 */
app.standardSuccessfulLogin = function(session_) {
  if (LL.FINEST) {
    app.logger.finest('standardSuccessfulLogin called: ' + session_);
  }
  app.setSession(goog.dom.getElement('LoginForm-user_id').value, session_);
  
  goog.dom.getElement('LoginForm-password').value = '';
  app.showPage(app.GLOBAL.TARGET_PAGE);
};
/**
 *
 * SRC: _navWeb.js
 * @param {string} session_ the session string.
 */
app.extendSession = function() {
  currentUserId = goog.net.cookies.get('user_id');
  currentSessionId = goog.net.cookies.get('session_id');
  app.setSession(currentUserId,currentSessionId );
}
/**
 *
 * SRC: _navWeb.js
 * @param {string} session_ the session string.
 */
app.setSession = function (userId, sessionId){
    var sessionExpirationSeconds = 60 * 20;
  if (app.GLOBAL.TRUSTED_DEVICE) { sessionExpirationSeconds = -1; }
  goog.net.cookies.set('session_id', sessionId, sessionExpirationSeconds);
  goog.net.cookies.set('user_id', userId, sessionExpirationSeconds);
}


/**
 *
 */

/**
 *
 * SRC: _miscWeb.js
 * @return {boolean} is authenticated.
 */
app.authenticate = function() {
  if (LL.FINEST) { app.logger.finest('authenticate called:'); }
  if (goog.net.cookies.get('session_id') === undefined) {
    return false;
  }
  return true;
};

/**
 *
 * SRC: _miscWeb.js
 * @param {string} resource resource to operate.
 * @param {string} action action to take.
 * @param {string} form  name of the form.
 * @return {string} the built query string.
 */
app.buildQDStrForm = function(resource, action, form) {
  /** @type {string} */
  var qstr = goog.dom.forms.getFormDataString(
      /** @type {HTMLFormElement} */(goog.dom.getElement(form))
      );
  var qd = new goog.Uri.QueryData(qstr);
  qd.add('spwfResource', resource);
  qd.add('spwfAction', action);
  if (LL.FINEST) {
    app.logger.finest('Server Call Built' + qstr.toString());
  }
  return qd.toString();
};

/**
 * The tracking element input is located in _footerWeb.html
 * SRC: _miscWeb.js
 */
app.initHistory = function() {
  /** @type {HTMLInputElement} */
  var trackingElement = /** @type {HTMLInputElement} */
    (goog.dom.getElement('historyTrackerId'));
  app.hist = new goog.History(false, undefined, trackingElement);
  goog.events.listen(app.hist,
      goog.history.EventType.NAVIGATE,
      app.navCallback);
  app.hist.setEnabled(true);
};

/**
 *
 * SRC: _miscWeb.js
 */
app.init = function() {
  /** @type {goog.debug.Logger.Level} */
  app.GLOBAL.LOG_LEVEL = goog.debug.Logger.Level.ALL;
  if (LL.ON) {
    var logconsole =
      new goog.debug.DivConsole(goog.dom.getElement('loggerConsole'));
    logconsole.setCapturing(true);
    app.logger = goog.debug.Logger.getLogger('app');
    app.logger.setLevel(app.GLOBAL.LOG_LEVEL);
  }
  if (LL.INFO) app.logger.info('buildQDStrForm Initialized');

  //app.debugWindow = new goog.debug.FancyWindow('main');
  //    app.debugWindow.setEnabgoog.debug.Logger.Level.ALLled(true);
  //    app.debugWindow.init();


};
app.init();


/**
 * SRC: _miscWeb.js
 * @param {function(?)} callBack the function to execute.
 * @param {string} qdstr query data string.
 */
app.svrCall = function(callBack, qdstr) {
  //var xhr = new goog.net.XhrIo();
  //goog.events.listen(xhr, goog.net.EventType.COMPLETE, callBack);
  //xhr.send('./cgi-bin/server.pl', 'POST', qdstr);
  goog.net.XhrIo.send('./cgi-bin/server.pl', callBack, 'POST', qdstr);
};



/*
*
*/




goog.provide('HelpLauncherWeb');
goog.require('HelpLauncherWeb.view');
/**
 * SRC: _helpLauncherWeb.js
 * @param {Object} args_ the args to pass to the show function.
 *
 */
HelpLauncherWeb.show = function(args_) {
  app.setMainContent(HelpLauncherWeb.view.getPrimary(null, null));
};

/**
 * SRC:_helpLauncherWeb.js
 *
 */
HelpLauncherWeb.init = function() {
  if (LL.ON) {
    HelpLauncherWeb.logger = goog.debug.Logger.getLogger('HelpLauncher');
    HelpLauncherWeb.logger.setLevel(app.GLOBAL.LOG_LEVEL);
  }
  if (LL.INFO) HelpLauncherWeb.logger.info('Initialized');
  app.dispatch['HelpLauncher'] = HelpLauncherWeb.show;
};
HelpLauncherWeb.init();


goog.provide('LoginWeb');
goog.require('Login.view');

/**
 *  SRC: _loginWeb
 *  @return {boolean} false to not refresh the page.
 */
LoginWeb.start = function() {
  if (LL.FINEST) {
    LoginWeb.logger.finest('Call start');
  }
  app.GLOBAL.TRUSTED_DEVICE =
    goog.dom.getElement('LoginForm-trustedDeviceId').checked;
  /** @type {string} */
  var qstr = app.buildQDStrForm('SECURITY_USER', 'AUTHENTICATE', 'LoginForm');

  /** @type {function({goog.events.Event})} */
  var callBack;
  callBack = function(e) {
    LoginWeb.logger.finest('CallBack: Login Request ');
    /** @type {Object} */
    var obj = e.target.getResponseJson();
    var session = obj['rows'][0]['session_id'];
    LoginWeb.onSuccessfulLogin(session);
  };
  app.svrCall(callBack, qstr);
  return false;
};


/**
 *
 * SRC: _loginWeb
 * @param {string} session_ the sessionID.
 */
LoginWeb.onSuccessfulLogin = function(session_) {
  LoginWeb.logger.finest('Call onSuccessfulLogin');
  app.standardSuccessfulLogin(session_);
};

/**
 * SRC: _loginWeb
 * @param {Object} args_ the args object.
 */
LoginWeb.show = function(args_) {
  app.setMainContent(Login.view.getPrimary(null, null));
  goog.events.listen(
      goog.dom.getElement('testerId'),
      goog.events.EventType.CLICK,
      LoginWeb.start
      );

  goog.events.listen(
      goog.dom.getElement('cmdlogin'),
      goog.events.EventType.CLICK,
      LoginWeb.start
      );


};


/**
 * SRC: _loginWeb
 *
 */
LoginWeb.init = function() {
  if (LL.ON) {
    LoginWeb.logger = goog.debug.Logger.getLogger('Login');
    LoginWeb.logger.setLevel(app.GLOBAL.LOG_LEVEL);
  }
  if (LL.INFO) { LoginWeb.logger.info('Initialized'); }
};
LoginWeb.init();



goog.provide('tableWeb');
goog.require('tableWeb.view');
/**
 * SRC: _tableWeb.js
 * @param {Object} args_ the args to pass to the show function.
 *
 */
tableWeb.show = function(args_) {
  var rows = [
  {
    id: 0,
      name: 'test0'
  },
  {
    id: 1,
    name: 'test1'
  },
  {
    id: 2,
    name: 'test2'
  },
  {
    id: 3,
    name: 'test3'
  }


  ];
  //var tableDef = new ma.TableDef();
  //tableDef.addColumn(new ma.ColumnDef('id'));
  //tableDef.addColumn(new ma.ColumnDef('name'));
  //tableDef.setData(rows);
  app.setMainContent(tableWeb.view.getPrimary(null, null));
  var tbl = new ma.elbat();
  tbl.tableName = 'testskidoo';
  tbl.tableDef.data = rows;
  tbl.tableDef.addColumn(new ma.ColumnDef({name: 'id'}));
  tbl.tableDef.addColumn(new ma.ColumnDef({name: 'name'}));
  tbl.construct();


  // goog.events.listen(
  //    goog.dom.getElement(''),
  //    goog.events.EventType.CLICK,
  //    goog.partial(app.showPage, 'table')
  //    );

};

goog.provide('ma.elbat');
/**
 * SRC:_tableWeb.js
 *
 * @constructor
 */
ma.elbat = function() {
  /** @type {ma.TableDef} */
  this.tableDef = new ma.TableDef();
  /** @type {string} */
  this.tableName = 'defaultTableName'
};

/**
 * SRC:_tableWeb.js
 * @return {ma.TableDef} the table definition.
 */
ma.elbat.prototype.getTableDef = function() {
  return this.tableDef;
};


/**
 * SRC:_tableWeb.js
 */
ma.elbat.prototype.construct = function() {
  var tableOut = '<div id="' + this.tableName + 'DivId">';
  tableOut +='<table id="' + this.tableName + 'TableId">';
  tableOut += this.buildHeader();
  tableOut += this.buildData();
  tableOut += '</table>';
  tableOut += '</div>';
  goog.dom.getElement(this.tableName).innerHTML = tableOut;
};

/**
 * SRC:_tableWeb.js
 * @return {string} the table header.
 */
ma.elbat.prototype.buildHeader = function() {
  var header = '<thead>';
  var columnLength = this.tableDef.getColumnCount();
  for (var i = 0; i < columnLength; i++) {
    header += this.buildHeaderCell(i);
  }
  header += '</thead>';
  return header;
};

/**
 * @param {number} columnId the column to display.
 * @return {string}
 */
ma.elbat.prototype.buildHeaderCell = function (columnId){
  var thcell='';
  var tc = this.tableDef.getColumn(columnId);
  if (tc.visible){
    thcell = '<th>' + tc.name + '</th>';
  }
  return thcell;
}

/**
 * SRC:_tableWeb.js
 * @return {string} the tablebody.
 */
ma.elbat.prototype.buildData = function() {
  var tbody = '<tbody>';
  var rowLength = this.tableDef.data.length;
  var colLength = this.tableDef.getColumnCount();
  for (var i = 0; i < rowLength; i++) {
    tbody += '<tr>';//tableWeb.view.row(tableDef_.getRow(i),null);
    for (var j = 0; j < colLength; j++) {
      tbody += this.buildCell(i,j);
    }
    tbody += '</tr>';
  }
  tbody += '</tbody>';
  return tbody;
};

/**
 * SRC:_tableWeb.js
 * @return {string} the table cell.
 * @param {Object} tr the table row.
 * @param {Object} tc the table column def.
 */
ma.elbat.prototype.buildCell = function(trId, tcId) {
  var tr = this.tableDef.getRow(trId);
  var tc = this.tableDef.getColumn(tcId);
  var cell ='';
  if (tc.visible){
    cell ='<td>' + tr[tc.name] + '</td>';
  }
  return cell;
};

/**
 *
 */
goog.provide('ma.TableDef');

/**
 * SRC:_tableWeb.js
 *
 * @constructor
 */
ma.TableDef = function() {
  this.columns = new Array();
  this.data = new Array;
};

/**
 * SRC:_tableWeb.js
 * @param {ma.ColumnDef} newColumn the column definition.
 */
ma.TableDef.prototype.addColumn = function(newColumn) {
  this.columns.push(newColumn);
};
/**
 * SRC:_tableWeb.js
 * @param {number} rowNumber the rownumber.
 * @return {Object} the data row.
 */
ma.TableDef.prototype.getRow = function(rowNumber) {
  return this.data[rowNumber];
};
/**
 * SRC:_tableWeb.js
 * @return {number}  the number ofrows in the table.
 */
ma.TableDef.prototype.getRowCount = function() {
  return this.data.length;
};
/**
 * SRC:_tableWeb.js
 * @param {number} colNumber the array index of the column number.
 * @return {ma.ColumnDef} the column Definition.
 */
ma.TableDef.prototype.getColumn = function(colNumber) {
  return this.columns[colNumber];
};
/**
 * SRC:_tableWeb.js
 * @return {number} the number of columns.
 */
ma.TableDef.prototype.getColumnCount = function() {
  return this.columns.length;
};






/**
 * SRC:_tableWeb.js
 * @constructor
 * @param {object} columnName the name.
 */
ma.ColumnDef = function(options) {
  /** @type {string} */
  this.name = typeof options.name !== 'undefined' ? options.name :'defaultName';
  /** @type {boolean} */
  this.visible = typeof options.visible !== 'undefined' ? options.visible : true;
};


/**
 * SRC:_tableWeb.js
 *
 */
tableWeb.init = function() {
  if (LL.ON) {
    tableWeb.logger = goog.debug.Logger.getLogger('table');
    tableWeb.logger.setLevel(app.GLOBAL.LOG_LEVEL);
  }
  if (LL.INFO) tableWeb.logger.info('Initialized');
  app.dispatch['table'] = tableWeb.show;
};
tableWeb.init();



goog.provide('AppLoggerWeb');
goog.require('AppLogger.view');

/**
 * SRC: appLogWeb.js
 * @param {Object} args_ rendering arguments.
 */

AppLoggerWeb.show = function(args_) {
  if (LL.FINEST) {
    AppLoggerWeb.logger.finest('show called: ' + goog.debug.expose(args_));
  }
  goog.dom.classes.remove(
      goog.dom.getElement('LoggerConsoleDivId'),
      'LogicalHide'
      );

};
/**
 * SRC:appLogWeb.js
 *
 */
AppLoggerWeb.init = function() {
  if (LL.ON) {
    AppLoggerWeb.logger = goog.debug.Logger.getLogger('AppLogger');
    AppLoggerWeb.logger.setLevel(app.GLOBAL.LOG_LEVEL);
  }
  if (LL.INFO) AppLoggerWeb.logger.info('Initialized');
  AppLoggerWeb.divId = 'AppLogger';
  app.dispatch['AppLogger'] = AppLoggerWeb.show;
};



goog.provide('MainLauncherWeb');
goog.require('MainLauncherWeb.view');
/**
 * SRC: _mainLauncherWeb.js
 * @param {Object} args_ the args to pass to the show function.
 *
 */
MainLauncherWeb.show = function(args_) {
  //app.standardShowPage('MainLauncher');
  app.setMainContent(MainLauncherWeb.view.getPrimary(null, null));

  goog.events.listen(
      goog.dom.getElement('launcherShowHelp'),
      goog.events.EventType.CLICK,
      goog.partial(app.showPage, 'HelpLauncher')
      );

  goog.events.listen(
      goog.dom.getElement('tableTestLaunchId'),
      goog.events.EventType.CLICK,
      goog.partial(app.showPage, 'table')
      );

};

/**
 * SRC:_mainLauncherWeb.js
 *
 */
MainLauncherWeb.init = function() {
  if (LL.ON) {
    MainLauncherWeb.logger = goog.debug.Logger.getLogger('MainLauncher');
    MainLauncherWeb.logger.setLevel(app.GLOBAL.LOG_LEVEL);
  }
  if (LL.INFO) MainLauncherWeb.logger.info('Initialized');
  app.dispatch['MainLauncher'] = MainLauncherWeb.show;
};
MainLauncherWeb.init();


/**
*
* @param {string|null|undefined} val_ the value to unnull.
* @param {string} ifnull_ the value to return if null.
* @return {string}  the unnulled value.
*/
var nz = function(val_, ifnull_) {
if (val_ == undefined || val_ == null) return ifnull_;
return val_;
};



/**
 *SRC: [SRCLOC]
 */
var masterInit = function() {
  app.initHistory();
};
masterInit();
