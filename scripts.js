'use strict';
// set vars
var travelerType, neededItemsForAscTal, travelerAscensionDone = false;
var showConvertsBool;

// stuff on main and inv pages
var toggleLimitedItems = () => {
	document.getElementsByTagName("body")[0].classList.toggle("hideLimited");
}
var toggleExtraIcons = () => {
	document.getElementsByTagName("body")[0].classList.toggle("hideExtraIcons");
}

// shorthands
var get = (id) => {
	return document.getElementById(id);
}
var getByClass = (className) => {
	return document.getElementsByClassName(className);
}
var getOnlyClass = (className = "") => {
	if(className.indexOf(" ") != -1) {
		console.error("getOnlyClass cannot be used with multiple classes.");
	}
	var allElementsWithClass = getByClass(className);
	var elementsWithOnlyClass = [];
	for (var i = 0; i < allElementsWithClass.length; i++) {
		if(allElementsWithClass[i].className == className) elementsWithOnlyClass[elementsWithOnlyClass.length] = allElementsWithClass[i];
	}
	return elementsWithOnlyClass;
}
var getByName = (nameName) => {
	return document.getElementsByName(nameName);
}
var getAllByAttribute = (attribute) => {
	return document.querySelectorAll("["+attribute+"]");
}
var toggleClass = (element, className) => {
	element.classList.toggle(className);
}
var val = (id,noGet=false,fallback=null) => {
	if(!noGet) {
		id = get(id);
		if (id == null) {
			// it'll return null by default as a fallback
			return fallback;
		}
	}
	if(id.getAttribute("type") == "number") {
		var value = id.value;
		if(id.max != "" && value > Math.floor(id.max)) value = id.max;
		if(id.min != "" && value < Math.floor(id.min)) value = id.min;
		return Math.floor(value);
	} else if(id.getAttribute("type") == "checkbox") {
		return id.checked;
	} else if(id.getAttribute("type") == "text") {
		return id.value;
	}
}
var setVal = (id,val,noGet=false) => {
	if(!noGet) {
		id = get(id);
		if(id==null) {
			console.error("id error.");
			return;
		}
	}
	if(id.getAttribute("type") == "number") {
		var value = val;
		if(id.max != "" && value > Math.floor(id.max)) value = id.max;
		if(id.min != "" && value < Math.floor(id.min)) value = id.min;
		id.value = value;
		return;
	}
	if(id.getAttribute("type") == "checkbox" && (val === true || val === false)) {
		id.checked = val;
		return;
	}
}

// regex stuff
var spaceToUnderscore = (string) => {
	return string.replace(/[ ]+/g, '_');
}
var underscoreToSpace = (string) => {
	return string.replace(/[_]+/g, ' ');
}
var removeQuotes = (string) => {
	return string.replace(/['"]+/g, "");
}

// Pick Character
var pickChar = (choice,travType=null) => {
	if(choice.indexOf("Traveler") != -1) {
		choice = "Traveler";
		travelerType = chars["Traveler"].regions[travType].type;
		get("dropdownCharName").value = travelerType+" "+choice;
	} else {
		travelerType = undefined;
		get("dropdownCharName").value = choice;
	}
	get("dropdownCharIcon").setAttribute("src","images/char/"+spaceToUnderscore(choice)+".png");
}
var pickWeapon = (choice, rarity) => {
	get("dropdownWeaponName").value = choice;
	choice = removeQuotes(choice);
	get("dropdownWeaponName").setAttribute("rarity",rarity);
	get("dropdownWeaponIcon").setAttribute("src","images/weapon/"+spaceToUnderscore(choice)+".png");
}

// item list
var items = {};
var addItem = (item,count,variable=items) => {
	if(variable == {} || variable[item] == undefined) {
		variable[item] = count;
	} else {
		variable[item] += count;
	}
	return variable;
}
var removeItem = (item,del=true,variable=items) => {
	if(variable[item] == undefined) return;
	if(del) {
		delete variable[item];
	} else {
		variable[i] = 0;
	}
	return variable;
}
var removeEmptyItems = (variable,removeBelowZero=true) => {
	if(removeBelowZero) {
		for (var i in variable) {
			if(variable[i] <= 0) delete variable[i];
		}
	} else {
		for (var i in variable) {
			if(variable[i] == 0) delete variable[i];
		}
	}
	return variable;
}
var mergeItems = (firstList,secondList,deleteZeroOrLess=false) => {
	var mergedList = secondList;
	for (var i in firstList) {
		if(mergedList[i] == undefined) {
			mergedList[i] = firstList[i];
		} else {
			mergedList[i] += firstList[i];
		}
	}
	if(deleteZeroOrLess) {
		removeEmptyItems(mergedList,false);
	}
	return mergedList;
}
// Items can also be manually sorted in the itemdb.js file
const typeOrder = ["local","charExp","commonElite","weeklyBoss","boss","gem","books","crown","weaponAsc","other"];
const intraTypeOrder = ["group","rarity","count"]; // "Group" is arbitrary and until multiple inputs are added, will be skipped.
var orderItems = (items) => {
	// var index = items.map(i => i.name);
	items.sort((a,b) => {
		var aType, bType;
		if(a == "Mora") return -1;
		if(b == "Mora") return 1;
		// "Mora" is placed first
		var aItem = itemDB[a];
		var bItem = itemDB[b];
		if(aItem.type == "common" || aItem.type == "elite") {
			aType = typeOrder.indexOf("commonElite");
		} else {
			aType = typeOrder.indexOf(aItem.type);
		}
		if(bItem.type == "common" || bItem.type == "elite") {
			bType = typeOrder.indexOf("commonElite");
		} else {
			bType = typeOrder.indexOf(bItem.type);
		}
		if(aType != bType) return aType - bType;
		// arbitrary group stuff here~
		if(aItem.group != undefined && bItem.group != undefined) {
			if(itemGroupDB[aItem.group].priority - itemGroupDB[bItem.group].priority != 0) return itemGroupDB[aItem.group].priority - itemGroupDB[bItem.group].priority;
		}
		//
		if(aItem.rarity != bItem.rarity) return bItem.rarity - aItem.rarity;
		// if(a.count - b.count != 0) return a.count - b.count;

		return 0;
	})
}

// Quick and dirty icon creator for items
// mainly used for adding to $element.innerHTML
var makeItemIcon = (item,count=1,rarity=-1,size="mini",showSource=false,forceType=null) => {
	var fallback = item;
	var validSizes = ["micro","tiny","mini","small","normal","big"];
	var pixels = [36, 56, 72, 96, 112, 256];
	// var raritySizes = [8, 12, 15, 20, 24, 55];
	if (validSizes.indexOf(size) == -1) {
		console.warn("Invalid size used. Using default (\"mini\"). Valid sizes: "+validSizes);
		size = "mini";
	}
	var type, img, html="";
	if(itemDB[item] == undefined) {
		console.warn("\""+item+"\" not found in itemsdb.js; using fallback.");
		item = "Unknown";
		type = "icons";
		img = "itemFallback";
	} else {
		if(forceType == null) {
			type = itemDB[item].type;
		} else {
			type = forceType;
		}
		img = spaceToUnderscore(item);
		if(rarity == -1) rarity = itemDB[item].rarity;
	}
	html = "<div class=\"itemIconContainer ";
	if(size == "micro" || size == "tiny" || size == "mini" || size == "small" || size == "normal") html+=size;
	html += "\"><div class=\"itemIcon";
	if(rarity != undefined && rarity != 0) html+= " rarity-"+rarity;
	html += "\">";
	if(showSource && itemDB[item].source != undefined) {
		html += "<img draggable=\"false\" loading='lazy' onclick=\"toggleClass(this,'active')\" class=\"itemSource\" src=\"images/icons/info.svg\" width=\"20\" height=\"20\"><div class=\"itemSourceTooltip\">"+itemDB[item].source+"</div>";
	}
	html +="<img loading='lazy'";
	if(fallback != item) {
		html+=" fallback=\""+fallback+"\"";
		console.warn("[MakeItemIcon] Fallback doesn't match item.")
	}
	html +=" draggable=\"false\" class=\"itemIconImg\" src=\"images/"+type+"/"+img+".png\" width=\""+pixels[validSizes.indexOf(size)]+"\" height=\""+pixels[validSizes.indexOf(size)]+"\">";
	if(rarity != undefined && rarity != 0) html += "<img loading=\"lazy\" draggable=\"false\" class=\"rarityIcon extraIcon\" src=\"images/icons/rarity/"+rarity+".png\">"; // height is set in css
	html +="<span class=\"itemCount\">"+count+"</span></div>";
	html +="<div class=\"itemName\">"+item+"</div></div>";
	return html;
}