[%divId="AppLogger"%]
[%SRC_LOC = 'appLogWeb.js'%]
goog.provide('[%divId%]Web');
/**
 * SRC: [%SRC_LOC%]
 * @param {Object} args_ rendering arguments.
 */
[%f='show'%]
[%divId%]Web.[%f%] = function(args_) {
  if (LL.FINEST) {
    [%divId%]Web.logger.finest('[%f%] called: ' + goog.debug.expose(args_));
  }
  app.standardShowPage('[%divId%]');
};
/**
 * SRC:[%SRC_LOC%]
 *
 */
[%divId%]Web.init = function() {
  if (LL.ON) {
    [%divId%]Web.logger = goog.debug.Logger.getLogger('[%divId%]');
    [%divId%]Web.logger.setLevel(app.GLOBAL.LOG_LEVEL);
  }
  if (LL.INFO) [%divId%]Web.logger.info('Initialized');
  [%divId%]Web.divId = '[%divId%]';
  app.dispatch['[%divId%]'] = [%divId%]Web.show;
};
