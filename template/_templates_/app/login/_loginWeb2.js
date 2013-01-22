[%divId="Login"%]
[% SRC_LOC = '_loginWeb2'%]
goog.provide('LoginWeb');
goog.require('LoginWebView');

/**
 * @constructor
 */
[%divId%]Web = function(){
  App.logger_.setLevel(App.GLOBAL.LOG_LEVEL);
  this.init('[%divId%]');
  goog.events.listenOnce(App.GLOBAL.onScreenPageTarget, 'DIPOSE_ALL', this.dispose, false, this);
  goog.Disposable.call(this);
  app.setMainContent([%divId%]WebView.getPrimary(null, null));
  this.eh1.listen(
      goog.dom.getElement('cmdlogin'),
      goog.events.EventType.CLICK,
      this.attemptLogin
      );
}
goog.inherits([%divId%]Web , PageHelper);

/**
 * A reference to the  logger
 * @type {goog.debug.Logger}
 * @private
 */
[%divId%]Web.prototype.logger_ = goog.debug.Logger.getLogger('[%divId%]');

[%divId%]Web.prototype.disposeInternal = function(){
  goog.dispose(this.eh1);
}

/**
 *  SRC: [% SRC_LOC%]
 *  @return {boolean} false to not refresh the page.
 */
[%divId%]Web.prototype.attemptLogin = function() {
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


