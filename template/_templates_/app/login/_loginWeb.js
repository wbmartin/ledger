[%divId="Login"%]
[% SRC_LOC = '_loginWeb'%]
goog.provide('LoginWeb');
goog.require('Login.view');

/**
 *  SRC: [% SRC_LOC%]
 *  @return {boolean} false to not refresh the page.
 */
[%divId%]Web.start = function() {
  if (LL.FINEST) {
    [%divId%]Web.logger.finest('Call start');
  }
  app.GLOBAL.TRUSTED_DEVICE =
    goog.dom.getElement('LoginForm-trustedDeviceId').checked;
  /** @type {string} */
  var qstr = app.buildQDStrForm('SECURITY_USER', 'AUTHENTICATE', 'LoginForm');

  /** @type {function({goog.events.Event})} */
  var callBack;
  callBack = function(e) {
    [%divId%]Web.logger.finest('CallBack: Login Request ');
    /** @type {Object} */
    var obj = e.target.getResponseJson();
    var session = obj['rows'][0]['session_id'];
    LoginWeb.onSuccessfulLogin(session);
  };
  app.svrCall(callBack, qstr);
  return false;
};


/**
 * [% f = 'onSuccessfulLogin' %]
 * SRC: [% SRC_LOC%]
 * @param {string} session_ the sessionID.
 */
[%divId%]Web.[% f %] = function(session_) {
  [%divId%]Web.logger.finest('Call [%f%]');
  app.standardSuccessfulLogin(session_);
};

/**
 * SRC: [% SRC_LOC%]
 * @param {Object} args_ the args object.
 */
[% divId %]Web.show = function(args_) {
  app.setMainContent([%divId%].view.getPrimary(null, null));
  goog.events.listen(
      goog.dom.getElement('testerId'),
      goog.events.EventType.CLICK,
      [%divId%]Web.start
      );

  goog.events.listen(
      goog.dom.getElement('cmdlogin'),
      goog.events.EventType.CLICK,
      [%divId%]Web.start
      );


};


/**
 * SRC: [% SRC_LOC%]
 *
 */
[%divId%]Web.init = function() {
  if (LL.ON) {
    [%divId%]Web.logger = goog.debug.Logger.getLogger('[%divId%]');
    [%divId%]Web.logger.setLevel(app.GLOBAL.LOG_LEVEL);
  }
  if (LL.INFO) { [%divId%]Web.logger.info('Initialized'); }
};
[%divId%]Web.init();
