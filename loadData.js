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
			charDB[i] = json[i]; // Add every (include !== false) character to charDB.
		}
	})
	.then(() => {
		for (let i in charDB) {
			allChars.push(i);
		}
		for (let i in charDB["Traveler"].regions) {
			let r = charDB["Traveler"].regions[i];
			// skip (include === false) regions
			if(r.include === false) {
				continue;
			}
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
			if(weapDB[i].rarity == 1) {
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
const allArtifactGroups = [];
const artiValidStats = [
	"HP",
	"ATK",
	["HP%","ATK%","DEF%","EM","ER"],
	["HP%","ATK%","DEF%","EM","Pyro","Hydro","Electro","Cryo","Dendro","Anemo","Geo","Physical"],
	["HP%","ATK%","DEF%","EM","CR","CD","HB"]
];
const artiValidSubstats = ["HP","ATK","DEF","HP%","ATK%","DEF%","EM","ER","CR","CD"];

async function loadArtifactData() {
	return await fetch('./artifacts.json')
	.then((response) => response.json())
	.then((json) => {
		for (let i in json) {
			if(i.slice(0,1) === "$") continue;
			artifactDB[i] = json[i]; // Add every (include !== false) weapon to weapDB.
		}
	})
	.then(()=> {
		for (let i in artifactDB) {
			allArtifactGroups.push(i);

			var has = [];
			for(let j in artifactTypes) {
				if(artifactDB[i][artifactTypes[j]] != undefined) {
					allArtifacts[j].push(artifactDB[i][artifactTypes[j]]);
					has.push(artifactTypes[j]);
				}
			}
			if(has.length == 1) {
				allArtifactGroupsWithOneType.push(i);
				if(artifactDB[i].flower == undefined && artifactDB[i].plume == undefined) artifactDB[i].hasMainStat = true;
			}
		}
	})
}

/* Ascension Data */
// skipping for now!


/* META stuff */
// Load page links
const allLinks = {
	"": {
		text: "Home",
	},
	inv: {
		text: "Inventory",
	},
	characters: {
		text: "Characters",
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
		if(url.indexOf(keys[i]) != -1) {
			currentPage = keys[i];
		}
	}
	var parentElem = get("links");
	for(let i in keys) {
		if(currentPage != keys[i] && allLinks[keys[i]].show != false) {
			var link = makeElem("a",allLinks[keys[i]].text);
			link.href = keys[i] == "" ? "/" : keys[i]+".html";
			parentElem.appendChild(link);
			parentElem.appendChild(makeElem(undefined," "))
		}
	}
	console.log(keys,currentPage)
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

	console.info("[loadData] ...Done!");
}