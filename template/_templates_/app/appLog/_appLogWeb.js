[%divId="AppLogger"%]
[%SRC_LOC = 'appLogWeb.js'%]
/*
 * SRC: [%SRC_LOC%]
 *
 */

function show[%divId%]() {
	app.hist.setToken('[%divId%]');
	   
	}
goog.exportSymbol('show[%divId%]', show[%divId%]);
