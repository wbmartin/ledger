/**
 *[% SRC_LOC = '_miscWeb.js'%]
 */


/**
 *[% f = 'buildQDStrForm' %]
 * SRC: [% SRC_LOC %]
 * @param {string} resource resource to operate.
 * @param {string} action action to take.
 * @param {string} form  name of the form.
 * @return {string} the built query string.
 */
App.prototype.[% f %] = function(resource, action, form) {
  /** @type {string} */
  var qstr = goog.dom.forms.getFormDataString(
      /** @type {HTMLFormElement} */(goog.dom.getElement(form))
      );
  var qd = new goog.Uri.QueryData(qstr);
  qd.add('spwfResource', resource);
  qd.add('spwfAction', action);
  
    App.logger_.finest('Server Call Built' + qstr.toString());
    return qd.toString();
};

/**
 * The tracking element input is located in _footerWeb.html
 * SRC: [% SRC_LOC %]
 */
App.prototype.initHistory = function() {
  /** @type {HTMLInputElement} */
  var trackingElement = /** @type {HTMLInputElement} */
    (goog.dom.getElement('historyTrackerId'));
  App.hist = new goog.History(false, undefined, trackingElement);
  goog.events.listen(App.hist,
      goog.history.EventType.NAVIGATE,
      App.navCallback);
  App.hist.setEnabled(true);
};



/**
 * SRC: [%SRC_LOC%]
 * @param {function(?)} callBack the function to execute.
 * @param {string} qdstr query data string.
 */
App.prototype.svrCall = function(callBack, qdstr) {
  //var xhr = new goog.net.XhrIo();
  //goog.events.listen(xhr, goog.net.EventType.COMPLETE, callBack);
  //xhr.send('./cgi-bin/server.pl', 'POST', qdstr);
  goog.net.XhrIo.send('./cgi-bin/server.pl', callBack, 'POST', qdstr);
};

/**
 * @constructor
 */
goog.provide('PageHelper');
PageHelper = function(){
  
}
goog.inherits (PageHelper, goog.Disposable);

PageHelper.prototype.init = function(pageId) {
  this.eh1 = new goog.events.EventHandler();
}





