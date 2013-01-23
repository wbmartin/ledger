[%divId="MainLauncher"%]
[%SRC_LOC="_mainLauncherWeb.js"%]

goog.provide('[%divId%]Web');
goog.require('MainLauncherWebView');

/**
 * @constructor
 * @extends {PageHelper}
 */
[%divId%]Web = function(){
  this.logger_.setLevel(App.GLOBAL.LOG_LEVEL);
  this.init('[%divId%]');
  goog.events.listenOnce(App.GLOBAL.onScreenPageTarget, 'DIPOSE_ALL', this.dispose, false, this);
  app.setMainContent([%divId%]WebView.getPrimary(null, null));
  this.eh1.listen(
      goog.dom.getElement('launcherShowHelp'),
      goog.events.EventType.CLICK,
      goog.partial(app.showPage, 'HelpLauncher')
      );

  this.eh1.listen(
      goog.dom.getElement('tableTestLaunchId'),
      goog.events.EventType.CLICK,
      goog.partial(app.showPage, 'table')
      );
};

goog.inherits([%divId%]Web, PageHelper);

[%divId%]Web.prototype.disposeInternal = function(){
  goog.dispose(this.eh1);
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

};

App.dispatch['[%divId%]'] = function (){new [%divId%]Web();};
