var init = function() {
	app.setMainContent(Login.view.getPrimary());
	app.init();
	LoginWeb.init();
	goog.dom.getElement('LoginForm-user_id').value = 'ledger';
  goog.dom.getElement('LoginForm-password').value = 'ledger';

}

init();


