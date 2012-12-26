[%SRC_LOC="_libCommon.js"%]
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
 *SRC:[%SRC_LOC %]
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
 * SRC: [%SRC_LOC%]
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
 * SRC: [%SRC_LOC%]
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
 * SRC: [%SRC_LOC%]
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
 * SRC: [%SRC_LOC%]
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
 * SRC: [%SRC_LOC%]
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
 * SRC: [%SRC_LOC%]
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
    app.GLOBAL.TARGET_PAGE = (target_ == '')? 'MainLauncher' : target_;
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
 * This is a very delicate function.  
 * The call must come from a body script before the page finishes loading
 * If there is every problems with navigation, it is probably here.
 * SRC: [%SRC_LOC%]
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
	//  	app.hist.setToken(page_ +'?');
  //}else{
    app.hist.setToken(page_);
  //}
};
goog.exportSymbol('showPage', app.showPage);


/**
 * SRC: [%SRC_LOC%]
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

[%f='attemptCookieLogin'%]
/**
 * SRC: [%SRC_LOC%]
 *
 */
app.[%f%] = function() {
	var cmdParams = new app.Command('KEEP_ALIVE', 'AUTHENTICATE');
	cmdParams['user_id'] = goog.net.cookies.get('user_id');
	cmdParams['session_id'] = goog.net.cookies.get('session_id');

	/** @type {function({goog.events.Event})} */
	var callBack;
	callBack = function(e) {
		app.logger.finest('CallBack: [%f%] Request ');
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
