//[% SRC_LOC = '_navWeb.js'%]


/**
 *[% f = 'authenticate' %]
 * SRC: [%SRC_LOC%]
 * @return {boolean} is authenticated.
 */
App.[% f %] = function() {
 App.logger_.finest('[%f%] called:'); 
  if (goog.net.cookies.get('session_id') === undefined) {
    return false;
  }
  return true;
};

/**
 *
 * SRC: [% SRC_LOC %]
 * @param {goog.events.Event} e the event.
 */
App.navCallback = function(e) {
  if (e.token === 'LOGIN') { return; }
  if (App.authenticate()) {
    App.dispatcher(e.token);
  } else {
    App.GLOBAL.TARGET_PAGE = location.hash.substr(1);
    location.hash = 'LOGIN';
    new LoginWeb();
  }
};
/**
 *[% SRC_LOC %]
 *[% f = 'showPage' %]
 * @param {string} page_ the page to show.
 */
App.prototype.[% f %] = function(page_) {
  App.logger_.finest('[%f%] called:' + page_);
  App.GLOBAL.onScreenPageTarget.dispatchEvent('DIPOSE_ALL');
  App.hist.setToken(page_);
  window['_gaq'].push(['_trackPageview', page_]);
  return;
};

/**
 *[% f = 'dispatcher' %]
 * SRC: [% SRC_LOC %]
 * @param {string} request_ the request to dispatch.
 *
 */
App.[% f %] = function(request_) {
  App.logger_.finest('[%f%] Called');
  /** @type {goog.Uri} */
  var urlData = goog.Uri.parse(request_);
  /** @type string*/
  var key;
  /** @type {Object} */
  var qdObject = {};
  for (key in urlData.queryData_.getKeys()) {
    qdObject.key = urlData.queryData_.getValues(key);
  }
  if (urlData.path_ == undefined || urlData.path_ == '') {
    urlData.path_ = 'MainLauncher';
  }
  App.dispatch[urlData.path_](qdObject);

};


/**
 * SRC: [% SRC_LOC %]
 * @param {string} contentBlock the div content to replace.
 */
App.prototype.setMainContent = function(contentBlock) {
  App.GLOBAL.onScreenPageTarget.dispatchEvent('DISPOSE_ALL');
  goog.dom.getElement('mainContent').innerHTML = contentBlock;
};


/**
 *[% f ='standardSuccessfulLogin' %]
 * SRC: [% SRC_LOC %]
 * @param {string} session_ the session string.
 */
App.prototype.[% f %] = function(session_) {
    App.logger_.finest('[%f%] called: ' + session_);
  this.initSession(goog.dom.getElement('LoginForm-user_id').value, session_);
  goog.dom.getElement('LoginForm-password').value = '';
  this.showPage(App.GLOBAL.TARGET_PAGE);
};
/**
 *[% f ='extendSession' %]
 * SRC: [% SRC_LOC %]
 */
App.prototype.[% f %] = function() {
  app.initSession(
      goog.net.cookies.get('user_id'),
      goog.net.cookies.get('session_id'));
}
/**
 *[% f ='initSession' %]
 * SRC: [% SRC_LOC %]
 * @param {string} userId the user.
 * @param {string} sessionId the session string.
 */
App.prototype.[% f %] = function(userId, sessionId){
  var sessionExpirationSeconds = 60 * 20;
  if (App.GLOBAL.TRUSTED_DEVICE) { sessionExpirationSeconds = -1; }
  goog.net.cookies.set('session_id', sessionId, sessionExpirationSeconds);
  goog.net.cookies.set('user_id', userId, sessionExpirationSeconds);
}


/**
 *[% f ='disposeOnScreenComponents' %]
 * SRC: [% SRC_LOC %]
 */
/*
App.prototype.[% f %] = function(){
  var ndx = 0;
  var onScreenCount = App.GLOBAL.onScreenComponents.length;
  var component;
  for(ndx = 0; ndx < onScreenCount; ndx++) {
    component = App.GLOBAL.onScreenComponents.pop();
    if (typeof component.dispose === 'function'){
      component.dispose();
    }
  }


};
*/

