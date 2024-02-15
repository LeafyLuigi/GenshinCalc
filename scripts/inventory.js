// Inventory stuff
function saveInventory() {
	var userInvInputs = get("userInvInput","class");
	var userItems = "";
	var inv = parseLSItem("inv","");
	var tested = [];
	for(var i = 0; i < userInvInputs.length; i++) {
		if(inv === null) {
			inv = {};
		}
		if(val(userInvInputs[i].id) === 0 && inv[underscoreToSpace(userInvInputs[i].id.slice(13))] === undefined) continue;
		tested[tested.length] = underscoreToSpace(userInvInputs[i].id.slice(13));
		if(val(userInvInputs[i].id) === 0) continue;
		userItems += "\""+underscoreToSpace(userInvInputs[i].id.slice(13))+"\":"+val(userInvInputs[i].id)+",";
	}
	for(var i in inv) {
		if(tested.indexOf(i) !== -1) continue;
		if(inv[i] == 0) {
			delete inv[i];
			continue;
		}
		userItems += "\""+i+"\":"+inv[i]+",";
	}
	userItems = "{"+userItems.slice(0,-1)+"}";
	if(userItems === "{}") {
		clearLSItem("inv");
	} else {
		setLSItem("inv",userItems);
	}
}
var wasInvCleared = false, clearInvDoConfirm = false;
function clearInventory() {
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