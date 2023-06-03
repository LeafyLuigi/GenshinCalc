// cookie stuff
var setCookie = (_name, _value, _days=365) => {
	// if days aren't set, default to a year.
	var d = _days*24*60*60*1000;
	document.cookie = _name+"="+_value+";max-age="+d+";path=/;samesite=strict";
}
var getCookie = (_name) => {
	var _decoded = decodeURIComponent(document.cookie).split(";");
	for(var _i = 0; _i < _decoded.length; _i++) {
		var _value = _decoded[_i];
		while (_value.charAt(0) == " ") {
			_value = _value.substring(1);
		}
		if (_value.indexOf(_name+"=") == 0) {
			return _value.substring(_name.length + 1, _value.length);
		}
	}
	return "";
}
var getCookies = () => {
	console.log("The cookies are: "+decodeURIComponent(document.cookie).split(";"));
}
var checkCookie = (_name) => {
	var _cookie = getCookie(_name);
	if(_cookie === "") {
		return "";
	} else {
		return _cookie;
	}
}
var clearCookie = (_name) => {
	setCookie(_name,0,0);
}
var clearCookies = () => {
	var _cookies = decodeURIComponent(document.cookie).split(";");
	for(var _i = 0; _i < _cookies.length; _i++) {
		var _value = _cookies[_i];
		while (_value.charAt(0) == " ") {
			_value = _value.substring(1);
		}
		var _key = _value.split("=");
		setCookie(_key[0],0,0);
	}
}

// local storage stuff
var setLSItem = (_name, _value) => {
	if (typeof(_value) != "string") {
		console.error("Could not set "+_name+" as the value was not a string.");
		return;
	}
	localStorage.setItem(_name,_value);
}
var getLSItem = (_name) => {
	return localStorage.getItem(_name);
}
var clearLSItem = (_name) => {
	localStorage.removeItem(_name);
}
var clearLS = () => {
	localStorage.clear();
}