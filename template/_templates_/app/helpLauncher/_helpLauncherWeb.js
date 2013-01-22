[%divId="HelpLauncher"%]
[%SRC_LOC="_helpLauncherWeb.js"%]

goog.provide('[%divId%]Web');
goog.require('[%divId%]WebView');


/**
 *@constructor
 */
[%divId%]Web = function(){
 this.logger_.setLevel(App.GLOBAL.LOG_LEVEL);
  this.logger_.info('Initialized');
  App.dispatch['[%divId%]'] = this.show;
}

/**
 * A reference to the  logger
 * @type {goog.debug.Logger}
 * @private
 */
[%divId%]Web.prototype.logger_ = goog.debug.Logger.getLogger('[%divId%]');

/**
 * SRC: [%SRC_LOC%]
 * @param {Object} args_ the args to pass to the show function.
 *
 */
[%divId%]Web.prototype.show = function(args_) {
  app.setMainContent([%divId%]WebView.getPrimary(null, null));
};

new [%divId%]Web();
