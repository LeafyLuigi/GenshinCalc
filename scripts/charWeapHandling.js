'use strict';
var ids = []; // statless variable, should only contain ID, Name and for Traveler, the type
var idNameIndex = []; // indexes the IDs
var selectedChars = []; // Should contain Name, ID, Current and Target stats. Gets saved to Local Storage.
var selectedCharsIndex = []; // indexes the ids

var addSelectedChar = (type,char,id) => {
	if(type == "char") {
		var current = [val(id+"-asc"),val(id+"-tal1"),val(id+"-tal2"),val(id+"-tal3")];
		var target = [val(id+"-targetAsc"),val(id+"-targetTal1"),val(id+"-targetTal2"),val(id+"-targetTal3")];
	} else {
		var current = val(id+"-asc");
		var target = val(id+"-targetAsc");
		var maxAsc = Math.floor(get(id+"-targetAsc").max);
	}
	// console.log(selectedChars,id)
	// console.log(selectedCharsIndex.indexOf(char))
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
	setLSItem("selectedChars",JSON.stringify(selectedChars))
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
	} else {
		if(forcedId!=null) console.warn("Duplicate ID when trying to force an ID. A new, random one will be generated.");
		createId(type,char,travType,length,null);
	}
	return newId;
}
var removeId = (id) => {
	resetItemLists();
	getByName(ids[idNameIndex.indexOf(id)].name)[0].disabled = false;
	removeSelectedChar(id);
	get(id).outerHTML = "";
	ids.splice(idNameIndex.indexOf(id),1);
	idNameIndex = ids.map(i => i.id);
}

var addCharacter = (char="Sangonomiya Kokomi",fromInit=false,forcedId=null) => {
	if (char == "Character") return;
	resetItemLists();
	get("dropdownCharIcon").setAttribute("src","images/char/Unknown.png");
	get("dropdownCharName").innerText = "Character";
	getByName(char)[0].disabled = true;
	var id;
	var travType = "";
	var currentValues = [0,1,1,1];
	var defaultTargets = [val("defaultTargetAsc"),val("defaultTargetTal1"),val("defaultTargetTal2"),val("defaultTargetTal3")];
	var targetValues = defaultTargets;
	if(char.indexOf("Traveler") != -1) {
		travType = char.slice(0,char.indexOf("Traveler"));
		var char2 = char;
		char = "Traveler";
		id = createId("char",char,travType.slice(0,-1),7,forcedId);
	} else {
		id = createId("char",char,null,7,forcedId);
	}
	if(forcedId != null) {
		currentValues = selectedChars[selectedCharsIndex.indexOf(forcedId)].current
		targetValues = selectedChars[selectedCharsIndex.indexOf(forcedId)].target
	}
	var html= "<div class='charBlock' id=\""+id+"\"";
	if(char == "Traveler") html+=" travtype=\""+travelerType+"\"";
	html += "><div class='topFlex'><div class='boxName'><img src='images/char/"+spaceToUnderscore(char)+".png'>"+travType+char+"</div><button class='removeButton' onclick='removeId(&quot;"+id+"&quot;)'>Remove</button></div><div class='boxTitle'>Character Stats:</div><div><span>Ascension level: </span><input size='3' type='number' min='0' max='6' value='"+currentValues[0]+"' id='"+id+"-asc'><span>Normal Attack level: </span><input size='3' type='number' min='1' max='10' value='"+currentValues[1]+"' id='"+id+"-tal1'><span>Skill level: </span><input size='3' type='number' min='1' max='10' value='"+currentValues[2]+"' id='"+id+"-tal2'><span>Burst level: </span><input size='3' type='number' min='1' max='10' value='"+currentValues[3]+"' id='"+id+"-tal3'></div><br><div class='boxTitle'>Targeted Stats:</div><div><span>Ascension level: </span><input size='3' type='number' min='0' max='6' value='"+targetValues[0]+"' id='"+id+"-targetAsc'><span>Normal attack level: </span><input size='3' type='number' min='1' max='10' value='"+targetValues[1]+"' id='"+id+"-targetTal1'><span>Skill level: </span><input size='3' type='number' min='1' max='10' value='"+targetValues[2]+"' id='"+id+"-targetTal2'><span>Burst level: </span><input size='3' type='number' min='1' max='10' value='"+targetValues[3]+"' id='"+id+"-targetTal3'></div><div id='"+id+"-charOutput'></div></div>";
	get("inputs").innerHTML += html;
	if(char2 != undefined) char = char2;
	if(!fromInit) addSelectedChar("char",char,id);
	var j = ["asc","tal1","tal2","tal3","targetAsc","targetTal1","targetTal2","targetTal3"]
	for(var i in j) {
		get(id+"-"+j[i]).setAttribute("onchange","addSelectedChar(\"char\",\""+char+"\",\""+id+"\");forceValue(this.id,this.value)")
	}
}
var addWeapon = (char="The Catch",fromInit=false,forcedId=null) => {
	if (char == "Weapon") return;
	resetItemLists();
	var rarity = get("dropdownWeaponName").getAttribute("rarity");
	get("dropdownWeaponIcon").setAttribute("src","images/weapon/Unknown.png");
	get("dropdownWeaponName").setAttribute("rarity",0);
	get("dropdownWeaponName").innerText = "Weapon";
	getByName(char)[0].disabled = true;
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
	var html = "<div class='weaponBlock' id=\""+id+"\"><div class='topFlex'><div class='boxName'><img src='images/weapon/"+spaceToUnderscore(char)+".png'>"+title+"</div><button class='removeButton' onclick='removeId(&quot;"+id+"&quot;)'>Remove</button></div><div class='boxTitle'>Weapon Stats:</div><div><span>Ascension level: </span><input size='3' type='number' min='0' max='"+maxAsc+"' value='"+current+"' id='"+id+"-asc'></div><br><div class='boxTitle'>Targeted Stats:</div><div><span>Ascension level: </span><input size='3' type='number' min='0' max='"+maxAsc+"' value='"+target+"' id='"+id+"-targetAsc'></div><div id='"+id+"-weapOutput'></div></div>";
	// console.log(html);
	get("inputs").innerHTML += html;
	if(!fromInit) addSelectedChar("weapon",char,id);
	var j = ["asc","targetAsc"]
	for(var i in j) {
		// console.log(get(id+"-"+j[i]))
		get(id+"-"+j[i]).setAttribute("onchange","addSelectedChar(\"weapon\",\""+char+"\",\""+id+"\");forceValue(this.id,this.value)")
	}
}


var forceValue = (id, value) => {
	get(id).setAttribute("value",value);
}