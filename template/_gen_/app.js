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
goog.require('goog.dom.query');
goog.require('goog.events');
goog.require('goog.events.EventHandler');
goog.require('goog.history.EventType');
goog.require('goog.json');
goog.require('goog.net.XhrIo');
goog.require('goog.net.cookies');
goog.require('goog.object');
goog.require('goog.string');





goog.provide('LoginWeb');

/**
 *
 *
 */
LoginWeb.init = function() {
 LoginWeb.logger = goog.debug.Logger.getLogger('Login');
 LoginWeb.logger.info('Initialized');
 LoginWeb.logger.setLevel(goog.debug.Logger.Level.ALL);
};
goog.exportSymbol('LoginWeb.init', LoginWeb.init);
/**
 *  SRC: _loginWeb
 */
LoginWeb.start = function() {
 LoginWeb.logger.finest('Call start');
 /** @type {app.Command} */
 var cmdParams = new app.Command('SECURITY_USER', 'AUTHENTICATE');
 cmdParams.digest(app.form.getValues('LoginForm'));
 /** @type {function({goog.events.Event})} */
 var callBack;
 callBack = function(e) {
  LoginWeb.logger.finest('CallBack: Login Request ');
  /** @type {Object} */
  var obj = e.target.getResponseJson();
  var session = obj['rows'][0]['session_id'];
  LoginWeb.onSuccessfulLogin(session);
 };
 app.server.cmdCall(cmdParams, callBack);

};
goog.exportSymbol('LoginWeb.start', LoginWeb.start);


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





goog.provide('AppLogger');
/**
 * SRC: appLogWeb.js
 * @param {Object} args_ rendering arguments.
 */
AppLogger.show = function(args_) {
 app.standardShowPage('AppLogger');
};
//goog.exportSymbol('showAppLogger', showAppLogger);




goog.provide('MainLauncher');
/**
 * SRC: _mainLauncherWeb.js
 * @param {Object} args_ the args to pass to the show function.
 *
 */
MainLauncher.show = function(args_) {
  app.standardShowPage('MainLauncher');
};


  goog.provide('app.dispatcher');
/**
 * @param {string} request_ the request to dispatch.
 *
 */
app.dispatcher = function(request_) {
 /** @type {goog.Uri} */
 var urlData = goog.Uri.parse(request_);
 /** @type string*/
 var key;
 /** @type {Object} */
 var qdObject = {};
 if (app.currentDisplayDivs.length === 0) {
  app.currentDisplayDivs.push('Login');
 }
 if (app.GLOBAL.SESSION_ID === 'PENDING') {
  app.standardShowPage('Empty');
  return;
 }
 for (key in urlData.queryData_.getKeys()) {
  qdObject.key = urlData.queryData_.getValues(key);
 }

 switch (urlData.path_) {
  case '':
   app.GLOBAL.TARGET_PAGE = 'MainLauncher';
   break;
  case 'MainLauncher': MainLauncher.show(qdObject); break;
  case 'AppLogger': AppLogger.show(qdObject); break;

 }


};


goog.provide('app');
goog.provide('app.server');
/**
 * GLOBALS
 *
 */
goog.provide('app.GLOBAL');
/** @type {string|undefined} */
app.GLOBAL.SESSION_ID = '';

/**
 *SRC:_libCommon.js
 */
app.initLogger = function() {
 var logconsole =
  new goog.debug.DivConsole(goog.dom.getElement('loggerConsole'));
 logconsole.setCapturing(true);
 app.logger = goog.debug.Logger.getLogger('app');
 app.logger.info('Initialized');



 //app.debugWindow = new goog.debug.FancyWindow('main');
 //    app.debugWindow.setEnabled(true);
 //    app.debugWindow.init();

};
goog.exportSymbol('app.initLogger', app.initLogger);

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
 app.logger.finest('Call: app.server.cmdCall ');
 /** @type {goog.net.XhrIo}*/
 var xhr = new goog.net.XhrIo();
 goog.events.listen(xhr, goog.net.EventType.COMPLETE, completeCallBack);
 xhr.send('./cgi-bin/server.pl', 'POST', goog.json.serialize(cmdParams));
};


goog.provide('app.logEntry');


/**
 *
 * SRC: _libCommon.js
 * @constructor
 * @param {string} resource_ usually the table name.
 * @param {string} action_ usually the CRUD operation.
 */
app.Command = function(resource_, action_) {
 /** @type {string}*/
 this['spwfResource'] = resource_;
 /** @type {string}*/
 this['spwfAction'] = action_;
};

goog.provide('app.form.getValues');
/**
 * SRC: _libCommon.js
 * @param {string} formId_  id of the form to grab all inputs.
 * @return {Object} form data.
 */
app.form.getValues = function(formId_) {
 app.logger.finest('Call: app.form.getValues - ' + formId_);
 /** @type {Object}*/
 var formValues = {};
 /** @type {{length: number}} */
 var input = new Array();
 input = goog.dom.query('#' + formId_ + ' input');
 /** @type {string}*/
 var fieldName;
 for (var i = 0; i < input.length; i++) {
  fieldName = input[i].id.replace((formId_ + '-'), '');
  formValues[fieldName] = input[i].value;
 }
 return formValues;
};

goog.provide('app.utl');
/**
 *
 * SRC: _libCommon.js
 * @param {Object} ee the digestee.
 */
app.Command.prototype.digest = function(ee) {
 /** @type {string} */
 var key;
 for (key in ee) {
  this[key] = ee[key];
 }
};

/** @type {Array.<string>} */
app.currentDisplayDivs = new Array();

goog.provide('app.standardShowPage');
/**
 * SRC: _libCommon.js
 * Hide all other divs and show the new one.
 * @param {string} divToShow_  the div to show.
 * @return {boolean} false if exiting early.
 */
app.standardShowPage = function(divToShow_) {
 /** @type {string} */
 var visibleDiv;
 /** @type {Element} */
 var element;
 while (visibleDiv = app.currentDisplayDivs.pop()) {
  element = goog.dom.getElement(visibleDiv + 'DivId');
  goog.dom.classes.add(element, 'LogicalHide');
 }
 element = goog.dom.getElement((divToShow_ + 'DivId'));
 goog.dom.classes.remove(element, 'LogicalHide');
 app.currentDisplayDivs.push(divToShow_);
 //_gaq.push(['_trackPageview', divToShow_]);
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
*
* @param {string} target_ the target resource.
* @return {boolean} is authenticated.
*/
app.authenticate = function(target_) {
  if (app.GLOBAL.SESSION_ID === 'PENDING') return false;
  if (app.GLOBAL.SESSION_ID == '') {
  //app.GLOBAL.SESSION_ID = goog.net.cookies.get('session_id');
    app.GLOBAL.TARGET_PAGE = (target_ == '')? 'MainLauncher' : target_;
     app.GLOBAL.SESSION_ID = 'PENDING';
    app.hist.setToken('');
  if (goog.net.cookies.get('user_id') != undefined) {
   //this would normally be in the dispatcher, but can cookie login
   // can return before it gets there


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
 * This is a very delicate function.
 * The call must come from a body script before the page finishes loading
 * If there is every problems with navigation, it is probably here.
 * SRC: _libCommon.js
 * @return {goog.History} the history object.
 */
app.initHistory = function() {
 /**
  *This input is located in _footerWeb.html
  * @type {HTMLInputElement} */
 var trackingElement = /** @type {HTMLInputElement} */
  (goog.dom.getElement('historyTrackerId'));
 app.hist = new goog.History(false, undefined, trackingElement);

 goog.events.listen(app.hist, goog.history.EventType.NAVIGATE, app.navCallback);
 app.hist.setEnabled(true);
 return app.hist;
};
goog.exportSymbol('app.initHistory', app.initHistory);
/**
*
* @param {string} page_ the page to show.
*/

app.showPage = function(page_) {
  //if( ('#' + page_) === window.location.hash){
 //   app.hist.setToken(page_ +'?');
  //}else{
    app.hist.setToken(page_);
  //}
};
goog.exportSymbol('showPage', app.showPage);


/**
 * SRC: _libCommon.js
 * @param {string} session_ the session string.
 */
app.standardSuccessfulLogin = function(session_) {
 app.GLOBAL.SESSION_ID = session_;
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
 var cmdParams = new app.Command('KEEP_ALIVE', 'AUTHENTICATE');
 cmdParams['user_id'] = goog.net.cookies.get('user_id');
 cmdParams['session_id'] = goog.net.cookies.get('session_id');

 /** @type {function({goog.events.Event})} */
 var callBack;
 callBack = function(e) {
  app.logger.finest('CallBack: attemptCookieLogin Request ');
  /** @type {Object} */
  var obj = e.target.getResponseJson();
  if (obj.errorMsg == undefined) {
   /** @type {string}*/
   var session = nz(goog.net.cookies.get('session_id'), '');
   app.standardSuccessfulLogin(session);
  } else {
   goog.net.cookies.remove('user_id');
   goog.net.cookies.remove('session_id');
  }

 };
 app.server.cmdCall(cmdParams, callBack);

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
goog.exportSymbol('nz', nz);

  //app.init = function(){
// app.mainLog= new app.log();
// app.mainLog.addEntry(new app.logEntry('Log Initialized'));
//}
//app.init();



