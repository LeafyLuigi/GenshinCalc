// cookie stuff
var setCookie = (cookieName, value, days=365) => {
	// if days aren't set, default to a year.
	var d = days*24*60*60*1000;
	document.cookie = cookieName+"="+value+";max-age="+d+";path=/;samesite=strict";
}
var getCookie = (cookieName) => {
	var decoded = decodeURIComponent(document.cookie).split(";");
	for(var i = 0; i < decoded.length; i++) {
		var value = decoded[i];
		while (value.charAt(0) == " ") {
			value = value.substring(1);
		}
		if (value.indexOf(cookieName+"=") == 0) {
			return value.substring(cookieName.length + 1, value.length);
		}
	}
	return "";
}
var getCookies = () => {
	console.log("The cookies are: "+decodeURIComponent(document.cookie).split(";"));
}
var checkCookie = (cookieName) => {
	var cookieName = getCookie(cookieName);
	if(cookieName === "") {
		return "";
	} else {
		return cookieName;
	}
}
var clearCookie = (cookieName) => {
	setCookie(cookieName,0,0);
}
var clearCookies = () => {
	var cookies = decodeURIComponent(document.cookie).split(";");
	for(var i = 0; i < cookies.length; i++) {
		var value = cookies[i];
		while (value.charAt(0) == " ") {
			value = value.substring(1);
		}
		var key = value.split("=");
		setCookie(key[0],0,0);
	}
}

// local storage stuff
var setLSItem = (LSName, value) => {
	if (typeof(value) != "string") {
		console.error("Could not set "+LSName+" as the value was not a string.");
		return;
	}
	localStorage.setItem(LSName,value);
}
var getLSItem = (LSName) => {
	return localStorage.getItem(LSName);
}
var clearLSItem = (LSName) => {
	localStorage.removeItem(LSName);
}
var clearLS = () => {
	localStorage.clear();
}