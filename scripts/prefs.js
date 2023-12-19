"use strict";
const prefVersion = 0.02;
const defaultPreferences = {
	prefs: {
		version: prefVersion,
		hideLimited: true,
		hideExtraIcons: false,
		showAdvancedWeaponInputs: false
	},
	charTargets: {
		version: prefVersion,
		ascension: 6,
		exp: 8362650,
		talents: [9,9,9]
	},
	weaponTargets: {
		version: prefVersion,
		basicAscension: 6,
		basicTargetMaxLevel: true,
		byRarity: [
			{
				exp: 719875,
				ascension: 4
			},{
				exp: 1079675,
				ascension: 4
			},{
				exp: 3988200,
				ascension: 6
			},{
				exp: 6042650,
				ascension: 6
			},{
				exp: 9064450,
				ascension: 6
			}
		]
	}
};
var prefs = {}, charTargets = {}, weaponTargets = {};

var updateLocalStoragePrefs = () => {
	var p, newPrefs = {prefs:{},charTargets:{},weaponTargets:{}};
	if(localStorage.getItem("prefs") === null) return; // skip if not found
	try {
		p = JSON.parse(localStorage.getItem("prefs"));
	}
	catch {
		console.error("Could not parse localStorage's \"prefs\". Aborting.");
		return;
	}
	// check if older version using arrays
	if(Array.isArray(p)) {
		newPrefs.prefs.version = defaultPreferences.prefs.version;
		newPrefs.prefs.hideLimited = p[6] != undefined ? p[6] : defaultPreferences.prefs.hideLimited;
		newPrefs.prefs.hideExtraIcons = p[7] != undefined ? p[7] : defaultPreferences.prefs.hideExtraIcons;
		
		newPrefs.charTargets.version = defaultPreferences.charTargets.version;
		newPrefs.charTargets.ascension = p[1] != undefined ? p[1] : defaultPreferences.charTargets.ascension;
		newPrefs.charTargets.exp = p[0] != undefined ? getExpFromLevel("char",p[0]) : defaultPreferences.charTargets.exp;
		newPrefs.charTargets.talents = [p[2] != undefined ? p[2] : defaultPreferences.charTargets.talents[0],p[3] != undefined ? p[3] : defaultPreferences.charTargets.talents[1],p[4] != undefined ? p[4] : defaultPreferences.charTargets.talents[2]];
		
		newPrefs.weaponTargets.version = defaultPreferences.prefs.version;
		newPrefs.weaponTargets.byRarity = defaultPreferences.weaponTargets.byRarity;
		for(let i=2;i<5;i++){newPrefs.weaponTargets.byRarity[i].ascension = p[5]}
	}
	if(JSON.stringify(newPrefs) === '{"prefs":{},"charTargets":{},"weaponTargets":{}}') return;
	for(let i in Object.keys(newPrefs)) {
		let key = Object.keys(newPrefs)[i];
		setLSItem(key,JSON.stringify(newPrefs[key]));
	}
}

var loadAllPrefs = () => {
	loadPrefs();
	loadCharTargets();
	loadWeaponTargets();
}

var loadPrefs = () => {
	if(localStorage.getItem("prefs") !== null) {
		try{
			prefs = JSON.parse(localStorage.getItem("prefs"));
		}
		catch {
			prefs = defaultPreferences.prefs;
			return;
		}
	} else {
		prefs = defaultPreferences.prefs;
		return;
	}
	if(Object.keys(prefs).length != Object.keys(defaultPreferences.prefs).length) {
		let pKeys = Object.keys(prefs);
		let dKeys = Object.keys(defaultPreferences.prefs);
		for(let i in dKeys) {
			if(pKeys.indexOf(dKeys[i]) != -1) continue;
			prefs[dKeys[i]] = defaultPreferences.prefs[dKeys[i]];
		}
		setLSItem("prefs",JSON.stringify(prefs));
	}
}

var loadCharTargets = () => {
	if(localStorage.getItem("charTargets") !== null) {
		try{
			charTargets = JSON.parse(localStorage.getItem("charTargets"));
		}
		catch {
			charTargets = defaultPreferences.charTargets;
			return;
		}
	} else {
		charTargets = defaultPreferences.charTargets;
		return;
	}
	if(Object.keys(charTargets).length != Object.keys(defaultPreferences.charTargets).length) {
		let cKeys = Object.keys(charTargets);
		let dKeys = Object.keys(defaultPreferences.charTargets);
		for(let i in dKeys) {
			if(cKeys.indexOf(dKeys[i]) != -1) continue;
			charTargets[dKeys[i]] = defaultPreferences.charTargets[dKeys[i]];
		}
		setLSItem("charTargets",JSON.stringify(charTargets));
	}
}

var loadWeaponTargets = () => {
	if(localStorage.getItem("weaponTargets") !== null) {
		try{
			weaponTargets = JSON.parse(localStorage.getItem("weaponTargets"));
		}
		catch {
			weaponTargets = defaultPreferences.weaponTargets;
			return;
		}
	} else {
		weaponTargets = defaultPreferences.weaponTargets;
		return;
	}
	if(Object.keys(weaponTargets).length != Object.keys(defaultPreferences.weaponTargets).length) {
		let wKeys = Object.keys(weaponTargets);
		let dKeys = Object.keys(defaultPreferences.weaponTargets);
		for(let i in dKeys) {
			if(wKeys.indexOf(dKeys[i]) != -1) continue;
			weaponTargets[dKeys[i]] = defaultPreferences.weaponTargets[dKeys[i]];
		}
		setLSItem("weaponTargets",JSON.stringify(weaponTargets));
	}
}

var updatePrefs = () => {
	setLSItem("prefs",JSON.stringify(prefs));
	setLSItem("charTargets",JSON.stringify(charTargets));
	setLSItem("weaponTargets",JSON.stringify(weaponTargets));
}

window.addEventListener("load", () => {
	updateLocalStoragePrefs();
	loadAllPrefs();
	toggleAdvancedWeaponInputs();
});

// used in home page
var toggleAdvancedWeaponInputs = () => {
	if(get("weaponInputs") === null) return; // can't find it? abort
	if(prefs.showAdvancedWeaponInputs) {
		get("weaponInputs").children[0].children[1].checked = true; // "Show all for Weapons?" checkbox
		get("weaponInputs").children[1].style = "display:none"; // Hide "basic" stuff
		get("weaponInputs").children[2].style = ""; // Show "advanced" stuff
	} else if(!prefs.showAdvancedWeaponInputs) {
		get("weaponInputs").children[0].children[1].checked = false; // "Show all for Weapons?" checkbox
		get("weaponInputs").children[1].style = ""; // Show "basic" stuff
		get("weaponInputs").children[2].style = "display:none"; // Hide "advanced" stuff
	}
}

// used in home page, parties
var toggleLimitedItems = () => {
	document.getElementsByTagName("body")[0].classList.toggle("hideLimited");
}
// used in home page, inventory
var toggleExtraIcons = () => {
	document.getElementsByTagName("body")[0].classList.toggle("hideExtraIcons");
}