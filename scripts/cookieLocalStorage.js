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
	try {
		localStorage.setItem(LSName,value);
	}
	catch {
		console.error("localStorage is full. Nothing was set. This will very likely cause problems.");
	}
}
var updateLSItem = (LSName,key,newValue,mustExist=false) => {
	// You can use undefined to delete the key
	var item = parseLSItem(LSName,null);

	if(item !== null) {
		if(newValue === undefined) {
			delete item[key];
		} else {
			item[key] = newValue;
		}
		if(JSON.stringify(item) === "{}") {
			localStorage.removeItem(LSName);
		} else {
			setLSItem(LSName,JSON.stringify(item));
		}
		return;
	} else if(!mustExist) {
		item = new Object();
		item[key] = newValue;
		if(JSON.stringify(item) === "{}") {
			localStorage.removeItem(LSName);
		} else {
			setLSItem(LSName,JSON.stringify(item));
		}
		return;
	} else {
		console.error("The localStorage item \""+LSName+"\" could not be updated as the \"mustExist\" flag set is set to true and the item does not exist. Aborting.");
		return;
	}
}
var getLSItem = (LSName) => {
	return localStorage.getItem(LSName);
}
var clearLSItem = (LSName) => {
	localStorage.removeItem(LSName);
}
var parseLSItem = (LSNameToGet,fallback) => {
	// JSON.parse the localStorage item. Fallback is undefined by default.
	if(getLSItem(LSNameToGet) != undefined) {
		try {
			return JSON.parse(getLSItem(LSNameToGet));
		}
		catch {
			console.error("The localStorage item for \""+LSNameToGet+"\" could not be parsed. Some data may be lost. Returning fallback.");
		}
	}
	return fallback;
}
var clearLS = (sure=false) => {
	if(sure !== "true") {
		console.warn("Type clearLS(\"true\") to delete EVERYTHING in localStorage.");
		return;
	} else {
		localStorage.clear();
		return;
	}
}

var exportLS = () => {
	console.info("Below is the localStorage as a string.");
	console.log(JSON.stringify(localStorage));
}
var importLS = (sure=false,importData) => {
	var data;
	// deny import of null, bools and empty arrays/objects
	if(typeof(importData) == "string") {
		try {
			data = JSON.parse(importData);
		}
		catch {
			console.error("Could not parse import data. Aborting.");
			return;
		}
		if(importData === null || importData === true || importData === false || JSON.stringify(importData) === "[]" || JSON.stringify(importData) === "{}") return;
	} else {
		data = importData;
	}
	if(Array.isArray(data)) {
		console.error("Arrays are not allowed to be imported. Aborting.");
		return;
	}
	if(sure !== "true") {
		console.warn("Type importLS(\"true\",<data>) to import data. This WILL clear existing localStorage data.");
		return;
	} else {
		clearLS("true");
		// thanks stackoverflow q 13335967 ans 34816783
		Object.keys(data).forEach(function (k) {
			setLSItem(k, JSON.stringify(data[k]));
		});
		console.log("Your localStorage has been cleared and set to the imported data.");
	}
}