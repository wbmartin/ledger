[%SRC_LOC="_headerWeb.js"%]
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


goog.provide('app');
goog.provide('app.server');
goog.provide('app.dispatch');
/**
 * GLOBALS
 *
 */
goog.provide('app.GLOBAL');

/** @type {Array.<string>} */ app.GLOBAL.currentDisplayDivs = new Array();

/**
 * target page after login unless changed later
 * @type string
 */
app.GLOBAL.TARGET_PAGE = 'MainLauncher';

/** @type {boolean} */app.GLOBAL.TRUSTED_DEVICE = false;

/**
 * SRC: [%SRC_LOC%]
 * Hide all other divs and show the new one.
 * @param {string} divToShow_  the div to show.
 * @return {boolean} false if exiting early.
 */
[%f='standardShowPage'%]
app.[%f%] = function(divToShow_) {
  if (LL.FINEST) {
  app.logger.finest('[%f%] called: ' + divToShow_);
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
 * SRC: [%SRC_LOC%]
 * @param {goog.events.Event} e the event.
 */
app.navCallback = function(e) {
  if (app.authenticate(e.token)) {
  app.dispatcher(e.token);
  } else{
  LoginWeb.show(null);
  }
};

/**
 * SRC: [%SRC_LOC%]
 * @param {string} target_ the target resource.
 * @return {boolean} is authenticated.
 */
[%f='authenticate'%]
app.[%f%] = function(target_) {
  if (LL.FINEST) {
  app.logger.finest('[%f%] called: ' + target_);
  }


  app.GLOBAL.TARGET_PAGE = (target_ == '') ? 'MainLauncher' : target_;
  if (goog.net.cookies.get('session_id') == undefined){

  return false;
  }
  return true;
/*  if (app.GLOBAL.SESSION_ID == '') {
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
  */
};


/**
 *
 * @param {string} page_ the page to show.
 */
[%f='showPage'%]
app.[%f%] = function(page_) {
  if (LL.FINEST) {app.logger.finest('[%f%] called:' + page_);}
  app.hist.setToken(page_);
  return false;
};


/**
 * SRC: [%SRC_LOC%]
 * @param {string} session_ the session string.
 */
[%f='standardSuccessfulLogin'%]
app.[%f%] = function(session_) {
  if (LL.FINEST) {
  app.logger.finest('[%f%] called: ' + session_);
  }
  var sessionExpirationSeconds = -1;
  if (!app.GLOBAL.TRUSTED_DEVICE) { sessionExpirationSeconds = 60 * 20; }

  goog.net.cookies.set('session_id', session_, sessionExpirationSeconds);
  goog.net.cookies.set('user_id',
  goog.dom.getElement('LoginForm-user_id').value, sessionExpirationSeconds);

  goog.dom.getElement('LoginForm-password').value = '';
  app.showPage(app.GLOBAL.TARGET_PAGE);
};

/**
 * SRC: [%SRC_LOC%]
 *
 */
[%f='attemptCookieLogin'%]
app.[%f%] = function() {
  if (LL.FINEST) {
  app.logger.finest('[%f%] called: ');
  }

  var qd = new goog.Uri.QueryData('=KEEP_ALIVE&=AUTHENTICATE');
  qd.add('spwfResource', 'KEEP_ALIVE');
  qd.add('spwfAction', 'AUTHENTICATE');
  qd.add('user_id', goog.net.cookies.get('user_id'));
  qd.add('session_id', goog.net.cookies.get('session_id'));

  /** @type {function({goog.events.Event})} */
  var callBack;
  callBack = function(e) {
  if (LL.FINEST) app.logger.finest('CallBack: [%f%] Request ');
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
goog.provide('app.dispatcher');
/**
 * SRC: [%SRC_LOC%]
 * @param {string} request_ the request to dispatch.
 *
 */
[%f='dispatcher'%]
app.[%f%] = function(request_) {
  if (LL.FINEST) app.logger.finest('[%f%] Called');
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
 * SRC: [%SRC_LOC%]
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
  //if (action !== 'AUTHENTICATE') {
  //  qd.add('user_id', app.GLOBAL.USER_ID);
  //  qd.add('session_id', app.GLOBAL.SESSION_ID);
  //}
  if (LL.FINEST) {
  app.logger.finest('Server Call Built' + qstr.toString());
  }
  return qd.toString();
};

/**
 *
 * SRC: [%SRC_LOC%]
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
  if (LL.INFO) app.logger.info('[%f%] Initialized');

  //app.debugWindow = new goog.debug.FancyWindow('main');
  //    app.debugWindow.setEnabgoog.debug.Logger.Level.ALLled(true);
  //    app.debugWindow.init();


};
app.init();

app.initHistory = function () {
//This input is located in _footerWeb.html
  /** @type {HTMLInputElement} */
  var trackingElement = /** @type {HTMLInputElement} */
  (goog.dom.getElement('historyTrackerId'));
  app.hist = new goog.History(false, undefined, trackingElement);
  goog.events.listen(app.hist,
  goog.history.EventType.NAVIGATE,
  app.navCallback);
  app.hist.setEnabled(true);

}

/**
 * SRC: [%SRC_LOC%]
 * @param {string} contentBlock the div content to replace.
 */
app.setMainContent = function(contentBlock) {
  goog.dom.getElement('mainContent').innerHTML = contentBlock;
};

/**
 * SRC: [%SRC_LOC%]
 * @param {function} callBack the function to execute.
 * @param {string} qdstr query data string.
 */
app.svrCall = function(callBack, qdstr) {
  //var xhr = new goog.net.XhrIo();
  //goog.events.listen(xhr, goog.net.EventType.COMPLETE, callBack);
  //xhr.send('./cgi-bin/server.pl', 'POST', qdstr);
  goog.net.XhrIo.send('./cgi-bin/server.pl', callBack, 'POST', qdstr);
};





