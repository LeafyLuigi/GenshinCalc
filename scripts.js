'use strict';
// set vars
var travelerType, _neededItemsForAscTal, travelerAscensionDone = false;

// shorthands
var get = (_id) => {
	return document.getElementById(_id);
}
var getByClass = (_class) => {
	return document.getElementsByClassName(_class);
}
var getByName = (_name) => {
	return document.getElementsByName(_name);
}
var val = (_id,_noGet=false) => {
	if(!_noGet) {
		_id = get(_id);
	}
	if(_id.getAttribute("type") == "number") {
		var value = _id.value;
		if(_id.max != "" && value > Math.floor(_id.max)) value = _id.max;
		if(_id.min != "" && value < Math.floor(_id.min)) value = _id.min;
		return Math.floor(value);
	}
	if(_id.getAttribute("type") == "checkbox") return _id.checked;
}



// object to string magik
var objToStr = (obj) => {
	return JSON.stringify(obj)
}

// regex stuff
var spaceToUnderscore = (_name) => {
	return _name.replace(/[ ]+/g, '_');
}
var underscoreToSpace = (_name) => {
	return _name.replace(/[_]+/g, ' ');
}
var removeQuotes = (_name) => {
	return _name.replace(/['"]+/g, "");
}

// Pick Character
var pickChar = (_choice,_travType=null) => {
	get("dropdownCharName").innerText = _choice;
	if(_choice.indexOf("Traveler") != -1) {
		_choice = "Traveler";
		travelerType = _travType;
	} else {
		travelerType = undefined;
	}
	get("dropdownCharIcon").setAttribute("src","images/char/"+spaceToUnderscore(_choice)+".png");
}
var pickWeapon = (_choice, _rarity) => {
	get("dropdownWeaponName").innerText = _choice;
	_choice = removeQuotes(_choice);
	get("dropdownWeaponName").setAttribute("rarity",_rarity);
	get("dropdownWeaponIcon").setAttribute("src","images/weapon/"+spaceToUnderscore(_choice)+".png");
}

// item list
var items = [];
var addItem = (_item,_count,_var=items) => {
	// console.log(_var)
	var _itemsIndex = _var.map(i => i.name);
	if(_var == [] || _itemsIndex.indexOf(_item) == -1) {
		_var = _var.concat([{"name": _item, "count": _count}]);
	} else {
		_var[_itemsIndex.indexOf(_item)].count+=_count;
	}
	return _var;
}
var removeItem = (_item,_delete=true,_var=items) => {
	var _itemsIndex = _var.map(i => i.name);
	if(_itemsIndex.indexOf(_item) == -1) return;
	var _i = _itemsIndex.indexOf(_item);
	if(_delete) {
		_var.splice(_i,1);
	} else {
		_var[_i].count = 0;
	}
	return _var;
}
var mergeItems = (_firstList,_secondList,_deleteZeroOrLess=false) => {
	var _itemsSecondIndex = _secondList.map(i => i.name);
	var _mergedList = _secondList;
	for (var _j = 0; _j < _firstList.length;_j++) {
		// if(_firstList[_j].name == null || _firstList[_j].count == 0) continue;
		if (_itemsSecondIndex.indexOf(_firstList[_j].name) == -1) {
			_mergedList = _mergedList.concat(_firstList[_j]);
		} else {
			_mergedList[_itemsSecondIndex.indexOf(_firstList[_j].name)].count += _firstList[_j].count;
		}
	}
	if(_deleteZeroOrLess) {
		for (var _j = _mergedList.length - 1; _j >= 0;_j--) {
			if(_mergedList[_j].count < 1) _mergedList.splice(_j,1);
		}
	}
	return _mergedList;
}
const typeOrder = ["charExp","local","common","elite","gem","books","weaponAsc","boss","weeklyBoss","other"];
const intraTypeOrder = ["group","rarity","count"]; // "Group" is arbitrary and until multiple inputs are added, will be skipped.
var orderItems = (_items) => {
	// var _index = _items.map(i => i.name);
	_items.sort((a,b) => {
		if(a.name == "Mora") return -1; // "Mora" is placed first
		if(a.name == "Crown of Insight") return 1; // Crowns are last
		var aItem = itemDB[a.name];
		var bItem = itemDB[b.name];
		var aType = typeOrder.indexOf(aItem.type);
		var bType = typeOrder.indexOf(bItem.type);
		if(aType - bType != 0) return aType - bType;
		// arbitrary group stuff here~
		if(aItem.group != undefined && bItem.group != undefined) {
			if(itemGroupDB[aItem.group].priority - itemGroupDB[bItem.group].priority != 0) return itemGroupDB[aItem.group].priority - itemGroupDB[bItem.group].priority;
		}
		//
		if(aItem.rarity - bItem.rarity != 0) return bItem.rarity - aItem.rarity;
		if(a.count - b.count != 0) return a.count - b.count;

		return 0;
	})
}

// Quick and dirty icon creator for items
// mainly used for adding to $element.innerHTML
var makeItemIcon = (_item,_count=1,_rarity=-1,_size="mini") => {
	var _fallback = _item;
	var _validSizes = ["micro","tiny","mini","small","normal","big"];
	if (_validSizes.indexOf(_size) == -1) {
		console.warn("Invalid size used. Using default (\"mini\"). Valid sizes: "+_validSizes)
		_size = "mini";
	}
	var _type, _img, _html="";
	if(itemDB[_item] == undefined) {
		console.warn("\""+_item+"\" not found in itemsdb.js; using fallback.");
		_item = "Unknown";
		_type = "char";
		_img = _item;
		_rarity = 1;
	} else {
		_type = itemDB[_item].type;
		_img = spaceToUnderscore(_item);
		if(_rarity == -1) _rarity = itemDB[_item].rarity;
	}
	_html = "<div class=\"itemIcon ";
	if(_size == "micro" || _size == "tiny" || _size == "mini" || _size == "small" || _size == "normal") _html+=_size;
	_html +=" rarity-"+_rarity+"\"><img ";
	if(_fallback != _item) _html+="fallback=\""+_fallback+"\" ";
	_html +="class=\"itemIconImg\" src=\"images/"+_type+"/"+_img+".png\">"+_count+"</div>";
	return _html;
}

var test = () => {
	resetItemLists();
	for (var _perID in ids) {
		var _html = "";
		var _id = ids[_perID].id;
		var _boxType = ids[_perID].type;
		if(_boxType == "char") {
			var selectedCharacter = "";
			selectedCharacter = get(_id).children[0].children[0].innerText;
			var travelerType = undefined
			if(get(_id).hasAttribute("travtype")) {
				selectedCharacter = "Traveler";
				travelerType = get(_id).getAttribute("travtype")
			}
			/* FIX TRAVELER!! */
			var _charStats = [val(_id+"-asc"), val(_id+"-tal1"), val(_id+"-tal2"), val(_id+"-tal3")];
			var _targets = [val(_id+"-targetAsc"),val(_id+"-targetTal1"),val(_id+"-targetTal2"),val(_id+"-targetTal3")];
			if(JSON.stringify(_charStats) == JSON.stringify(_targets)) return;
			
			const _order = [_ascValues,_talValues,_talValues,_talValues];
			var _charData, _charSet = false;
			var _charItems = [];
			var _offset = 0;

			const _valueNames = ["ascension", "normal attack", "skill", "burst"];
			const _gemSuffix = [" Sliver", " Fragment", " Chunk", " Gemstone"];
			const _booksPrefix = ["Teachings of ", "Guide to ", "Philosophies of "];

			
			for (var _i = 0; _i < 4; _i++) {
				if(_i == 0 && travelerAscensionDone && selectedCharacter == "Traveler") continue;
				if(_charStats[_i] >= _targets[_i]) continue;
				if(!_charSet) {
					if(_i == 0 || selectedCharacter != "Traveler") {
						_charData = chars[selectedCharacter];
						if(selectedCharacter != "Traveler") _charSet = true;
					} else {
						_charData = chars[selectedCharacter].regions[travelerType];
						_charSet = true;
					}
				}
				if(_i != 0) {_offset = 1} else {_offset = 0}
				_neededItemsForAscTal = [];
				for(var _j = _charStats[_i] - _offset;_j < _targets[_i] - _offset;_j++) {
					for(var _k in _order[_i][_j]) {
						if(_k == "cost") {
							_neededItemsForAscTal = addItem("Mora",_order[_i][_j][_k],_neededItemsForAscTal);
						} else if(_k == "crown") {
							_neededItemsForAscTal = addItem("Crown of Insight",_order[_i][_j][_k],_neededItemsForAscTal);
						} else if (_k == "local" || _k == "weeklyBoss" || _k == "boss") {
							if(_charData[_k] == null) continue;
							_neededItemsForAscTal = addItem(_charData[_k],_order[_i][_j][_k],_neededItemsForAscTal);
						} else if (_k == "gem" || _k == "books") {
							var _rank = _order[_i][_j][_k].rank;
							var _name = "";
							if (typeof(_charData[_k])=="string") {
								_name = _charData[_k];
							} else if (_k != "books" && selectedCharacter != "Traveler") {
								_name = _charData[_k][_rank];
							} else {
								_name = _charData[_k][_j % 3]
							}
							if (_k == "gem") _name = _name+_gemSuffix[_rank];
							if (_k == "books") _name = _booksPrefix[_rank]+_name;
							_neededItemsForAscTal = addItem(_name,_order[_i][_j][_k].count,_neededItemsForAscTal);
						} else if (_k == "common") {
							if(_charData[_k] == null) continue;
							var _rank = _order[_i][_j][_k].rank;
							var _group = itemGroupDB[_charData[_k]].items;
							_neededItemsForAscTal = addItem(_group[_rank],_order[_i][_j][_k].count,_neededItemsForAscTal);
						}
					}
				}
				_charItems = mergeItems(_neededItemsForAscTal,_charItems);
				_html += "The required materials for leveling ";
				_html += _valueNames[_i];
				_html += " from " + _charStats[_i] + " to " + _targets[_i] + " are:";
				orderItems(_neededItemsForAscTal)
				_html += "<div class=\"outputRequired\">" + getItemsNeeded(_neededItemsForAscTal,"tiny") + "</div>";
				if(selectedCharacter == "Traveler" && _i == 0) travelerAscensionDone = true;
			}
			_html += "<br><div class=\"boxTitle\">The total for "+selectedCharacter+" is:</div>";
			orderItems(_charItems);
			_html += "<div class=\"outputRequired\">" + getItemsNeeded(_charItems,"mini") + "</div>";
			get(_id+"-charOutput").innerHTML = _html;
			items = mergeItems(_charItems,items);
		} else {
			var selectedWeapon = get(_id).children[0].children[0].innerText;
			var _weapAsc = val(_id+"-asc");
			var _target = val(_id+"-targetAsc");
			if(_weapAsc == _target) continue;
								
			const _order = [_ascValues,_talValues,_talValues,_talValues];
			var _weapData = weapDB[selectedWeapon];
			var _weapItems = [];

			const _valueNames = ["ascension", "normal attack", "skill", "burst"];
			const _gemSuffix = [" Sliver", " Fragment", " Chunk", " Gemstone"];
			const _booksPrefix = ["Teachings of ", "Guide to ", "Philosophies of "];

			
			_neededItemsForAscTal = [];
			for(var _j = _weapAsc ;_j < _weapAsc;_j++) {
				for(var _k in _order[_i][_j]) {
					if(_k == "cost") {
						_neededItemsForAscTal = addItem("Mora",_order[_i][_j][_k],_neededItemsForAscTal);
					} else if(_k == "crown") {
						_neededItemsForAscTal = addItem("Crown of Insight",_order[_i][_j][_k],_neededItemsForAscTal);
					} else if (_k == "local" || _k == "weeklyBoss" || _k == "boss") {
						if(_charData[_k] == null) continue;
						_neededItemsForAscTal = addItem(_charData[_k],_order[_i][_j][_k],_neededItemsForAscTal);
					} else if (_k == "gem" || _k == "books") {
						var _rank = _order[_i][_j][_k].rank;
						var _name = "";
						if (typeof(_charData[_k])=="string") {
							_name = _charData[_k];
						} else if (_k != "books" && selectedWeapon != "Traveler") {
							_name = _charData[_k][_rank];
						} else {
							_name = _charData[_k][_j % 3]
						}
						if (_k == "gem") _name = _name+_gemSuffix[_rank];
						if (_k == "books") _name = _booksPrefix[_rank]+_name;
						_neededItemsForAscTal = addItem(_name,_order[_i][_j][_k].count,_neededItemsForAscTal);
					} else if (_k == "common") {
						var _rank = _order[_i][_j][_k].rank;
						var _group = itemGroupDB[_charData[_k]].items;
						_neededItemsForAscTal = addItem(_group[_rank],_order[_i][_j][_k].count,_neededItemsForAscTal);
					}
				}
			}
			_weapItems = mergeItems(_neededItemsForAscTal,_weapItems);
			_html += "The required materials for leveling ";
			_html += _valueNames[_i];
			_html += " from " + _weapAsc + " to " + _target + " are:";
			_html += "<div class=\"outputRequired\">" + getItemsNeeded(_neededItemsForAscTal,"tiny") + "</div>";

			_html += "<br><div class=\"boxTitle\">The total for "+selectedWeapon+" is:</div>";
			_html += "<div class=\"outputRequired\">" + getItemsNeeded(_weapItems,"mini") + "</div>";
			get(_id+"-weapOutput").innerHTML = _html;
			items = mergeItems(_weapItems,items);
		}

	}
	getByClass("invBlock")[0].classList.remove("empty");
	get("totalOutput").innerHTML = "<div class=\"boxTitle\">These are the items you need.</div><div class=\"outputRequired\">"+getItemsNeeded(items,"mini")+"</div>";
	get("whatDoYouHave").innerHTML = askUserForItems(items);
}

var resetItemLists = () => {
	travelerAscensionDone = false;
	items = [];
	getByClass("invBlock")[0].classList.add("empty");
	getByClass("invBlock")[1].classList.add("empty");
	get("totalOutput").innerHTML = "";
	get("whatDoYouHave").innerHTML = "";
	get("whatToObtain").innerHTML = "";
	get("textOutput").innerHTML = "";
	for (var _perID in ids) {
		var _id = ids[_perID].id;
		var _boxType = ids[_perID].type;
		if (_boxType == "char") {
			get(_id + "-charOutput").innerHTML = "";
		}
	}
}

// loop MakeItemIcon (above) with defaults (sans size) for needed items
var getItemsNeeded = (_items,_size="mini",_hideBelowZero=true) => {
	var _j = orderItems(_items)
	var _html = "";
	for (var _i = 0; _i < _items.length; _i++) {
		if(_items[_i].name == null) continue;
		if(_hideBelowZero && _items[_i].count < 1) continue;
		_html+=makeItemIcon(_items[_i].name,_items[_i].count,-1,_size);
	}
	return _html;
}

// ask what user has
var askUserForItems = (_items) => {
	var _html = "";
	var _maxInputSize = 4;
	var _groups = [];
	var _groupItems = [];
	for (var _i in _items) {
		if(itemDB[_items[_i].name].group!=undefined && _groups.indexOf(itemDB[_items[_i].name].group)==-1) _groups[_groups.length] = itemDB[_items[_i].name].group;
	}
	for (var _i in _groups) {
		for (var _j in itemGroupDB[_groups[_i]].items) {
			_groupItems = addItem(itemGroupDB[_groups[_i]].items[_j],0,_groupItems);
		}
	}
	_items = mergeItems(_groupItems,_items);
	orderItems(_items);
	var inv = loadInventory();
	var value = 0;
	// console.log(inv)
	_html += "<div class=\"boxTitle\">How many items do you have?</div><div class=\"outputRequired\">";
	for (var _i = 0; _i < _items.length; _i++) {
		if(inv != null && inv[_items[_i].name] != undefined) {value = inv[_items[_i].name]} else {value = 0}
		_html += "<div class=\"askForItem\">"+makeItemIcon(_items[_i].name,"<input class=\"userInvInput\" type=\"number\" size=\""+_maxInputSize+"\" min=\"0\" value=\""+value+"\" id=\"userItemCount"+spaceToUnderscore(_items[_i].name)+"\">",-1,"mini")+"</div>";
		// _html += "<div class=\"askForItem\">"+makeItemIcon(_items[_i].name,"<input class=\"userInvInput\" type=\"number\" size=\""+_maxInputSize+"\" min=\"0\" value=\""+_items[_i].count+"\" id=\"userItemCount"+spaceToUnderscore(_items[_i].name)+"\">",-1,"mini")+"</div>";
	}
	_html += "</div><br><button onclick=\"getItemsRemaining()\">Submit</button>";
	return _html;
}

// calc what's needed minus has
var userItemsLeft = [];
var getItemsRemaining = () => {
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