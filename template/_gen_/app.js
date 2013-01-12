'use strict';

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
goog.require('app.AppLogger.view');
goog.require('app.Login.view');
goog.require('app.MainLauncher.view');
goog.require('soy');
goog.require('soydata');

goog.provide('LL');//LOG LEVEL
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



     
         
    

goog.provide('LoginWeb');
//goog.exportSymbol('app.Login.view.getPrimary', app.Login.view.getPrimary);

/**
 *
 *
 */
LoginWeb.init = function() {
  if (LL.ON) {
    LoginWeb.logger = goog.debug.Logger.getLogger('Login');
    LoginWeb.logger.setLevel(app.GLOBAL.LOG_LEVEL);
  }
  if (LL.INFO) {
    LoginWeb.logger.info('Initialized');
  }
};
/**
 *  SRC: _loginWeb
 */ 
LoginWeb.start = function() {
  if (LL.FINEST) {
    LoginWeb.logger.finest('Call start');
  }
   
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
	/** @type {goog.net.XhrIo}*/
  //var xhr = new goog.net.XhrIo();
	//goog.events.listen(xhr, goog.net.EventType.COMPLETE, callBack);
	//xhr.send('./cgi-bin/server.pl', 'POST', qstr);
	app.svrCall(callBack, qstr);

};


/**
 *  SRC: _loginWeb
 * @param {string} session_ the sessionID.  
 */
LoginWeb.onSuccessfulLogin = function(session_) {
  LoginWeb.logger.finest('Call onSuccessfulLogin');
  app.standardSuccessfulLogin(session_);
};

/**
 *
 *
 *
 */

     
         
    

goog.provide('AppLoggerWeb');
goog.exportSymbol('app.AppLogger.view.getPrimary', app.AppLogger.view.getPrimary);
/**
 * SRC: appLogWeb.js
 * @param {Object} args_ rendering arguments.
 */

AppLoggerWeb.show = function(args_) {
  if (LL.FINEST) {
    AppLoggerWeb.logger.finest('show called: ' + goog.debug.expose(args_));
  }
  app.standardShowPage('AppLogger');
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
goog.exportSymbol('AppLoggerWeb.init', AppLoggerWeb.init);
     
    
goog.provide('app.init');
/**
 * SRC: master.js
 *
 */
app.init = function () {
  app.initLogger();
LoginWeb.init();
AppLoggerWeb.init();
MainLauncherWeb.init();
app.initHistory();

}
     
    


goog.provide('MainLauncherWeb');
/**
 * SRC: _mainLauncherWeb.js
 * @param {Object} args_ the args to pass to the show function.
 *
 */ 
MainLauncherWeb.show = function(args_) {
  app.standardShowPage('MainLauncher');
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
goog.exportSymbol('MainLauncherWeb.init', MainLauncherWeb.init);
     
         
         
    
goog.provide('app');
goog.provide('app.server');
goog.provide('app.dispatch');
/**
 * GLOBALS
 *
 */
goog.provide('app.GLOBAL');

///** @type {string|undefined} */ app.GLOBAL.SESSION_ID = '';
///** @type {string|undefined} */ app.GLOBAL.USER_ID = '';
///** @type {string|undefined} */ app.GLOBAL.PRIMARY_URL = './cgi-bin/server.pl';
///** @type {string|undefined} */ app.GLOBAL.METHOD = 'POST';
/** @type {Array.<string>} */ app.GLOBAL.currentDisplayDivs = new Array();

/**
 * target page after login unless changed later
 * @type string 
 */
app.GLOBAL.TARGET_PAGE = 'MainLauncher';
/**
 * SRC: _libCommon.js
 * @param {app.Command} cmdParams Parameters to construct the server side call.
 * @param {function({goog.events.Event})} completeCallBack function. 
 */

app.server.cmdCall = function(cmdParams, completeCallBack) {
  if (LL.FINEST) {
    app.logger.finest('Call: server.cmdCall ' + 
        goog.debug.expose(cmdParams));
  }
  /** @type {goog.net.XhrIo}*/
  var xhr = new goog.net.XhrIo();
  goog.events.listen(xhr, goog.net.EventType.COMPLETE, completeCallBack);
  xhr.send('./cgi-bin/server.pl', 'POST', goog.json.serialize(cmdParams));
};





/**
 * SRC: _libCommon.js
 * Hide all other divs and show the new one.
 * @param {string} divToShow_  the div to show.
 * @return {boolean} false if exiting early. 
 */

app.standardShowPage = function(divToShow_) {
  if (LL.FINEST) {
    app.logger.finest('standardShowPage called: ' + divToShow_);
  }
  /** @type {string} */
  var visibleDiv;
  /** @type {Element} */
  var element;
  while (visibleDiv = app.GLOBAL.currentDisplayDivs.pop()) {
    element = goog.dom.getElement(visibleDiv + 'DivId');
    goog.dom.classes.add(element, 'LogicalHide');
  }
  element = goog.dom.getElement((divToShow_ + 'DivId'));
  goog.dom.classes.remove(element, 'LogicalHide');
  app.GLOBAL.currentDisplayDivs.push(divToShow_);
  window['_gaq'].push(['_trackPageview', divToShow_]);
  return true;
};

/**
 *
 * SRC: _libCommon.js
 * @param {goog.events.Event} e the event.
 */ 
app.navCallback = function(e) {
  if (app.authenticate(e.token)) {
    app.dispatcher(e.token);
  }
};

/**
 * SRC: _libCommon.js
 * @param {string} target_ the target resource.
 * @return {boolean} is authenticated.
 */

app.authenticate = function(target_) {
  if (LL.FINEST) {
    app.logger.finest('authenticate called: ' + target_);
  }

  if (app.GLOBAL.SESSION_ID === 'PENDING') return false;
  if (app.GLOBAL.SESSION_ID == '') {
    app.GLOBAL.TARGET_PAGE = (target_ == '') ? 'MainLauncher' : target_;
    app.GLOBAL.SESSION_ID = 'PENDING';
    app.hist.setToken('');
    if (goog.net.cookies.get('user_id') != undefined) {
      app.attemptCookieLogin();
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};


/**
 *
 * @param {string} page_ the page to show.
 */

app.showPage = function(page_) {
  if (LL.FINEST) {app.logger.finest('showPage called:' + page_);}

  //if( ('#' + page_) === window.location.hash){
  //    app.hist.setToken(page_ +'?');
  //}else{
  app.hist.setToken(page_);
  //}
};
goog.exportSymbol('app.showPage', app.showPage);


/**
 * SRC: _libCommon.js
 * @param {string} session_ the session string.
 */ 

app.standardSuccessfulLogin = function(session_) {
  if (LL.FINEST) {
    app.logger.finest('standardSuccessfulLogin called: ' + session_);
  }
  //app.GLOBAL.SESSION_ID = session_;
  //app.GLOBAL.USER_ID = goog.dom.getElement('LoginForm-user_id').value;
  goog.net.cookies.set('session_id', session_);
  goog.net.cookies.set('user_id', 
      goog.dom.getElement('LoginForm-user_id').value);
  goog.dom.getElement('LoginForm-password').value = '';
  app.showPage(app.GLOBAL.TARGET_PAGE);
};

/**
 * SRC: _libCommon.js
 *
 */

app.attemptCookieLogin = function() {
  if (LL.FINEST) {
    app.logger.finest('attemptCookieLogin called: ');
  }

  var qd = new goog.Uri.QueryData('=KEEP_ALIVE&=AUTHENTICATE');
  qd.add('spwfResource', 'KEEP_ALIVE');
  qd.add('spwfAction', 'AUTHENTICATE');
  qd.add('user_id', goog.net.cookies.get('user_id'));
  qd.add('session_id', goog.net.cookies.get('session_id'));

  /** @type {function({goog.events.Event})} */
  var callBack;
  callBack = function(e) {
    if (LL.FINEST) app.logger.finest('CallBack: attemptCookieLogin Request ');
    /** @type {Object} */
    var obj = e.target.getResponseJson();
    if (obj.errorMsg == undefined) {
      /** @type {string} */
      var session = nz(goog.net.cookies.get('session_id'), '');
      app.standardSuccessfulLogin(session);
    } else {
      goog.net.cookies.remove('user_id');
      goog.net.cookies.remove('session_id');
    }

  };
  
  app.svrCall(callBack, qd.toString());
};
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

goog.provide('app.dispatcher');
/**
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
  if (app.GLOBAL.currentDisplayDivs.length === 0) {
    app.GLOBAL.currentDisplayDivs.push('Login');
  }  
  if (app.GLOBAL.SESSION_ID === 'PENDING') {
    app.standardShowPage('Empty');
    return;
  }
  for (key in urlData.queryData_.getKeys()) {
    qdObject.key = urlData.queryData_.getValues(key);
  }
  if (urlData.path_ == undefined || urlData.path_ == '') {
    app.GLOBAL.TARGET_PAGE = 'MainLauncher';
  } else {
    app.dispatch[urlData.path_](qdObject);
  }
};
/**
*
* @param {string} resource resource to operate.
* @param {string} action action to take.
* @param {string} form  name of the form.
* @return {string} the built query string.
*/
app.buildQDStrForm = function (resource, action, form) {
  /** @type {string} */
  var qstr = goog.dom.forms.getFormDataString(goog.dom.getElement(form));
  var qd = new goog.Uri.QueryData(qstr);
  qd.add('spwfResource', resource);
  qd.add('spwfAction', action);
  //if (action !== 'AUTHENTICATE') {
  //  qd.add('user_id', app.GLOBAL.USER_ID);
  //  qd.add('session_id', app.GLOBAL.SESSION_ID);
 //}
  if (LL.FINEST) {
    app.logger.finest('Server Call Built' + qstr.toString());
  }
  return qd.toString();
}

/**
*
*/
app.init = function (){
 /** @type {goog.debug.Logger.Level} */
  app.GLOBAL.LOG_LEVEL = goog.debug.Logger.Level.ALL;
  if (LL.ON) {
    var logconsole = 
      new goog.debug.DivConsole(goog.dom.getElement('loggerConsole'));
    logconsole.setCapturing(true);
    app.logger = goog.debug.Logger.getLogger('app');
    app.logger.setLevel(app.GLOBAL.LOG_LEVEL);
  }
  if (LL.INFO) app.logger.info('dispatcher Initialized');

  //app.debugWindow = new goog.debug.FancyWindow('main');
  //    app.debugWindow.setEnabgoog.debug.Logger.Level.ALLled(true);
  //    app.debugWindow.init();

//This input is located in _footerWeb.html
   /** @type {HTMLInputElement} */
  var trackingElement = /** @type {HTMLInputElement} */
    (goog.dom.getElement('historyTrackerId'));
  app.hist = new goog.History(false, undefined, trackingElement);
  goog.events.listen(app.hist, goog.history.EventType.NAVIGATE, app.navCallback);
  app.hist.setEnabled(true);

}

/**
*
*/
app.setMainContent = function(contentBlock) {
  goog.dom.getElement('mainContent').innerHTML = contentBlock;
};

app.svrCall = function(callBack, qdstr) {
  goog.net.XhrIo.send('./cgi-bin/server.pl', callBack, 'POST', qdstr);
};


var init = function() {
	app.setMainContent(Login.view.getPrimary());
	app.init();
	LoginWeb.init();
	goog.dom.getElement('LoginForm-user_id').value = 'ledger';
  goog.dom.getElement('LoginForm-password').value = 'ledger';

}

init();


