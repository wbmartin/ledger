[%SRC_LOC = 'master.js'%]
goog.provide('app.init');
/**
 * SRC: [%SRC_LOC%]
 *
 */
app.init = function () {
  app.initLogger();
LoginWeb.init();
AppLoggerWeb.init();
MainLauncherWeb.init();
app.initHistory();

}
