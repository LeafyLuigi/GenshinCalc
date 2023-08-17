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
	}
	if(id.getAttribute("type") == "checkbox") return id.checked;
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
const typeOrder = ["local","charExp","common","elite","gem","books","weaponAsc","boss","weeklyBoss","other"];
const intraTypeOrder = ["group","rarity","count"]; // "Group" is arbitrary and until multiple inputs are added, will be skipped.
var orderItems = (items) => {
	// var index = items.map(i => i.name);
	items.sort((a,b) => {
		if(a == "Mora") return -1;
		if(b == "Mora") return 1;
		// "Mora" is placed first
		var aItem = itemDB[a];
		var bItem = itemDB[b];
		var aType = typeOrder.indexOf(aItem.type);
		var bType = typeOrder.indexOf(bItem.type);
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
		console.warn("Invalid size used. Using default (\"mini\"). Valid sizes: "+validSizes)
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
	html = "<div class=\"itemIconContainer "
	if(size == "micro" || size == "tiny" || size == "mini" || size == "small" || size == "normal") html+=size;
	html += "\"><div class=\"itemIcon"
	if(rarity != undefined && rarity != 0) html+= " rarity-"+rarity;
	html += "\">";
	if(showSource && itemDB[item].source != undefined) {
		html += "<img loading='lazy' onclick=\"toggleClass(this,'active')\" class=\"itemSource\" src=\"images/icons/info.svg\" width=\"20\" height=\"20\"><div class=\"itemSourceTooltip\">"+itemDB[item].source+"</div>"
	}
	html +="<img loading='lazy'";
	if(fallback != item) {html+="fallback=\""+fallback+"\" "; console.warn("[MakeItemIcon] Fallback doesn't match item.")}
	html +="class=\"itemIconImg\" src=\"images/"+type+"/"+img+".png\" width=\""+pixels[validSizes.indexOf(size)]+"\" height=\""+pixels[validSizes.indexOf(size)]+"\">";
	if(rarity != undefined && rarity != 0) html += "<img loading=\"lazy\" class=\"rarityIcon extraIcon\" src=\"images/icons/rarity/"+rarity+".png\">"; // height is set in css
	html +="<span class=\"itemCount\">"+count+"</span></div>";
	html +="<div class=\"itemName\">"+item+"</div></div>";
	return html;
}

var test = () => {
	if(ids.length == 0) return;
	resetItemLists();
	for (var perID in ids) {
		var html = "";
		var id = ids[perID].id;
		var boxType = ids[perID].type;
		if(boxType == "char") {
			var selectedCharacter = "";
			selectedCharacter = get(id).children[0].children[0].innerText;
			var charName = selectedCharacter;
			var travelerType = undefined
			if(get(id).hasAttribute("travtype")) {
				selectedCharacter = "Traveler";
				travelerType = get(id).getAttribute("travtype")
			}
			var charStats = [val(id+"-charLvl"),val(id+"-asc"), val(id+"-tal1"), val(id+"-tal2"), val(id+"-tal3")];
			var targets = [val(id+"-targetCharLvl"),val(id+"-targetAsc"),val(id+"-targetTal1"),val(id+"-targetTal2"),val(id+"-targetTal3")];
			if(JSON.stringify(charStats) == JSON.stringify(targets)) {
				get(id+"-charOutput").innerHTML = "<div class=\"boxTitle\">You don't need anything for "+selectedCharacter+".</div>"
				continue;
			}
			const order = [charLevelValues,ascValues,talValues,talValues,talValues];
			var charData, charSet = false;
			var skip;
			var charItems = {};
			var offset = 0;
			var extraExpNeeded = [];

			const valueNames = ["","ascension", "normal attack", "skill", "burst"];
			const gemSuffix = [" Sliver", " Fragment", " Chunk", " Gemstone"];
			const booksPrefix = ["Teachings of ", "Guide to ", "Philosophies of "];

			
			for (var i = 0; i < 5; i++) {
				skip = false;
				if(i == 1 && travelerAscensionDone && selectedCharacter == "Traveler") continue;
				if(charStats[i] >= targets[i]) continue;
				if(i > 2 && charStats[i] == charStats[i-1] && targets[i] == targets[i-1]) skip = true;
				if(!charSet) {
					if(i == 0 || selectedCharacter != "Traveler") {
						charData = chars[selectedCharacter];
						if(selectedCharacter != "Traveler") charSet = true;
					} else {
						charData = chars[selectedCharacter].regions[travelerType];
						charData["gem"] = chars[selectedCharacter].gem; // something was throwing errors :)
						charSet = true;
					}
				}
				if(i == 1) {offset = 1} else {offset = 0}
				if(!skip) neededItemsForAscTal = {};
				if(i == 0) {
				// 	var expHave = 0;
				// 	var totalExpNeeded = 0;
				// 	var level = 0;
				// 	for(var j = 0; j < charStats[i] - 1; j++) {
				// 		expHave += charLevelValues[j];
				// 	}
				// 	for(var j = charStats[i] - 1; j < targets[i] - 1; j++) {
				// 		totalExpNeeded += charLevelValues[j];
				// 	}
				// 	console.log([expHave,totalExpNeeded, (totalExpNeeded / charExpItems[0])])
					continue;
				}
				for(var j = charStats[i] - offset;j < targets[i] - offset;j++) {
					if (skip) continue; // don't need to recalculate if it's the exact same
					for(var k in order[i][j]) {
						if(k == "cost") {
							neededItemsForAscTal = addItem("Mora",order[i][j][k],neededItemsForAscTal);
						} else if(k == "crown") {
							neededItemsForAscTal = addItem("Crown of Insight",order[i][j][k],neededItemsForAscTal);
						} else if (k == "local" || k == "weeklyBoss" || k == "boss") {
							if(charData[k] == null) continue;
							neededItemsForAscTal = addItem(charData[k],order[i][j][k],neededItemsForAscTal);
						} else if (k == "gem" || k == "books") {
							var rank = order[i][j][k].rank;
							var itemName = "";
							if (typeof(charData[k])=="string") {
								itemName = charData[k];
							} else if (k != "books" && selectedCharacter != "Traveler") {
								itemName = charData[k][rank];
							} else {
								itemName = charData[k][j % 3]
							}
							if (k == "gem") itemName = itemName+gemSuffix[rank];
							if (k == "books") itemName = booksPrefix[rank]+itemName;
							neededItemsForAscTal = addItem(itemName,order[i][j][k].count,neededItemsForAscTal);
						} else if (k == "common") {
							if(charData[k] == null) continue;
							var rank = order[i][j][k].rank;
							var group = itemGroupDB[charData[k]].items;
							neededItemsForAscTal = addItem(group[rank],order[i][j][k].count,neededItemsForAscTal);
						}
					}
				}
				charItems = mergeItems(neededItemsForAscTal,charItems);
				html += "The required materials for leveling ";
				html += valueNames[i];
				html += " from " + charStats[i] + " to " + targets[i] + " are:";
				// orderItems(neededItemsForAscTal);
				html += "<div class=\"outputRequired\">" + getItemsNeeded(neededItemsForAscTal,"tiny") + "</div>";
				if(selectedCharacter == "Traveler" && i == 1) travelerAscensionDone = true;
			}
			html += "<br><div class=\"boxTitle\">The total for "+charName+" is:</div>";
			// orderItems(charItems);
			html += "<div class=\"outputRequired\">" + getItemsNeeded(charItems,"mini") + "</div>";
			get(id+"-charOutput").innerHTML = html;
			items = mergeItems(charItems,items);
		} else {
			var weapAsc = val(id+"-asc");
			var target = val(id+"-targetAsc");
			if(weapAsc == target) continue;
			
			var selectedWeapon = selectedChars[idNameIndex.indexOf(id)].name;
			var weapData = weapDB[selectedWeapon];
			var weaponAscOfRarirty = weapAscValues[Math.floor(weapData.rarity - 1)];
			var weapItems = [];
			
			neededItemsForAscTal = {};
			for(var j = weapAsc ;j < target;j++) {
				for(var k in weaponAscOfRarirty[j]) {
					if(k == "cost") {
						weapItems = addItem("Mora",weaponAscOfRarirty[j][k],weapItems);
					} else {
						var rank = weaponAscOfRarirty[j][k].rank;
						var group = itemGroupDB[weapData[k]].items;
						weapItems = addItem(group[rank],weaponAscOfRarirty[j][k].count,weapItems);
					}
				}
			}
			html += "The required materials for leveling ascension from " + weapAsc + " to " + target + " are:";
			html += "<div class=\"outputRequired\">" + getItemsNeeded(weapItems,"mini") + "</div>";
			get(id+"-weapOutput").innerHTML = html;
			items = mergeItems(weapItems,items);
		}

	}
	getByClass("invBlock")[0].classList.remove("empty");
	get("totalOutput").innerHTML = "<div class=\"boxTitle\">These are the items you need.</div><div class=\"outputRequired\">"+getItemsNeeded(items,"mini",false,true)+"</div>";
	get("whatDoYouHave").innerHTML = askUserForItems(items);
}

var resetItemLists = () => {
	travelerAscensionDone = false;
	items = {};
	getByClass("invBlock")[0].classList.add("empty");
	getByClass("invBlock")[1].classList.add("empty");
	get("totalOutput").innerHTML = "";
	get("whatDoYouHave").innerHTML = "";
	get("whatToObtain").innerHTML = "";
	get("textOutput").innerHTML = "";
	for (var perID in ids) {
		var id = ids[perID].id;
		var boxType = ids[perID].type;
		if (boxType == "char") {
			get(id + "-charOutput").innerHTML = "";
		} else {
			get(id + "-weapOutput").innerHTML = "";
		}
	}
}

// loop MakeItemIcon (above) with defaults (sans size) for needed items
var getItemsNeeded = (items,size="mini",hideBelowZero=true,showSource=false) => {
	var html = "";
	var itemKeys = [];
	for (var i in items) {
		itemKeys[itemKeys.length] = i;
	}
	orderItems(itemKeys)
	for (var i in itemKeys) {
		if(items[itemKeys[i]] == undefined) continue;
		if(hideBelowZero && items[itemKeys[i]] < 1) continue;
		html+=makeItemIcon(itemKeys[i],items[itemKeys[i]],-1,size,showSource);
	}
	return html;
}

// ask what user has
var askUserForItems = (items) => {
	var html = "";
	var groups = [];
	var groupItems = [];
	for (var i in items) {
		if(itemDB[i].group!=undefined && itemDB[i].type != "weeklyBoss" && groups.indexOf(itemDB[i].group)==-1) groups[groups.length] = itemDB[i].group;
	}
	for (var i in groups) {
		for (var j in itemGroupDB[groups[i]].items) {
			groupItems = addItem(itemGroupDB[groups[i]].items[j],0,groupItems);
		}
	}
	items = mergeItems(groupItems,items);
	var itemKeys = [];
	for (var i in items) {
		itemKeys[itemKeys.length] = i;
	}
	orderItems(itemKeys);
	var inv = loadInventory();
	var value = 0;
	// html += "<div class=\"topFlex\"><div class=\"boxTitle\">How many items do you have?</div><button id=\"toggleConverts\" class=\"removeButton\" onclick=\"toggleConverts()\">Show Converts?</button></div><div class=\"outputRequired\">";
	html += "<div class=\"topFlex\"><div class=\"boxTitle\">How many items do you have?</div></div><div class=\"outputRequired\">";
	for (var i = 0; i < itemKeys.length; i++) {
		if(inv != null && inv[itemKeys[i]] != undefined) {value = inv[itemKeys[i]]} else {value = 0}
		html += "<div class=\"askForItem\">"+makeItemIcon(itemKeys[i],"<input class=\"userInvInput\" type=\"number\" min=\"0\" value=\""+value+"\" id=\"userItemCount"+itemKeys[i]+"\">",-1,"mini",true)+"</div>";
	}
	html += "</div><div id=\"converts\"></div><br><button onclick=\"getItemsRemaining()\">Submit</button>";
	showConvertsBool = false;
	return html;
}
var toggleConverts = () => {
	if(!showConvertsBool) {
		get("toggleConverts").innerText = "Hide Converts?";
		showConvertsBool = true;
		var html = "<br><div class=\"outputRequired\">";
		var inv = loadInventory();
		var groups = [];
		var intraGroups = [];
		var gems = false;
		for(var i in items) {
			if(itemDB[i].group != undefined) {
				var groupName = itemDB[i].group
				if(groups.indexOf(groupName) != -1) continue;
				groups[groups.length] = groupName;
				if(itemGroupDB[groupName].convertType != undefined) {
					if(itemGroupDB[groupName].convertType == "intra") {
						intraGroups[intraGroups.length] = groupName;
					} else {
						gems = true;
					}
				}
			}
		}
		if(gems) {
			var itemDBGems = [];
			for (var i in itemDB) {
				if(itemDB[i].group != undefined) {
					if(itemDB[i].type == "gem" && itemGroupDB[itemDB[i].group].canConvertTo != false) {
						if(itemDBGems.indexOf(itemDB[i].group) != -1) continue;
						itemDBGems[itemDBGems.length] = itemDB[i].group;
					}
				}
			}
			for(var i in groups) {
				if(itemDBGems.indexOf(groups[i]) != -1) itemDBGems.splice(itemDBGems.indexOf(groups[i]),1)
			}
		}
		var itemKeys = [];
		var value;
		for(var group in intraGroups) {
			for(var i in itemGroupDB[intraGroups[group]].items) {
				itemKeys[itemKeys.length] = itemGroupDB[intraGroups[group]].items[i];
			}
		}
		itemKeys[itemKeys.length] = "Dream Solvent";
		orderItems(itemKeys)
		for(var i = 0; i < itemKeys.length; i++) {
			if(items[itemKeys[i]]){continue} // skip items already in list
			if(inv != null && inv[itemKeys[i]] != undefined) {value = inv[itemKeys[i]]} else {value = 0}
			html += "<div class=\"askForItem\">"+makeItemIcon(itemKeys[i],"<input class=\"userInvInput userConvertInput convertIntra\" type=\"number\" size=\"3\" min=\"0\" value=\""+value+"\" id=\"userItemCount"+itemKeys[i]+"\">",-1,"tiny")+"</div>";
		}
		// console.log(html)
		html+="</div><br><div class=\"outputRequired\">"
		itemKeys = [];
		for(var group in itemDBGems) {
			for(var i in itemGroupDB[itemDBGems[group]].items) {
				itemKeys[itemKeys.length] = itemGroupDB[itemDBGems[group]].items[i];
			}
		}
		itemKeys[itemKeys.length] = "Dust of Azoth";
		orderItems(itemKeys)
		for(var i = 0; i < itemKeys.length; i++) {
			if(items[itemKeys[i]]){continue} // skip items already in list
			if(inv != null && inv[itemKeys[i]] != undefined) {value = inv[itemKeys[i]]} else {value = 0}
			html += "<div class=\"askForItem\">"+makeItemIcon(itemKeys[i],"<input class=\"userInvInput userConvertInput convertInter\" type=\"number\" size=\"3\" min=\"0\" value=\""+value+"\" id=\"userItemCount"+itemKeys[i]+"\">",-1,"tiny")+"</div>";
		}
		html += "</div>"
		get("converts").innerHTML = html;
	} else {
		showConvertsBool = false;
		get("toggleConverts").innerText = "Show Converts?";
		get("converts").innerHTML = "";
	}
}
// calc what's needed minus has
var getItemsRemaining = () => {
	get("whatToObtain").innerHTML = "";
	get("textOutput").innerText = "";
	var userItemsLeft = {};
	saveInventory();
	var userInvInputs = getOnlyClass("userInvInput");
	var html = "";
	for (var i = 0; i < userInvInputs.length; i++) {
		var itemName = underscoreToSpace(userInvInputs[i].id.slice(13));
		var count = -1 * val(userInvInputs[i],true);
		if (items[itemName] != undefined) {
			count += items[itemName];
		}
		userItemsLeft[itemName] = count;
	}
	removeEmptyItems(userItemsLeft,false);
	var userItemsLeftKeys = [];
	for (var i in userItemsLeft) {
		userItemsLeftKeys[userItemsLeftKeys.length] = i;
	}
	if(userItemsLeftKeys.length != 0) {
		html += "<div class=\"boxTitle\">You need to obtain the following:</div><div><em></em></div><div class=\"outputRequired\">";
		for(var i in userItemsLeft) {
			if(userItemsLeft[i] < 1) continue;
			html += makeItemIcon(i,userItemsLeft[i],-1,"small",true);
		}
		html += "</div>";
	}

	var remainder = {};
	var testedGroups = [];
	var nonGrouped = {};
	var neededGrouped = {};

	for(var i in userItemsLeft) {
		if(itemDB[i].group == undefined) {
			nonGrouped = addItem(i,userItemsLeft[i],nonGrouped);
			continue; // skip items without a group
		}
		if(itemGroupDB[itemDB[i].group].craftUp == false) continue; // skip non-craft-up groups ("Brilliant Diamond" cannot be crafted up for example)
		var name = i;
		var group = itemDB[name].group;
		if(testedGroups.indexOf(group) != -1) continue;
		testedGroups[testedGroups.length] = group;
		var groupItems = [];
		var groupDBItems = itemGroupDB[group].items;

		for(var j = 0; j < groupDBItems.length; j++) {
			if(userItemsLeft[groupDBItems[j]] == undefined) {
				groupItems[j] = 0;	
			} else {
				groupItems[j] = -1 * userItemsLeft[groupDBItems[j]];
			}
		}

		for(var j = groupDBItems.length - 1; j >= 0; j--) {
			if(groupItems[j] < 0) {
				if(j > 0) {
					while(groupItems[j] != 0) {
						groupItems[j]++;
						groupItems[j-1]-=3;
					}
				} else {
					neededGrouped = addItem(groupDBItems[j],-1*groupItems[j],neededGrouped)
				}
			}
			if(groupItems[j] > 0) {
				neededGrouped = addItem(groupDBItems[j],-1 * groupItems[j],neededGrouped);
			}
		}
	}

	userItemsLeft = mergeItems(nonGrouped,neededGrouped);
	userItemsLeftKeys = []
	for (var i in userItemsLeft) {
		userItemsLeftKeys[userItemsLeftKeys.length] = i;
	}
	orderItems(userItemsLeftKeys);

	if(userItemsLeftKeys.length != 0) {
		html += "<div class=\"boxTitle\">You need to further obtain the following items to craft or match the above items:</div><div><em>This assumes no crafting bonuses.</em></div><div class=\"outputRequired\">";
		for(var i in userItemsLeftKeys) {
			if(userItemsLeft[userItemsLeftKeys[i]] < 1) continue;
			html += makeItemIcon(userItemsLeftKeys[i],userItemsLeft[userItemsLeftKeys[i]],-1,"small",true);
		}
		html +="</div>";
		// if(showConvertsBool) {
		// 	var convertInputs = getByClass("userConvertInput");
		// 	var convertItemsByType = [0,0,0,0];
		// 	var types = ["Sliver", "Fragment", "Chunk", "Gemstone"];
		// 	for(var i = 0; i < convertInputs.length; i++) {
		// 		var itemName = convertInputs[i].id.slice(13)
		// 		var value = val(convertInputs[i],true)
		// 		for (var j = 0; j < types.length; j++) {
		// 			if(itemName.indexOf(types[j]) != -1) convertItemsByType[j] += value;
		// 		}
		// 	}
		// 	// console.log(convertItemsByType);
		// 	if(JSON.stringify(convertItemsByType) != "[0,0,0,0]") {
		// 		html += "<div id=\"whatToConvert\"><div><em>You could also convert the following:</em></div><div class=\"outputRequired\">";
		// 		var neededTypes = [0,0,0,0];
		// 		for(var i = 0; i < userItemsLeftKeys.length; i++) {
		// 			for(var j = 0; j < types.length; j++) {
		// 				if(userItemsLeftKeys[i].indexOf(types[j]) != -1) {
		// 					neededTypes[j] += userItemsLeft[userItemsLeftKeys[i]]
		// 				}
		// 			}
		// 		}
		// 		console.log(neededTypes)
		// 		html += "</div></div>"
		// 	}
		// }
		var textOutput = "You need to obtain the following lowest-tier equivalents:";
		for (var i in userItemsLeftKeys) {
			if(userItemsLeft[userItemsLeftKeys[i]] < 1) continue;
			textOutput += "<br>"+userItemsLeftKeys[i]+" x "+userItemsLeft[userItemsLeftKeys[i]];
		}
		get("textOutput").innerHTML = textOutput;
		for (var i in userItemsLeftKeys) {
			if(userItemsLeft[userItemsLeftKeys[i]] >= 0) continue;
			remainder[userItemsLeftKeys[i]] = -1 * userItemsLeft[userItemsLeftKeys[i]]
		}
		if(remainder.length != 0) {
			html+="<div class=\"boxSubtitle\">You will be left with the following items:<br><small><em>(assuming all higher rarity items are used first)</em></small></div><div class=\"outputRequired\">";
			for (var i in remainder) {
				html+=makeItemIcon(i,remainder[i],-1,"tiny");
			}
			html+="</div>";
		}
	} else {
		html += "<div>You already have all the required items. All you need to do now is craft the above items.</div>"
	}
	getByClass("invBlock")[1].classList.remove("empty");
	get("whatToObtain").innerHTML = html;
}