'use strict';
var pageType = ""; // valid values are "index", "party", "characters", "inventory" and "debug".
var ids = {}; // should be id:<target>. example: "asdf" is a "Dull Blade" it should be asdf:"Dull Blade".
var idIndex = []; // An array of currently used IDs.
// var idCharNameIndex = []; // indexes the names :))))
var selectedChars = []; // Should contain Name, ID, Current and Target stats. Gets saved to Local Storage.
var selectedCharsIndex = []; // indexes the following in priority order: char name, traveler element (as number), weapon id
var weaponInfoIndex = {}; // Contains info for currently saved weapons. Should match the localStorage item for them.
var weaponIDIndex = {}; // Contains Weapons with an array of IDs.
var artifactInfoIndex = {}; // Contains info for the currently saved artifacts. Should match the localStorage item for them.
var artifactIDIndex = {}; // Contains Artifacts with either an object with an array of IDs or an array of IDs for sets with one type.
var charInfoIndex = {}; // Contains info for every character. Should match the localStorage item for them.
var setsIDIndex = {}; // Contains set IDs for characters, sorted by characters. The data for them are in charInfoIndex[$char].sets
// var idsToCheck = []; // might be used later. not sure yet~

const selectedCharVersion = "0.02";

// ids and idIndex initialization - Parties only get added on that page. These shouldn't go off on the inventory page.
var loadIDs = () => {
	if(pageType == "inventory" || pageType == "debug") return; // skip on inv and debug. skip on undefined page
	loadWeaponIDs();
	loadArtifactIDs();
	loadCharacterIDs();
}
var loadWeaponIDs = () => {
	if(typeof(weapDB) == "undefined") return;
	// Weapons
	for(let i in weapDB) {
		if(getLSItem(i) === null) continue;
		let lsItem = parseLSItem(i,[]);

		if(JSON.stringify(lsItem) == "[]") {
			console.warn(i+" exists in localStorage but could not be parsed. Skipping.");
			continue;
		}

		weaponInfoIndex[i] = lsItem;
		weaponIDIndex[i] = lsItem.map(i=>i.id);
		let weapIndex = weaponIDIndex[i];
		for(let j=0;j<weapIndex.length;j++) {
			ids[weapIndex[j]] = "weap--"+i;
			idIndex.push(weapIndex[j]);
		}
	}
}
var loadArtifactIDs = () => {
	if(typeof(artifactDB) == "undefined") return;
	// Artifacts
	for(let i in artifactDB) {
		if(getLSItem(i) === null) continue;
		let lsItem = parseLSItem(i,{}); // set as object for more than one types. should be an array for sets with one type.

		if(JSON.stringify(lsItem) == "{}") {
			console.warn(i+" exists in localStorage but could not be parsed. Skipping.");
			continue;
		}
		
		if(allArtifactGroupsWithOneType.indexOf(i) != -1) {
			// artifact sets with one type (eg Prayers for Wisdom) - lsItem should be an array.
			artifactInfoIndex[i] = lsItem;
			artifactIDIndex[i] = lsItem.map(i=>i.id);
			let artiIndex = artifactIDIndex[i];
			for(let j=0;j<artiIndex.length;j++) {
				ids[artiIndex[j]] = "arti--"+i;
				idIndex.push(artiIndex[j]);
			}
		} else {
			// artifact sets with more than one type
			artifactInfoIndex[i] = lsItem;
			artifactIDIndex[i] = {}; // gotta initialize it
			// aaaand go through each type now
			for(let j=0;j<artifactTypes.length;j++) {
				if(lsItem[artifactTypes[j]] == undefined) continue; // skip empty lists
				let artiType = artifactTypes[j];
				artifactIDIndex[i][artiType] = lsItem[artiType].map(i=>i.id);
				let artiIndex = artifactIDIndex[i][artiType];
				for(let k=0;k<artiIndex.length;k++) {
					ids[artiIndex[k]] = "arti--"+i+"--"+artiType;
					idIndex.push(artiIndex[k]);
				}
			}
		}
	}
}
var loadCharacterIDs = () => {
	if(typeof(charDB) == "undefined") return;
	// Characters - missing weapons and artifacts will be deleted from the character.
	for(let i in charDB) {
		if(getLSItem(i) === null) continue;
		let lsItem = parseLSItem(i,[]);

		if(JSON.stringify(lsItem) == "[]") {
			console.warn(i+" exists in localStorage but could not be parsed. Skipping.");
			continue;
		}

		charInfoIndex[i] = lsItem;
		if(lsItem.sets != undefined) {
			setsIDIndex[i] = [];
			let setsMap = lsItem.sets.map(i=>i.id);
			for(let j=0;j<setsMap.length;j++) {
				let set = lsItem.sets[j];
				setsIDIndex[i].push(set.id);
				ids[set.id] = "set--"+i;
				idIndex.push(set.id);
				if(set.weapon != undefined && typeof(weapDB) != "undefined" && idIndex.indexOf(set.weapon) == -1) {
					console.warn(i+" has a missing weapon in "+set.id+". It will be reset.");
					delete set.weapon;
				}
				if(set.artifacts != undefined && typeof(artifactDB) != "undefined") {
					for(let k=0;k<set.artifacts.length;k++) {
						if(set.artifacts[k] == null) continue; // skip empty artifacts (null)
						if(idIndex.indexOf(set.artifacts[k]) == -1) {
							console.warn(i+" has a missing artifact in "+set.id+" for "+artifactTypes[k]+". That artifact will be reset.");
							set.artifacts[k] = null;
						}
					}
				}
			}
		}
	}
}
loadIDs();

var addSelectedChar = (type,selectedName,id=null,rarity=null) => {
	var travType;
	if(type === "char") {
		if(selectedName.indexOf("Traveler") != -1) {
			// Traveler stuff
			travType = travTypeOrder.indexOf(selectedName.slice(0,selectedName.indexOf("Traveler") - 1));
			if(selectedCharsIndex.indexOf("Traveler") != -1) {
				// trav exists in selected charDB
				selectedChars.push({useTravElement: travType});
				selectedChars[selectedCharsIndex.indexOf("Traveler")].byElement[travType].targetTalents = charTargets.talents;
			} else {
				// trav doesn't exist, push new to charDB
				selectedChars.push({name:"Traveler",useTravElement:travType,targetExp:charTargets.exp,ascension:charTargets.ascension,byElement:[]});
				for(let i = 0;i < travTypeOrder.length;i++) {
					selectedChars[selectedChars.length - 1].byElement.push({});
				}
				selectedChars[selectedChars.length - 1].byElement[travType].targetTalents = charTargets.talents;
			}
		} else {
			selectedChars.push({name:selectedName,targetExp:charTargets.exp,targetTalents:charTargets.talents,ascension:charTargets.ascension});
		}
	} else if (type === "weap") {
		if(rarity === null || rarity > 5 || rarity < 1 || typeof(rarity) != "number") {
			throw new Error("Rarity must be a number between 1 and 5 inclusive.");
		}
		if(id === null) {
			id = createID("weap--"+selectedName);
		}
		var exp = weaponTargets.byRarity[rarity - 1].exp, ascension = weaponTargets.byRarity[rarity - 1].ascension;
		if(!prefs.showAdvancedWeaponInputs) {
			if(!weaponTargets.basicTargetMaxLevel) {
				exp = 0;
			}
			if(rarity < 3 && weaponTargets.basicAscension > 4) {
				ascension = 4
			} else {
				ascension = weaponTargets.basicAscension;
			}
		}
		selectedChars.push({name:selectedName,id:id,targetExp:exp,ascension:ascension});
	}

	selectedCharsIndex = selectedChars.map(i => {
		if(i.id != undefined) {return i.id}
		if(i.useTravElement != undefined && i.name == undefined) {return i.useTravElement}
		return i.name;
	});
	setLSItem("selectedChars",JSON.stringify(selectedChars));
}
var editSelectedChar = (char,element,travElement=null,rarity=null) => {
	let item = null;
	let id = element.id, value = element.valueAsNumber;
	var offset = 0;
	if(element.min != "") {
		let min = Math.floor(element.min);
		if(min == 4 && element.classList.contains("conBonus")) offset = 3;
	}
	console.log(char,element)
	if(travElement !== null) {
		// console.log("travElement is not null. attempting to find trav.");
		item = selectedChars[selectedCharsIndex.indexOf("Traveler")].byElement[travElement];
	} else if( (char == "Traveler" && travElement === null) || char != "Traveler") {
		item = selectedChars[selectedCharsIndex.indexOf(char)];
	}
	// rarity is for weapons
	if(rarity !== null && (rarity > 5 || rarity < 1 || typeof(rarity) != "number")) {
		throw new Error("Rarity must be a number between 1 and 5 inclusive.");
	}

	// target talents
	let talToChange = id.indexOf("-targTal") != -1 ? Math.floor(id.slice(-1)) -1 : null;
	if(talToChange != null) {
		if(item.useTravElement != undefined) {
			// "traveler" with byElement talent editing
			item.byElement[item.useTravElement].targetTalents[talToChange] = value - offset;
		} else {
			// non-trav talents
			// "traveler" only with useTravElement talent editing (cannot edit anything but talents)
			item.targetTalents[talToChange] = value - offset;
		}
	}
	// target ascension
	if(id.indexOf("-targAsc") != -1) {
		item.ascension = value;
	}
	// target exp
	if(id.indexOf("-targLvl") != -1 || id.indexOf("-targExpRemainder") != -1) {
		// console.log("level stuff goes here. rarity needed for weapons");
		if(rarity !== null) {
			item.targetExp = getExpFromLevel("weap",val(char+"-targLvl"),rarity) // + val(char+"-targetExpRemainder");
		} else {
			item.targetExp = getExpFromLevel("char",val(char+"-targLvl")) //+ val(char+"-targetExpRemainder");
		}
		// item.targetExp = value;
	}
	setLSItem("selectedChars",JSON.stringify(selectedChars));
}

var getSelectedChars = () => {
	selectedChars = parseLSItem("selectedChars",[]);
	if(typeof(selectedChars) == "string") {
		console.log("Somehow it needed another parse.")
		try {
			selectedChars = JSON.parse(selectedChars);
		}
		catch {
			console.warn("It failed the second parse. Returning empty array.");
			return [];
		}
	}
	// console.log(typeof(selectedChars),selectedChars)
	if (getLSItem("selectedCharVersion") !== null && getLSItem("selectedCharVersion") != selectedCharVersion) {
		console.warn("Saved character list version may not be fully compatible with the current version. It will attempt to be updated.");

		// Convert old characters from asc/NA/S/B to lvl/asc/NA/S/B
		if(getLSItem("selectedCharVersion") == undefined) {
			for (var i = 0; i < selectedChars.length; i++) {
				if(Array.isArray(selectedChars[i].current) && selectedChars[i].current.length == 4) {
					selectedChars[i].current.unshift(1);				
				}
				if(Array.isArray(selectedChars[i].target) && selectedChars[i].target.length == 4) {
					selectedChars[i].target.unshift(val("defaultTargetCharLvl"));
				}
			}
		}
		
		// Convert from format [{name:$name,id:$id}] for charDB to [{name:$name}]. saved stats are within character now.
		if(getLSItem("selectedCharVersion") === "\"0.01\"") {
			var travExpDone = false, travAscDone = false, travPosition = undefined;
			for(let i in selectedChars) {
				// console.log(i)
				let item = selectedChars[i];
				var text = "";
				// console.log("selectedChars[i]",selectedChars[i]);
				
				if(item.name.indexOf("Traveler") != -1) {
					// TRAVELER
					let travType = travTypeOrder.indexOf(item.name.slice(0,item.name.indexOf(" Traveler")));
					if(travPosition === undefined) travPosition = i;
					if(getLSItem("Traveler") != undefined) {
						text = "Traveler exists within localStorage. selectedCharacters is using type "+travTypeOrder[travType]+".";
						var lsItem = parseLSItem("Traveler",null);
						if(lsItem === null) {
							text += " Could not parse. Below is the localStorage's previous JSON.";
							get("selectedCharsIssues").appendChild(Object.assign(document.createElement("div"),{textContent:text}));
							get("selectedCharsIssues").appendChild(Object.assign(document.createElement("pre"),{textContent: getLSItem("Traveler")}));
							continue;
						}
						var sc_exp = getExpFromLevel("char",item.current[0]), ls_exp = lsItem.exp != undefined ? lsItem.exp : 0;
						if(!travExpDone) {
							if(sc_exp != ls_exp) {
								// lsItem.exp = sc_exp;
								text += " Total exp (level + remainder) has been changed from "+ls_exp+" to "+sc_exp+".";
							}
							travExpDone = true;
						}
						var sc_asc = item.current[1], ls_asc = lsItem.ascension != undefined ? lsItem.ascension : 0;
						if(!travAscDone) {
							if(sc_asc != ls_asc) {
								text += " Ascension has been changed from "+ls_asc+" to "+sc_asc+".";
							}
							travAscDone = true;
						}

						if(lsItem.byElement === undefined) {
							lsItem.byElement = [];
							for(let i = 0;i < travTypeOrder.length;i++) {
								lsItem.byElement[i] = {};
							}
						}
						let element = lsItem.byElement[travType];
						var sc_talents = [item.current[2],item.current[3],item.current[4]];
						let ls_talents = element.talents != undefined ? element.talents : [1,1,1];
						for(let i in charTalentNames) {
							if(sc_talents[i] != ls_talents[i]) {
								// lsItem.talents[i] = sc_talents[i];
								text += " "+charTalentNames[i]+" has been changed from "+ls_talents[i]+" to "+sc_talents[i]+".";
							}
						}
						// console.log(selectedChars[i],sc_exp,ls_exp);
						setLSItem(item.name,JSON.stringify(lsItem));

					} else {
						let newLSItem = {};
						let emptyArrString = [];
						newLSItem.byElement = [];
						for(let i = 0;i < travTypeOrder.length;i++) {
							newLSItem.byElement[i] = {};
							emptyArrString[i] = {};
						}
						if(item.current[1] != 0) newLSItem.ascension = item.current[1];
						travAscDone = true;
						if(JSON.stringify([item.current[2],item.current[3],item.current[4]]) != "[1,1,1]") {
							newLSItem.byElement[travType].talents = [item.current[2],item.current[3],item.current[4]];
						}
						if(item.current[0] != 1) newLSItem.exp = getExpFromLevel("char",item.current[0]);
						travExpDone = true;
						
						if(JSON.stringify(newLSItem.byElement) != JSON.stringify(emptyArrString)) {
							if(travType != 0 && travType != 1) newLSItem.byElement[travType].owned = true;
						}
						setLSItem("Traveler",JSON.stringify(newLSItem));
						text = "Traveler did not exist in localStorage. Any warnings related to Traveler can be ignored.";
					}
					if(i != travPosition) {
						selectedChars[travPosition].byElement[travType].targetTalents = [item.target[2],item.target[3],item.target[4]]; 
						selectedChars[i] = new Object({useTravElement:travType})
					} else {
						let old = new Object({byElement:[],exp:getExpFromLevel("char",item.target[0]),asc:item.target[1],useTrav:travType});
						for(let i = 0; i < travTypeOrder.length;i++) {
							old.byElement[i] = {};
						}
						old.byElement[travType].targetTalents = [item.target[2],item.target[3],item.target[4]];
						selectedChars[i] = {name:"Traveler",byElement:old.byElement,targetExp:old.exp,useTravElement:old.useTrav};
					}
					if(text!="") get("selectedCharsIssues").appendChild(Object.assign(document.createElement("div"),{textContent:text}));


				} else if (charDB[item.name] != undefined) {
					// NON-TRAVELER CHARACTERS
					// console.debug(item.name+" found in charDB");
					if(getLSItem(item.name) != undefined) {
						text = item.name+" exists within localStorage.";
						var lsItem = parseLSItem(item.name,null);
						if(lsItem === null) {
							text += " Could not parse. Below is the localStorage's previous JSON.";
							get("selectedCharsIssues").appendChild(Object.assign(document.createElement("div"),{textContent:text}));
							get("selectedCharsIssues").appendChild(Object.assign(document.createElement("pre"),{textContent: getLSItem(item.name)}));
							continue;
						}
						var sc_exp = getExpFromLevel("char",item.current[0]), ls_exp = lsItem.exp != undefined ? lsItem.exp : 0;
						if(sc_exp != ls_exp) {
							text += " Total exp (level + remainder) has been changed from "+ls_exp+" to "+sc_exp+".";
						}
						var sc_asc = item.current[1], ls_asc = lsItem.ascension != undefined ? lsItem.ascension : 0;
						if(sc_asc != ls_asc) {
							text += " Ascension has been changed from "+ls_asc+" to "+sc_asc+".";
						}
						var sc_talents = [item.current[2],item.current[3],item.current[4]], ls_talents = lsItem.talents != undefined ? lsItem.talents : [1,1,1];
						for(let i in charTalentNames) {
							if(sc_talents[i] != ls_talents[i]) {
								// lsItem.talents[i] = sc_talents[i];
								text += " "+charTalentNames[i]+" has been changed from "+ls_talents[i]+" to "+sc_talents[i]+".";
							}
						}
						// console.log(selectedChars[i],sc_exp,ls_exp);
						setLSItem(item.name,JSON.stringify(lsItem));
					} else {
						if(item.current != undefined) {
							let newLSItem = {};
							if(item.current[0] != 1) newLSItem.exp = getLevelFromExp("char",item.current[0]);
							if(item.current[1] != 0) newLSItem.ascension = item.current[1];
							if(JSON.stringify([item.current[2],item.current[3],item.current[4]]) != "[1,1,1]") newLSItem.talents = [item.current[2],item.current[3],item.current[4]];
							if(JSON.stringify(newLSItem) != "{}") setLSItem(item.name,JSON.stringify(newLSItem));
						}
					}
					if(item.target != undefined) {
						let old = new Object({name:item.name,exp:getExpFromLevel("char",item.target[0]),asc:item.target[1],tal:[item.target[2],item.target[3],item.target[4]]})
						selectedChars[i] = {};
						selectedChars[i].name = old.name;
						selectedChars[i].targetExp = old.exp;
						selectedChars[i].ascension = old.asc;
						selectedChars[i].targetTalents = old.tal;
					}
					if(text!="") get("selectedCharsIssues").appendChild(Object.assign(document.createElement("div"),{textContent:text}));
				} else {
					// WEAPONS
					// no pre-existing localStorage item existed for weapons HOWEVER if multiple are included in the same lot, this'll need to be used.
					// console.debug(item.name+" found in selectedChars")
					var lsItem = null,newItem = {};
					if(getLSItem(item.name) != undefined) {
						text = item.name+" exists within localStorage."
						lsItem = parseLSItem(item.name,null);
						if(lsItem !== null && !Array.isArray(lsItem)) {
							text += " localStorage was either null or not able to be parsed. Aborting.";
							get("selectedCharsIssues").appendChild(Object.assign(document.createElement("div"),{textContent:text}));
							continue;
						}
					}
					if(lsItem === null) {
						lsItem = [];
					}
					selectedChars[i] = {};
					selectedChars[i].name = item.name;

					newItem.id = item.id != undefined ? item.id : createID("weap--"+item.name);
					selectedChars[i].id = newItem.id;

					newItem.ascension = item.current != undefined ? item.current : 0;
					selectedChars[i].ascension = item.target;

					newItem.exp = 0;
					selectedChars[i].targetExp = newItem.exp;

					if(weapDB[item.name].rarity > 2 && weapDB[item.name].canRefine !== false) {
						newItem.refinement = 1;
					}
					lsItem.push(newItem);
					if(weaponIDIndex[item.name] == undefined) weaponIDIndex[item.name] = [];
					weaponIDIndex[item.name].push(newItem.id);
					setLSItem(item.name,JSON.stringify(lsItem));
					if(text!="") get("selectedCharsIssues").appendChild(Object.assign(document.createElement("div"),{textContent:text}));
				}
			}
			if(JSON.stringify(weaponIDIndex != "{}")) {
				setLSItem("weaponIDIndex",JSON.stringify(weaponIDIndex))
			}
		}

		// console.log(selectedCharVersion);
		// console.log("newSelectedChars:",selectedChars);

		setLSItem("selectedCharVersion",selectedCharVersion);
		setLSItem("selectedChars",JSON.stringify(selectedChars))
	}
	return selectedChars;
}

var removeSelectedChar = (id) => {
	let isTrav = false, nextTrav = undefined;
	if(id.indexOf(" Traveler") != -1) {
		// checks if this is the initial "Traveler" or one of the types (int)
		let travType = travTypeOrder.indexOf(id.slice(0,id.indexOf(" Traveler")));
		if(selectedCharsIndex.indexOf(travType) != -1) {
			// not initial traveler
			isTrav = travType;
			id = travType;
		} else if(selectedCharsIndex.indexOf("Traveler") != -1) {
			// initial traveler
			isTrav = selectedCharsIndex.indexOf("Traveler");
			id = "Traveler";
			// check if other traveler types exist
			for(let i = 0; i < selectedCharsIndex.length && nextTrav === undefined; i++) {
				if(Number.isInteger(selectedCharsIndex[i])) {
					nextTrav = i;
				}
			}
			if(nextTrav === undefined) {
				nextTrav = null;
			}
		} else {
			throw new Error("Malformed Traveler input.");
		}
	}
	// console.info(id,"used with isTrav being",isTrav)
	if(selectedCharsIndex.indexOf(id) == -1) {
		throw new Error("The given ID does not exist in selectedCharsIndex.");
	}
	if(isTrav !== false) {
		if(nextTrav === undefined) {
			// stuff for not-trav being removed
			selectedChars[selectedCharsIndex.indexOf("Traveler")].byElement[id] = {};
		} else if(nextTrav === null) {
			// stuff for trav being removed and no travtypes exist
			console.info("No other travelers could be found within selectedChars.");
		} else {
			// stuff for trav being removed and travtypes existing
			var scItem = selectedChars[selectedCharsIndex.indexOf("Traveler")];
			scItem.byElement[scItem.useTravElement] = {};
			scItem.useTravElement = selectedChars[nextTrav].useTravElement;
			selectedChars[nextTrav] = scItem;
		}

	}
	selectedChars.splice(selectedCharsIndex.indexOf(id),1);
	selectedCharsIndex = selectedChars.map(i => {
		if(i.id != undefined) {return i.id}
		if(i.useTravElement != undefined && i.name == undefined) {return i.useTravElement}
		return i.name;
	});
	if(JSON.stringify(selectedChars) == "[]") {
		clearLSItem("selectedChars");
	} else {
		setLSItem("selectedChars",JSON.stringify(selectedChars))
	}
	if(isTrav !== false && nextTrav !== null && nextTrav !== undefined) {
		console.log("need to add exp stuff to the \"nextTrav\" box and fix up a few ids")
	}
}

var createID = (type="char",idLength=7,forcedID=null) => {
	// "type" is for what kind of thing this will point to. An example would be "weap--Dull Blade" for a dull blade, "party" for a party or "char" for any kind of character.
	// "idLength" is the desired length of the id string. default 7 but code examples have been using 4.
	// "forcedID" is an optional string to basically skip most of this stuff. it usually gets called during init.
	var newID = "";
	if(idLength < 2) {
		console.warn("ID Length cannot be less than 2. Resetting to 7.")
		idLength = 7;
	}
	if(forcedID != null) {
		newID = forcedID;
	} else {
		let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (let i = 0; i < idLength; i++) {
			newID += letters.charAt(Math.floor(Math.random() * letters.length));
			// disallow numbers at start
			if(i == 0 && !isNaN(Math.floor(newID))) {
				newID = newID.slice(1);
				i--;
			}
		}
	}
	if(charDB[newID] != undefined) {
		console.warn("Character name used for newID. Rerolling.");
		console.trace(newID);
		createID(type,idLength,null);
	} else if(newID == "undefined" || newID == "null" || newID == "true" || newID == "false") {
		console.warn("newID was a blacklisted value. Rerolling.");
		console.trace(newID);
		createID(type,idLength,null);
	} else if(idIndex.indexOf(newID) != -1) {
		console.warn("newID already exists within idIndex. Rerolling.");
		console.trace(newID);
		createID(type,idLength,null);
	} else {
		ids[newID] = type;
		idIndex.push(newID);
	}
	return newID;
}
var removeID = (id) => {
	// console.log(id)
	if(pageType == "index") {
		// incoming ID would be one of the following: character name, trav type as word + "Traveler", weapon ID
		resetItemLists(); // checks selectedCharsIndex while making sure the odd format doesn't fuck up
		
		// char only; must support trav type
		// weapons don't get disabled in dropdown and are therefore skipped here
		if(JSON.stringify(get(id,"name")) != "{}" && (id.indexOf(" Traveler") != -1 || charDB[id] != undefined)) {
			get(id,"name")[0].removeAttribute("disabled");
		}
		
		// this needs to point to the char, travType used or weapon id.
		// it removes the selected char/weap from selectedChars and deletes the box
		if(id.indexOf(" Traveler") == -1) {
			// not-trav characters and weapons
			removeSelectedChar(id);
			get(id).outerHTML = "";
		} else {
			if(id == "Traveler") {
				// traveler
				removeSelectedChar("Traveler");
				get(travTypeOrder[selectedChars[selectedCharsIndex[id]].useTravElement]+" Traveler").outerHTML = "";
			} else {
				// non-init traveler
				// console.log(travTypeOrder.indexOf(id.slice(0,id.indexOf(" Traveler"))))
				removeSelectedChar(id);
				get(id).outerHTML = "";
			}
		}
	}
		
	// this points to char, travType+" Traveler" or weapon id.
	// get(id).outerHTML = "";
	
	// update relevant variables
	// but first check what type it is
	// console.log(ids[id]);
	if(ids[id].split("--").length != 1) {
		// weap, arti or sets
		var split = ids[id].split("--");
		if(split[0] == "weap") {
			// weapon stuff
			// check if weapon has default stats (exp:0,asc:0,?refinement:1)
			// console.log(id,split)
			var item = {};
			// check localStorage for weapon type existing
			var lsItem = parseLSItem(split[1],[]);
			if(JSON.stringify(lsItem) != "[]" && Array.isArray(lsItem)) {
				// find the item within LS
				item = lsItem[weaponIDIndex[split[1]].indexOf(id)];
				if(item !== undefined) {
					if(
						(	// refinement checking
							(weapDB[split[1]].rarity <= 2 || weapDB[split[1]].canRefine === false) || // check if weapDB supports refinement for the item
							((weapDB[split[1]].rarity > 2 && weapDB[split[1]].canRefine !== false) && (item.refinement == 1 || item.refinement == undefined))
						) &&
						(item.ascension == 0 || item.ascension == undefined) &&
						(item.usedIn == undefined || JSON.stringify(item.usedIn) == "{}") &&
						(item.exp == 0 || item.exp == undefined)
					) {
						lsItem.splice(weaponIDIndex[split[1]].indexOf(id),1);
						weaponIDIndex[split[1]].splice(weaponIDIndex[split[1]].indexOf(id),1);
						// console.log(lsItem);
						if(JSON.stringify(lsItem) == "[]") {
							delete weaponIDIndex[split[1]];
							clearLSItem(split[1]);
						} else {
							setLSItem(split[1],JSON.stringify(lsItem));
						}
					} else {
						// Item shouldn't be removed if it has existing stats.
						return;
					}
				}
			} else {
				// localStorage item is empty or not an array. Former usually happens when no stats were changed prior to deleting a weapon. Latter shouldn't happen.
				delete weaponIDIndex[split[1]];
			}

		} else if (split[0] == "set") {
			// character set stuff
		} else if (split[0] == "arti") {
			// artifacts
			// check if split[1] is in allArtifactGroupsWithOneType
			// if not
			// check LS item split[1][split[2]] for id
			// else
			// check LS item split[1] for id
		}
	} else {
		// party or char
		// for characters keep LS item if not default
		// for parties no idea rn lol
	}
	delete ids[id];
	idIndex.splice(idIndex.indexOf(id),1);
}
var getID = (id,getBack=0,loopCount=0) => {
	// Returns the item the ID belongs to.
	// "id" is the item's ID.
	// "getBack" is an optional choice of what you want to get back, varying by kind of ID. Some kinds won't use this option. Defaults to 0.
	// Example: if the ID is a set, getBack=0 would return the set. getBack=1 would return the character's info. More information is described with the types within this function.
	// "loopCount" is a cheeky way of checking how many loops have taken place as to not cause an infinite loop. There's a maximum of 4 loops that you can do.

	// check integrity of loopCount.
	if(typeof(loopCount) != "number") {
		throw new Error("loopCount must be a number.");
	}
	if(!isFinite(loopCount)) {
		throw new Error("loopCount must not be NaN or infinity.");
	}
	if(!Number.isInteger(loopCount)) {
		throw new Error("loopCount must be an integer.");
	}
	if(loopCount < 0 || loopCount > 4) {
		throw new Error("loopCount is outside of expected range.");
	}
	
	// abort on non-strings
	if(typeof(id) != "string") {
		throw new Error("The given ID is not a string.")
	}
	// abort on non-ids
	if(idIndex.indexOf(id) == -1) {
		throw new Error(id+" is not being used as an ID.");
	}
	if(ids[id] == "party") {
		// There are no options for getBack. The party will be returned.
		console.info(id+" is a party.");
		if(typeof(partyIndex) == "undefined" || typeof(parties) == "undefined") {
			throw new Error("Either partyIndex or parties were undefined.");
		}
		if(partyIndex.indexOf(id) == -1) {
			throw new Error("The ID is a party but wasn't found in partyIndex.");
		}
		return parties[partyIndex.indexOf(id)];
	}
	if(ids[id] == "char") {
		// There are no options for getBack. The character will be returned.
		// This is like picking a set for the character with getBack of 1.
		console.info(id+" is a character.");
		if(charInfoIndex[id] == undefined) {
			throw new Error("The ID isn't in charInfoIndex. It's likely no data belongs to the character.");
		}
		return charInfoIndex[id];
	}
	var split = ids[id].split("--");
	if(split[0] == "set") {
		// Sets can return a few things.
		// 0 returns the set.
		// 1 returns the character.
		console.info(id+" is a set belonging to "+split[1]);
		if(setsIDIndex[split[1]].indexOf(id) == -1) {
			throw new Error("The ID is a set but wasn't found in setsIDIndex for the character.");
		}
		if(getBack === 0) {
			return charInfoIndex[split[1]].sets[setsIDIndex[split[1]].indexOf(id)];
		} else if (getBack === 1) {
			return charInfoIndex[split[1]];
		}
		throw new Error("Invalid getBack was used.");
	}
	if(split[0] == "weap") {
		// Weapons can return a few things.
		// 0 returns the weapon itself.
		// 1 returns the name of the weapon.
		console.info(id+" is a weapon with type "+split[1]+".");
		if(weaponIDIndex[split[1]].indexOf(id) == -1) {
			throw new Error("The ID is a weapon but wasn't found in weaponIDIndex the weapon type.");
		}
		if(getBack === 0) {
			return weaponInfoIndex[split[1]][weaponIDIndex[split[1]].indexOf(id)];
		} else if(getBack === 1) {
			return split[1]
		}
		throw new Error("Invalid getBack was used.");
	}
	if(split[0] == "arti") {
		// There are no options for getBack. The artifact will be returned.
		if(split.length == 2) {
			// These are for sets with only one kind of artifact.
			console.info(id+" is an artifact from the "+split[1]+" kind.");
			if(artifactIDIndex[split[1]].indexOf(id) == -1) {
				throw new Error("The ID is an artifact but wasn't found in artifactIDIndex for the artifact type.");
			}
			return artifactInfoIndex[split[1]][artifactIDIndex[split[1]].indexOf(id)];
		} else {
			// These are for sets with more than one kind of artifact.
			console.info(id+" is an artifact of type "+split[2]+" from the "+split[1]+" kind.");
			if(artifactTypes.indexOf(split[2]) == -1) {
				throw new Error("Artifact type for the ID is invalid.");
			}
			if(artifactIDIndex[split[1]][split[2]].indexOf(id) == -1) {
				throw new Error("The ID is an artifact but wasn't found in artifactIDIndex.");
			}
			return artifactInfoIndex[split[1]][split[2]][artifactIDIndex[split[1]][split[2]].indexOf(id)];
		}
	}
	// console.log(split,id)
	throw new Error("An unknown kind of ID was returned.");
}
function addCharBox (boxType=undefined,name="Ganyu",options={}) {
	// boxType can be one of two values: "char" and "weap"; for characters and weapons respectively.
	// name is the name of the char/weap to be added. must match what exists in charDB or weapDB.
	// if we're going for Traveler, it should NOT contain any alignment info. null is valid tho.
	// If it's a weapon it'll check weaponDB for a title.
	// [c] - char only | [w] - weapon only | [?] - optional
	// options can contain the following info:
	// [?c] skipLevel - assumed default is false. setting it to true will skip the level, level progress and ascension stuff.
	// [?c] currentStats - obj of the following: {exp, asc, con, talents:[1,2,3]}. exp and asc are ignored if skipLevel is true.
	// [c] targetStats - obj of the following: {exp, asc, talents:[1,2,3]}. exp and asc are ignored if skipLevel is true. can be completely ignored and uses default fallback.
	// [?c] travType - traveler only, numerical value of element type. 0 = unaligned, 1 = anemo, 2 = geo...
	// [?w] currentStats - obj of the following: {exp, asc, ?ref}
	// [w] targetStats - obj of the following: {exp, asc, ?ref} - can be completely ignored and uses default fallback.
	// [?w] forcedID - id of the chosen weapon

	// implied from options above:
	// [c] - elemental alignment, weapon type used, region, con bonuses, vision etc
	// [w] - title, max ascension, rarity, 

	// throw error on unknown type
	if(boxType !== "char" && boxType !== "weap") {
		throw new Error("[addCharBox] Unknown boxType.");
	}
	let isChar = boxType === "char" ? true : false;

	// Initialise stats for thingies :)
	var skipLevel = false, travType = null, conBonus, currentCon, currentTalents, targetTalents; // char stuff
	var rarity, canRefine=false, currentRef, targetRef; // weap stuff
	var currentExp, currentAsc, targetExp, targetAsc, id, title, currentExpRem, currentLvl, targetExpRem, targetLvl; // both

	// And set all the variables.
	console.log(options,options.currentStats,options.targetStats)
	if(isChar) {
		skipLevel = options.skipLevel !== undefined ? options.skipLevel : false;
		travType = options.travType !== undefined ? options.travType : null;
		id = name;
		title = travType !== null ? travTypeOrder[travType]+" Traveler": name;
		if(options.currentStats !== undefined) {
			currentCon = options.currentStats.con !== undefined ? options.currentStats.con : 0;
			currentTalents = options.currentStats.talents !== undefined ? options.currentStats.talents : [1,1,1];
			currentExp = options.currentStats.exp !== undefined ? options.currentStats.exp : 0;
			currentAsc = options.currentStats.asc !== undefined ? options.currentStats.asc : 0;
		} else {
			currentCon = 0;
			currentTalents = [1,1,1];
			currentExp = 0;
			currentAsc = 0;
		}
		if(options.targetStats !== undefined) {
			targetTalents = options.targetStats.talents !== undefined ? options.targetStats.talents : charTargets.talents;
			targetExp = options.targetStats.exp !== undefined ? options.targetStats.exp : charTargets.exp;
			targetAsc = options.targetStats.asc !== undefined ? options.targetStats.asc : charTargets.ascension;
		} else {
			targetTalents = charTargets.talents;
			targetExp = charTargets.exp;
			targetAsc = charTargets.ascension;
		}
		let i = getLevelFromExp("char",currentExp)
		currentLvl = i[0];
		currentExpRem = i[1];
		let j = getLevelFromExp("char",targetExp)
		targetLvl = j[0];
		targetExpRem = j[1];
	} else {
		rarity = weapDB[name].rarity;
		title = weapDB[name].title !== undefined ? weapDB[name].title : name;
		if(rarity < 3 || weapDB[name].canRefine === false) {
			canRefine = false;
		} else {
			canRefine = true;
		}
		id = options.forcedID !== undefined ? options.forcedID : createID("weap--"+name,7);
		if(options.currentStats !== undefined) {
			currentExp = options.currentStats.exp !== undefined ? options.currentStats.exp : 0;
			currentAsc = options.currentStats.asc !== undefined ? options.currentStats.asc : 0;
			currentRef = options.currentStats.ref !== undefined ? options.currentStats.ref : 1;
		} else {
			currentExp = 0;
			currentAsc = 0;
			currentRef = 1;
		}
		var weapMaxTargets = {};
		// for "basic" settings
		if(prefs.showAdvancedWeaponInputs) {
			weapMaxTargets.exp = weaponTargets.basicTargetMaxLevel ? maxWeapExp[rarity - 1] : 0;
			weapMaxTargets.asc = rarity < 3 && weaponTargets.basicAscension > 4 ? 4 : weaponTargets.basicAscension;
		} else {
			// for "advanced" settings
			weapMaxTargets.exp = weaponTargets.byRarity[rarity - 1].exp;
			weapMaxTargets.asc = weaponTargets.byRarity[rarity - 1].ascension;
		}
		if(canRefine) {
			weapMaxTargets.ref = 5;
		}
		console.log(weapMaxTargets);
		if(options.targetStats !== undefined) {
			targetExp = options.targetStats.exp !== undefined ? options.targetStats.exp : weapMaxTargets.exp;
			targetAsc = options.targetStats.asc !== undefined ? options.targetStats.asc : weapMaxTargets.asc;
			if(canRefine) {
				targetRef = options.targetStats.ref !== undefined ? options.targetStats.ref : weapMaxTargets.ref;
			}
		} else {
			targetExp = weapMaxTargets.exp;
			targetAsc = weapMaxTargets.asc;
			if(canRefine) {
				targetRef = weapMaxTargets.ref;
			}
		}
		let i = getLevelFromExp("weap",currentExp,rarity)
		currentLvl = i[0];
		currentExpRem = i[1];
		let j = getLevelFromExp("weap",targetExp,rarity)
		targetLvl = j[0];
		targetExpRem = j[1];
	}

	// Making the HTML element now.
	let elem = makeElem("div",undefined,"charBlock"); // Using the same class because it's easier.
	// For Traveler the box (and remove button) should be type + Traveler (ie "Anemo Traveler") rather than just "Traveler" for ID.
	if(isChar && travType !== null) {
		elem.id = travTypeOrder[travType]+" Traveler";
	} else {
		elem.id = id;
	}
	// Following that, subsequent Traveler IDs should be Traveler+(travType as number); Traveler1 for Anemo Trav.

	let headerElem = makeElem("div",undefined,"topFlex"); // Contains headerNameContainer, Remove button.

	let headerNameContainer = makeElem("div",undefined,"boxName"); // Contains Image, Name, Icons
	headerNameContainer.appendChild(makeImg("images/"+(isChar?"char":"weapon")+"/"+spaceToUnderscore(name)+".png",64,64));
	headerNameContainer.appendChild(makeElem("span",title));

	if(isChar) {
		if(travType === null) {
			// not traveler
			var vision = charDB[name].region+"_"+charDB[name].type;
			if(charDB[name].vision != undefined) {
				headerNameContainer.appendChild(makeImg("images/icons/visions/"+charDB[name].vision+".png",48,48,["dropdownType","extraIcon","vision"]));
			} else if(charDB[name].region != undefined) {
				var vision = charDB[name].region+"_"+charDB[name].type;
				if(charDB[name].visionType != undefined && charDB[name].visionType != "") vision = charDB[name].vision+"_"+charDB[name].visionType;
				headerNameContainer.appendChild(makeImg("images/icons/visions/"+vision+".png",48,48,["dropdrownType","extraIcon","vision"]));
				}
		} else {
			headerNameContainer.appendChild(makeImg("images/icons/visions/Traveler_"+travTypeOrder[travType]+".png",48,48,["extraIcon","vision"]));
		}
		if(charDB[name].weapon !== undefined) {
			headerNameContainer.appendChild(makeImg("images/icons/weapon/"+charDB[name].weapon+".png",32,32,["extraIcon"]));
		}
	} else {
		headerNameContainer.appendChild(makeImg("images/icons/weapon/"+weapDB[name].type+".png",32,32,["extraIcon"]));
	}
	headerElem.appendChild(headerNameContainer);

	var removeButtonElem = makeElem("button","Remove","removeButton");
	removeButtonElem.setAttribute("data-target",(travType !== null ? travTypeOrder[travType]+" Traveler":id))
	removeButtonElem.addEventListener("click",function(e){
		removeID(e.currentTarget.getAttribute("data-target"));
	});
	headerElem.appendChild(removeButtonElem);
	elem.appendChild(headerElem);

	// Now that the Traveler Remove Button stuff should be done, we'll set the ID correctly here.
	if(isChar && travType !== null) {
		id = "Traveler"+travType;
	}

	elem.appendChild(makeElem("span","Current Stats:","boxTitle"));

	var currentStatsInputElem = makeElem("div",undefined,"charWeapInputs");
	var input;
	var maxLevel,expNeeded;
	if(isChar) {
		maxLevel = charLevelValues.length+1;
		expNeeded = charLevelValues[currentLvl - 1] !== undefined ? charLevelValues[currentLvl - 1] : 0;
	} else {
		maxLevel = weapLevelValues[rarity-1].length+1;
		expNeeded = weapLevelValues[rarity-1][currentLvl-1] !== undefined ? weapLevelValues[rarity-1][currentLvl-1] : 0;
	}
	if(isChar && !skipLevel || !isChar) {
		// "Level: <input> / 90"
		currentStatsInputElem.appendChild(makeLabelElem("Level:",(travType!==null?"Traveler":id)+"-lvl"));
		input = makeNumberInputElem((travType !== null?"Traveler":id)+"-lvl",currentLvl,"1",maxLevel);
				if(!isChar) {
			input.setAttribute("data-rarity",rarity);
			input.addEventListener("change",function(e){
				updateExp(e.currentTarget,e.currentTarget.getAttribute("data-rarity"));
			})
		} else {
			input.addEventListener("change",function(e){
				updateExp(e.currentTarget);
			})
		}
		currentStatsInputElem.appendChild(input);
		currentStatsInputElem.appendChild(makeElem("span","/"));
		currentStatsInputElem.appendChild(makeElem("span",maxLevel,"expMaxLevel"));

		var levelProgressElem = makeElem("div");
		if(currentLvl === maxLevel) {
			levelProgressElem.style = "display:none";
		}

		// "Level progress: <input> / $val"
		levelProgressElem.appendChild(makeLabelElem("Level progress:",(travType!==null?"Traveler":id)+"-expRemainder"));
		input = makeNumberInputElem((travType !== null?"Traveler":id)+"-expRemainder",currentExpRem,"0",expNeeded,"8","expTotal");
		if(!isChar) {
			input.setAttribute("data-rarity",rarity);
			input.addEventListener("change",function(e){
				updateBar(e.currentTarget,e.currentTarget.getAttribute("data-rarity"));
			})
		} else {
			input.addEventListener("change",function(e){
				updateBar(e.currentTarget);
			})
		}
		input.addEventListener("wheel",function(e){
			adjustStep(e.currentTarget.id,true,true);
		})
		input.addEventListener("keydown",function(e){
			adjustStep(e.currentTarget.id,false,true);
		})
		levelProgressElem.appendChild(input);
		levelProgressElem.appendChild(makeElem("span","/"+expNeeded,"expTotal"));
		currentStatsInputElem.appendChild(levelProgressElem);

		// Exp Bar
		var expBarElem = makeElem("div",undefined,"expBar");
		expBarElem.id = (travType !== null ? "Traveler" : id)+"-expBar";
		expBarElem.style = "--fill:"+(expNeeded==0?"100":((currentExpRem/expNeeded).toPrecision(3)*100))+"%";
		currentStatsInputElem.appendChild(expBarElem);

		// "Ascension level: <input>"
		currentStatsInputElem.appendChild(makeLabelElem("Ascension level:",(travType !== null?"Traveler":id)+"-asc"));
		input = makeNumberInputElem((travType !== null?"Traveler":id)+"-asc",currentAsc,"0",(isChar?ascValues.length:weapAscValues[rarity-1].length));
		input.setAttribute("data-char",(travType !== null?"Traveler":id));
		input.addEventListener("change",function(e){
			forceValue(e.currentTarget);
			saveCharacter(e.currentTarget.getAttribute("data-char"),"ascension",(e.currentTarget.valueAsNumber === 0 ? undefined : e.currentTarget.valueAsNumber));
		});
		currentStatsInputElem.appendChild(input);
	}

	var charConOffset = [0,0,0];
	if(isChar) {
		// Currently disabled
		// // "Constellation: <input>"
		// currentStatsInputElem.appendChild(makeLabelElem("Constellation:",id+"-con"));
		// input = makeNumberInputElem(id+"-con",currentCon,"0","6");
		// // JS event needed.
		// currentStatsInputElem.appendChild(input);

		// Loop for "Normal Attack|Skill|Burst: <input>"
		for(let i = 0; i < charTalentNames.length; i++) {
			currentStatsInputElem.appendChild(makeLabelElem(charTalentNames[i]+" level:",id+"-tal"+(i+1)))
			var min = 1, max = charMaxTalents[i], value = currentTalents[i];
			if(conBonus != undefined && conBonus[(i+1).toString()] <= con) {
				charConOffset[i] += 3;
			}
			input = makeNumberInputElem(id+"-tal"+(i+1),(value+charConOffset[i]),(min+charConOffset[i]),(max+charConOffset[i]),"3",(charConOffset[i]!=0?"conBonus":[]));
			input.setAttribute("data-char",id);
			input.addEventListener("change",function(e){
				forceValue(e.currentTarget);
				saveTalents(e.currentTarget.getAttribute("data-char"));
			})
			currentStatsInputElem.appendChild(input);
		}
	} else if(canRefine) {
		// Refinement goes here.
	}
	elem.appendChild(currentStatsInputElem);

	elem.appendChild(makeElem("br"));
	elem.appendChild(makeElem("span","Targeted Stats:","boxTitle"));

	var targetStatsInputElem = makeElem("div",undefined,"charWeapInputs");
	if(isChar && !skipLevel || !isChar) {
		// "Level: <input> / 90"
		targetStatsInputElem.appendChild(makeLabelElem("Level:",(travType!==null?"Traveler":id)+"-targLvl"));
		input = makeNumberInputElem((travType !== null?"Traveler":id)+"-targLvl",targetLvl,"1",maxLevel);
		input.addEventListener("change",function(e){
			updateExp(e.currentTarget);
		});
		targetStatsInputElem.appendChild(input);
		targetStatsInputElem.appendChild(makeElem("span","/"));
		targetStatsInputElem.appendChild(makeElem("span",maxLevel,"expMaxLevel"));

		var levelProgressElem = makeElem("div");
		if(targetLvl === maxLevel) {
			levelProgressElem.style = "display:none";
		}

		// "Level progress: <input> / $val"
		levelProgressElem.appendChild(makeLabelElem("Level progress:",(travType!==null?"Traveler":id)+"-targExpRemainder"));
		input = makeNumberInputElem((travType !== null?"Traveler":id)+"-targExpRemainder",targetExpRem,"0",expNeeded,"8","expTotal");
		input.addEventListener("change",function(e){
			updateBar(e.currentTarget);
		})
		input.addEventListener("wheel",function(e){
			adjustStep(e.currentTarget.id,true,true);
		})
		input.addEventListener("keydown",function(e){
			adjustStep(e.currentTarget.id,false,true);
		})
		levelProgressElem.appendChild(input);
		levelProgressElem.appendChild(makeElem("span","/"+expNeeded,"expTotal"));
		targetStatsInputElem.appendChild(levelProgressElem);

		// Exp Bar
		var expBarElem = makeElem("div",undefined,"expBar");
		expBarElem.id = (travType !== null ? "Traveler" : id)+"-targExpBar";
		expBarElem.style = "--fill:"+(expNeeded==0?"100":((targetExpRem/expNeeded).toPrecision(3)*100))+"%";
		targetStatsInputElem.appendChild(expBarElem);

		// "Ascension level: <input>"
		targetStatsInputElem.appendChild(makeLabelElem("Ascension level:",(travType !== null?"Traveler":id)+"-targAsc"));
		input = makeNumberInputElem((travType !== null?"Traveler":id)+"-targAsc",targetAsc,"0",(isChar?ascValues.length:weapAscValues[rarity-1].length));
		input.setAttribute("data-char",(travType !== null?"Traveler":id));
		input.addEventListener("change",function(e){
			forceValue(e.currentTarget);
			editSelectedChar(e.currentTarget.getAttribute("data-char"),e.currentTarget,e.currentTarget.getAttribute("data-travtype"));
		});
		targetStatsInputElem.appendChild(input);
	}

	if(isChar) {
		// Loop for "Normal Attack|Skill|Burst: <input>"
		for(let i = 0; i < charTalentNames.length; i++) {
			targetStatsInputElem.appendChild(makeLabelElem(charTalentNames[i]+" level:",id+"-targTal"+(i+1)))
			var min = 1, max = charMaxTalents[i], value = targetTalents[i];
			input = makeNumberInputElem(id+"-targTal"+(i+1),value+charConOffset[i],min+charConOffset[i],max+charConOffset[i],"3",(charConOffset[i]!=0?"conBonus":[]));
			input.setAttribute("data-char",id);
			if(travType!==null) {
				input.setAttribute("data-travtype",travType);
			}
			input.addEventListener("change",function(e){
				forceValue(e.currentTarget);
				editSelectedChar(e.currentTarget.getAttribute("data-char"),e.currentTarget,e.currentTarget.getAttribute("data-travtype"));
			})
			targetStatsInputElem.appendChild(input);
		}
	} else if(canRefine) {
		// Refinement goes here.
	}
	elem.appendChild(targetStatsInputElem);

	// Item Output part
	var outputElem = makeElem("div");
	if(isChar && travType !== null) {
		outputElem.id = "Traveler"+travType+"-output";
	} else {
		outputElem.id = id+"-output";
	}
	elem.appendChild(outputElem);
	return elem;
}

function addCharacter (char="Lynette",fromInit=false,travElement=null,targetExp=maxCharExp,targetTalents=charTargets.talents,targetAscension=charTargets.ascension) {
	var travType = travElement === null ? null : travElement;
	var skipLevel = false, conBonus = undefined;
	// console.log(char,fromInit,travElement,travType)
	if(char !== null && char.indexOf(" Traveler") != -1 && travElement === null) {
		travType = travTypeOrder.indexOf(char.slice(0,char.indexOf(" Traveler")));
		char = "Traveler";
		travElement = travType;
		if(selectedCharsIndex.indexOf("Traveler") != -1) skipLevel = true;
	}
	var weapon, region, type = null;
	let id = char;
	if(travType !== null) {
		id = "Traveler"+travType;
		type = charDB["Traveler"].regions[travType].type;
		region = charDB["Traveler"].regions[travType].region;
		weapon = charDB["Traveler"].weapon;
		conBonus = typeof(charDB["Traveler"].regions[travType].conBonus) == "object" ? charDB["Traveler"].regions[travType].conBonus : undefined;
	} else {
		if(charDB[char] == undefined) return; // skip unknown characters
		type = charDB[char].type;
		region = charDB[char].region;
		weapon = charDB[char].weapon;
		conBonus = typeof(charDB[char].conBonus) == "object" ? charDB[char].conBonus : undefined;
	}
	if(idIndex.indexOf((travType !== null ?type+" Traveler" : char)) != -1) return; // abort on duplicate characters
	ids[(travType !== null ? type+" Traveler" : id)] = "char";
	idIndex.push((travType !== null ? type+" Traveler" : id));

	if(!fromInit) resetItemLists();
	get("dropdownCharIcon").setAttribute("src","images/char/Unknown.png");
	get("dropdownCharName").value = "";
	if(travType === null) {
		get(char,"name")[0].setAttribute("disabled",true);
	} else {
		get(type+" Traveler","name")[0].setAttribute("disabled",true);
	}

	let isTrav = false;
	// console.log(char,travType)
	if(travType !== null) {
		isTrav = true;
	}
	if(char === null && travType !== null) {
		char = "Traveler";
		skipLevel = true;
	}
	
	var level, expRemainder, targetLevel, targetExpRemainder, ascension, talents, con;
	let lsItem = parseLSItem(char,{});
	// if(lsItem.exp != undefined) {
	// 	let exp = getLevelFromExp("char",lsItem.exp);
	// 	level = exp[0];
	// 	expRemainder = exp[1];
	// } else {
	// 	level = 1;
	// 	expRemainder = 0;
	// }
	ascension = lsItem.ascension != undefined ? lsItem.ascension : 0;
	if(lsItem.byElement != undefined) {
		let elem = lsItem.byElement[travType];
		talents = elem.talents != undefined ? elem.talents : [1,1,1];
		con = conBonus != undefined && elem.con != undefined ? elem.con : 0;
	} else {
		talents = lsItem.talents != undefined ? lsItem.talents : [1,1,1];
		con = conBonus != undefined && lsItem.con != undefined ? lsItem.con : 0;
	}

	targetExp = getLevelFromExp("char",targetExp);
	targetLevel = targetExp[0];
	targetExpRemainder = targetExp[1];

	if(!Number.isInteger(targetAscension)) {
		if(travType === null) {
			// console.warn("Targeted ascension must be an integer.");
			targetAscension = charTargets.ascension;
		} else {
			skipLevel = true;
		}
	}

	// if(!Array.isArray(targetTalents)) {
	// 	console.warn("Targeted talents must be an array.");
	// 	targetTalents = charTargets.talents;
	// }

	// var charElem = makeElem("div",undefined,"charBlock");
	// charElem.id = (travType!==null ? type+" Traveler":id);

	// var img = spaceToUnderscore(char);
	// if(travType !== null) {
	// 	charElem.setAttribute("data-travtype",travType);
	// 	img = "Traveler";
	// }

	// var topFlexElem = makeElem("div",undefined,"topFlex");
	// var boxNameElem = makeElem("div",undefined,"boxName");
	// boxNameElem.appendChild(makeImg("images/char/"+img+".png",64,64));
	// boxNameElem.appendChild(makeElem("span",travType!=undefined?type+" "+char:char));
	// if(travType === null) {
	// 	var vision = region+"_"+type;
	// 	if(charDB[char].vision != undefined) {
	// 		boxNameElem.appendChild(makeImg("images/icons/visions/"+charDB[char].vision+".png",48,48,["dropdownType","extraIcon","vision"]));
	// 	} else if(charDB[char].region != undefined) {
	// 		var vision = charDB[char].region+"_"+charDB[char].type;
	// 		if(charDB[char].visionType != undefined && charDB[char].visionType != "") vision = vision+"_"+charDB[char].visionType;
	// 		boxNameElem.appendChild(makeImg("images/icons/visions/"+vision+".png",48,48,["dropdrownType","extraIcon","vision"]));
	// 		}
	// } else {
	// 	boxNameElem.appendChild(makeImg("images/icons/visions/Traveler_"+type+".png",48,48,["extraIcon","vision"]));
	// }
	// if(weapon !== undefined) {
	// 	boxNameElem.appendChild(makeImg("images/icons/weapon/"+weapon+".png",32,32,["extraIcon"]));
	// }
	// topFlexElem.appendChild(boxNameElem);

	// var removeButtonElem = makeElem("button","Remove","removeButton");
	// removeButtonElem.setAttribute("data-target",(travType !== null ? type+" Traveler":char))
	// removeButtonElem.addEventListener("click",function(e){
	// 	removeID(e.currentTarget.getAttribute("data-target"));
	// });
	// topFlexElem.appendChild(removeButtonElem);

	// charElem.appendChild(topFlexElem);
	// charElem.appendChild(makeElem("span","Current Stats:","boxTitle"));

	// var currentStatsInputElem = makeElem("div",undefined,"charWeapInputs");
	// if(!skipLevel) {
	// 	var lavelLabelElem = makeElem("label","Level:");
	// 	lavelLabelElem.setAttribute("for",(travType !== null ? "Traveler" : id)+"-lvl");
	// 	currentStatsInputElem.appendChild(lavelLabelElem);

	// 	var charLevelInput = makeElem("input");
	// 	charLevelInput.type = "number";
	// 	charLevelInput.size = "3";
	// 	charLevelInput.min = "1";
	// 	charLevelInput.max = charLevelValues.length+1;
	// 	charLevelInput.value = level;
	// 	charLevelInput.id = (travType !== null ? "Traveler" : id)+"-lvl";
	// 	charLevelInput.setAttribute("name",charLevelInput.id);
	// 	charLevelInput.addEventListener("change",function(e){
	// 		updateExp(e.currentTarget);
	// 	})
	// 	currentStatsInputElem.appendChild(charLevelInput);
	// 	currentStatsInputElem.appendChild(makeElem("span","/"));
	// 	currentStatsInputElem.appendChild(makeElem("span",(charLevelValues.length+1).toString(),"expMaxLevel"));

	// 	var maxExpNeeded = charLevelValues[level-1];
	// 	if(maxExpNeeded == undefined) {
	// 		maxExpNeeded = 0;
	// 	}
	// 	var levelProgressElem = makeElem("div");
	// 	if(level === charLevelValues.length+1) {
	// 		levelProgressElem.style = "display:none";
	// 	}
	// 	var levelProgressLabel = makeElem("label","Level progress:");
	// 	levelProgressLabel.setAttribute("for",(travType !== null ? "Traveler" : id)+"-expRemainder");
	// 	levelProgressElem.appendChild(levelProgressLabel);

	// 	var levelProgressInputElem = makeElem("input",undefined,"expTotal");
	// 	levelProgressInputElem.type = "number";
	// 	levelProgressInputElem.size = "8";
	// 	levelProgressInputElem.min = "0";
	// 	levelProgressInputElem.max = maxExpNeeded;
	// 	levelProgressInputElem.value = expRemainder;
	// 	levelProgressInputElem.id = (travType !== null ? "Traveler" : id)+"-expRemainder";
	// 	levelProgressInputElem.addEventListener("change",function(e){
	// 		updateBar(e.currentTarget);
	// 	})
	// 	levelProgressInputElem.addEventListener("wheel",function(e){
	// 		adjustStep(e.currentTarget.id,true,true);
	// 	})
	// 	levelProgressInputElem.addEventListener("keydown",function(e){
	// 		adjustStep(e.currentTarget.id,false,true);
	// 	})
	// 	levelProgressElem.appendChild(levelProgressInputElem);

	// 	levelProgressElem.appendChild(makeElem("span","/"+maxExpNeeded,"expTotal"));
		
	// 	currentStatsInputElem.appendChild(levelProgressElem);

	// 	var expBarElem = makeElem("div",undefined,"expBar");
	// 	expBarElem.id = (travType !== null ? "Traveler" : id)+"-expBar";
	// 	expBarElem.style = "--fill:"+(maxExpNeeded==0?"100":((expRemainder/maxExpNeeded).toPrecision(3)*100))+"%";
	// 	currentStatsInputElem.appendChild(expBarElem);

	// 	var ascLabelElem = makeElem("label","Ascension level:");
	// 	ascLabelElem.setAttribute("for",(travType !== null ? "Traveler" : id)+"-asc");
	// 	currentStatsInputElem.appendChild(ascLabelElem);

	// 	var ascInputElem = makeElem("input");
	// 	ascInputElem.type = "number";
	// 	ascInputElem.size = "3";
	// 	ascInputElem.min = "0";
	// 	ascInputElem.max = "6";
	// 	ascInputElem.value = ascension;
	// 	ascInputElem.id = (travType !== null ? "Traveler" : id)+"-asc";
	// 	ascInputElem.setAttribute("name",ascInputElem.id);
	// 	ascInputElem.setAttribute("data-char",(travType !== null ? "Traveler" : id));
	// 	ascInputElem.addEventListener("change",function(e){
	// 		forceValue(e.currentTarget);
	// 		saveCharacter(e.currentTarget.getAttribute("data-char"),"ascension",(e.currentTarget.valueAsNumber === 0 ? undefined : e.currentTarget.valueAsNumber));
	// 	})
	// 	currentStatsInputElem.appendChild(ascInputElem);
	// }

	// for(let i = 0; i < charTalentNames.length; i++) {
	// 	var labelElem = makeElem("label",charTalentNames[i]+" level:");
	// 	labelElem.setAttribute("for",(travType !== null ? "Traveler" : id)+"-asc");
	// 	currentStatsInputElem.appendChild(labelElem);
	// 	var min = 1, max = charMaxTalents[i], value = talents[i];
	// 	var inputElem = makeElem("input");
	// 	if(conBonus != undefined && conBonus[(i+1).toString()] <= con) {
	// 		min+=3;
	// 		max+=3;
	// 		value+=3;
	// 		inputElem.classList.add("conBonus");
	// 	}
	// 	inputElem.type = "number";
	// 	inputElem.size = "3";
	// 	inputElem.min = min;
	// 	inputElem.max = max;
	// 	inputElem.value = value;
	// 	inputElem.id = id+charTalentSuffix[i];
	// 	inputElem.setAttribute("name",inputElem.id);
	// 	inputElem.setAttribute("data-char",(isTrav?id:char));
	// 	inputElem.addEventListener("change",function(e){
	// 		forceValue(e.currentTarget);
	// 		saveTalents(e.currentTarget.getAttribute("data-char"));
	// 	})
	// 	currentStatsInputElem.appendChild(inputElem);
	// }
	// charElem.appendChild(currentStatsInputElem);
	// charElem.appendChild(makeElem("br"));
	// charElem.appendChild(makeElem("span","Targeted Stats:","boxTitle"));
	// var targetStatsInputElem = makeElem("div",undefined,"charWeapInputs");
	// if(!skipLevel) {
	// 	var targetCharLevelLabel = makeElem("label","Character level:");
	// 	targetCharLevelLabel.setAttribute("for",(travType !== null ? "Traveler" : id)+"-targetLvl");
	// 	targetStatsInputElem.appendChild(targetCharLevelLabel);

	// 	var targetCharLevelInputElem = makeElem("input");
	// 	targetCharLevelInputElem.type = "number";
	// 	targetCharLevelInputElem.size = "3";
	// 	targetCharLevelInputElem.min = "1";
	// 	targetCharLevelInputElem.max = "90";
	// 	targetCharLevelInputElem.value = targetLevel;
	// 	targetCharLevelInputElem.id = (travType !== null ? "Traveler" : id)+"-targetLvl";
	// 	targetCharLevelInputElem.setAttribute("name",targetCharLevelInputElem.id);
	// 	targetCharLevelInputElem.setAttribute("data-char",(travType !== null ? "Traveler" : id));
	// 	if(travType!==null) {
	// 		targetCharLevelInputElem.setAttribute("data-travtype",travType);
	// 	}
	// 	targetCharLevelInputElem.addEventListener("change",function(e){
	// 		forceValue(e.currentTarget);
	// 		editSelectedChar(e.currentTarget.getAttribute("data-char"),e.currentTarget,e.currentTarget.getAttribute("data-travtype"));
	// 	});
	// 	targetStatsInputElem.appendChild(targetCharLevelInputElem);
	
	// 	var targetCharAscLabel = makeElem("label","Ascension level:");
	// 	targetCharAscLabel.setAttribute("for",(travType !== null ? "Traveler" : id)+"-targetAsc");
	// 	targetStatsInputElem.appendChild(targetCharAscLabel);

	// 	var targetCharAscInputElem = makeElem("input");
	// 	targetCharAscInputElem.type = "number";
	// 	targetCharAscInputElem.size = "3";
	// 	targetCharAscInputElem.min = "0";
	// 	targetCharAscInputElem.max = "6";
	// 	targetCharAscInputElem.value = targetAscension;
	// 	targetCharAscInputElem.id = (travType !== null ? "Traveler" : id)+"-targetAsc";
	// 	targetCharAscInputElem.setAttribute("name",targetCharAscInputElem.id);
	// 	targetCharAscInputElem.setAttribute("data-char",(travType !== null ? "Traveler" : id));
	// 	if(travType!==null) {
	// 		targetCharAscInputElem.setAttribute("data-travtype",travType);
	// 	}
	// 	targetCharAscInputElem.addEventListener("change",function(e){
	// 		forceValue(e.currentTarget);
	// 		editSelectedChar(e.currentTarget.getAttribute("data-char"),e.currentTarget,e.currentTarget.getAttribute("data-travtype"));
	// 	});
	// 	targetStatsInputElem.appendChild(targetCharAscInputElem);
		
	// }

	// for(let i = 0; i < charTalentNames.length; i++) {
	// 	var labelElem = makeElem("label",charTalentNames[i]+" level:");
	// 	labelElem.setAttribute("for",(travType !== null ? "Traveler" : id)+"-targetTal"+(i+1));
	// 	targetStatsInputElem.appendChild(labelElem);

	// 	var min = 1, max = charMaxTalents[i], value = targetTalents[i];

	// 	var inputElem = makeElem("input");
	// 	if(conBonus != undefined && conBonus[(i+1).toString()] <= con) {
	// 		min+=3;
	// 		max+=3;
	// 		value+=3;
	// 	}
	// 	inputElem.type = "number";
	// 	inputElem.size = "3";
	// 	inputElem.min = min;
	// 	inputElem.max = max;
	// 	inputElem.value = value;
	// 	inputElem.id = id+"-targetTal"+(i+1);
	// 	inputElem.setAttribute("name",inputElem.id);
	// 	inputElem.setAttribute("data-char",(isTrav?id:char));
	// 	if(travType!==null) {
	// 		inputElem.setAttribute("data-travtype",travType);
	// 	}
	// 	inputElem.addEventListener("change",function(e){
	// 		forceValue(e.currentTarget);
	// 		editSelectedChar(e.currentTarget.getAttribute("data-char"),e.currentTarget,e.currentTarget.getAttribute("data-travtype"));
	// 	})
	// 	targetStatsInputElem.appendChild(inputElem);
	// }
	// charElem.appendChild(targetStatsInputElem);
	
	// var outputElem = makeElem("div");
	// outputElem.id = id+"-output";
	// charElem.appendChild(outputElem);

	var options = {}
	options.skipLevel = skipLevel;
	options.currentStats = {
		exp:0,
		asc:ascension,
		con:con,
		talents:talents
	}
	options.targetStats = {
		exp:targetExp,
		asc:targetAscension,
		talents:targetTalents
	}
	options.travType = travType;

	var charElem2 = addCharBox("char",char,options)

	get("inputs").appendChild(charElem2);
	if(char === "Traveler") {
		char = travTypeOrder[travType]+" Traveler";
	}
	if(!fromInit) addSelectedChar("char",char);
}
var addWeapon = (char="The Catch",fromInit=false,forcedID=null,targetExp=undefined,targetAscension=undefined,targetRefinement=undefined) => {
	char = removeQuotes(char);
	if(weapDB[char] == undefined) return;
	if(!fromInit) resetItemLists();
	
	let rarity = weapDB[char].rarity;
	get("dropdownWeaponIcon").setAttribute("src","images/weapon/Unknown.png");
	get("dropdownWeaponName").setAttribute("rarity",0);
	get("dropdownWeaponName").value = "";
	var title = weapDB[char].title != undefined ? weapDB[char].title : char;
	let maxAsc = 6;
	if(targetExp===undefined) {
		targetExp = !prefs[showAdvancedWeaponInputs] ? maxWeapExp[rarity] : weaponTargets.byRarity[rarity - 1].exp;
	}
	if(targetAscension===undefined) {
		targetAscension = !prefs[showAdvancedWeaponInputs] ? weaponTargets.basicAscension : weaponTargets.byRarity[rarity - 1].ascension;
	}
	if (rarity <= 2 && targetAscension > 4) {targetAscension = 4}
	if (rarity <= 2) {maxAsc = 4}
	var ascension = 0, exp = 0, refinement = 1;

	var id = "";
	console.log(forcedID);
	if(forcedID !== null && idIndex.indexOf(forcedID) != -1) {
		id = forcedID;
	} else {
		id = createID("weap--"+char,7,forcedID);
	}

	if(weaponIDIndex[char] == undefined) weaponIDIndex[char] = [];

	if(getLSItem(char) !== null) {
		var lsItem = parseLSItem(char,{});
		if(JSON.stringify(lsItem) != "{}") {
			if(weaponIDIndex[char].indexOf(id) != -1) {
				lsItem = lsItem[weaponIDIndex[char].indexOf(id)];
			} else {
				console.log("ID not in localStorage.");
				var obj = {};
				obj.id = id;
				obj.exp = exp;
				obj.ascension = ascension;
				// check refinement for non-refinable
				lsItem.push(obj);
				console.log(lsItem);
				setLSItem(char,JSON.stringify(lsItem));
			}
		}
		ascension = lsItem.ascension != undefined ? lsItem.ascension : 0;
		exp = lsItem.exp != undefined ? lsItem.exp : 0;
		// check refinement for non-refineable
	}

	if(weaponIDIndex[char].indexOf(id) == -1) weaponIDIndex[char].push(id);

	var level, expRemainder;
	exp = getLevelFromExp("weap",exp,rarity);
	level = exp[0];
	expRemainder = exp[1];

	if(!prefs.showAdvancedWeaponInputs && !weaponTargets.basicTargetMaxLevel) {
		targetExp = [1,0];
	} else {
		targetExp = getLevelFromExp("weap",targetExp,rarity);
	}
	var targetLevel = targetExp[0];
	var targetExpRemainder = targetExp[1];

	var type = weapDB[char].type;
	// var html = "<div class='weaponBlock' id=\""+id+"\">";
	// html += "<div class='topFlex'>";
	// html += "<div class='boxName'>";
	// html += makeImg("images/weapon/"+spaceToUnderscore(char)+".png",64,64);
	// html += title;
	// html += makeImg("images/icons/weapon/"+type+".png",32,32,["extraIcon"]);
	// html += "</div>";
	// html += "<button class='removeButton' onclick='removeID(&quot;"+id+"&quot;)'>Remove</button>";
	// html += "</div>";
	// html += "<div class='boxTitle'>Current Stats:</div>";
	// html += "<div class='charWeapInputs'>";

	// html+="<div>Level: <input type='number' size='3' min='1' max='"+(weapLevelValues[rarity - 1].length+1)+"' value='"+level+"' id='"+id+"-lvl' onchange='updateExp(this,"+rarity+")'> / <span class='expMaxLevel'>"+(weapLevelValues[rarity - 1].length+1)+"</span>";
	// let maxExpNeeded = weapLevelValues[rarity-1][level-1];
	// if(maxExpNeeded == undefined) {
	// 	maxExpNeeded = 0;
	// }
	// html+="<div";
	// if(level == weapLevelValues[rarity-1].length+1) {
	// 	html+=" style='display:none'";
	// }
	// html+=">Level progress: <input class='expTotal' type='number' min='0' max='"+maxExpNeeded+"' value='"+expRemainder+"' id='"+id+"-expRemainder' onwheel=\"adjustStep(this.id,true,true)\" onkeydown=\"adjustStep(this.id,false,true)\" onchange='updateBar(this,"+rarity+")'><span class='expTotal'>/"+maxExpNeeded+"</span>";
	// html+="</div><div class='expBar' id='"+id+"-expBar' style='--fill:";
	// if(maxExpNeeded == 0) {
	// 	html += "100";
	// } else {
	// 	html+=((expRemainder/maxExpNeeded).toPrecision(3)*100);
	// }
	// html+="%'></div>";

	// html += "<span>Ascension level: </span><input size='3' type='number' min='0' max='"+maxAsc+"' value='"+ascension+"' id='"+id+"-asc'>";
	// html += "</div>";
	// html += "<br><div class='boxTitle'>Targeted Stats:</div>";
	// html += "<div class='charWeapInputs'>";
	// html += "<span>Weapon level: </span><input size='3' type='number' min='1' max='"+(weapLevelValues[rarity - 1].length+1)+"' value='"+targetLevel+"' id='"+id+"-targetLvl' onchange='forceValue(this);editSelectedChar(\""+id+"\",this,null,"+rarity+")'>";
	// html += " <span>Ascension: </span><input size='3' type='number' min='0' max='"+maxAsc+"' value='"+targetAscension+"' id='"+id+"-targetAsc'>";
	// html += "</div>";
	// html += "<div id='"+id+"-output'></div>";
	// html += "</div>";
	// get("inputs").innerHTML += html;

	var options = {}
	options.forcedID = id;
	options.currentStats = {
		exp:0,
		asc:ascension,
		ref:refinement
	}
	options.targetStats = {
		exp:targetExp,
		asc:targetAscension,
		ref:targetRefinement
	}

	var weapElem = addCharBox("weap",char,options)

	get("inputs").appendChild(weapElem)
	if(!fromInit) addSelectedChar("weap",char,id,rarity);
	// get(id+"-asc").setAttribute("onchange","forceValue(this);saveCharacter('"+id+"','ascension',(this.valueAsNumber == 0 ? undefined : this.valueAsNumber))");
	// get(id+"-targetAsc").setAttribute("onchange","forceValue(this);editSelectedChar(\""+id+"\",this,null,"+rarity+")");
}
var forceValue = (element) => {
	// console.log([id,value,min,max])
	let value = element.valueAsNumber, min = element.min, max = element.max;
	if(min !== "") {
		min = Math.floor(min);
		if(value < min) element.valueAsNumber = min;
	}
	if(max !== "") {
		max = Math.floor(max);
		if(value > max) element.valueAsNumber = max;
	}
}


var saveCharacter = (char,key,value,mustExist=false) => {
	// "char" is the desired character or weapon ID to be edited (For Traveler subtypes, use "Traveler#" where the # is the number).
	// "key" and "value" are for the key:value pair to be edited.
	// "value" can be set to `undefined` to clear the desired key:value pair. If key=="owned" and value===undefined, the char (or Traveler subtype) is cleared.
	// "mustExist", if true means the localStorage item for `char` must exist prior to editing. This is ignored if key=="owned".
	var travType, travByElementValue = [], lsItem = {};
	// check if trav element is being used
	if(char.indexOf("Traveler") != -1 && char != "Traveler") {
		travType = char.slice(-1);
		char = "Traveler";
	}
	if(key == "owned" && value === undefined) {
		// clear if key is "owned" and value is unset
		if(char == "Traveler") {
			// catch if traveler and clear the "byElement" instead
			lsItem = parseLSItem(char,{});
			if(JSON.parse(char) == "{}") {
				clearLSItem("Traveler");
				return;
			}

			if(lsItem.byElement != undefined) {
				// if byElement doesn't exist, fill with empty objects
				for(let i in travTypeOrder) {
					travByElementValue.push({})
				}
			} else {
				// and to ensure that it's not replaced outright
				travByElementValue = lsItem.byElement;
			}

			// desired element will be set to empty object (non-anemo)
			if(travType != 1) {
				travByElementValue[travType] = {};
			} else {
				travByElementValue[travType] = {owned:false};
			}

			if(JSON.stringify(travByElementValue) == JSON.stringify(emptyByElement)) {
				updateLSItem(char,"byElement",undefined);
			} else {
				updateLSItem(char,"byElement",travByElementValue);
			}
		} else {
			clearLSItem(char);
		}
		return;
	} else if(char == "Traveler") {
		// check traveler stuff now
		lsItem = parseLSItem(char,{});
		if(travType !== undefined) {
			// if we're editing a subtype

			// check if the key:value pair should go into subtype
			const validSubtypeKeys = ["owned","con","talents","note","hideInfo"];
			if(validSubtypeKeys.indexOf(key) == -1 || (key == "con" && travType == 0)) {
				throw new Error("The desired key:value pair could not be added to the Traveler under byElement.");
			}

			// reset byElement if undefined
			if(lsItem.byElement == undefined) {
				for(let i in travTypeOrder) {
					travByElementValue.push({})
				}
			} else {
				travByElementValue = lsItem.byElement;
			}
			lsItem = travByElementValue[travType]; // we'll edit the subtype.
		} else {
			// and if we're editing the traveler's main stuff

			// check key validity, abort on "byElement"
			const validKeys = ["nickname","exp","ascension","note","hideInfo","activeSet"]; // byElement is skipped (see above) - owned is not on traveler. sets exist which need to be dealt with later.
			if(key == "byElement") {
				throw new Error("Do NOT edit byElement like this. You should set the char to be \"Traveler#\" where the # is a number.");
			} else if(validKeys.indexOf(key) == -1) {
				throw new Error("The desired key:value pair could not be added to Traveler.");
			}
			// lsItem isn't set here as we're editing the Traveler's main stuff.
		}

		if(
			(mustExist && ( // mustExist and...
				// check if empty and not anemo (as anemo's default is owned:true rather than a missing owned tag)
				(travType != 1 && JSON.stringify(lsItem) != "{}")
				||
				// check if anemo is not owned
				(travType == 1 && JSON.stringify(lsItem) != "{\"owned\":false}")
			))
			||
			!mustExist // or (default)
		) {
			if(value === undefined || (travType == 1 && key == "owned" && value == true) ) {
				// delete undefined keys and owned:true if travType is 1
				delete lsItem[key];
			} else {
				// if()
				// console.log("here")
				lsItem[key] = value;
			}
		} else {
			throw new Error("Could not set the key as mustExist was set to true.");
		}

		if(travType !== undefined) {
			if(JSON.stringify(travByElementValue) == JSON.stringify(emptyByElement)) {
				updateLSItem(char,"byElement",undefined)
			} else {
				updateLSItem(char,"byElement",travByElementValue);
			}
			return;
		} else {
			updateLSItem(char,key,value,mustExist);
			return;
		}
		// console.log(char,travType,lsItem,key,value,mustExist);
	} else if(charDB[char] != undefined) {
		// all other characters
		const validKeys = ["owned","ascension","talents","exp","note","hideInfo","activeSet"]; // sets to be done later
		let i = charDB[char];
		// remove cons from characters without cons
		if(i.hasCons != false) {
			validKeys.push("con");
		}
		// remove nickname from characters without ability to rename
		if(i.canRename != true) {
			validKeys.push("nickname");
		}

		// check if key can be added to char
		if(validKeys.indexOf(key) == -1) {
			throw new Error("The desired key:value pair could not be added to the character.");
		}

		lsItem = parseLSItem(char,{});

		if((mustExist && JSON.stringify(lsItem) != "{}") || !mustExist) {
			if(value === undefined) {
				// delete undefined values
				delete lsItem[key];
			} else {
				lsItem[key] = value;
			}	
		} else {
			throw new Error("Could not set the key as mustExist was set to true.");
		}
		updateLSItem(char,key,value,mustExist);
		return;
	} else {
		var item = {};
		// weapons
		if(ids[char] == undefined) {
			throw new Error("Something has gone incredibly wrong and caused the IDs to be desynced with what's being used.");
		}
		var split = ids[char].split("--");
		var canRefine = weapDB[split[1]].canRefine != false ? true : false;
		if(split[0] != "weap") {
			throw new Error("Somehow something that isn't a weapon was thrown into the weapons part.");
		}
		const validKeys = ["exp","ascension"] // usedIn is not dealt with here. ID is also skipped.
		if(weapDB[split[1]].rarity > 2 && canRefine) {
			validKeys.push("refinement"); // and allow refinement for those with it
		}
		// abort for invalid keys
		if(validKeys.indexOf(key) == -1) {
			throw new Error("The desired key:value pair could not be added.");
		}
		lsItem = parseLSItem(split[1],[]);
		
		if(weaponIDIndex[split[1]].indexOf(char) == -1) {
			throw new Error("A rouge ID somehow got in.");
		}
		if(lsItem[weaponIDIndex[split[1]].indexOf(char)] != undefined) {
			// item should exist but if it doesn't there's a fallback with item being {}
			item = lsItem[weaponIDIndex[split[1]].indexOf(char)];
		} else {
			item.id = char;
			lsItem.push(item);
		}
		if((mustExist && JSON.stringify(item) != "{}") || !mustExist) {
			if(value === undefined) {
				// delete undefined values
				delete item[key];
			} else {
				item[key] = value;
			}	
		} else {
			throw new Error("Could not set the key as mustExist was set to true.");
		}
		setLSItem(split[1],JSON.stringify(lsItem));
	}
}

var updateExp = (element,rarity=null) => {
	var newLevel = element.value;
	var newExp;
	if(rarity !== null || (typeof(rarity) == "number" && rarity > 0 && rarity < 6)) {
		// weapon stuff
		if(newLevel > weapLevelValues[(rarity - 1)].length + 1 || newLevel < 1) {
			return;
		}
		newExp = weapLevelValues[(rarity - 1)][newLevel - 1];
	} else {
		// character stuff
		if(newLevel > charLevelValues.length+1 || newLevel < 1) {
			return;
		}
		newExp = charLevelValues[newLevel - 1];
	}
	var id = element.id.slice(0,-4); // remove "-exp"
	if(newExp == undefined) {
		newExp = 0;
	}
	let expR = get(id+"-expRemainder");
	expR.value = 0;
	expR.max = newExp;
	if(newExp != 0) {
		expR.parentNode.removeAttribute("style");
		expR.nextSibling.innerText = "/"+newExp;
	} else {
		expR.parentNode.style = "display:none";
	}
	updateBar(expR,rarity);
}
var updateBar = (element,rarity=null) => {
	var value = element.value;
	var max = element.max;
	var id = element.id.slice(0,-13); // removes "-expRemainder"
	if(max != 0 && value != 0 && max == value) {
		let newLevel = Math.floor(get(id+"-lvl").value) + 1;

		var newMax;
		if(rarity !== null || (typeof(rarity) == "number" && rarity > 0 && rarity < 6)) {
			// weapon stuff
			if(newLevel > weapLevelValues[(rarity - 1)].length + 1 || newLevel < 1) {
				return;
			}
			newMax = weapLevelValues[(rarity - 1)][(newLevel - 1)];
		} else {
			// character stuff
			if(newLevel > charLevelValues.length+1 || newLevel < 1) {
				return;
			}
			newMax = charLevelValues[newLevel - 1];
		}

		if(newMax == undefined) {
			newMax = 0;
			get(id+"-expBar").style = "--fill:100%";
			element.parentNode.style = "display:none";
		} else {
			get(id+"-expBar").style = "--fill:0%";
		}
		setVal(id+"-lvl",newLevel);
		element.max = newMax;
		element.nextSibling.innerText = "/"+newMax;
		setVal(element,0,true);
		saveExp(id);
		return;
	}
	if(max != 0) {
		get(id+"-expBar").style = "--fill:"+((value/max).toPrecision(3)*100)+"%";
	} else {
		get(id+"-expBar").style = "--fill:100%";
	}
	saveExp(id,rarity);
}
var saveExp = (id,rarity=null) => {
	var level = val(id+"-lvl");
	var rem = val(id+"-expRemainder");
	var exp = undefined;
	if(rarity != null) {
		exp = getExpFromLevel("weap",level,rarity) + rem;
	} else {
		exp = getExpFromLevel("char",level) + rem;
	}
	if(exp == 0) {
		exp = undefined;
	}
	saveCharacter(id,"exp",exp);
}

var saveTalents = (id) => {
	var talents = [];
	for(let i in charMaxTalents) {
		var value = val(id+charTalentSuffix[i]);
		if(Math.floor(get(id+charTalentSuffix[i]).max) > charMaxTalents[i]) {
			value -= 3;
		}
		talents.push(value);
	}
	// console.log(talents);
	// if()
	if(JSON.stringify(talents) == "[1,1,1]") {
		saveCharacter(id,"talents",undefined);
	} else {
		saveCharacter(id,"talents",talents);
	}
}