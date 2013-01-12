[%divId="Login"%]
[% SRC_LOC = '_loginWeb'%]
goog.provide('LoginWeb');
//goog.exportSymbol('app.[%divId%].view.getPrimary', app.[%divId%].view.getPrimary);

/**
 *
 *
 */
[%divId%]Web.init = function() {
  if (LL.ON) {
    [%divId%]Web.logger = goog.debug.Logger.getLogger('[%divId%]');
    [%divId%]Web.logger.setLevel(app.GLOBAL.LOG_LEVEL);
  }
  if (LL.INFO) {
    [%divId%]Web.logger.info('Initialized');
  }
};
/**
 *  SRC: [% SRC_LOC%]
 */ 
[%divId%]Web.start = function() {
  if (LL.FINEST) {
    [%divId%]Web.logger.finest('Call start');
  }
   
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
	/** @type {goog.net.XhrIo}*/
  //var xhr = new goog.net.XhrIo();
	//goog.events.listen(xhr, goog.net.EventType.COMPLETE, callBack);
	//xhr.send('./cgi-bin/server.pl', 'POST', qstr);
	app.svrCall(callBack, qstr);

};

[%f='onSuccessfulLogin'%]
/**
 *  SRC: [% SRC_LOC%]
 * @param {string} session_ the sessionID.  
 */
[%divId%]Web.[%f%] = function(session_) {
  [%divId%]Web.logger.finest('Call [%f%]');
  app.standardSuccessfulLogin(session_);
};

/**
 *
 *
 *
 */

