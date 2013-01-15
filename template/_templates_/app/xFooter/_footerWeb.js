[%SRCLOC="footerWeb.js"%]
/**
 *SRC: [SRCLOC]
 */
var init = function() {
  LoginWeb.show(null);
  goog.dom.getElement('LoginForm-user_id').value = 'ledger';
  goog.dom.getElement('LoginForm-password').value = 'ledger';
};
init();
