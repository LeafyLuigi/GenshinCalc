// Inventory stuff
var saveInventory = () => {
	var userInvInputs = getByClass("userInvInput");
	var userItems = "";
	var inv = loadInventory();
	var tested = [];
	for(var i = 0; i < userInvInputs.length; i++) {
		if(val(userInvInputs[i].id) == 0) continue;
		tested[tested.length] = underscoreToSpace(userInvInputs[i].id.slice(13));
		userItems += "\""+underscoreToSpace(userInvInputs[i].id.slice(13))+"\":"+val(userInvInputs[i].id)+",";
	}
	// console.log(tested);
	for(var i in inv) {
		if(tested.indexOf(i) != -1) continue;
		userItems += "\""+i+"\":"+inv[i]+",";
	}
	userItems = "{"+userItems.slice(0,-1)+"}";
	// console.log(userItems)
	// console.log("inv length: "+userItems.length)
	if(userItems == "{}") return;
	setLSItem("inv",encodeURIComponent(userItems));
}
var loadInventory = () => {
	try {
		var inv = JSON.parse(decodeURIComponent(getLSItem("inv")));
	}
	catch {
		console.warn("Inventory was corrupted; returning empty string.")
		return "";
	}
	return inv;
}
var wasInvCleared = false, clearInvDoConfirm = false;
var clearInventory = () => {
	if(!clearInvDoConfirm) {
		get("clearinvbutton").innerText = "Confirm?";
		clearInvDoConfirm = true;
		window.setTimeout(function(){if(!wasInvCleared){get("clearinvbutton").innerText = "Clear Inventory";clearInvDoConfirm = false}},5000)
	} else {
		get("clearinvbutton").innerText = "Your inventory was cleared";
		clearInvDoConfirm = false;
		clearLSItem("inv");
		wasInvCleared = true;
		window.setTimeout(function(){wasInvCleared = false;get("clearinvbutton").innerText = "Clear Inventory"},5000);
	}
}