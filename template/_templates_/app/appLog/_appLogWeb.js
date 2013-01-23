[%divId="AppLogger"%]
[%SRC_LOC = 'appLogWeb.js'%]
goog.provide('[%divId%]Web');
goog.require('AppLogger.view');

/**
 * SRC: [%SRC_LOC%]
 * @constructor
 */
[%divId%]Web = function() {
  this.logger_.finest('[%f%] called: ' );
  goog.dom.classes.remove(
      goog.dom.getElement('LoggerConsoleDivId'),
      'LogicalHide'
      );
  this.logger_.setLevel(App.GLOBAL.LOG_LEVEL);
  this.logger_.info('Initialized');
  [%divId%]Web.divId = '[%divId%]';


};

/**
 * A reference to the  logger
 * @type {goog.debug.Logger}
 * @private
 */
[%divId%]Web.prototype.logger_ = goog.debug.Logger.getLogger('[%divId%]');
  App.dispatch['[%divId%]'] = function() { new [%divId%]Web()};

