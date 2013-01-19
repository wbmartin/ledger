/**
 *[% SRC_LOC = '_navWeb.js'%]
 * SRC: [% SRC_LOC %]
 * @param {goog.events.Event} e the event.
 */
app.navCallback = function(e) {
  if (e.token === 'LOGIN') { return; }
  if (app.authenticate()) {
    app.dispatcher(e.token);
  } else {
    app.GLOBAL.TARGET_PAGE = location.hash.substr(1);
    location.hash = 'LOGIN';
    LoginWeb.show(null);
  }
};
/**
 *[% SRC_LOC %]
 *[% f = 'showPage' %]
 * @param {string} page_ the page to show.
 */
app.[% f %] = function(page_) {
  if (LL.FINEST) {app.logger.finest('[%f%] called:' + page_);}
  app.hist.setToken(page_);
  window['_gaq'].push(['_trackPageview', page_]);
  return;
};

goog.provide('app.dispatcher');
/**
 *[% f = 'dispatcher' %]
 * SRC: [% SRC_LOC %]
 * @param {string} request_ the request to dispatch.
 *
 */
app.[% f %] = function(request_) {
  if (LL.FINEST) app.logger.finest('[%f%] Called');
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
  app.dispatch[urlData.path_](qdObject);

};


/**
 * SRC: [% SRC_LOC %]
 * @param {string} contentBlock the div content to replace.
 */
app.setMainContent = function(contentBlock) {
  goog.dom.getElement('mainContent').innerHTML = contentBlock;
};


/**
 *[% f ='standardSuccessfulLogin' %]
 * SRC: [% SRC_LOC %]
 * @param {string} session_ the session string.
 */
app.[% f %] = function(session_) {
  if (LL.FINEST) {
    app.logger.finest('[%f%] called: ' + session_);
  }
  app.initSession(goog.dom.getElement('LoginForm-user_id').value, session_);
  goog.dom.getElement('LoginForm-password').value = '';
  app.showPage(app.GLOBAL.TARGET_PAGE);
};
/**
 *[% f ='extendSession' %]
 * SRC: [% SRC_LOC %]
 * @param {string} session_ the session string.
 */
app.[% f %] = function() {
  app.initSession(
      goog.net.cookies.get('user_id'),
      goog.net.cookies.get('session_id'));
}
/**
 *[% f ='initSession' %]
 * SRC: [% SRC_LOC %]
 * @param {string} session_ the session string.
 */
app.[% f %] = function (userId, sessionId){
  var sessionExpirationSeconds = 60 * 20;
  if (app.GLOBAL.TRUSTED_DEVICE) { sessionExpirationSeconds = -1; }
  goog.net.cookies.set('session_id', sessionId, sessionExpirationSeconds);
  goog.net.cookies.set('user_id', userId, sessionExpirationSeconds);
}

