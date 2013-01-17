/**
 * [% SRC_LOC = '_miscWeb.js'%]
 */

/**
 * [% f = 'authenticate' %]
 * SRC: [%SRC_LOC%]
 * @return {boolean} is authenticated.
 */
app.[% f %] = function() {
  if (LL.FINEST) { app.logger.finest('[%f%] called:'); }
  if (goog.net.cookies.get('session_id') === undefined) {
    return false;
  }
  return true;
};

/**
 * [% f = 'buildQDStrForm' %]
 * SRC: [% SRC_LOC %]
 * @param {string} resource resource to operate.
 * @param {string} action action to take.
 * @param {string} form  name of the form.
 * @return {string} the built query string.
 */
app.[% f %] = function(resource, action, form) {
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
 * SRC: [% SRC_LOC %]
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
 * SRC: [% SRC_LOC %]
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


/**
 * SRC: [%SRC_LOC%]
 * @param {function(?)} callBack the function to execute.
 * @param {string} qdstr query data string.
 */
app.svrCall = function(callBack, qdstr) {
  //var xhr = new goog.net.XhrIo();
  //goog.events.listen(xhr, goog.net.EventType.COMPLETE, callBack);
  //xhr.send('./cgi-bin/server.pl', 'POST', qdstr);
  goog.net.XhrIo.send('./cgi-bin/server.pl', callBack, 'POST', qdstr);
};


