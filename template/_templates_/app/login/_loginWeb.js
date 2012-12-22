[%divId="Login"%]
[% SRC_LOC = '_loginWeb'%]
goog.provide('start');
/**
 *  SRC: [% SRC_LOC%]
 */ 
start.start = function() {
	/** @type {app.Command} */
	var cmdParams = new app.Command('SECURITY_USER', 'AUTHENTICATE');
	cmdParams.digest(app.form.getValues('[%divId%]Form'));
	/** @type {function({goog.events.Event})} */
	var callBack;
	callBack = function(e) {
		/** @type {Object} */
		var obj = e.target.getResponseJson();
		/** @type {string} */
		var session = obj['rows'][0]['session_id'];
		app.GLOBAL.SESSION_ID = session;
		onSuccessfulLogin();
		goog.net.cookies.set('session', session);
	};
	app.server.cmdCall(cmdParams, callBack);

};
goog.exportSymbol('start.start', start.start);


/**
 *  SRC: [% SRC_LOC%]
 */ 
function onSuccessfulLogin(){
	app.hist.setToken(app.GLOBAL.TARGET_PAGE);
}
