"use strict";
const prefVersion = 0.03;
const defaultPreferences = {
	prefs: {
		version: prefVersion,
		hideLimited: true,
		hideExtraIcons: false,
		showConverts: false,
		theme: "dark",
	},
	charTargets: {
		version: prefVersion,
		ascension: 6,
		exp: 8362650,
		talents: [9,9,9]
	},
	weaponTargets: {
		version: prefVersion,
		showAdvancedWeaponInputs: false,
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
const themes = ["dark", "light", "white", "ganyu", "knave"];
var prefs = {}, charTargets = {}, weaponTargets = {};
async function loadAllPrefs () {
	loadPrefs();
	loadCharTargets();
	loadWeaponTargets();
	if(getPref("prefs","hideLimited")) {
		document.body.classList.add("hideLimited");
	}
	if(getPref("prefs","hideExtraIcons")) {
		document.body.classList.add("hideExtraIcons");
	}
	if(getPref("prefs","showConverts")) {
		document.body.classList.add("showConverts");
	}
	changeTheme(getPref("prefs","theme"));
}

function loadPrefs () {
	if(localStorage.getItem("prefs") !== null) {
		try{
			prefs = JSON.parse(localStorage.getItem("prefs"));
		}
		catch {
			prefs = defaultPreferences.prefs;
			setLSItem("prefs",JSON.stringify(prefs));
			return;
		}
	} else {
		prefs = defaultPreferences.prefs;
		setLSItem("prefs",JSON.stringify(prefs));
		return;
	}
}

function loadCharTargets () {
	if(localStorage.getItem("charTargets") !== null) {
		try{
			charTargets = JSON.parse(localStorage.getItem("charTargets"));
		}
		catch {
			charTargets = defaultPreferences.charTargets;
			setLSItem("charTargets",JSON.stringify(charTargets));
			return;
		}
	} else {
		charTargets = defaultPreferences.charTargets;
		setLSItem("charTargets",JSON.stringify(charTargets));
		return;
	}
}

function loadWeaponTargets () {
	if(localStorage.getItem("weaponTargets") !== null) {
		try{
			weaponTargets = JSON.parse(localStorage.getItem("weaponTargets"));
		}
		catch {
			weaponTargets = defaultPreferences.weaponTargets;
			setLSItem("weaponTargets",JSON.stringify(weaponTargets));
			return;
		}
	} else {
		weaponTargets = defaultPreferences.weaponTargets;
		setLSItem("weaponTargets",JSON.stringify(weaponTargets));
		return;
	}
}

function updatePrefs () {
	setLSItem("prefs",JSON.stringify(prefs));
	setLSItem("charTargets",JSON.stringify(charTargets));
	setLSItem("weaponTargets",JSON.stringify(weaponTargets));
}

// HTML part maker
async function insertPrefElements (options={}) {
	// OPTIONS OBJECT; FORMATS MUTUALLY EXCLUSIVE:
	// {exclude:["charInputs","weapInputs","hideLimited"]} - exclude these components
	// {include:["charInputs","weapInputs","hideLimited","hideExtraIcons","showConverts"]} - include the following components.
	// Setup Vars
	const allComponents = ["charInputs","weapInputs","hideLimited","hideExtraIcons","showConverts","themeDropdown"];
	var container, input, textContainer, container2, show=[];
	// this is so error prone lmao
	if(options.include !== undefined && options.exclude === undefined) {
		show = options.include;
	} else if (options.exclude !== undefined && options.include === undefined) {
		for(let i in allComponents) {
			if(options.include.indexOf(allComponents[i]) == -1) {
				show.push(allComponents[i]);
			}
		}
	} else if (JSON.stringify(options) == "{}") {
		show = allComponents;
	}
	// Parent Element
	var parentContainer = get("prefsContainer");
	parentContainer.classList = "vertFlex inputs";
	// Character stuff
	if(show.indexOf("charInputs") != -1) {
	const charInputNames = [{
		label: "Level ",
		name: "Lvl",
		min: 1,
		max: 90,
		value: getLevelFromExp("char",getPref("charTargets","exp"))[0],
		size: 3,
		data: "exp"
	}, {
		label: "Ascension ",
		name: "Asc",
		min: 0,
		max: 6,
		value: getPref("charTargets","ascension"),
		size: 3,
		data: "ascension"
	}];
	for (let i = 0; i < 3; i++) {
		charInputNames.push({
			label: charTalentNames[i]+" ",
			name: "Tal" + (i + 1),
			min: 1,
			max: 10,
			value: getPref("charTargets","talents")[i],
			size: 3,
			data: "talents",
			i: i
		})
	}

		container = makeElem("div",undefined,undefined,"charInputs");
		textContainer = makeElem("span");
		textContainer.appendChild(makeElem(undefined,"Default "));
		textContainer.appendChild(makeElem("strong","target"));
		textContainer.appendChild(makeElem(undefined," values for characters: "));
		container.appendChild(textContainer);
		for (let i in charInputNames) {
			let j = charInputNames[i];
			container.appendChild(makeLabelElem(j.label,"defaultTargetChar"+j.name));
			input = makeNumberInputElem("defaultTargetChar"+j.name,j.value,j.min,j.max,j.size,"defaultInput");
			input.value = j.value;
			input.setAttribute("data-pref",j.data);
			if(j.data == "talents") {
				input.setAttribute("data-pref2",j.i);
			}
			input.addEventListener("change",function(e){
				i = e.currentTarget;
				forceValue(i);
				j = i.getAttribute("data-pref");
				switch (j) {
					case "exp":
						charTargets[j] = getExpFromLevel("char",i.valueAsNumber);
						break;
					case "talents":
						charTargets[j][Math.floor(i.getAttribute("data-pref2"))] = i.valueAsNumber;
						break;
					default:
						charTargets[j] = i.valueAsNumber;
				}
				updatePrefs();
			});
			container.appendChild(input);
			if(i != charInputNames.length - 1) container.appendChild(addSpacer());
		}
		parentContainer.appendChild(container);
	}

	// Weapon Stuff
	if(show.indexOf("weapInputs") != -1) {
		container = makeElem("div",undefined,undefined,"weapInputs");

		// Toggle for showing By Rarity
		textContainer = makeElem("em");
		textContainer.appendChild(makeLabelElem("Show weapons by rarity? ","showAdvancedWeaponInputs"))
		input = makeElem("input",undefined,undefined,"showAdvancedWeaponInputs");
		input.type = "checkbox";
		input.setAttribute("name",input.id);
		input.checked = getPref("weaponTargets","showAdvancedWeaponInputs");
		input.addEventListener("change",function(e){
			weaponTargets.showAdvancedWeaponInputs = e.currentTarget.checked;
			updatePrefs();
			toggleAdvancedWeaponInputs();
		})
		textContainer.appendChild(input);
		container.appendChild(textContainer);

		// Weapons Basic stuff
		container2 = makeElem("div",undefined,undefined,"basicWeaponInput");
		textContainer = makeElem("span")
		textContainer.appendChild(makeElem(undefined,"Default "));
		textContainer.appendChild(makeElem("strong","target"));
		textContainer.appendChild(makeElem(undefined," value for weapons: "));
		container2.appendChild(textContainer);
		textContainer = makeElem("span");
		textContainer.setAttribute("title","Having this checked targets the highest level possible while having this unchecked sets it to level 1.")
		textContainer.appendChild(makeLabelElem("Target Maximum Level? ","basicWeaponExp"));
		input = makeElem("input",undefined,"defaultInput","basicWeaponExp");
		input.type = "checkbox";
		input.setAttribute("name",input.id);
		input.checked = getPref("weaponTargets","basicTargetMaxLevel");
		input.addEventListener("change",function(e){
			weaponTargets.basicTargetMaxLevel = e.currentTarget.checked;
			updatePrefs();
		});
		textContainer.appendChild(input);
		textContainer.appendChild(addSpacer());
		container2.appendChild(textContainer);
		textContainer = makeElem("span");
		textContainer.setAttribute("title","1 and 2 star weapons can only be ascended 4 times max.");
		textContainer.appendChild(makeLabelElem("Ascension","basicWeaponAscension","defaultInput"));
		input = makeNumberInputElem("basicWeaponAscension",6,0,6,3,"defaultInput");
		input.addEventListener("change",function(e){
			forceValue(e.currentTarget);
			weaponTargets.basicAscension = e.currentTarget.valueAsNumber;
			updatePrefs();
		});
		textContainer.appendChild(input);
		container2.appendChild(textContainer);
		if(getPref("weaponTargets","showAdvancedWeaponInputs")) {
			container2.setAttribute("hidden","");
		}
		container.appendChild(container2);

		// Weapons By Rarity
		let weapByRarityInputNames = [];
		for(let i = 0; i < 5; i++) {
			weapByRarityInputNames.push([
				{
					label: "Ascension ",
					name: "R"+(i+1)+"Asc",
					min: 0,
					max: weapAscValues[i].length,
					value: getPref("weaponTargets","byRarity")[i].ascension,
					size: 3,
					data: "ascension",
					i: i
				},
				{
					label: "Level ",
					name: "R"+(i+1)+"Exp",
					min: 1,
					max: weapLevelValues[i].length+1,
					value: getLevelFromExp("weap",getPref("weaponTargets","byRarity")[i].exp,(i+1))[0],
					size: 3,
					data: "exp",
					i: i
				}
			])
		}

		container2 = makeElem("div",undefined,undefined,"advancedWeaponInput");
		textContainer = makeElem("div");
		textContainer.appendChild(makeElem(undefined,"Default "));
		textContainer.appendChild(makeElem("strong","target"));
		textContainer.appendChild(makeElem(undefined," values for weapons:"));
		container2.appendChild(textContainer);

		let numWords = ["One","Two","Three","Four","Five"];
		for(let i in weapByRarityInputNames) {
			let j = weapByRarityInputNames[i][0]; // Label
			let k = weapByRarityInputNames[i][1]; // Input
			let container = makeElem("div");
			container.appendChild(makeImg("images/icons/rarity/"+(Math.floor(i)+1)+".png","unset",16,"extraIcon"));
			container.appendChild(makeElem(undefined,numWords[i]+" Star Weapons: "));
			container.appendChild(makeLabelElem(k.label,"defaultWeaponAdv"+k.name));
			var input = makeNumberInputElem("defaultWeaponAdv"+k.name,k.value,k.min,k.max,k.size,["defaultInput","advancedWeaponInput"]);
			input.setAttribute("data-pref",k.data);
			input.setAttribute("data-pref2",k.i);
			input.addEventListener("change",function(e){
				forceValue(e.currentTarget);
				weaponTargets.byRarity[Math.floor(e.currentTarget.getAttribute("data-pref2"))][e.currentTarget.getAttribute("data-pref")] = e.currentTarget.valueAsNumber;
				updatePrefs();
			});
			container.appendChild(input);
			container.appendChild(addSpacer());
			container.appendChild(makeLabelElem(j.label,"defaultWeaponAdv"+j.name));
			var input = makeNumberInputElem("defaultWeaponAdv"+j.name,j.value,j.min,j.max,j.size,["defaultInput","advancedWeaponInput"]);
			input.setAttribute("data-pref",j.data);
			input.setAttribute("data-pref2",j.i);
			input.addEventListener("change",function(e){
				forceValue(e.currentTarget);
				weaponTargets.byRarity[Math.floor(e.currentTarget.getAttribute("data-pref2"))][e.currentTarget.getAttribute("data-pref")] = e.currentTarget.valueAsNumber;
				updatePrefs();
			});
			container.appendChild(input);
			container2.appendChild(container);
		}
		if(!getPref("weaponTargets","showAdvancedWeaponInputs")) {
			container2.setAttribute("hidden","");
		}
		container.appendChild(container2);
		parentContainer.appendChild(container);
	}


	// Other Prefs
	container = makeElem("div",undefined,undefined,"otherPreferences");
	if(show.indexOf("hideLimited") != -1) {
		textContainer = makeElem("span");
		textContainer.setAttribute("title","Limited-Timed items include Aloy and Flagship Event Weapons.");
		textContainer.appendChild(makeLabelElem("Hide Limited-Timed Items ","toggleLimited"));
		input = makeElem("input",undefined,"defaultInput","toggleLimited");
		input.setAttribute("name",input.id);
		input.type = "checkbox";
		input.checked = getPref("prefs","hideLimited");
		input.addEventListener("change",function(e){
			prefs.hideLimited = e.currentTarget.checked;
			updatePrefs();
			toggleLimitedItems();
		});
		textContainer.appendChild(input);
		if(show.indexOf("hideLimited") != show.length - 1) textContainer.appendChild(addSpacer());
		container.appendChild(textContainer);
	}
	if(show.indexOf("hideExtraIcons") != -1) {
		textContainer = makeElem("span");
		textContainer.setAttribute("title","Icons that would be toggled include Visions, Weapons and Rarity Stars.");
		textContainer.appendChild(makeLabelElem("Hide Extra Icons ","toggleExtraIcons"));
		input = makeElem("input",undefined,"defaultInput","toggleExtraIcons");
		input.type = "checkbox";
		input.setAttribute("name",input.id);
		input.checked = getPref("prefs","hideExtraIcons");
		input.addEventListener("change",function(e){
			prefs.hideExtraIcons = e.currentTarget.checked;
			updatePrefs();
			toggleExtraIcons();
		})
		textContainer.appendChild(input);
		if(show.indexOf("hideExtraIcons") != show.length - 1) textContainer.appendChild(addSpacer());
		container.appendChild(textContainer);
	}
	if(show.indexOf("showConverts") != -1) {
		textContainer = makeElem("span");
		textContainer.setAttribute("title","Allows usage of Dust of Azoth and Dream Solvent.");
		textContainer.appendChild(makeLabelElem("Show Item Converting ","showConverts"));
		input = makeElem("input",undefined,"defaultInput","showConverts");
		input.type = "checkbox";
		input.setAttribute("name",input.id);
		input.checked = getPref("prefs","showConverts");
		input.addEventListener("change",function(e){
			prefs.showConverts = e.currentTarget.checked;
			updatePrefs();
			showConverts();
		})
		textContainer.appendChild(input);
		if(show.indexOf("showConverts") != show.length - 1) textContainer.appendChild(addSpacer());
		container.appendChild(textContainer);
	}

	if(show.indexOf("themeDropdown") != -1) {
		textContainer = makeElem("span");
		textContainer.appendChild(makeLabelElem("Select Site Theme ","siteTheme"));
		var container2 = makeElem("select",undefined,undefined,"siteTheme");
		container2.setAttribute("name",container2.id);
		for(let i = 0; i < themes.length; i++) {
			input = makeElem("option",themes[i][0].toUpperCase()+themes[i].slice(1),"capitalize");
			input.value = themes[i];
			container2.appendChild(input);
		}
		container2.value = getPref("prefs","theme");
		container2.addEventListener("change",function(e){
			prefs.theme=e.currentTarget.value;
			updatePrefs();
			changeTheme(prefs.theme);
		});
		textContainer.appendChild(container2);
		if(show.indexOf("themeDropdown") != show.length - 1) textContainer.appendChild(addSpacer());
		container.appendChild(textContainer);
	}

	

	parentContainer.appendChild(container);
}
function addSpacer() {
	return makeElem("span"," | ");
}

function getPref(prefVar="",prefName="") {
	var val;
	if(getLSItem(prefVar) !== null) {
		val = JSON.parse(getLSItem(prefVar))[prefName];
	}
	if (val === undefined && window[prefVar] !== undefined) {
		val = window[prefVar][prefName];
	}
	if (val === undefined && defaultPreferences[prefVar] !== undefined) {
		val = defaultPreferences[prefVar][prefName];
	}
	if (val === undefined) {
		throw new Error("Preference could not be found.");
	}
	return val;
}

// used in home page
function toggleAdvancedWeaponInputs () {
	if(getPref("weaponTargets","showAdvancedWeaponInputs")) {
		get("basicWeaponInput").setAttribute("hidden","");
		get("advancedWeaponInput").removeAttribute("hidden");
	} else {
		get("advancedWeaponInput").setAttribute("hidden","");
		get("basicWeaponInput").removeAttribute("hidden");
	}
}

// used in home page, parties
function toggleLimitedItems () {
	document.body.classList.toggle("hideLimited");
}
// used in home page, inventory
function toggleExtraIcons () {
	document.body.classList.toggle("hideExtraIcons");
}
// used in home page
function showConverts () {
	document.body.classList.toggle("showConverts");
}

// theme stuff
function changeTheme(theme="dark") {
	for(var i in themes) {
		if(themes[i] != theme) {
			document.body.classList.remove("theme-"+themes[i]);
		}
	}
	document.body.classList.add("theme-"+theme);
}