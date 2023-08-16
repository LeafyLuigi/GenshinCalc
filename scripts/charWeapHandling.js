'use strict';
var ids = []; // statless variable, should only contain ID, Name and for Traveler, the type
var idNameIndex = []; // indexes the IDs
var idCharNameIndex = []; // indexes the names :))))
var selectedChars = []; // Should contain Name, ID, Current and Target stats. Gets saved to Local Storage.
var selectedCharsIndex = []; // indexes the ids

var travTypeIndex = chars["Traveler"].regions.map(i=>i.type); // trav is weird lol

const selectedCharVersion = 0.01;

var addSelectedChar = (type,char,id) => {
	if(type == "char") {
		var current = [val(id+"-charLvl"),val(id+"-asc"),val(id+"-tal1"),val(id+"-tal2"),val(id+"-tal3")];
		var target = [val(id+"-targetCharLvl"),val(id+"-targetAsc"),val(id+"-targetTal1"),val(id+"-targetTal2"),val(id+"-targetTal3")];
	} else {
		var current = val(id+"-asc");
		var target = val(id+"-targetAsc");
		var maxAsc = Math.floor(get(id+"-targetAsc").max);
	}
	if(selectedCharsIndex.indexOf(id) != -1) {
		selectedChars[selectedCharsIndex.indexOf(id)].current = current;
		selectedChars[selectedCharsIndex.indexOf(id)].target = target;
	} else {
		if(type == "char") {
			selectedChars[selectedChars.length] = {"name": char, "id": id, "current": current, "target": target};
		} else {
			selectedChars[selectedChars.length] = {"name": char, "id": id, "current": current, "target": target, "maxAsc": maxAsc};
		}
	}
	selectedCharsIndex = selectedChars.map(i => i.id);
	setLSItem("selectedChars",JSON.stringify(selectedChars));
}
var getSelectedChars = () => {
	try {
		var selectedChars = JSON.parse(getLSItem("selectedChars"));
	}
	catch {
		console.warn("Selected Characters was corrupted; returning empty array.")
		return [];
	}
	return selectedChars;

}
var removeSelectedChar = (id) => {
	if(selectedCharsIndex.indexOf(id) == -1) return;
	selectedChars.splice(selectedCharsIndex.indexOf(id),1);
	selectedCharsIndex = selectedChars.map(i => i.id);
	if(JSON.stringify(selectedChars) == "[]") {
		clearLSItem("selectedChars");
	} else {
		setLSItem("selectedChars",JSON.stringify(selectedChars))
	}
}

var createId = (type="char",char="",travType=null,length=7,forcedId=null) => {
	var newId = "";
	if(forcedId != null) {
		newId = forcedId;
	} else {
		var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
		for (var i = 0; i < length; i++) {
			newId += letters.charAt(Math.floor(Math.random() * letters.length));
		}
	}
	if (idNameIndex.indexOf(newId) == -1) {
		if(travType == null) {
			ids[ids.length] = {"id": newId, "type": type, "name": char};
		} else {
			ids[ids.length] = {"id": newId, "type": type, "name": char, "travType": travType};
		}
		idNameIndex = ids.map(i => i.id);
		idCharNameIndex = ids.map(i => i.name);
	} else {
		if(forcedId!=null) console.warn("Duplicate ID when trying to force an ID. A new, random one will be generated.");
		createId(type,char,travType,length,null);
	}
	return newId;
}
var removeId = (id) => {
	resetItemLists();
	getByName(ids[idNameIndex.indexOf(id)].name)[0].removeAttribute("disabled");
	removeSelectedChar(id);
	get(id).outerHTML = "";
	ids.splice(idNameIndex.indexOf(id),1);
	idNameIndex = ids.map(i => i.id);
	idCharNameIndex = ids.map(i => i.name);
}

var addCharacter = (char="Lynette",fromInit=false,forcedId=null,charPage=false,isTrav=false,forceStats=[1,0,1,1,1]) => {
	if(char.indexOf("Traveler") != -1) {
		var pos = travTypeIndex.indexOf(char.slice(0,char.indexOf("Traveler")-1))
	} else {
		if(chars[char] == undefined) return;
		if(idCharNameIndex.indexOf(char) != -1) return;
	}
	if(!charPage) {
		resetItemLists();
		get("dropdownCharIcon").setAttribute("src","images/char/Unknown.png");
		get("dropdownCharName").value = "";
		getByName(char)[0].setAttribute("disabled","true");
	}
	var id;
	var travType = "";
	var weapon, region, type = null;
	var currentValues = forceStats;
	if(!charPage) {
		var defaultTargets = [val("defaultTargetCharLvl"),val("defaultTargetAsc"),val("defaultTargetTal1"),val("defaultTargetTal2"),val("defaultTargetTal3")];
		var targetValues = defaultTargets;
	}
	if(char.indexOf("Traveler") != -1) {
		travType = char.slice(0,char.indexOf("Traveler"));
		id = createId("char",char,travType.slice(0,-1),7,forcedId);
		type = chars["Traveler"].regions[pos].type;
		weapon = chars["Traveler"].weapon;
		region = chars["Traveler"].regions[pos].region;
	} else {
		id = createId("char",char,null,7,forcedId);
		type = chars[char].type;
		weapon = chars[char].weapon;
		region = chars[char].region;
	}
	if(forcedId != null) {
		currentValues = selectedChars[selectedCharsIndex.indexOf(forcedId)].current
		targetValues = selectedChars[selectedCharsIndex.indexOf(forcedId)].target
	}
	var html= "<div class='charBlock' id=\""+id+"\"";
	var charName = char;
	var img = spaceToUnderscore(char);
	if(char.indexOf("Traveler") != -1) {
		html+=" travtype=\""+pos+"\"";
		img = "Traveler";
	}
	html += "><div class='topFlex'><div class='boxName'><img loading='lazy' width='64' height='64' src='images/char/"+img+".png'>"+charName;
	if(img != "Traveler") {
		if(region != undefined) html+="<img loading='lazy' class='extraIcon vision' width='48' height='48' src='images/icons/visions/"+region+"_"+type+".png'>";
		if(chars[charName].vision !== undefined) html+= "<img loading='lazy' class='extraIcon vision' width='48' height='48' src='images/icons/visions/"+chars[charName].vision+".png'>";
	} else {
		html+= "<img loading='lazy' class='extraIcon vision' width='48' height='48' src='images/icons/visions/Traveler_"+type+".png'>";
	}
	if(weapon !== undefined) html+="<img loading='lazy' class='extraIcon' width='32' height='32' src='images/icons/weapon/"+weapon+".png'>";
	html +="</div>";
	if(!charPage) {
		html+="<button class='removeButton' onclick='removeId(&quot;"+id+"&quot;)'>Remove</button>";
	} else {
		html+="<div>Owned?<input class=\"ownedCheckbox\" type=\"checkbox\" id=\""+id+"-owned\"";
		if(isTrav) html+=" checked disabled";
		html+="></div>";
	}
	if(currentValues.length == 4) currentValues = [0,...currentValues];
	html+="</div><div class='boxTitle'>Character Stats:</div><div class='charWeapInputs'><span>Character Level:</span><input type='number' size='3' min='1' max='90' value='"+currentValues[0]+"' id='"+id+"-charLvl'><span>Ascension level: </span><input size='3' type='number' min='0' max='6' value='"+currentValues[1]+"' id='"+id+"-asc'><span>Normal Attack level: </span><input size='3' type='number' min='1' max='10' value='"+currentValues[2]+"' id='"+id+"-tal1'><span>Skill level: </span><input size='3' type='number' min='1' max='10' value='"+currentValues[3]+"' id='"+id+"-tal2'><span>Burst level: </span><input size='3' type='number' min='1' max='10' value='"+currentValues[4]+"' id='"+id+"-tal3'></div>";
	if(!charPage) {
		html+="<br><div class='boxTitle'>Targeted Stats:</div><div class='charWeapInputs'><span>Character Level:</span><input type='number' size='3' min='1' max='90' value='"+targetValues[0]+"' id='"+id+"-targetCharLvl'><span>Ascension level: </span><input size='3' type='number' min='0' max='6' value='"+targetValues[1]+"' id='"+id+"-targetAsc'><span>Normal attack level: </span><input size='3' type='number' min='1' max='10' value='"+targetValues[2]+"' id='"+id+"-targetTal1'><span>Skill level: </span><input size='3' type='number' min='1' max='10' value='"+targetValues[3]+"' id='"+id+"-targetTal2'><span>Burst level: </span><input size='3' type='number' min='1' max='10' value='"+targetValues[4]+"' id='"+id+"-targetTal3'></div><div id='"+id+"-charOutput'></div>";
	}
	html+="</div>";
	if(!charPage) {
		get("inputs").innerHTML += html;
	} else {
		var array = [html,char,id];
		return array;
	}
	if(!fromInit) addSelectedChar("char",char,id);
	var j = ["charLvl","asc","tal1","tal2","tal3","targetCharLvl","targetAsc","targetTal1","targetTal2","targetTal3"]
	for(var i in j) {
		get(id+"-"+j[i]).setAttribute("onchange","addSelectedChar(\"char\",\""+char+"\",\""+id+"\");forceValue(this.id,this.value,this.min,this.max)");
	}
	get(id+"-charLvl").setAttribute("oninput","fixAscFromLevel(this.id,this.value)");
	get(id+"-targetCharLvl").setAttribute("oninput","fixAscFromLevel(this.id,this.value)");
	get(id+"-asc").setAttribute("oninput","fixLevelFromAsc(this.id,this.value)");
	get(id+"-targetAsc").setAttribute("oninput","fixLevelFromAsc(this.id,this.value)");
}
var addWeapon = (char="The Catch",fromInit=false,forcedId=null) => {
	char = removeQuotes(char);
	if(weapDB[char] == undefined) return;
	resetItemLists();
	var rarity = get("dropdownWeaponName").getAttribute("rarity");
	get("dropdownWeaponIcon").setAttribute("src","images/weapon/Unknown.png");
	get("dropdownWeaponName").setAttribute("rarity",0);
	get("dropdownWeaponName").value = "";
	var title = char;
	var current = 0;
	var target = val("defaultWeaponAsc");
	var maxAsc = 6;
	if (weapDB[char].title != undefined) title = weapDB[char].title;
	if (rarity <= 2 && target > 4) {target = 4}
	if (rarity <= 2) {maxAsc = 4}
	if(forcedId != null) {
		current = selectedChars[selectedCharsIndex.indexOf(forcedId)].current
		target = selectedChars[selectedCharsIndex.indexOf(forcedId)].target
		maxAsc = selectedChars[selectedCharsIndex.indexOf(forcedId)].maxAsc
	}
	var id = createId("weapon",char,null,7,forcedId);
	var type = weapDB[char].type;
	var html = "<div class='weaponBlock' id=\""+id+"\"><div class='topFlex'><div class='boxName'><img loading='lazy' src='images/weapon/"+spaceToUnderscore(char)+".png'>"+title+"<img loading='lazy' class='extraIcon' width='32' height='32' src='images/icons/weapon/"+type+".png'></div><button class='removeButton' onclick='removeId(&quot;"+id+"&quot;)'>Remove</button></div><div class='boxTitle'>Weapon Stats:</div><div class='charWeapInputs'><span>Ascension level: </span><input size='3' type='number' min='0' max='"+maxAsc+"' value='"+current+"' id='"+id+"-asc'></div><br><div class='boxTitle'>Targeted Stats:</div><div class='charWeapInputs'><span>Ascension level: </span><input size='3' type='number' min='0' max='"+maxAsc+"' value='"+target+"' id='"+id+"-targetAsc'></div><div id='"+id+"-weapOutput'></div></div>";
	get("inputs").innerHTML += html;
	if(!fromInit) addSelectedChar("weapon",char,id);
	var j = ["asc","targetAsc"]
	for(var i in j) {
		get(id+"-"+j[i]).setAttribute("onchange","addSelectedChar(\"weapon\",\""+char+"\",\""+id+"\");forceValue(this.id,this.value,this.min,this.max)")
	}
}
var forceValue = (id, value, min="", max="") => {
	// console.log([id,value,min,max])
	get(id).setAttribute("value",value);
	if(min !== "") {
		min = Math.floor(min);
		if(value < min) get(id).value = min;
	}
	if(max !== "") {
		max = Math.floor(max);
		if(value > max) get(id).value = max;
	}
}


// save/load to localstorage
var saveCharacters = () => {
	var userCharOwnedCheckboxes = getByClass("ownedCheckbox");
	var userChars = "\"version\":"+selectedCharVersion+",";
	var ownedChars = loadInventory();
	var tested = [];
	for(var i = 0; i < userCharOwnedCheckboxes.length; i++) {
		if(ownedChars == null) {ownedChars = []}
		if(val(userCharOwnedCheckboxes[i].id) == 0 && ownedChars[underscoreToSpace(userCharOwnedCheckboxes[i].id.slice(13))] == undefined) continue;
		tested[tested.length] = underscoreToSpace(userCharOwnedCheckboxes[i].id.slice(13));
		userChars += "\""+underscoreToSpace(userCharOwnedCheckboxes[i].id.slice(13))+"\":"+val(userCharOwnedCheckboxes[i].id)+",";
	}
	for(var i in ownedChars) {
		if(tested.indexOf(i) != -1) continue;
		userChars += "\""+i+"\":"+ownedChars[i]+",";
	}
	userChars = "{"+userChars.slice(0,-1)+"}";
	if(userChars == "{}") return;
	setLSItem("char",encodeURIComponent(userChars));
}
var loadCharacters = () => {
	try {
		var char = JSON.parse(decodeURIComponent(getLSItem("char")));
	}
	catch {
		console.error("Character list was corrupted; returning empty string.")
		return "";
	}
	if(char.version == undefined || char.version != selectedCharVersion) {
		console.warn("Saved character list version may not be fully compatible with the current version.");
	}
	return char;
}

var fixAscFromLevel = (id,lvl) => {
	lvl = Math.floor(lvl);
	var charId = id.slice(0,7);
	// charAscAtLevels
	var isTarg = false;
	if(id.indexOf("target") != -1) {
		isTarg = true;
	// 	var asc = val(charId+"-targetAsc");
	// } else {
	// 	var asc = val(charId+"-asc");
	}
	var intendedAsc = 6; // fallback for max
	for(var i = 0; i < charAscAtLevels.length; i++) {
		if(lvl <= charAscAtLevels[i]) {
			intendedAsc = i;
			break;
		}
	}
	if(!isTarg) {
		get(charId+"-asc").value = intendedAsc;
	} else {
		get(charId+"-targetAsc").value = intendedAsc;
	}
	// console.log([id,lvl,asc,intendedAsc]);
}
var fixLevelFromAsc = (id,asc) => {
	asc = Math.floor(asc);
	var charId = id.slice(0,7);
	var isTarg = false;
	if(id.indexOf("target") != -1) {
		isTarg = true;
		var level = val(charId+"-targetCharLvl");
	} else {
		var level = val(charId+"-charLvl");
	}
	var newLevel = 0;
	var minLevel = 1;
	var maxLevel = 90;
	if(asc != 0) minLevel = charAscAtLevels[asc - 1];
	if(asc != charAscAtLevels.length) maxLevel = charAscAtLevels[asc];
	if(level > maxLevel) newLevel = maxLevel;
	if(level < minLevel) newLevel = minLevel;
	if(newLevel != 0 && !isTarg) get(charId+"-charLvl").value = newLevel;
	if(newLevel != 0 && isTarg) get(charId+"-targetCharLvl").value = newLevel;
	// console.log([id,asc,level,minLevel,maxLevel,newLevel]);
}