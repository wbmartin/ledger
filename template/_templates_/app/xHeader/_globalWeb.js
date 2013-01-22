goog.provide('App');

/**
 * SRC: [% SRC_LOC %]
 * @constructor
 *
 */
App = function(){
  /** @type {goog.debug.Logger.Level} */
  var logconsole =
    new goog.debug.DivConsole(goog.dom.getElement('loggerConsole'));
  logconsole.setCapturing(true);
  App.logger_.setLevel(App.GLOBAL.LOG_LEVEL);
  App.logger_.info('[%f%] Initialized');

  //app.debugWindow = new goog.debug.FancyWindow('main');
  //    app.debugWindow.setEnabgoog.debug.Logger.Level.ALLled(true);
  //    app.debugWindow.init();
};
/**
 * A reference to the  logger
 * @type {goog.debug.Logger}
 * @private
 */
App.logger_ = goog.debug.Logger.getLogger('app');
goog.provide('App.GLOBAL');

/**
 * target page after login unless changed later
 * @type string
 */
App.GLOBAL.TARGET_PAGE = 'MainLauncher';

/** @type {boolean} */
App.GLOBAL.TRUSTED_DEVICE = false;
/** @type {Object} */
App.dispatch = {};

App.lastTran = new Date();

App.GLOBAL.onScreenPageTarget = new goog.events.EventTarget();
App.GLOBAL.LOG_LEVEL = goog.debug.Logger.Level.ALL;

var app = new App();




