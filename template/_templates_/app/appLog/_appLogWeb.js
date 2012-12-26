[%divId="AppLogger"%]
[%SRC_LOC = 'appLogWeb.js'%]
goog.provide('[%divId%]');
/**
 * SRC: [%SRC_LOC%]
 * @param {Object} args_ rendering arguments.
 */
[%divId%].show = function(args_) {
	app.standardShowPage('[%divId%]');
};
//goog.exportSymbol('show[%divId%]', show[%divId%]);
