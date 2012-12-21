'use strict';
goog.require('goog.Uri');
goog.require('goog.debug.ErrorHandler');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.dom.query');
goog.require('goog.events.EventHandler');
goog.require('goog.net.XhrIo');
goog.require('goog.object');



goog.provide('start');
/**
 *
 */
start.start = function() {
 /** @type {app.Command} */
 var cmdParams = new app.Command('SECURITY_USER', 'AUTHENTICATE');
 cmdParams.digest(app.form.getValues('LoginForm'));
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



  goog.provide('app');
goog.provide('app.server');
/**
 * @param {app.Command} cmdParams Parameters to construct the server side call.
 * @param {function({goog.events.Event})} completeCallBack function.
 */
app.server.cmdCall = function(cmdParams, completeCallBack) {
 /** @type {goog.net.XhrIo}*/
 var xhr = new goog.net.XhrIo();
 goog.events.listen(xhr, goog.net.EventType.COMPLETE, completeCallBack);
 xhr.send('./cgi-bin/server.pl', 'POST', goog.json.serialize(cmdParams));
};


goog.provide('app.logEntry');
/**
 * @param {string} msg_ the message to be logged.
 * @constructor
 */
app.logEntry = function(msg_) {
 /** @type {Date}*/
 this.entryDt = new Date();
 /** @type {string}*/
 this.msg = msg_;
};
goog.provide('app.log');
/**
 * @constructor
 */
app.log = function() {
 /** @type {Array} */
 this.logArray = new Array();
};

/**
 * @param {app.logEntry} entry_  the log entry.
 */
app.log.prototype.addEntry = function(entry_) {
 this.logArray.push(entry_);
};



/**
 *
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
 * @param {string} formId_  id of the form to grab all inputs.
 * @return {Object} form data.
 */
app.form.getValues = function(formId_) {
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
 * @param {Object} ee the digestee.
 */
Object.prototype.digest = function(ee) {
 /** @type {string} */
 var key;
for (key in ee) {
      this[key] = ee[key];
  }
};



   /** @type {app.log} */
var mainLog = new app.log();
mainLog.addEntry(new app.logEntry('Log Initialized'));
document.getElementById('LoginForm-user_id').value = 'ledger';
document.getElementById('LoginForm-password').value = 'ledger';
