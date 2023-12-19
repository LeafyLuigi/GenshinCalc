'use strict';
const artifactDB = {
	"Adventurer": {
		"flower": "Adventurer's Flower",
		"plume": "Adventurer's Tail Feather",
		"sands": "Adventurer's Pocket Watch",
		"goblet": "Adventurer's Golden Goblet",
		"circlet": "Adventurer's Bandana",
		"rarityMin": 1,
		"rarityMax": 3
	},
	"Lucky Dog": {
		"flower": "Lucky Dog's Clover",
		"plume": "Lucky Dog's Eagle Feather",
		"sands": "Lucky Dog's Hourglass",
		"goblet": "Lucky Dog's Goblet",
		"circlet": "Lucky Dog's Silver Circlet",
		"rarityMin": 1,
		"rarityMax": 3
	},
	"Traveling Doctor": {
		"flower": "Traveling Doctor's Silver Lotus",
		"plume": "Traveling Doctor's Owl Feather",
		"sands": "Traveling Doctor's Pocket Watch",
		"goblet": "Traveling Doctor's Medicine Pot",
		"circlet": "Traveling Doctor's Handkerchief",
		"rarityMin": 1,
		"rarityMax": 3
	},
	"Resolution of Sojourner": {
		"flower": "Heart of Comradeship",
		"plume": "Feather of Homecoming",
		"sands": "Sundial of the Sojourner",
		"goblet": "Goblet of the Sojourner",
		"circlet": "Crown of Parting",
		"rarityMin": 3,
		"rarityMax": 4
	},
	"Tiny Miracle": {
		"flower": "Tiny Miracle's Flower",
		"plume": "Tiny Miracle's Feather",
		"sands": "Tiny Miracle's Hourglass",
		"goblet": "Tiny Miracle's Goblet",
		"circlet": "Tiny Miracle's Earrings",
		"rarityMin": 3,
		"rarityMax": 4
	},
	"Berserker": {
		"flower": "Berserker's Rose",
		"plume": "Berserker's Indigo Feather",
		"sands": "Berserker's Timepiece",
		"goblet": "Berserker's Bone Goblet",
		"circlet": "Berserker's Battle Mask",
		"rarityMin": 3,
		"rarityMax": 4
	},
	"Instructor": {
		"flower": "Instructor's Brooch",
		"plume": "Instructor's Feather Accessory",
		"sands": "Instructor's Pocket Watch",
		"goblet": "Instructor's Tea Cup",
		"circlet": "Instructor's Cap",
		"rarityMin": 3,
		"rarityMax": 4
	},
	"The Exile": {
		"flower": "Exile's Flower",
		"plume": "Exile's Feather",
		"sands": "Exile's Pocket Watch",
		"goblet": "Exile's Goblet",
		"circlet": "Exile's Circlet",
		"rarityMin": 3,
		"rarityMax": 4
	},
	"Defenders Will": {
		"title": "Defender's Will",
		"flower": "Guardian's Flower",
		"plume": "Guardian's Sigil",
		"sands": "Guardian's Clock",
		"goblet": "Guardian's Vessel",
		"circlet": "Guardian's Band",
		"rarityMin": 3,
		"rarityMax": 4
	},
	"Brave Heart": {
		"flower": "Medal of the Brave",
		"plume": "Prospect of the Brave",
		"sands": "Fortitude of the Brave",
		"goblet": "Outset of the Brave",
		"circlet": "Crown of the Brave",
		"rarityMin": 3,
		"rarityMax": 4
	},
	"Martial Artist": {
		"flower": "Martial Artist's Red Flower",
		"plume": "Martial Artist's Feather Accessory",
		"sands": "Martial Artist's Water Hourglass",
		"goblet": "Martial Artist's Wine Cup",
		"circlet": "Martial Artist's Bandana",
		"rarityMin": 3,
		"rarityMax": 4
	},
	"Gambler": {
		"flower": "Gambler's Brooch",
		"plume": "Gambler's Feather Accessory",
		"sands": "Gambler's Pocket Watch",
		"goblet": "Gambler's Dice Cup",
		"circlet": "Gambler's Earrings",
		"rarityMin": 3,
		"rarityMax": 4
	},
	"Scholar": {
		"flower": "Scholar's Bookmark",
		"plume": "Scholar's Quill Pen",
		"sands": "Scholar's Clock",
		"goblet": "Scholar's Ink Cup",
		"circlet": "Scholar's Lens",
		"rarityMin": 3,
		"rarityMax": 4
	},
	"Prayers for Wisdom": {
		"circlet": "Tiara of Thunder",
		"rarityMin": 3,
		"rarityMax": 4
	},
	"Prayers for Destiny": {
		"circlet": "Tiara of Torrents",
		"rarityMin": 3,
		"rarityMax": 4
	},
	"Prayers for Illumination": {
		"circlet": "Tiara of Flame",
		"rarityMin": 3,
		"rarityMax": 4
	},
	"Prayers to Springtime": {
		"circlet": "Tiara of Frost",
		"rarityMin": 3,
		"rarityMax": 4
	},
	"Gladiators Finale": {
		"title": "Gladiator's Finale",
		"flower": "Gladiator's Nostalgia",
		"plume": "Gladiator's Destiny",
		"sands": "Gladiator's Longing",
		"goblet": "Gladiator's Intoxication",
		"circlet": "Gladiator's Triumphus",
		"rarityMin": 4,
		"rarityMax": 5
	},
	"Wanderers Troupe": {
		"title": "Wanderer's Troupe",
		"flower": "Troupe's Dawnlight",
		"plume": "Bard's Arrow Feather",
		"sands": "Concert's Final Hour",
		"goblet": "Wanderer's String-Kettle",
		"circlet": "Conductor's Top Hat",
		"rarityMin": 4,
		"rarityMax": 5
	},
	"Noblesse Oblige": {
		"flower": "Royal Flora",
		"plume": "Royal Plume",
		"sands": "Royal Pocket Watch",
		"goblet": "Royal Silver Urn",
		"circlet": "Royal Masque",
		"rarityMin": 4,
		"rarityMax": 5
	},
	"Bloodstained Chivalry": {
		"flower": "Bloodstained Flower of Iron",
		"plume": "Bloodstained Black Plume",
		"sands": "Bloodstained Final Hour",
		"goblet": "Bloodstained Chevalier's Goblet",
		"circlet": "Bloodstained Iron Mask",
		"rarityMin": 4,
		"rarityMax": 5
	},
	"Maiden Beloved": {
		"flower": "Maiden's Distant Love",
		"plume": "Maiden's Heart-Stricken Infatuation",
		"sands": "Maiden's Passing Youth",
		"goblet": "Maiden's Fleeting Leisure",
		"circlet": "Maiden's Fading Beauty",
		"rarityMin": 4,
		"rarityMax": 5
	},
	"Viridescent Venerer": {
		"flower": "In Remembrance of Viridescent Fields",
		"plume": "Viridescent Arrow Feather",
		"sands": "Viridescent Venerer's Determination",
		"goblet": "Viridescent Venerer's Vessel",
		"circlet": "Viridescent Venerer's Diadem",
		"rarityMin": 4,
		"rarityMax": 5
	},
	"Archaic Petra": {
		"flower": "Flower of Creviced Cliff",
		"plume": "Feather of Jagged Peaks",
		"sands": "Sundial of Enduring Jade",
		"goblet": "Goblet of Chiseled Crag",
		"circlet": "Mask of Solitude Basalt",
		"rarityMin": 4,
		"rarityMax": 5
	},
	"Retracing Bolide": {
		"flower": "Summer Night's Bloom",
		"plume": "Summer Night's Finale",
		"sands": "Summer Night's Moment",
		"goblet": "Summer Night's Waterballoon",
		"circlet": "Summer Night's Mask",
		"rarityMin": 4,
		"rarityMax": 5
	},
	"Thundersoother": {
		"flower": "Thundersoother's Heart",
		"plume": "Thundersoother's Plume",
		"sands": "Hour of Soothing Thunder",
		"goblet": "Thundersoother's Goblet",
		"circlet": "Thundersoother's Diadem",
		"rarityMin": 4,
		"rarityMax": 5
	},
	"Thundering Fury": {
		"flower": "Thunderbird's Mercy",
		"plume": "Survivor of Catastrophe",
		"sands": "Hourglass of Thunder",
		"goblet": "Omen of Thunderstorm",
		"circlet": "Thunder Summoner's Crown",
		"rarityMin": 4,
		"rarityMax": 5
	},
	"Lavawalker": {
		"flower": "Lavawalker's Resolution",
		"plume": "Lavawalker's Salvation",
		"sands": "Lavawalker's Torment",
		"goblet": "Lavawalker's Epiphany",
		"circlet": "Lavawalker's Wisdom",
		"rarityMin": 4,
		"rarityMax": 5
	},
	"Crimson Witch of Flames": {
		"flower": "Witch's Flower of Blaze",
		"plume": "Witch's Ever-Burning Plume",
		"sands": "Witch's End Time",
		"goblet": "Witch's Heart Flames",
		"circlet": "Witch's Scorching Hat",
		"rarityMin": 4,
		"rarityMax": 5
	},
	"Blizzard Strayer": {
		"flower": "Snowswept Memory",
		"plume": "Icebreaker's Resolve",
		"sands": "Frozen Homeland's Demise",
		"goblet": "Frost-Weaved Dignity",
		"circlet": "Broken Rime's Echo",
		"rarityMin": 4,
		"rarityMax": 5
	},
	"Heart of Depth": {
		"flower": "Gilded Corsage",
		"plume": "Gust of Nostalgia",
		"sands": "Copper Compass",
		"goblet": "Goblet of Thundering Deep",
		"circlet": "Wine-Stained Tricorne",
		"rarityMin": 4,
		"rarityMax": 5
	},
	"Tenacity of the Millelith": {
		"flower": "Flower of Accolades",
		"plume": "Ceremonial War-Plume",
		"sands": "Orichalceous Time-Dial",
		"goblet": "Noble's Pledging Vessel",
		"circlet": "General's Ancient Helm",
		"rarityMin": 4,
		"rarityMax": 5
	},
	"Pale Flame": {
		"flower": "Stainless Bloom",
		"plume": "Wise Doctor's Pinion",
		"sands": "Moment of Cessation",
		"goblet": "Surpassing Cup",
		"circlet": "Mocking Mask",
		"rarityMin": 4,
		"rarityMax": 5
	},
	"Shimenawas Reminiscence": {
		"title": "Shimenawa's Reminiscence",
		"flower": "Entangling Bloom",
		"plume": "Shaft of Remembrance",
		"sands": "Morning Dew's Moment",
		"goblet": "Hopeful Heart",
		"circlet": "Capricious Visage",
		"rarityMin": 4,
		"rarityMax": 5
	},
	"Emblem of Severed Fate": {
		"flower": "Magnificent Tsuba",
		"plume": "Sundered Feather",
		"sands": "Storm Cage",
		"goblet": "Scarlet Vessel",
		"circlet": "Ornate Kabuto",
		"rarityMin": 4,
		"rarityMax": 5
	},
	"Husk of Opulent Dreams": {
		"flower": "Bloom Times",
		"plume": "Plume of Luxury",
		"sands": "Song of Life",
		"goblet": "Calabash of Awakening",
		"circlet": "Skeletal Hat",
		"rarityMin": 4,
		"rarityMax": 5
	},
	"Ocean-Hued Clam": {
		"flower": "Sea-Dyed Blossom",
		"plume": "Deep Palace's Plume",
		"sands": "Cowry of Parting",
		"goblet": "Pearl Cage",
		"circlet": "Crown of Watatsumi",
		"rarityMin": 4,
		"rarityMax": 5
	},
	"Vermillion Hereafter": {
		"flower": "Flowering Life",
		"plume": "Feather of Nascent Light",
		"sands": "Solar Relic",
		"goblet": "Moment of the Pact",
		"circlet": "Thundering Poise",
		"rarityMin": 4,
		"rarityMax": 5
	},
	"Echoes of an Offering": {
		"flower": "Soulscent Bloom",
		"plume": "Jade Leaf",
		"sands": "Symbol of Felicitation",
		"goblet": "Chalice of the Font",
		"circlet": "Flowing Rings",
		"rarityMin": 4,
		"rarityMax": 5
	},
	"Deepwood Memories": {
		"flower": "Labyrinth Wayfarer",
		"plume": "Scholar of Vines",
		"sands": "A Time of Insight",
		"goblet": "Lamp of the Lost",
		"circlet": "Laurel Coronet",
		"rarityMin": 4,
		"rarityMax": 5
	},
	"Gilded Dreams": {
		"flower": "Dreaming Steelbloom",
		"plume": "Feather of Judgment",
		"sands": "The Sunken Years",
		"goblet": "Honeyed Final Feast",
		"circlet": "Shadow of the Sand King",
		"rarityMin": 4,
		"rarityMax": 5
	},
	"Desert Pavilion Chronicle": {
		"flower": "The First Days of the City of Kings",
		"plume": "End of the Golden Realm",
		"sands": "Timepiece of the Lost Path",
		"goblet": "Defender of the Enchanting Dream",
		"circlet": "Legacy of the Desert High-Born",
		"rarityMin": 4,
		"rarityMax": 5
	},
	"Flower of Paradise Lost": {
		"flower": "Ay-Khanoum's Myriad",
		"plume": "Wilting Feast",
		"sands": "A Moment Congealed",
		"goblet": "Secret-Keeper's Magic Bottle",
		"circlet": "Amethyst Crown",
		"rarityMin": 4,
		"rarityMax": 5
	},
	"Nymphs Dream": {
		"title": "Nymph's Dream",
		"flower": "Odyssean Flower",
		"plume": "Wicked Mage's Plumule",
		"sands": "Nymph's Constancy",
		"goblet": "Heroes' Tea Party",
		"circlet": "Fell Dragon's Monocle",
		"rarityMin": 4,
		"rarityMax": 5
	},
	"Vourukashas Glow": {
		"title": "Vourukasha's Glow",
		"flower": "Stamen of Khvarena's Origin",
		"plume": "Vibrant Pinion",
		"sands": "Ancient Abscission",
		"goblet": "Feast of Boundless Joy",
		"circlet": "Heart of Khvarena's Brilliance",
		"rarityMin": 4,
		"rarityMax": 5
	},
	"Marechaussee Hunter": {
		"flower": "Hunter's Brooch",
		"plume": "Masterpiece's Overture",
		"sands": "Moment of Judgment",
		"goblet": "Forgotten Vessel",
		"circlet": "Veteran's Visage",
		"rarityMin": 4,
		"rarityMax": 5
	},
	"Golden Troupe": {
		"flower": "Golden Song's Variation",
		"plume": "Golden Bird's Shedding",
		"sands": "Golden Era's Prelude",
		"goblet": "Golden Night's Bustle",
		"circlet": "Golden Troupe's Reward",
		"rarityMin": 4,
		"rarityMax": 5
	}
}
const allFlowers = [];
const allPlumes = [];
const allSands = [];
const allGoblets = [];
const allCirclets = [];
const artifactTypes = ["flower","plume","sands","goblet","circlet"];
const allArtifacts = [allFlowers,allPlumes,allSands,allGoblets,allCirclets];
const allArtifactGroupsWithOneType = [];
const allArtifactGroups = Object.keys(artifactDB);
for(let i in artifactDB) {
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
const artiValidStats = [
	"HP",
	"ATK",
	["HP%","ATK%","DEF%","EM","ER"],
	["HP%","ATK%","DEF%","EM","Pyro","Hydro","Electro","Cryo","Dendro","Anemo","Geo","Physical"],
	["HP%","ATK%","DEF%","EM","CR","CD","HB"]
];
const artiValidSubstats = ["HP","ATK","DEF","HP%","ATK%","DEF%","EM","ER","CR","CD"];
