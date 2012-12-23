[%divId="MainLauncher"%]
[%SRC_LOC="_mainLauncherWeb.js"%]

goog.provide('[%divId%]');
/**
 * SRC: [%SRC_LOC%]
 *
 */ 
[%divId%].show = function() {
  //app.standardShowPage('[%divId%]');
	app.hist.setToken('[%divId%]');
};
