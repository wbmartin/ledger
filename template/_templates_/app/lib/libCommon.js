goog.provide('app');

/**
*/
function start() {
	alert ("ok");
	var xhr = new goog.net.XhrIo();
	goog.events.listen(xhr, goog.net.EventType.COMPLETE, function(e) {
		var obj = this.getResponseJson();
		alert (obj['rows'][0]['session_id']);
	});
	var qd = {'spwfResource':'SECURITY_USER','spwfAction':'AUTHENTICATE','user_id':'ledger','password':'ledger' }
	xhr.send('./cgi-bin/server.pl','POST',goog.json.serialize(qd));

};

//prevent renaming 
goog.exportSymbol('start', start);
