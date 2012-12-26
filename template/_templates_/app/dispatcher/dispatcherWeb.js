goog.provide('app.dispatcher');
/**
 * @param {string} request_ the request to dispatch.
 *
 */
app.dispatcher = function(request_) {
	/** @type {goog.Uri} */
	var urlData = goog.Uri.parse(request_);
	/** @type string*/
	var key;
	/** @type {Object} */
	var qdObject = {};
	if (app.currentDisplayDivs.length === 0) {
		app.currentDisplayDivs.push('Login');
	}	
	if (app.GLOBAL.SESSION_ID === 'PENDING') {
		app.standardShowPage('Empty');
		return;
	}
	for (key in urlData.queryData_.getKeys()) {
		qdObject.key = urlData.queryData_.getValues(key);
	}

	switch (urlData.path_) {
		case '':  
			app.GLOBAL.TARGET_PAGE = 'MainLauncher';
			break;
		case 'MainLauncher': MainLauncher.show(qdObject); break;
		case 'AppLogger': AppLogger.show(qdObject); break;

	}


};
