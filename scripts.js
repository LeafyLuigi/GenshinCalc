'use strict';
// set vars
var showConvertsBool;

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
// Shift and CTRL/CMD for 10/100 stepping.
// Optional Shift+CTRL/CMD for 1000 stepping.
var adjustStep = (id,isWheel=false,allowThousands=false,noGet=false) => {
	const stepValues = [0,9,99,999]; // all one less to what the step value is.
	var shift = event.shiftKey;
	var ctrlCmd = event.ctrlKey, meta = event.metaKey;
	var step = get(id).step;
	if(step == "") {
		step = 1;
	}
	if(shift || ctrlCmd || meta) {
		var oldVal = val(id);
		if(navigator.userAgent.toLowerCase().indexOf("mac os") != -1) {
			ctrlCmd = meta;
		}
		var arrayIndex = Math.floor(0 + shift + 2*ctrlCmd);
		if(!allowThousands && arrayIndex == 3) {
			arrayIndex = 2;
		}
		if(!isWheel) {
			if(event.key == "ArrowUp") {
				setVal(id,(oldVal+(step*stepValues[arrayIndex])),noGet);
			}
			if(event.key == "ArrowDown") {
				setVal(id,(oldVal-(step*stepValues[arrayIndex])),noGet);
			}
		} else {
			if(event.deltaY < 0) {
				setVal(id,(oldVal+(step*stepValues[arrayIndex])),noGet);
			}
			if(event.deltaY > 0) {
				setVal(id,(oldVal-(step*stepValues[arrayIndex])),noGet);
			}
		}
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
var parseHTMLSafe = (string) => {
	return string.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}
var parseHTMLUnsafe = (string) => {
	return string.replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">");
}

// Pick Character
var pickChar = (choice,travType=null) => {
	if(choice.indexOf(" Traveler") != -1) {
		choice = "Traveler";
		get("dropdownCharName").value = chars["Traveler"].regions[travType].type+" "+choice;
	} else {
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
// Items can also be manually sorted within groups in the itemdb.js file
const typeOrder = ["local","exp","commonElite","weeklyBoss","boss","gem","books","crown","weaponAsc","other"];
const intraTypeOrder = ["group","rarity","count"]; // "Group" is arbitrary and until multiple inputs are added, will be skipped.
var orderItems = (items) => {
	// var index = items.map(i => i.name);
	if(items.length == 1) return items;

	items.sort((a,b) => {
		var aType, bType;
		
		// "Mora" is placed first
		if(a == "Mora") return -1;
		if(b == "Mora") return 1;

		var aItem = itemDB[a];
		var bItem = itemDB[b];
		
		// skip undefined items
		if(aItem === undefined || bItem === undefined) {
			console.log(aItem,bItem, "FUCK")
		};

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
	const validSizes = ["micro","tiny","mini","small","normal","big"];
	const pixels = [36, 56, 72, 96, 112, 256];
	// const raritySizes = [8, 12, 15, 20, 24, 55];
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
	if(fallback != item) {
		console.warn("[MakeItemIcon] Fallback doesn't match item.");
	}
	if(type=="crown") {type="other";} // crown item is placed in "other" directory
	html += makeImg("images/"+type+"/"+img+".png",pixels[validSizes.indexOf(size)],pixels[validSizes.indexOf(size)],["itemIconImg"],fallback!=item?{"data-fallback":fallback}:{})
	if(rarity != undefined && rarity != 0) html += "<img loading=\"lazy\" draggable=\"false\" class=\"rarityIcon extraIcon\" src=\"images/icons/rarity/"+rarity+".png\">"; // height is set in css
	html +="<span class=\"itemCount\">"+count+"</span></div>";
	html +="<div class=\"itemName\">"+item+"</div></div>";
	return html;
}

var makeImg = (src,width=undefined,height=undefined,classList=[],otherProperties={},draggable=false,lazyLoading=true,useHTML=true) => {
	if(typeof(src) !== "string") {
		console.error("src must be a string. aborting");
		return;
	}
	let elem = Object.assign(document.createElement("img"));
	elem.src = src;
	elem.height = height !== undefined && Number.isInteger(height) ? height : 16;
	elem.width = width !== undefined && Number.isInteger(width) ? width : 0;
	if(JSON.stringify(classList) != "[]" && Array.isArray(classList)) elem.classList = classList.join(" ");
	elem.draggable = draggable;
	if(lazyLoading) elem.loading = "lazy";
	for(let i in Object.keys(otherProperties)) {
		let key = Object.keys(otherProperties)[i];
		elem.setAttribute(key,otherProperties[key]);
	}
	if(useHTML) return elem.outerHTML;
	return elem;
}