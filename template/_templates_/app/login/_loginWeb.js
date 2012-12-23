[%divId="Login"%]
[% SRC_LOC = '_loginWeb'%]
goog.provide('LoginWeb');

/**
 *
 *
 */
[%divId%]Web.init = function() {
	[%divId%]Web.logger = goog.debug.Logger.getLogger('[%divId%]');
	[%divId%]Web.logger.info('Initialized');
	[%divId%]Web.logger.setLevel(goog.debug.Logger.Level.ALL);
};
goog.exportSymbol('[%divId%]Web.init', [%divId%]Web.init);
/**
 *  SRC: [% SRC_LOC%]
 */ 
[%divId%]Web.start = function() {
	[%divId%]Web.logger.finest('Call start');
	/** @type {app.Command} */
	var cmdParams = new app.Command('SECURITY_USER', 'AUTHENTICATE');
	cmdParams.digest(app.form.getValues('[%divId%]Form'));
	/** @type {function({goog.events.Event})} */
	var callBack;
	callBack = function(e) {
		[%divId%]Web.logger.finest('CallBack: Login Request ');
		/** @type {Object} */
		var obj = e.target.getResponseJson();
		var session = obj['rows'][0]['session_id'];
		LoginWeb.onSuccessfulLogin(session);
	};
	app.server.cmdCall(cmdParams, callBack);

};
goog.exportSymbol('[%divId%]Web.start', [%divId%]Web.start);

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

