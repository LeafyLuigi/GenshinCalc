'use strict';
/* This file contains a list of failed attempts at remaking the last step. */
var getItemsRemainingOLD = () => {
	get("whatToObtain").innerHTML = "";
	get("textOutput").innerText = "";
	userItemsLeft = [];
	saveInventory();
	var _userInvInputs = getByClass("userInvInput");
	var _userItems = [];
	var _html = "";
	for(var _i = 0; _i < _userInvInputs.length; _i++) {
		_userItems[_i] = {"name": underscoreToSpace(_userInvInputs[_i].id.slice(13)),"count":Math.floor(-1 * val(_userInvInputs[_i].id))};
	}
	userItemsLeft = mergeItems(items,_userItems);
	_html += "<div class=\"boxTitle\">You need to obtain the following:</div><div class=\"outputRequired\">";
	for(var _i = 0; _i < userItemsLeft.length;_i++) {
		if(userItemsLeft[_i].count < 1) continue;
		_html += makeItemIcon(userItemsLeft[_i].name,userItemsLeft[_i].count,-1,"small");
	}
	_html += "</div>";
	getByClass("invBlock")[1].classList.remove("empty");

	var _inputs = userItemsLeft;
	var _lowest = [];
	var _remove = [];
	var _remainder = [];
	var groupItems = [];
	var groupItemsIndex = [];

	// This codeblock calculates the lowest-tier item within a group.
	for(var _i in _inputs) {
		if(itemDB[_inputs[_i].name].group == undefined) continue; // skip items without a group
		if(itemGroupDB[itemDB[_inputs[_i].name].group].craftUp == false) continue; // skip non-craft-up groups ("Brilliant Diamond" cannot be crafted up for example)
		
		var name = _inputs[_i].name;
		var group = itemDB[name].group;
		
		var groupItemsItem;
		
		groupItemsIndex = groupItems.map(i => i.group);
		if(groupItemsIndex.indexOf(group) == -1) {
			var _groupItems = [];
			_groupItems[itemGroupDB[group].items.indexOf(name)] = -1 * _inputs[_i].count
			groupItems[groupItems.length] = {"group": group, "items": _groupItems};
			groupItemsIndex = groupItems.map(i => i.group);
		} else {
			groupItemsItem = groupItems[groupItemsIndex.indexOf(group)];
			groupItemsItem.items[itemGroupDB[group].items.indexOf(name)] = -1 * _inputs[_i].count;
		}
		
		// if(_inputs[_i].count == 0) continue; // skip empty items 
		// if(itemGroupDB[group].items.indexOf(name) == 0) continue; // skip lowest items, because those can't be crafted
	}

	// "Craft up" calculations; it takes the count of lower rarity items.
	groupItemsIndex = groupItems.map(i => i.group);
	var _convert = [];
	for(var _i in groupItems) {
		var group = groupItems[_i];
		var _groupItemNames = itemGroupDB[groupItems[_i].group].items; 
		for(var _j = group.items.length - 1; 0 < _j; _j--) {
			// console.log(_j);
			// _j = Math.floor(_j);
			var _itemName = _groupItemNames[_j];
			var _itemToGetCount = group.items[_j]; // positive means "need to obtain", negative means "already has"

			// console.log("_j,name,count: "+_j,_itemName,_itemToGetCount)

			if(_j != 0) {
				var _needed = _itemToGetCount; // positive numbers are "excess", negative are "need"
				var _maxCraftable = -1 * Math.floor(_itemToGetCount / 3);
				var _used = 0;
				// console.log(_needed);
				// console.log(_maxCraftable);
				while(_needed < 0 && _used < _maxCraftable) {
					_needed++;
					_used++;
				}
				// console.log(_itemName,_needed,_used)
				if(_used != 0) {
					_convert = addItem(_itemName,-1 * _used,_convert);
					_convert = addItem(_groupItemNames[_j - 1],_used * 3,_convert);
					group.items[_j - 1] += _used * -3;
				}
			}

		}
	}
	_inputs = mergeItems(_convert,_inputs);
	// console.log(_convert);

	// find lowest tier
	_lowest = []; _remove = [];
	for(var _i = 0; _i < _inputs.length; _i++) {
		if(_inputs[_i].count <= 0 || itemDB[_inputs[_i].name].group == undefined) continue;
		var _name = _inputs[_i].name;
		var _count = _inputs[_i].count;
		var _groupNames = itemGroupDB[itemDB[_name].group].items;
		var _rank = _groupNames.indexOf(_name);
		_lowest = addItem(_groupNames[0],_count * 3 ** _rank,_lowest);
		_remove = addItem(_name,-1*_count,_remove);

	}
	// console.log(_lowest,_remove)
	_inputs = mergeItems(_lowest,mergeItems(_remove,_inputs))
	// console.log(_inputs);
	
	if(_inputs.length != 0) {
		_html += "<div class=\"boxTitle\">You need to further obtain the following items to craft or match the above items:</div><div><em>This assumes no crafting bonuses.</em></div><div class=\"outputRequired\">";
		for(var _i = 0; _i < _inputs.length;_i++) {
			if(_inputs[_i].count < 1) continue;
			_html += makeItemIcon(_inputs[_i].name,_inputs[_i].count,-1,"small");
		}
		_html +="</div>";
		var _textOutput = "You need to obtain the following lowest-tier equivalents:";
		for (var _i in _inputs) {
			if(_inputs[_i].count < 1) continue;
			_textOutput += "<br>"+_inputs[_i].name+" x "+_inputs[_i].count;
		}
		get("textOutput").innerHTML = _textOutput;
		for (var _i in _inputs) {
			if(_inputs[_i].count >= 0) continue;
			_remainder[_remainder.length] = {"name": _inputs[_i].name,"count": -1 * _inputs[_i].count}
		}
		if(_remainder.length != 0) {
			_html+="<div class=\"boxSubtitle\">You will be left with the following items:</div><div class=\"outputRequired\">";
			for (var _i in _remainder) {
				_html+=makeItemIcon(_remainder[_i].name,_remainder[_i].count,-1,"tiny");
			}
			_html+="</div>";
		}  
	} else {
		_html += "<div>You already have all the required items. All you need to do now is craft the above items.</div>"
	}
	get("whatToObtain").innerHTML = _html;
}



var getItemsRemaining2 = () => {
	get("whatToObtain").innerHTML = "";
	get("textOutput").innerText = "";
	userItemsLeft = [];
	saveInventory();
	var html = "";
	var invInputs = getByClass("userInvInput");
	var invInputsItems = [];
	var groups = [];
	var testedGroups = [];
	var neededItemsIndex = items.map(i=>i.name);
	var nonGroupedItems = [];
	var remainder = [];
	var needed = [];

	// group items that have a group
	for (var i = 0; i < invInputs.length; i++) {
		// console.log(invInputs[i]);
		var itemName = underscoreToSpace(invInputs[i].id.slice(13))
		invInputsItems[i] = itemName
	}
	// calc max items for group
	for (var i = 0; i < invInputsItems.length; i++) {
		var itemName = invInputsItems[i];
		if(itemDB[itemName].group == undefined) {
			nonGroupedItems[nonGroupedItems.length] = {"name": itemName, "count": val("userItemCount"+spaceToUnderscore(invInputsItems[i]))}
			continue;
		};
		if(testedGroups.indexOf(itemDB[itemName].group) != -1) continue;

		var groupName = itemDB[itemName].group
		var group = itemGroupDB[groupName];

		var groupItemArray = [];
		var groupItemLowestEquiv = 0;
		var groupItemArrayMax = [];
		var groupItemNeeds = [];
		var groupItemNeedsLowestEquiv = [];
		for (var j = group.items.length - 1; 0 <= j ; j--) {
			var count = val("userItemCount"+spaceToUnderscore(group.items[j]));
			groupItemLowestEquiv += count * 3 ** j // for gems this should equal 271. for talents (0->9) should be 792.
			groupItemArray[j] = count;
			groupItemArrayMax[j] = 0;
			if(neededItemsIndex.indexOf(group.items[j]) != -1) {
				groupItemNeeds[j] = items[neededItemsIndex.indexOf(group.items[j])].count;
			} else {
				groupItemNeeds[j] = 0
			}
			groupItemNeedsLowestEquiv[j] = 0;
		}
		// calc max possible
		for (var j = 0; j < group.items.length; j++) {
			for (var k = 0; k <= j; k++) {
				// console.log(val("userItemCount"+spaceToUnderscore(group.items[k])))
				groupItemArrayMax[j] += val("userItemCount"+spaceToUnderscore(group.items[k])) * 3 ** k;
				// console.log(groupName, groupItemNeeds[k], k, groupItemNeeds[k] * 3 ** k)
				groupItemNeedsLowestEquiv[j] += groupItemNeeds[k] * 3 ** k
			}
		}
		// console.log(groupItemArrayMax)
		// console.log(groupItemArray)
		var item = {
			name: groupName, 
			lowestEquivTotal: groupItemLowestEquiv,
			invItemCount: groupItemArray,
			invLowestEquivCount: groupItemArrayMax,
			needed: groupItemNeeds,
			neededLowestEquiv: groupItemNeedsLowestEquiv
		}

		groups[groups.length] = item;
		testedGroups[testedGroups.length] = groupName;
	}

	// console.log(invInputsItems)
	// console.log(groups)


	// calculate lowest equivs needed of the groups
	var groupedItemsLowestEquivNeeded = [];
	var groupedItemsNeeded = [];
	var groupsIndex = groups.map(i=>i.name);
	for (var i = 0; i < groups.length; i++) {
		var groupName = groupsIndex[i];
		var groupItems = itemGroupDB[groupName].items;
		var groupItemsNeeded = groups[groupsIndex.indexOf(groupName)].needed;
		var groupItemArray = groups[groupsIndex.indexOf(groupName)].invItemCount;
		var groupItemArrayMax = groups[groupsIndex.indexOf(groupName)].invLowestEquivCount;
		var groupItemNeedsLowestEquiv = groups[groupsIndex.indexOf(groupName)].neededLowestEquiv;

		var extras = [];
		var missingLowestEquiv = [];
		var totalLowest = 0;
		for(var j = 0; j < groupItemArrayMax.length; j++) {
			extras[j] = 0;
			groupedItemsNeeded[j] = groupItemsNeeded[j] - groupItemArray[j];
			// console.log(groupName, j, groupItemNeedsLowestEquiv[j], groupItemArrayMax[j])
			missingLowestEquiv[j] = groupItemNeedsLowestEquiv[j] - groupItemArrayMax[j];
			if(missingLowestEquiv[j] > 0) {
				groupedItemsLowestEquivNeeded = addItem(groupItems[0],missingLowestEquiv[j],groupedItemsLowestEquivNeeded);
				for(var k = j; k < groupItemArrayMax.length; k++) {
					groupItemArrayMax[k] += groupItemNeedsLowestEquiv[j];
				}
			}
		}
		for (var j = 0; j < groupItems.length; j++) {
			if(groupedItemsNeeded[j] < 0 && j != groupItemArrayMax.length - 1) {
				var used = Math.floor(groupedItemsNeeded[j] / 3);
				var leftOver = -1 * groupedItemsNeeded[j] % 3;
				// console.log(groupedItemsNeeded)
				groupedItemsNeeded[j] -= used * 3;
				groupedItemsNeeded[j+1] += used;
				remainder = addItem(groupItems[j],leftOver,remainder);
				if (leftOver != 0) {
					extras[j] = leftOver;
				}
			}
		}
		// console.log(groupName,groupItemsNeeded,groupItemArray,extras)
	}
	// console.log(remainder)
	// console.log(groupedItemsLowestEquivNeeded, nonGroupedItems)

	// calculate needed items for non-grouped
	var neededNonGrouped = [];
	for (var i = 0; i < nonGroupedItems.length; i++) {
		var itemName = nonGroupedItems[i].name;
		var itemCount = nonGroupedItems[i].count;
		var itemNeededCount = items[neededItemsIndex.indexOf(itemName)].count;
		if(itemCount - itemNeededCount > 0) {
			remainder = addItem(itemName, itemCount - itemNeededCount, remainder);
		} else if(itemCount - itemNeededCount < 0) {
			neededNonGrouped = addItem(itemName, -1 * (itemCount - itemNeededCount),neededNonGrouped);
		}
	}
	console.log(remainder, needed);
	needed = mergeItems(neededNonGrouped, groupedItemsLowestEquivNeeded);

	html += "<div class=\"boxTitle\">You need to obtain the following:</div><div class=\"outputRequired\">";
	for(var i = 0; i < needed.length;i++) {
		if(needed[i].count < 1) continue;
		html += makeItemIcon(needed[i].name,needed[i].count,-1,"small");
	}
	html += "</div>";
	getByClass("invBlock")[1].classList.remove("empty");

	if(needed.length != 0) {
		// html += "<div class=\"boxTitle\">You need to further obtain the following items to craft or match the above items:</div><div><em>This assumes no crafting bonuses.</em></div><div class=\"outputRequired\">";
		// for(var i = 0; i < needed.length;i++) {
		// 	if(needed[i].count < 1) continue;
		// 	html += makeItemIcon(needed[i].name,needed[i].count,-1,"small");
		// }
		// html +="</div>";
		// var textOutput = "You need to obtain the following lowest-tier equivalents:";
		// for (var i in needed) {
		// 	if(needed[i].count < 1) continue;
		// 	textOutput += "<br>"+needed[i].name+" x "+needed[i].count;
		// }
		// get("textOutput").innerHTML = textOutput;
		// for (var i in needed) {
		// 	if(needed[i].count >= 0) continue;
		// 	remainder[remainder.length] = {"name": needed[i].name,"count": -1 * needed[i].count}
		// }
		if(remainder.length != 0) {
			html+="<div class=\"boxSubtitle\">You will be left with the following items:</div><div class=\"outputRequired\">";
			for (var i in remainder) {
				html+=makeItemIcon(remainder[i].name,remainder[i].count,-1,"tiny");
			}
			html+="</div>";
		}  
	} else {
		html += "<div>You already have all the required items. All you need to do now is craft the above items.</div>"
	}
	get("whatToObtain").innerHTML = html;
}


var getItemsRemaining3 = () => {
	get("whatToObtain").innerHTML = "";
	get("textOutput").innerText = "";
	userItemsLeft = [];
	saveInventory();
	var _userInvInputs = getByClass("userInvInput");
	var _userItems = [];
	var groupedItems = [];
	var _html = "";
	for(var i = 0; i < _userInvInputs.length; i++) {
		var itemName = underscoreToSpace(_userInvInputs[i].id.slice(13));
		var count = val(_userInvInputs[i].id);
		if(itemDB[itemName].group != undefined) {
			groupedItems[groupedItems.length] = {"name": itemName, "count": count}
		} else {	
			_userItems[_userItems.length] = {"name": itemName, "count": -1 * count};
		}
	}

	var _inputs = userItemsLeft;
	var _remainder = [];

	var testedGroups = [];
	var neededToCraft = [];
	for(var i in groupedItems) {
		var itemName = groupedItems[i].name;
		var groupName = itemDB[itemName].group;
		if(testedGroups.indexOf(groupName) != -1 || itemGroupDB[groupName].craftUp == false) continue;
		var groupedItemsIndex = groupedItems.map(i=>i.name);
		testedGroups[testedGroups.length] = groupName;
		var group = itemGroupDB[groupName].items;

		var grouped = [];
		var neededIndex = items.map(i=>i.name);

		for(var j in group) {
			// console.log(items[neededIndex.indexOf(group[j])].count,groupedItems[groupedItemsIndex.indexOf(group[j])].count)
			grouped[j] = items[neededIndex.indexOf(group[j])].count - groupedItems[groupedItemsIndex.indexOf(group[j])].count;
		}
		// craft materials up
		// for(var j = 0; j < grouped.length - 1; j++) {
		// 	var itemCount = -1 * grouped[j]; // positive items means "excess"
		// 	var used = Math.floor(itemCount / 3);
		// 	var next = -1 * grouped[j+1];

		// 	while(used > 0 && next <= 0) {
		// 		used--;
		// 		next++;
		// 	}
		// 	grouped[j] -= used;
		// 	grouped[j+1]+=next;
		// 	// if(next < 0) neededToCraft[neededToCraft.length] = {"name": group[j+1], "count":  -1 * next}
		// }
		for(var j = 0; j < grouped.length; j++) {
			neededToCraft[neededToCraft.length] = {"name": group[j], "count": grouped[j]}
		}
		console.log(groupName,grouped)
	}
	for(var i = 0; i< neededToCraft.length;i++){
		console.log(neededToCraft[i])
	}
	_userItems = mergeItems(neededToCraft,_userItems)

	userItemsLeft = mergeItems(items,_userItems);
	_html += "<div class=\"boxTitle\">You need to obtain the following:</div><div class=\"outputRequired\">";
	for(var _i = 0; _i < userItemsLeft.length;_i++) {
		if(userItemsLeft[_i].count < 1) continue;
		_html += makeItemIcon(userItemsLeft[_i].name,userItemsLeft[_i].count,-1,"small");
	}

	_html += "</div>";
	getByClass("invBlock")[1].classList.remove("empty");
	if(_inputs.length != 0) {
		_html += "<div class=\"boxTitle\">You need to further obtain the following items to craft or match the above items:</div><div><em>This assumes no crafting bonuses.</em></div><div class=\"outputRequired\">";
		for(var _i = 0; _i < _inputs.length;_i++) {
			if(_inputs[_i].count < 1) continue;
			_html += makeItemIcon(_inputs[_i].name,_inputs[_i].count,-1,"small");
		}
		_html +="</div>";
		var _textOutput = "You need to obtain the following lowest-tier equivalents:";
		for (var _i in _inputs) {
			if(_inputs[_i].count < 1) continue;
			_textOutput += "<br>"+_inputs[_i].name+" x "+_inputs[_i].count;
		}
		get("textOutput").innerHTML = _textOutput;
		for (var _i in _inputs) {
			if(_inputs[_i].count >= 0) continue;
			_remainder[_remainder.length] = {"name": _inputs[_i].name,"count": -1 * _inputs[_i].count}
		}
		if(_remainder.length != 0) {
			_html+="<div class=\"boxSubtitle\">You will be left with the following items:</div><div class=\"outputRequired\">";
			for (var _i in _remainder) {
				_html+=makeItemIcon(_remainder[_i].name,_remainder[_i].count,-1,"tiny");
			}
			_html+="</div>";
		}  
	} else {
		_html += "<div>You already have all the required items. All you need to do now is craft the above items.</div>"
	}
	get("whatToObtain").innerHTML = _html;
}