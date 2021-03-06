'use strict';
//Generated: Wed Jan 23 21:21:05 2013
/**
*
*/


goog.require('goog.History');
goog.require('goog.Uri');
goog.require('goog.array');
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
goog.require('PageHelper');



goog.provide('App');

/**
 * SRC: 
 * @constructor
 *
 */
App = function(){
  /** @type {goog.debug.DivConsole} */
  var logconsole =
    new goog.debug.DivConsole(goog.dom.getElement('loggerConsole'));
  logconsole.setCapturing(true);
  App.logger_.setLevel(App.GLOBAL.LOG_LEVEL);
  App.logger_.info(' Initialized');

  //app.debugWindow = new goog.debug.FancyWindow('main');
  //    app.debugWindow.setEnabgoog.debug.Logger.Level.ALLled(true);
  //    app.debugWindow.init();
};
/**
 * A reference to the  logger
 * @type {goog.debug.Logger}
 * @private
 */
App.logger_ = goog.debug.Logger.getLogger('app');
goog.provide('App.GLOBAL');

/**
 * target page after login unless changed later
 * @type string
 */
App.GLOBAL.TARGET_PAGE = 'MainLauncher';

/** @type {boolean} */
App.GLOBAL.TRUSTED_DEVICE = false;
/** @type {Object} */
App.dispatch = {};

App.lastTran = new Date();

App.GLOBAL.onScreenPageTarget = new goog.events.EventTarget();
App.GLOBAL.LOG_LEVEL = goog.debug.Logger.Level.ALL;

goog.provide('app');
app = new App();





//


/**
 *
 * SRC: _navWeb.js
 * @return {boolean} is authenticated.
 */
App.authenticate = function() {
 App.logger_.finest('authenticate called:'); 
  if (goog.net.cookies.get('session_id') === undefined) {
    return false;
  }
  return true;
};

/**
 *
 * SRC: _navWeb.js
 * @param {goog.events.Event} e the event.
 */
App.navCallback = function(e) {
  if (e.token === 'LOGIN') { return; }
  if (App.authenticate()) {
    App.dispatcher(e.token);
  } else {
    App.GLOBAL.TARGET_PAGE = location.hash.substr(1);
    location.hash = 'LOGIN';
    new LoginWeb();
  }
};
/**
 *_navWeb.js
 *
 * @param {string} page_ the page to show.
 */
App.prototype.showPage = function(page_) {
  App.logger_.finest('showPage called:' + page_);
  App.GLOBAL.onScreenPageTarget.dispatchEvent('DIPOSE_ALL');
  App.hist.setToken(page_);
  window['_gaq'].push(['_trackPageview', page_]);
  return;
};

/**
 *
 * SRC: _navWeb.js
 * @param {string} request_ the request to dispatch.
 *
 */
App.dispatcher = function(request_) {
  App.logger_.finest('dispatcher Called');
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
  App.dispatch[urlData.path_](qdObject);

};


/**
 * SRC: _navWeb.js
 * @param {string} contentBlock the div content to replace.
 */
App.prototype.setMainContent = function(contentBlock) {
  App.GLOBAL.onScreenPageTarget.dispatchEvent('DISPOSE_ALL');
  goog.dom.getElement('mainContent').innerHTML = contentBlock;
};


/**
 *
 * SRC: _navWeb.js
 * @param {string} session_ the session string.
 */
App.prototype.standardSuccessfulLogin = function(session_) {
    App.logger_.finest('standardSuccessfulLogin called: ' + session_);
  this.initSession(goog.dom.getElement('LoginForm-user_id').value, session_);
  goog.dom.getElement('LoginForm-password').value = '';
  this.showPage(App.GLOBAL.TARGET_PAGE);
};
/**
 *
 * SRC: _navWeb.js
 */
App.prototype.extendSession = function() {
  app.initSession(
      goog.net.cookies.get('user_id'),
      goog.net.cookies.get('session_id'));
}
/**
 *
 * SRC: _navWeb.js
 * @param {string} userId the user.
 * @param {string} sessionId the session string.
 */
App.prototype.initSession = function(userId, sessionId){
  var sessionExpirationSeconds = 60 * 20;
  if (App.GLOBAL.TRUSTED_DEVICE) { sessionExpirationSeconds = -1; }
  goog.net.cookies.set('session_id', sessionId, sessionExpirationSeconds);
  goog.net.cookies.set('user_id', userId, sessionExpirationSeconds);
}


/**
 *
 * SRC: _navWeb.js
 */
/*
App.prototype.disposeOnScreenComponents = function(){
  var ndx = 0;
  var onScreenCount = App.GLOBAL.onScreenComponents.length;
  var component;
  for(ndx = 0; ndx < onScreenCount; ndx++) {
    component = App.GLOBAL.onScreenComponents.pop();
    if (typeof component.dispose === 'function'){
      component.dispose();
    }
  }


};
*/


/**
 *
 */


/**
 *
 * SRC: _miscWeb.js
 * @param {string} resource resource to operate.
 * @param {string} action action to take.
 * @param {string} form  name of the form.
 * @return {string} the built query string.
 */
App.prototype.buildQDStrForm = function(resource, action, form) {
  /** @type {string} */
  var qstr = goog.dom.forms.getFormDataString(
      /** @type {HTMLFormElement} */(goog.dom.getElement(form))
      );
  var qd = new goog.Uri.QueryData(qstr);
  qd.add('spwfResource', resource);
  qd.add('spwfAction', action);
  
    App.logger_.finest('Server Call Built' + qstr.toString());
    return qd.toString();
};

/**
 * The tracking element input is located in _footerWeb.html
 * SRC: _miscWeb.js
 */
App.prototype.initHistory = function() {
  /** @type {HTMLInputElement} */
  var trackingElement = /** @type {HTMLInputElement} */
    (goog.dom.getElement('historyTrackerId'));
  App.hist = new goog.History(false, undefined, trackingElement);
  goog.events.listen(App.hist,
      goog.history.EventType.NAVIGATE,
      App.navCallback);
  App.hist.setEnabled(true);
};



/**
 * SRC: _miscWeb.js
 * @param {function(?)} callBack the function to execute.
 * @param {string} qdstr query data string.
 */
App.prototype.svrCall = function(callBack, qdstr) {
  //var xhr = new goog.net.XhrIo();
  //goog.events.listen(xhr, goog.net.EventType.COMPLETE, callBack);
  //xhr.send('./cgi-bin/server.pl', 'POST', qdstr);
  goog.net.XhrIo.send('./cgi-bin/server.pl', callBack, 'POST', qdstr);
};






/*
*
*/




goog.provide('HelpLauncherWeb');
goog.require('HelpLauncherWebView');


/**
 *@constructor
 */
HelpLauncherWeb = function(){
 this.logger_.setLevel(App.GLOBAL.LOG_LEVEL);
  this.logger_.info('Initialized');
  App.dispatch['HelpLauncher'] = this.show;
}

/**
 * A reference to the  logger
 * @type {goog.debug.Logger}
 * @private
 */
HelpLauncherWeb.prototype.logger_ = goog.debug.Logger.getLogger('HelpLauncher');

/**
 * SRC: _helpLauncherWeb.js
 * @param {Object} args_ the args to pass to the show function.
 *
 */
HelpLauncherWeb.prototype.show = function(args_) {
  app.setMainContent(HelpLauncherWebView.getPrimary(null, null));
};

new HelpLauncherWeb();


goog.provide('LoginWeb');
goog.require('LoginWebView');

/**
 * @extends {PageHelper}
 * @constructor
 */
LoginWeb = function(){
  App.logger_.setLevel(App.GLOBAL.LOG_LEVEL);
  this.init('Login');
  goog.events.listenOnce(App.GLOBAL.onScreenPageTarget, 'DIPOSE_ALL', this.dispose, false, this);
  goog.Disposable.call(this);
  app.setMainContent(LoginWebView.getPrimary(null, null));
  this.eh1.listen(
      goog.dom.getElement('cmdlogin'),
      goog.events.EventType.CLICK,
      this.attemptLogin
      );
}
goog.inherits(LoginWeb , PageHelper);

/**
 * A reference to the  logger
 * @type {goog.debug.Logger}
 * @private
 */
LoginWeb.prototype.logger_ = goog.debug.Logger.getLogger('Login');

LoginWeb.prototype.disposeInternal = function(){
  goog.dispose(this.eh1);
}

/**
 *  SRC: _loginWeb2
 *  @return {boolean} false to not refresh the page.
 */
LoginWeb.prototype.attemptLogin = function() {
  App.logger_.finest('Call start');
  App.GLOBAL.TRUSTED_DEVICE =
    goog.dom.getElement('LoginForm-trustedDeviceId').checked;
  /** @type {string} */
  var qstr = app.buildQDStrForm('SECURITY_USER', 'AUTHENTICATE', 'LoginForm');

  /** @type {function({goog.events.Event})} */
  var callBack;
  callBack = function(e) {
    App.logger_.finest('CallBack: Login Request ');
    /** @type {Object} */
    var obj = e.target.getResponseJson();
    var session = obj['rows'][0]['session_id'];
    if (session != '') {
      app.standardSuccessfulLogin(session);
    } else {
      alert ('failed');
    }
  };
  app.svrCall(callBack, qstr);
  return false;
};





goog.provide('tableWeb');
goog.require('tableWebView');
goog.require('ma.plugin.table');

/**
 *
 * SRC: _tableWeb.js
 * @constructor
 */
tableWeb = function(){
   this.logger_.setLevel(App.GLOBAL.LOG_LEVEL);
  this.logger_.info('Initialized');
  App.dispatch['table'] = tableWeb.show;

}
/**
 * A reference to the  logger
 * @type {goog.debug.Logger}
 * @private
 */
tableWeb.prototype.logger_ = goog.debug.Logger.getLogger('table');

/**
 * SRC: _tableWeb.js
 * @extends {PageHelper}
 * @param {Object} args_ the args to pass to the show function.
 *
 */
tableWeb = function(args_) {
  var rows = [
  {
    id: 0,
      name: 'A'
  },
  {
    id: 1,
    name: 'B'
  },
  {
    id: 2,
    name: 'C'
  },
  {
    id: 3,
    name: 'D'
  },
  {
    id: 4,
    name: 'A'
  }
  ];
  app.setMainContent(tableWebView.getPrimary(null, null));
  var tbl = new ma.plugin.table();
  tbl.data = rows;
  tbl.addColumn(new ma.ColumnDef({name: 'id'}));
  tbl.addColumn(new ma.ColumnDef({name: 'name'}));
  tbl.sortColumns = ['name'];
  tbl.sortOrder = 'ASC';
  tbl.idColumn = 'id';
  tbl.trIdPrefix = 'test';
  tbl.decorate(goog.dom.getElement('testskidoo'));

};

goog.inherits(tableWeb, PageHelper);

tableWeb.prototype.disposeInternal = function(){
  goog.dispose(this.eh1);
}


/**
 * A reference to the  logger
 * @type {goog.debug.Logger}
 * @private
 */
tableWeb.prototype.logger_ = goog.debug.Logger.getLogger('table');
App.dispatch['table'] = function (){new tableWeb();};




goog.provide('AppLoggerWeb');
goog.require('AppLogger.view');

/**
 * SRC: appLogWeb.js
 * @constructor
 */
AppLoggerWeb = function() {
  this.logger_.finest(' called: ' );
  goog.dom.classes.remove(
      goog.dom.getElement('LoggerConsoleDivId'),
      'LogicalHide'
      );
  this.logger_.setLevel(App.GLOBAL.LOG_LEVEL);
  this.logger_.info('Initialized');
  AppLoggerWeb.divId = 'AppLogger';


};

/**
 * A reference to the  logger
 * @type {goog.debug.Logger}
 * @private
 */
AppLoggerWeb.prototype.logger_ = goog.debug.Logger.getLogger('AppLogger');
  App.dispatch['AppLogger'] = function() { new AppLoggerWeb()};




goog.provide('MainLauncherWeb');
goog.require('MainLauncherWebView');

/**
 * @constructor
 * @extends {PageHelper}
 */
MainLauncherWeb = function(){
  this.logger_.setLevel(App.GLOBAL.LOG_LEVEL);
  this.init('MainLauncher');
  goog.events.listenOnce(App.GLOBAL.onScreenPageTarget, 'DIPOSE_ALL', this.dispose, false, this);
  app.setMainContent(MainLauncherWebView.getPrimary(null, null));
  this.eh1.listen(
      goog.dom.getElement('launcherShowHelp'),
      goog.events.EventType.CLICK,
      goog.partial(app.showPage, 'HelpLauncher')
      );

  this.eh1.listen(
      goog.dom.getElement('tableTestLaunchId'),
      goog.events.EventType.CLICK,
      goog.partial(app.showPage, 'table')
      );
};

goog.inherits(MainLauncherWeb, PageHelper);

MainLauncherWeb.prototype.disposeInternal = function(){
  goog.dispose(this.eh1);
}


/**
 * A reference to the  logger
 * @type {goog.debug.Logger}
 * @private
 */
MainLauncherWeb.prototype.logger_ = goog.debug.Logger.getLogger('MainLauncher');



App.dispatch['MainLauncher'] = function (){new MainLauncherWeb();};


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
