[%divId="MainLauncher"%]
[%SRC_LOC="_mainLauncherWeb.js"%]

goog.provide('[%divId%]Web');
/**
 * SRC: [%SRC_LOC%]
 * @param {Object} args_ the args to pass to the show function.
 *
 */
[%divId%]Web.show = function(args_) {
  //app.standardShowPage('[%divId%]');
  app.setMainContent(MainLauncher.view.getPrimary(null, null));
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

  app.dispatch['[%divId%]'] = [%divId%]Web.show;
};
[%divId%]Web.init();
