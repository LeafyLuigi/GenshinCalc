'use strict';
// shorthands
function get(id,option=null) {
	// an ID is used by default. "option" will change the functionality of this.
	// "option" has the following valid values:
	// null - the ID is an ID. Default.
	// "class" - the ID field will be a class name instead.
	// "onlyClass" - the ID field will use a class name and filter out all elements that don't have just the class as the class list.
	// "name" - the ID field will use the name attribute instead.
	if(typeof(id) !== "string") {
		throw new Error("[get] The \"ID\" field was not a string.");
	}
	switch (option) {
		case null:
			return document.getElementById(id);
		case "class":
			return document.getElementsByClassName(id);
		case "onlyClass":
			if(id.indexOf(" ") != -1) {
				throw new Error("Using \"onlyClass\" with multiple classes is not supported.");
			}
			let allElementsWithClass = get(id,"class");
			let elementsWithOnlyClass = [];
			for (let i = 0; i < allElementsWithClass.length; i++) {
				if(allElementsWithClass[i].className === id) elementsWithOnlyClass[elementsWithOnlyClass.length] = allElementsWithClass[i];
			}
			return elementsWithOnlyClass;
		case "name":
			return document.getElementsByName(id);
		default:
			throw new Error("An unknown option was used.");
	}
}
function toggleClass(element, className) {
	element.classList.toggle(className);
}

// Placement of HTML Elements is not done within this function.
function makeElem(tag,textContent=undefined,classList=[]) {
	// Optional textContent that puts text at the START of the element.
	// Optional classList for a list of classes. can be a space-separated string list or an array
	if(tag === undefined && typeof(textContent) === "string") {
		return document.createTextNode(textContent);
	} else if(typeof(tag) !== "string") {
		throw new Error("[makeElem] \"tag\" was not a string.");
	}
	if(textContent !== undefined && typeof(textContent) !== "string" && typeof(textContent) !== "number") {
		console.warn("[makeElem] textContent was not a string or a number. textContent will not be set.");
	}
	try {
		let elem = Object.assign(document.createElement(tag));
		if(typeof(textContent) === "number") {
			textContent += "";
		}
		if(typeof(textContent) === "string") {
			elem.textContent = textContent;
		}
		if(typeof(classList) === "object" && Array.isArray(classList)) {
			if(JSON.stringify(classList) !== "[]") {
				for(let i in classList) {
					elem.classList.add(classList[i]);
				}
			}
		} else if(typeof(classList) === "string") {
			classList = classList.split(" ");
			for(let i in classList) {
				elem.classList.add(classList[i]);
			}
		} else {
			console.warn("[makeElem] classList was not valid. The element will not have any classes on it.")
		}
		return elem;
	}
	catch {
		throw new Error("[makeElem] An invalid HTML tag was used.");
	}
}
// More specialised element makers
function makeLabelElem (contents="",forAttribute="",classes=[]) {
	var elem = makeElem("label",contents,classes);
	elem.setAttribute("for",forAttribute);
	return elem;
}
function makeNumberInputElem (id,value=0,min,max,size="3",classes=[]) {
	var elem = makeElem("input",undefined,classes);
	elem.type = "number";
	if(id !== undefined) {
		elem.id = id;
		elem.setAttribute("name",id);
	}
	elem.value = value;
	if(min !== undefined) {
		elem.min = min;
	}
	if(max !== undefined) {
		elem.max = max;
	}
	elem.size = size;
	return elem;
}

var val = (id,noGet=false,fallback=null) => {
	// use noGet=true to skip finding an element with get(). This is useful when `id` is an element rather than a string.
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
			throw new Error("ID should not be null.");
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
		get("dropdownCharName").value = charDB["Traveler"].regions[travType].type+" "+choice;
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
var requiredToggleItems = {}
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
function makeItemIcon (item,count=1,rarity=-1,size="mini",showSource=false,forcedValues=false) {
	var fallback = item;
	const validSizes = ["micro","tiny","mini","small","normal","big"];
	const pixels = [36, 56, 72, 96, 112, 256];
	// const raritySizes = [8, 12, 15, 20, 24, 55];
	if (validSizes.indexOf(size) == -1) {
		console.warn("Invalid size used. Using default (\"mini\"). Valid sizes: "+validSizes);
		size = "mini";
	}

	var type, img;
	// var html="";

	if(itemDB[item] == undefined) {
		if(!forcedValues) {
			console.warn("\""+item+"\" not found in itemsdb.js; using fallback.");
			item = "Unknown";
			type = "icons";
			img = "itemFallback";
		} else {
			// They're just Weekly Drops and Gems.
			type = "itemGroups";
			img = spaceToUnderscore(item);
			const gemSuffix = ["Sliver", "Fragment", "Chunk", "Gemstone"];
			if(item.indexOf("Gem") != -1) {
				var i = Math.floor(item.slice(-1));
				rarity = i+2;
				item = gemSuffix[i]
			} else {
				item += " Drop";
				rarity = 5;
			}
		}
	} else {
		type = itemDB[item].type;
		img = spaceToUnderscore(item);
		if(rarity == -1) rarity = itemDB[item].rarity;
	}
	// html = "<div class=\"itemIconContainer ";
	var itemElem = makeElem("div",undefined,"itemIconContainer");
	if(size == "micro" || size == "tiny" || size == "mini" || size == "small" || size == "normal") {
		itemElem.classList.add(size);
	}
	// html += "\">;
	// html += "<div class=\"itemIcon";
	var itemIconElem = makeElem("div",undefined,"itemIcon");
	if(rarity != undefined && rarity != 0) {
		itemIconElem.classList.add("rarity-"+rarity);
		// html+= " rarity-"+rarity;
	}
	// html += "\">";
	if(showSource && itemDB[item].source != undefined) {
		var showSrcImg = makeImg("images/icons/info.svg",20,20,["itemSource"]);
		showSrcImg.addEventListener("click",function(e){
			toggleClass(e.currentTarget,"active");
		})
		itemIconElem.appendChild(showSrcImg);
		itemIconElem.appendChild(makeElem("div",itemDB[item].source,"itemSourceTooltip"));
		// html += "<img draggable=\"false\" loading='lazy' onclick=\"toggleClass(this,'active')\" class=\"itemSource\" src=\"images/icons/info.svg\" width=\"20\" height=\"20\">";
		// html += "<div class=\"itemSourceTooltip\">"+itemDB[item].source+"</div>";
	}
	if(!forcedValues && fallback != item) {
		console.warn("[MakeItemIcon] Fallback doesn't match item.");
	}
	if(type=="crown") {type="other";} // crown item is placed in "other" directory

	itemIconElem.appendChild(makeImg("images/"+type+"/"+img+".png",pixels[validSizes.indexOf(size)],pixels[validSizes.indexOf(size)],["itemIconImg"],fallback!=item?{"data-fallback":fallback}:{}));

	// html += makeImg("images/"+type+"/"+img+".png",pixels[validSizes.indexOf(size)],pixels[validSizes.indexOf(size)],["itemIconImg"],fallback!=item?{"data-fallback":fallback}:{})

	if(rarity != undefined && rarity != 0) {
		itemIconElem.appendChild(makeImg("images/icons/rarity/"+rarity+".png","unset","unset",["rarityIcon","extraIcon"])); // height is set in css

		// html += "<img loading=\"lazy\" draggable=\"false\" class=\"rarityIcon extraIcon\" src=\"images/icons/rarity/"+rarity+".png\">"; 
	}
	
	// html +="<span class=\"itemCount\">"+count+"</span></div>";
	if(typeof(count) === "string") {
		itemIconElem.appendChild(makeElem("div",count,"itemCount"));
	} else if(typeof(count) === "object") {
		try {
			itemIconElem.appendChild(count);
		}
		catch {
			console.warn("[MakeItemIcon] Cannot append count as it is not a valid HTML element.");
		}
	} else {
		// console.log(typeof(count));
		console.warn("[MakeItemIcon] Cannot append count to element.")
	}
	itemElem.appendChild(itemIconElem);

	var itemNameElem = makeElem("div",item,"itemName");
	itemElem.appendChild(itemNameElem)
	// html +="<div class=\"itemName\">"+item+"</div></div>";

	// return html;

	return itemElem;
}

function makeImg(src,width=undefined,height=undefined,classList=[],otherProperties={},draggable=false,lazyLoading=true,useHTML=false) {
	if(typeof(src) !== "string") {
		throw new Error("src must be a string.");
	}
	let elem = makeElem("img");
	elem.src = src;
	if(height !== "unset") elem.height = height !== undefined && Number.isInteger(height) ? height : 16;
	if(width !== "unset") elem.width = width !== undefined && Number.isInteger(width) ? width : 0;
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