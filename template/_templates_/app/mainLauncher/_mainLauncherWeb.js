[%divId="MainLauncher"%]
[%SRC_LOC="_mainLauncherWeb.js"%]

goog.provide('[%divId%]');
/**
 * SRC: [%SRC_LOC%]
 * @param {Object} args_ the args to pass to the show function.
 *
 */ 
[%divId%].show = function(args_) {
  app.standardShowPage('[%divId%]');
};
