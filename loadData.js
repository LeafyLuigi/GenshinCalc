/* a little bit of meta */
var pageType = ""; // valid values are "index", "party", "characters", "inventory" and "debug".

/* Characters */
const charDB = {};
const charTypes = ["Pyro","Hydro","Electro","Cryo","Dendro","Anemo","Geo","Unaligned"];
const charRegions = [null,"Mondstadt","Liyue","Inazuma","Sumeru","Fontaine","Natlan","Snezhnaya","Khaenri'ah"];
const maxCon = 6;
const charMaxTalents = [10,10,10];
const charTalentSuffix = ["-tal1","-tal2","-tal3"];
const charTalentNames = ["Normal Attack", "Skill", "Burst"];
const allChars = [];
const travTypeOrder = [];
const emptyByElement = [];

async function loadCharData() {
	return await fetch('./chars.json')
	.then((response) => response.json())
	.then((json) => {
		for (let i in json) {
			if(i.slice(0,1) === "$") continue;
			if(pageType !== "debug" && json[i].include === false) continue; // skip include===false
			charDB[i] = json[i];
		}
	})
	.then(() => {
		for (let i in charDB) {
			allChars.push(i);
		}
		for (let i in charDB["Traveler"].regions) {
			let r = charDB["Traveler"].regions[i];
			// skip (include === false) regions
			if(r.include === false) continue;
			emptyByElement.push({});
			travTypeOrder.push(r.type);
		}
	})
}

/* Items */
const itemDB = {};
const itemGroupDB = {};
const itemTypes = ["other","crown","boss","common","elite","weeklyBoss","books","gem","exp","weaponAsc","local"];

async function loadItemData() {
	return await fetch('./items.json')
	.then((response) => response.json())
	.then((json) => {
		for (let i in json) {
			if(i.slice(0,1) === "$") continue;
			if(pageType !== "debug" && json[i].include === false) continue; // skip include false
			itemDB[i] = json[i]; // Add every (include !== false) item to itemDB.
		}
	})
}
async function loadItemGroupData() {
	return await fetch('./itemGroups.json')
	.then((response) => response.json())
	.then((json) => {
		for (let i in json) {
			if(i.slice(0,1) === "$") continue;
			itemGroupDB[i] = json[i]; // Add every (include !== false) item to itemGroupDB.
		}
	})
	.then(()=> {
		// Add item group to the items within the group as well as the item source.
		for (let i in itemGroupDB) {
			for (let j = 0; j < itemGroupDB[i].items.length; j++) {
				itemDB[itemGroupDB[i].items[j]].group = i;
				if(itemDB[itemGroupDB[i].items[j]].source !== undefined) {
					itemDB[itemGroupDB[i].items[j]].source = itemGroupDB[i].source
				};
			}
		}
	})
}

/* Weapons */
const weapDB = {};
const allBows = [];
const allCatalysts = [];
const allClaymores = [];
const allPolearms = [];
const allSwords = [];
const defaultWeapons = {};
const allWeaponTypes = ["Bow","Catalyst","Claymore","Polearm","Sword"];
const allWeaponsLowerCase = {};
const allWeapons = [allBows,allCatalysts,allClaymores,allPolearms,allSwords];

async function loadWeaponData() {
	return await fetch('./weapons.json')
	.then((response) => response.json())
	.then((json) => {
		for (let i in json) {
			if(i.slice(0,1) === "$") continue;
			if(pageType !== "debug" && json[i].include === false) continue; // skip all include false
			weapDB[i] = json[i]; // Add every (include !== false) weapon to weapDB.
		}
	})
	.then(()=> {
		for (let i in weapDB) {
			// add weapon to all<typeOfWeapon>
			allWeapons[allWeaponTypes.indexOf(weapDB[i].type)].push(i);

			// add weapon to allWeaponsLowerCase
			allWeaponsLowerCase[i.toLowerCase()] = i;

			// if weapon is default, add to defaultWeapons
			if(defaultWeapons[weapDB[i].type] !== undefined) {
				continue;
			}
			if(weapDB[i].rarity === 1) {
				defaultWeapons[weapDB[i].type] = i;
			}
		}
	})
}

/* Artifacts */
const artifactDB = {};
const allFlowers = [];
const allPlumes = [];
const allSands = [];
const allGoblets = [];
const allCirclets = [];
const artifactTypes = ["flower","plume","sands","goblet","circlet"];
const allArtifacts = [allFlowers,allPlumes,allSands,allGoblets,allCirclets];
const allArtifactGroupsWithOneType = [];
const allArtifactGroupsWithOneTypeIs = [];
const allArtifactGroups = [];
const artiValidStats = [
	"HP",
	"ATK",
	["HP%","ATK%","DEF%","EM","ER"],
	["HP%","ATK%","DEF%","EM","Pyro","Hydro","Electro","Cryo","Dendro","Anemo","Geo","Physical"],
	["HP%","ATK%","DEF%","EM","CR","CD","HB"]
];
const artiValidSubstats = ["HP","ATK","DEF","HP%","ATK%","DEF%","EM","ER","CR","CD"];
const artiLabels = {
	"EM": "Elemental Mastery",
	"ER": "Energy Recharge",
	"CR": "Crit Rate",
	"CD": "Crit DMG",
	"HB": "Healing Bonus",
	"Pyro": "Pyro DMG Bonus",
	"Hydro": "Hydro DMG Bonus",
	"Electro": "Electro DMG Bonus",
	"Cryo": "Cryo DMG Bonus",
	"Dendro": "Dendro DMG Bonus",
	"Anemo": "Anemo DMG Bonus",
	"Geo": "Geo DMG Bonus",
	"Physical": "Physical DMG Bonus"

}

async function loadArtifactData() {
	return await fetch('./artifacts.json')
	.then((response) => response.json())
	.then((json) => {
		for (let i in json) {
			if(i.slice(0,1) === "$") continue;
			artifactDB[i] = json[i];
		}
	})
	.then(()=> {
		for (let i in artifactDB) {
			allArtifactGroups.push(i);

			var has = [];
			for(let j in artifactTypes) {
				if(artifactDB[i][artifactTypes[j]] !== undefined) {
					allArtifacts[j].push(artifactDB[i][artifactTypes[j]]);
					has.push(artifactTypes[j]);
				}
			}
			if(has.length === 1) {
				allArtifactGroupsWithOneType.push(i);
				allArtifactGroupsWithOneTypeIs.push(has[0]);
				if(artifactDB[i].flower === undefined && artifactDB[i].plume === undefined) artifactDB[i].hasMainStat = true;
			}
		}
	})
}

/* Ascension Data */
// skipping for now!


/* META stuff */
// Load page links
const allLinks = {
	index: {
		text: "Home",
	},
	inv: {
		text: "Inventory",
	},
	characters: {
		text: "Characters and Equipment",
	},
	party: {
		text: "Party",
	},
	debug: {
		text: "Debug",
		show: false
	}
}
function makeLinks() {
	var keys = Object.keys(allLinks);
	var currentPage = "";
	var url = document.URL;
	for(let i = 1; i < keys.length - 1; i++) {
		if(url.indexOf(keys[i]) !== -1) {
			currentPage = keys[i];
		}
	}
	var parentElem = get("links");
	let skipLink = makeElem("a", "Skip past links/prefs", "skipLink", "skipLink");
	parentElem.appendChild(skipLink);
	for(let i in keys) {
		if(currentPage !== keys[i] && allLinks[keys[i]].show !== false) {
			var link = makeElem("a",allLinks[keys[i]].text);
			link.href = keys[i] === "" ? "/" : keys[i]+".html";
			parentElem.appendChild(link);
		}
	}
	console.log(keys,currentPage)
}
// Add Footer
function makeFooter() {
	// <strong>does not</strong> use Cookies and is completely open source. You can view the repo <a href="https://github.com/LeafyLuigi/GenshinCalc">here</a>.
	var body = document.getElementsByTagName("body")[0];
	var footer = makeElem("footer");
	footer.style = "font-size:12px;overflow-x:auto";
	footer.appendChild(makeElem(undefined,"Images are copyrighted by miHoYo / HoYoverse. Data was obtained using the Fandom site, the interactive map and from the game itself. This site "));
	footer.appendChild(makeElem("strong","does not"));
	footer.appendChild(makeElem(undefined," use Cookies and is completely open source. "));
	var a = makeElem("a","Click here to view the repo");
	a.href = "https://github.com/LeafyLuigi/GenshinCalc";
	footer.appendChild(a);
	footer.appendChild(makeElem(undefined,"."));
	body.appendChild(footer);
}

/* IDs */
// ids and idIndex initialization - Parties only get added on that page. These shouldn't go off on the inventory page.

var ids = {}; // should be id:<target>. example: "asdf" is a "Dull Blade" it should be asdf:"Dull Blade".
var idIndex = []; // An array of currently used IDs.
// var idCharNameIndex = []; // indexes the names :))))
var weaponInfoIndex = {}; // Contains info for currently saved weapons. Should match the localStorage item for them.
var weaponIDIndex = {}; // Contains Weapons with an array of IDs.
var artifactInfoIndex = {}; // Contains info for the currently saved artifacts. Should match the localStorage item for them.
var artifactIDIndex = {}; // Contains Artifacts with either an object with an array of IDs or an array of IDs for sets with one type.
var charInfoIndex = {}; // Contains info for every character. Should match the localStorage item for them.
var setsIDIndex = {}; // Contains set IDs for characters, sorted by characters. The data for them are in charInfoIndex[$char].sets

async function loadIDs() {
	if(pageType === "inventory" || pageType === "debug") return; // skip on inv and debug. skip on undefined page
	await Promise.all([
		(async () => await loadWeaponIDs())(),
		(async () => await loadArtifactIDs())(),
		(async () => await loadCharacterIDs())()
	])
}
async function loadWeaponIDs() {
	if(typeof(weapDB) === "undefined") return;
	// Weapons
	for(let i in weapDB) {
		if(getLSItem(i) === null) continue;
		let lsItem = parseLSItem(i,[]);

		if(JSON.stringify(lsItem) === "[]") {
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
async function loadArtifactIDs() {
	if(typeof(artifactDB) === "undefined") return;
	// Artifacts
	for(let i in artifactDB) {
		if(getLSItem(i) === null) continue;
		let lsItem = parseLSItem(i,{}); // set as object for more than one types. should be an array for sets with one type.

		if(JSON.stringify(lsItem) === "{}") {
			console.warn(i+" exists in localStorage but could not be parsed. Skipping.");
			continue;
		}
		
		if(allArtifactGroupsWithOneType.indexOf(i) !== -1) {
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
				if(lsItem[artifactTypes[j]] === undefined) continue; // skip empty lists
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
async function loadCharacterIDs() {
	if(typeof(charDB) === "undefined") return;
	// Characters - missing weapons and artifacts will be deleted from the character.
	for(let i in charDB) {
		if(getLSItem(i) === null) continue;
		let lsItem = parseLSItem(i,[]);

		if(JSON.stringify(lsItem) == "[]") {
			console.warn(i+" exists in localStorage but could not be parsed. Skipping.");
			continue;
		}

		charInfoIndex[i] = lsItem;
		if(lsItem.sets !== undefined) {
			setsIDIndex[i] = [];
			let setsMap = lsItem.sets.map(i=>i.id);
			for(let j=0;j<setsMap.length;j++) {
				let set = lsItem.sets[j];
				setsIDIndex[i].push(set.id);
				ids[set.id] = "set--"+i;
				idIndex.push(set.id);
				if(set.weapon !== undefined && typeof(weapDB) !== "undefined" && idIndex.indexOf(set.weapon) === -1) {
					console.warn(i+" has a missing weapon in "+set.id+". It will be reset.");
					delete set.weapon;
				}
				if(set.artifacts !== undefined && typeof(artifactDB) !== "undefined") {
					for(let k=0;k<set.artifacts.length;k++) {
						if(set.artifacts[k] === null) continue; // skip empty artifacts (null)
						if(idIndex.indexOf(set.artifacts[k]) === -1) {
							console.warn(i+" has a missing artifact in "+set.id+" for "+artifactTypes[k]+". That artifact will be reset.");
							set.artifacts[k] = null;
						}
					}
				}
			}
		}
	}
}


/* This will need to be called on the page. */
/* Something like this will work:

	async function loadPage() {
		await loadData();
		// code that exists within window.addEventListener("load") here...
	}
	loadPage();
*/
async function loadData() {
	console.info("[loadData] Starting...");

	// Link stuff
	if(get("links") !== null) {
		makeLinks();
	}
	// Footer
	makeFooter();

	
	// Ensure that `items` is loaded before `itemGroups`. The others can be loaded whenever.
	console.info("[loadData] Loading Artifacts, Characters, Items and Weapons...");
	await Promise.all([
		( async () => await loadArtifactData() )(),
		( async () => await loadCharData() )(),
		( async () => await loadItemData() )(),
		( async () => await loadWeaponData() )()
	]);
	console.info("[loadData] Loading Item Groups...");
	await loadItemGroupData();

	console.info("[loadData] Loading IDs from localStorage");
	await loadIDs();

	if(getLSItem("selectedChars") !== null) {
		console.info("[loadData] Attempting to check selectedChars for empty items...");
		var sc = parseLSItem("selectedChars","");
		if(sc === "") {
			console.info("[loadData] selectedChars could not be parsed or doesn't exist.");
		} else {
			var updateWeaps = false, updateChars = false; // Used to update the localStorage data for the weapons and characters
			var weaps = [], chars = []; // Update these ones in particular...
			// Check through it and see what characters and weapons exist in charData and weaponData
			for(let i = 0; i < sc.length; i++) {
				let itm = sc[i]
				// Weapons have ID
				// Non-traveler characters lack useTravElement
				// Initial Traveler has Name and useTravElement
				// Subsequent Travelers lack Name

				if(itm.id !== undefined) {
					// Weapons

					// Check if weapon already exists
					if(ids[itm.id] !== undefined) continue;
					if(!updateWeaps) updateWeaps = true;
					if(weaps.indexOf(itm.name) === -1) weaps.push(itm.name);

					if(weaponInfoIndex[itm.name] === undefined) weaponInfoIndex[itm.name] = [];
					weaponInfoIndex[itm.name].push(itm);
					if(weaponIDIndex[itm.name] === undefined) weaponIDIndex[itm.name] = [];
					weaponIDIndex[itm.name].push(itm.id);
					ids[itm.id] = "weap--"+itm.name;
					idIndex.push(itm.id);

				} else if(itm.useTravElement === undefined) {
					// Non-Traveler Characters
					
					// Skip already existing characters (mainly from other pages)
					if(ids[itm.name] !== undefined) continue;
					if(!updateChars) updateChars = true;
					if(chars.indexOf(itm.name) === -1) chars.push(itm.name);

					if(charInfoIndex[itm.name] === undefined) charInfoIndex[itm.name] = {};
					ids[itm.name] = "char";
					idIndex.push(itm.name);

				} else if(!(itm.name === undefined)) {
					// Initial Traveler

					// console.log(itm)
					// Skip Traveler if it exists already
					if(ids[travTypeOrder[itm.useTravElement]+" Traveler"] !== undefined) continue;

					if(charInfoIndex["Traveler"] === undefined) {
						charInfoIndex["Traveler"] = {};
						if(!updateChars) updateChars = true;
						chars.push("Traveler");
					}
					
					ids[travTypeOrder[itm.useTravElement]+" Traveler"] = "char";
					idIndex.push(travTypeOrder[itm.useTravElement]+" Traveler");

				} else {
					// Other Travelers

					// Skip if it exists
					if(ids[travTypeOrder[itm.useTravElement]+" Traveler"] !== undefined) continue;

					ids[travTypeOrder[itm.useTravElement]+" Traveler"] = "char";
					idIndex.push(travTypeOrder[itm.useTravElement]+" Traveler");

				}

				if(updateWeaps) {
					for(let j = 0; j < weaps.length; j++) {
						setLSItem(weaps[j],JSON.stringify(weaponInfoIndex[weaps[j]]));
					}
				}
				if(updateChars) {
					for(let j = 0; j < chars.length; j++) {
						setLSItem(chars[j],JSON.stringify(charInfoIndex[chars[j]]));
					}
				}
				if(!updateWeaps && !updateChars) {
					console.info("[loadData] selectedCharacters has been integrated into localStorage.");
				}
			}
		}
	}

	console.info("[loadData] ...Done!");
}