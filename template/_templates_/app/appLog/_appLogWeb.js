[%divId="AppLogger"%]
[%SRC_LOC = 'appLogWeb.js'%]
goog.provide('[%divId%]Web');
goog.require('app.[%divId%].view');
goog.exportSymbol('app.[%divId%].view.getPrimary', app.[%divId%].view.getPrimary);
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
goog.exportSymbol('[%divId%]Web.init', [%divId%]Web.init);
