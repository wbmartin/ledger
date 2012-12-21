[%divId="Login"%]
goog.provide('start');
/**
 *
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
		onSuccessfulLogin();
		alert(obj['rows'][0]['session_id']);
	};
	app.server.cmdCall(cmdParams, callBack);

};
goog.exportSymbol('start.start', start.start);

function onSuccessfulLogin(){
	/** @type {goog.dom.getElement} */
var element = goog.dom.getElement('Login');
  goog.dom.classes.add(element, 'LogicDisabled');
	element = goog.dom.getElement('Launcher');
  goog.dom.classes.remove(element, 'LogicDisabled');
	

}
