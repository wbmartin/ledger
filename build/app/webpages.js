// This file was automatically generated from webpages.soy.
// Please don't edit this file by hand.

if (typeof app == 'undefined') { var app = {}; }
if (typeof app.pages == 'undefined') { app.pages = {}; }


app.pages.Login = function(opt_data, opt_ignored) {
  return '<!--Begin LoginPortal--><div id="LoginDivId"  class="displayOnLoad"><form id="LoginForm" action=""><div class="formLayout_Standard prettyWrapper" style="width:30em;"><h1>Login</h1><span class="small" >Please enter your login credentials</span><hr/><div class="formFieldGroup" id="LoginForm-user_idDivId"><label for ="LoginForm-user_id" style="display:inline-block;width:7em;" id="LoginFormLabel-user_id">User ID</label><input type="text" style="width:15em" name="user_id" id="LoginForm-user_id" class="VALIDATErequired"/><span class="ValidationMsg" style="width:0em" id="LoginFormLabel-userIdError"></span></div><div class="formFieldGroup" id="LoginForm-passwordDivId"><label for ="LoginForm-password" style="display:inline-block;width:7em;" id="LoginFormLabel-password">Password</label><input type="password" style="width:15em" name="password" id="LoginForm-password" class="VALIDATErequired"/><span class="ValidationMsg" style="width:0em" id="LoginFormLabel-passwordError"></span></div><div class="text/cssformFieldGroup" id="LoginForm-password_reset_codeDivId" style="display:none">text/css<label for ="LoginForm-password_reset_code" style="display:inline-block;width:7em;" id="LoginFormLabel-password_reset_code">Reset Code</label>text/css<input type="text" style="width:15em" name="password_reset_code" id="LoginForm-password_reset_code" class=""/><span class="ValidationMsg" style="width:0em" id="LoginFormLabel-passwordResetCodeError"></span></div><div class="formButtons"><button type="button"  id="cmdlogin" class=""  onclick="loginCall(\'authenticate\')" > <span class="">Login</span> </button><button type="button"  id="cmdOneTimelogin" class=" " style="display:none;"  onclick="loginCall(\'one_time\')" ><span class=""> One Time Login</span> </button></div><label for="trustedDeviceId" style="display:inline-block;">Trusted Device:</label><input type="checkbox" id="LoginForm-trustedDeviceId"/></div></form><a href="" onclick="LoginWeb.start(); return false;">test</a></div>';
};


app.pages.AppLogger = function(opt_data, opt_ignored) {
  return '<div id="AppLoggerDivId" class="LogicalHide"><fieldset class="goog-debug-panel"><legend>Event Log</legend><div id="loggerConsole"></div></fieldset></div>';
};


app.pages.MainLauncher = function(opt_data, opt_ignored) {
  return '<div id="MainLauncherDivId" class="LogicalHide"><div id ="MainLauncherCenterDiv" ><div class="row"><h1 id="MainLauncherTitle" class="pageTitle" >I want to&hellip;</h1></div><div class="row"><div class="twocol largeIconSpan" id="launcherShowGetHelpSpanId"><a id="launcherShowHelp" onclick="app.showPage(\'AppLogger\');"><span class="sprite64Icon helpIcon">&nbsp;</span><br/>Get Help</a></div><div class="twocol largeIconSpan" id="launcherShowAccessGroupsSpanId"><a id="launcherShowSecurityAccessGroups" onclick=""><span class="sprite64Icon keyIcon">&nbsp;</span><br/>Access Groups</a></div><div class="twocol last largeIconSpan" id="launcherShowSecurityUserSpanId"><a id="launcherShowSecurityUserId" onclick=""><span class="sprite64Icon keyManIcon">&nbsp;</span><br/>Application Users</a></div><div class="twocol last largeIconSpan" id="launcherShowChangeOwnPasswordSpanId"><a id="launcherShowChangePassword" onclick=""><span class="sprite64Icon lockIcon">&nbsp;</span><br/>Change My Password</a></div></div></div></div>';
};
