'use strict';
// set vars
var travelerType, neededItemsForAscTal, travelerAscensionDone = false;

// shorthands
var get = (id) => {
	return document.getElementById(id);
}
var getByClass = (className) => {
	return document.getElementsByClassName(className);
}
var getByName = (nameName) => {
	return document.getElementsByName(nameName);
}
var val = (id,noGet=false) => {
	if(!noGet) {
		id = get(id);
	}
	if(id.getAttribute("type") == "number") {
		var value = id.value;
		if(id.max != "" && value > Math.floor(id.max)) value = id.max;
		if(id.min != "" && value < Math.floor(id.min)) value = id.min;
		return Math.floor(value);
	}
	if(id.getAttribute("type") == "checkbox") return id.checked;
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
	get("dropdownCharName").innerText = choice;
	if(choice.indexOf("Traveler") != -1) {
		choice = "Traveler";
		travelerType = travType;
	} else {
		travelerType = undefined;
	}
	get("dropdownCharIcon").setAttribute("src","images/char/"+spaceToUnderscore(choice)+".png");
}
var pickWeapon = (choice, rarity) => {
	get("dropdownWeaponName").innerText = choice;
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
const typeOrder = ["charExp","local","common","elite","gem","books","weaponAsc","boss","weeklyBoss","other"];
const intraTypeOrder = ["group","rarity","count"]; // "Group" is arbitrary and until multiple inputs are added, will be skipped.
var orderItems = (items) => {
	// var index = items.map(i => i.name);
	items.sort((a,b) => {
		if(a == "Mora") return -1; // "Mora" is placed first
		if(b == "Mora") return 1;
		if(a == "Crown of Insight") return 1; // Crowns are last
		if(b == "Crown of Insight") return -1;
		var aItem = itemDB[a];
		var bItem = itemDB[b];
		var aType = typeOrder.indexOf(aItem.type);
		var bType = typeOrder.indexOf(bItem.type);
		if(aType - bType != 0) return aType - bType;
		// arbitrary group stuff here~
		if(aItem.group != undefined && bItem.group != undefined) {
			if(itemGroupDB[aItem.group].priority - itemGroupDB[bItem.group].priority != 0) return itemGroupDB[aItem.group].priority - itemGroupDB[bItem.group].priority;
		}
		//
		if(aItem.rarity - bItem.rarity != 0) return bItem.rarity - aItem.rarity;
		// if(a.count - b.count != 0) return a.count - b.count;

		return 0;
	})
}

// Quick and dirty icon creator for items
// mainly used for adding to $element.innerHTML
var makeItemIcon = (item,count=1,rarity=-1,size="mini") => {
	var fallback = item;
	var validSizes = ["micro","tiny","mini","small","normal","big"];
	var pixels = [36, 56, 72, 96, 112, 256];
	if (validSizes.indexOf(size) == -1) {
		console.warn("Invalid size used. Using default (\"mini\"). Valid sizes: "+validSizes)
		size = "mini";
	}
	var type, img, html="";
	if(itemDB[item] == undefined) {
		console.warn("\""+item+"\" not found in itemsdb.js; using fallback.");
		item = "Unknown";
		type = "char";
		img = item;
		rarity = 1;
	} else {
		type = itemDB[item].type;
		img = spaceToUnderscore(item);
		if(rarity == -1) rarity = itemDB[item].rarity;
	}
	html = "<div class=\"itemIcon ";
	if(size == "micro" || size == "tiny" || size == "mini" || size == "small" || size == "normal") html+=size+" ";
	html +="rarity-"+rarity+"\"><img ";
	if(fallback != item) html+="fallback=\""+fallback+"\" ";
	html +="class=\"itemIconImg\" src=\"images/"+type+"/"+img+".png\" width=\""+pixels[validSizes.indexOf(size)]+"\" height=\""+pixels[validSizes.indexOf(size)]+"\">"+count+"</div>";
	return html;
}

var test = () => {
	resetItemLists();
	for (var perID in ids) {
		var html = "";
		var id = ids[perID].id;
		var boxType = ids[perID].type;
		if(boxType == "char") {
			var selectedCharacter = "";
			selectedCharacter = get(id).children[0].children[0].innerText;
			var travelerType = undefined
			if(get(id).hasAttribute("travtype")) {
				selectedCharacter = "Traveler";
				travelerType = get(id).getAttribute("travtype")
			}
			/* FIX TRAVELER!! */
			var charStats = [val(id+"-asc"), val(id+"-tal1"), val(id+"-tal2"), val(id+"-tal3")];
			var targets = [val(id+"-targetAsc"),val(id+"-targetTal1"),val(id+"-targetTal2"),val(id+"-targetTal3")];
			if(JSON.stringify(charStats) == JSON.stringify(targets)) return;
			
			const order = [ascValues,talValues,talValues,talValues];
			var charData, charSet = false;
			var charItems = {};
			var offset = 0;

			const valueNames = ["ascension", "normal attack", "skill", "burst"];
			const gemSuffix = [" Sliver", " Fragment", " Chunk", " Gemstone"];
			const booksPrefix = ["Teachings of ", "Guide to ", "Philosophies of "];

			
			for (var i = 0; i < 4; i++) {
				if(i == 0 && travelerAscensionDone && selectedCharacter == "Traveler") continue;
				if(charStats[i] >= targets[i]) continue;
				if(!charSet) {
					if(i == 0 || selectedCharacter != "Traveler") {
						charData = chars[selectedCharacter];
						if(selectedCharacter != "Traveler") charSet = true;
					} else {
						charData = chars[selectedCharacter].regions[travelerType];
						charSet = true;
					}
				}
				if(i != 0) {offset = 1} else {offset = 0}
				neededItemsForAscTal = {};
				for(var j = charStats[i] - offset;j < targets[i] - offset;j++) {
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
				if(selectedCharacter == "Traveler" && i == 0) travelerAscensionDone = true;
			}
			html += "<br><div class=\"boxTitle\">The total for "+selectedCharacter+" is:</div>";
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
	get("totalOutput").innerHTML = "<div class=\"boxTitle\">These are the items you need.</div><div class=\"outputRequired\">"+getItemsNeeded(items,"mini")+"</div>";
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
var getItemsNeeded = (items,size="mini",hideBelowZero=true) => {
	var html = "";
	var itemKeys = [];
	for (var i in items) {
		itemKeys[itemKeys.length] = i;
	}
	orderItems(itemKeys)
	for (var i in itemKeys) {
		if(items[itemKeys[i]] == undefined) continue;
		if(hideBelowZero && items[itemKeys[i]] < 1) continue;
		html+=makeItemIcon(itemKeys[i],items[itemKeys[i]],-1,size);
	}
	return html;
}

// ask what user has
var askUserForItems = (items) => {
	var html = "";
	var maxInputSize = 4;
	var groups = [];
	var groupItems = [];
	for (var i in items) {
		if(itemDB[i].group!=undefined && groups.indexOf(itemDB[i].group)==-1) groups[groups.length] = itemDB[i].group;
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
	html += "<div class=\"boxTitle\">How many items do you have?</div><div class=\"outputRequired\">";
	for (var i = 0; i < itemKeys.length; i++) {
		if(inv != null && inv[itemKeys[i]] != undefined) {value = inv[itemKeys[i]]} else {value = 0}
		html += "<div class=\"askForItem\">"+makeItemIcon(itemKeys[i],"<input class=\"userInvInput\" type=\"number\" size=\""+maxInputSize+"\" min=\"0\" value=\""+value+"\" id=\"userItemCount"+itemKeys[i]+"\">",-1,"mini")+"</div>";
	}
	html += "</div><br><button onclick=\"getItemsRemaining()\">Submit</button>";
	return html;
}

// calc what's needed minus has
var getItemsRemaining = () => {
	get("whatToObtain").innerHTML = "";
	get("textOutput").innerText = "";
	var userItemsLeft = {};
	saveInventory();
	var userInvInputs = getByClass("userInvInput");
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
		html += "<div class=\"boxTitle\">You need to obtain the following:</div><div class=\"outputRequired\">";
		for(var i in userItemsLeft) {
			if(userItemsLeft[i] < 1) continue;
			html += makeItemIcon(i,userItemsLeft[i],-1,"small");
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
			html += makeItemIcon(userItemsLeftKeys[i],userItemsLeft[userItemsLeftKeys[i]],-1,"small");
		}
		html +="</div>";
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