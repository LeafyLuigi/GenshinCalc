const defaultWeapons = {
	"Bow": "Hunters Bow",
	"Catalyst": "Apprentices Notes",
	"Claymore": "Waster Greatsword",
	"Polearm": "Beginners Protector",
	"Sword": "Dull Blade"
};
const weapDB = {
	"Apprentices Notes": {
		"rarity": 1,
		"type": "Catalyst",
		"title": "Apprentice's Notes",
		"weapon": "decarabianTiles",
		"elite": "mitachurl",
		"common": "hilichurl"
	},
	"Beginners Protector": {
		"rarity": 1,
		"type": "Polearm",
		"title": "Beginner's Protector",
		"weapon": "gladiatorShackles",
		"elite": "ruinHumainoid",
		"common": "samachurl"
	},
	"Dull Blade": {
		"rarity": 1,
		"type": "Sword",
		"weapon": "decarabianTiles",
		"elite": "mitachurl",
		"common": "hilichurlShooter"
	},
	"Hunters Bow": {
		"rarity": 1,
		"type": "Bow",
		"title": "Hunter's Bow",
		"weapon": "borealWolfTeeth",
		"elite": "abyssMage",
		"common": "treasureHoarder"
	},
	"Waster Greatsword": {
		"rarity": 1,
		"type": "Claymore",
		"weapon": "borealWolfTeeth",
		"elite": "abyssMage",
		"common": "slime"
	},
	"Iron Point": {
		"rarity": 2,
		"type": "Polearm",
		"weapon": "gladiatorShackles",
		"elite": "ruinHumainoid",
		"common": "samachurl"
	},
	"Old Mercs Pal": {
		"rarity": 2,
		"type": "Claymore",
		"title": "Old Merc's Pal",
		"weapon": "borealWolfTeeth",
		"elite": "abyssMage",
		"common": "slime"
	},
	"Pocket Grimoire": {
		"rarity": 2,
		"type": "Catalyst",
		"weapon": "decarabianTiles",
		"elite": "mitachurl",
		"common": "hilichurl"
	},
	"Seasoned Hunters Bow": {
		"rarity": 2,
		"type": "Bow",
		"title": "Seasoned Hunter's Bow",
		"weapon": "borealWolfTeeth",
		"elite": "abyssMage",
		"common": "treasureHoarder"
	},
	"Silver Sword": {
		"rarity": 2,
		"type": "Sword",
		"weapon": "decarabianTiles",
		"elite": "mitachurl",
		"common": "hilichurlShooter"
	},
	"Black Tassel": {
		"rarity": 3,
		"type": "Polearm",
		"weapon": "aerosiderite",
		"elite": "vishap",
		"common": "hilichurlShooter"
	},
	"Bloodtainted Greatsword": {
		"rarity": 3,
		"type": "Claymore",
		"weapon": "borealWolfTeeth",
		"elite": "abyssMage",
		"common": "hilichurlShooter"
	},
	"Cool Steel": {
		"rarity": 3,
		"type": "Sword",
		"weapon": "decarabianTiles",
		"elite": "mitachurl",
		"common": "hilichurlShooter"
	},
	"Dark Iron Sword": {
		"rarity": 3,
		"type": "Sword",
		"source": "NPC",
		"maxRefinement": 1,
		"weapon": "guyunPillars",
		"elite": "fatuiPyroAgent",
		"common": "hilichurl"
	},
	"Debate Club": {
		"rarity": 3,
		"type": "Claymore",
		"weapon": "elixirs",
		"elite": "fatuiCicinMage",
		"common": "hilichurl"
	},
	"Emerald Orb": {
		"rarity": 3,
		"type": "Catalyst",
		"weapon": "guyunPillars",
		"elite": "fatuiPyroAgent",
		"common": "treasureHoarder"
	},
	"Ferrous Shadow": {
		"rarity": 3,
		"type": "Claymore",
		"weapon": "decarabianTiles",
		"elite": "mitachurl",
		"common": "whopperflower"
	},
	"Fillet Blade": {
		"rarity": 3,
		"type": "Sword",
		"weapon": "elixirs",
		"elite": "fatuiCicinMage",
		"common": "treasureHoarder"
	},
	"Halberd": {
		"rarity": 3,
		"type": "Polearm",
		"weapon": "elixirs",
		"elite": "fatuiCicinMage",
		"common": "whopperflower"
	},
	"Harbinger of Dawn": {
		"rarity": 3,
		"type": "Sword",
		"weapon": "borealWolfTeeth",
		"elite": "abyssMage",
		"common": "slime"
	},
	"Magic Guide": {
		"rarity": 3,
		"type": "Catalyst",
		"weapon": "decarabianTiles",
		"elite": "mitachurl",
		"common": "slime"
	},
	"Messenger": {
		"rarity": 3,
		"type": "Bow",
		"weapon": "elixirs",
		"elite": "fatuiCicinMage",
		"common": "treasureHoarder"
	},
	"Otherworldly Story": {
		"rarity": 3,
		"type": "Catalyst",
		"weapon": "gladiatorShackles",
		"elite": "ruinHumainoid",
		"common": "hilichurl"
	},
	"Raven Bow": {
		"rarity": 3,
		"type": "Bow",
		"weapon": "decarabianTiles",
		"elite": "mitachurl",
		"common": "hilichurlShooter"
	},
	"Recurve Bow": {
		"rarity": 3,
		"type": "Bow",
		"weapon": "gladiatorShackles",
		"elite": "ruinHumainoid",
		"common": "samachurl"
	},
	"Sharpshooters Oath": {
		"rarity": 3,
		"type": "Bow",
		"title": "Sharpshooter's Oath",
		"weapon": "borealWolfTeeth",
		"elite": "abyssMage",
		"common": "slime"
	},
	"Skyrider Greatsword": {
		"rarity": 3,
		"type": "Claymore",
		"weapon": "aerosiderite",
		"elite": "vishap",
		"common": "treasureHoarder"
	},
	"Skyrider Sword": {
		"rarity": 3,
		"type": "Sword",
		"weapon": "aerosiderite",
		"elite": "vishap",
		"common": "fatuiSkirmisher"
	},
	"Slingshot": {
		"rarity": 3,
		"type": "Bow",
		"weapon": "guyunPillars",
		"elite": "fatuiPyroAgent",
		"common": "hilichurl"
	},
	"Thrilling Tales of Dragon Slayers": {
		"rarity": 3,
		"type": "Catalyst",
		"weapon": "borealWolfTeeth",
		"elite": "abyssMage",
		"common": "samachurl"
	},
	"Travelers Handy Sword": {
		"rarity": 3,
		"type": "Sword",
		"title": "Traveler's Handy Sword",
		"weapon": "gladiatorShackles",
		"elite": "ruinHumainoid",
		"common": "samachurl"
	},
	"Twin Nephrite": {
		"rarity": 3,
		"type": "Catalyst",
		"weapon": "elixirs",
		"elite": "fatuiCicinMage",
		"common": "fatuiSkirmisher"
	},
	"White Iron Greatsword": {
		"rarity": 3,
		"type": "Claymore",
		"weapon": "gladiatorShackles",
		"elite": "ruinHumainoid",
		"common": "slime"
	},
	"White Tassel": {
		"rarity": 3,
		"type": "Polearm",
		"weapon": "guyunPillars",
		"elite": "fatuiPyroAgent",
		"common": "fatuiSkirmisher"
	},
	"The Catch": {
		"rarity": 4,
		"type": "Polearm",
		"title": "\"The Catch\"",
		"source": "quest",
		"weapon": "oniMasks",
		"elite": "ruinSentinel",
		"common": "specter"
	},
	"Akuoumaru": {
		"rarity": 4,
		"type": "Claymore",
		"weapon": "distantSeaBranches",
		"elite": "riftwolf",
		"common": "nobushi"
	},
	"Alley Hunter": {
		"rarity": 4,
		"type": "Bow",
		"weapon": "gladiatorShackles",
		"elite": "ruinHumainoid",
		"common": "slime"
	},
	"Amenoma Kageuchi": {
		"rarity": 4,
		"type": "Sword",
		"weapon": "distantSeaBranches",
		"elite": "ruinSentinel",
		"common": "nobushi"
	},
	"Ballad of the Fjords": {
		"rarity": 4,
		"type": "Polearm",
		"weapon": "pristineSeaGoblet",
		"elite": "hilichurlRogue",
		"common": "whopperflower"
	},
	"Blackcliff Agate": {
		"rarity": 4,
		"type": "Catalyst",
		"weapon": "guyunPillars",
		"elite": "fatuiPyroAgent",
		"common": "samachurl"
	},
	"Blackcliff Longsword": {
		"rarity": 4,
		"type": "Sword",
		"weapon": "guyunPillars",
		"elite": "fatuiPyroAgent",
		"common": "hilichurlShooter"
	},
	"Blackcliff Pole": {
		"rarity": 4,
		"type": "Polearm",
		"weapon": "elixirs",
		"elite": "fatuiCicinMage",
		"common": "fatuiSkirmisher"
	},
	"Blackcliff Slasher": {
		"rarity": 4,
		"type": "Claymore",
		"weapon": "elixirs",
		"elite": "fatuiCicinMage",
		"common": "fatuiSkirmisher"
	},
	"Blackcliff Warbow": {
		"rarity": 4,
		"type": "Bow",
		"weapon": "guyunPillars",
		"elite": "fatuiPyroAgent",
		"common": "whopperflower"
	},
	"Cinnabar Spindle": {
		"rarity": 4,
		"type": "Sword",
		"source": "event",
		"weapon": "decarabianTiles",
		"elite": "ruinHumainoid",
		"common": "hilichurl"
	},
	"Compound Bow": {
		"rarity": 4,
		"type": "Bow",
		"weapon": "aerosiderite",
		"elite": "vishap",
		"common": "fatuiSkirmisher"
	},
	"Crescent Pike": {
		"rarity": 4,
		"type": "Polearm",
		"weapon": "guyunPillars",
		"elite": "fatuiPyroAgent",
		"common": "treasureHoarder"
	},
	"Deathmatch": {
		"rarity": 4,
		"type": "Polearm",
		"weapon": "borealWolfTeeth",
		"elite": "abyssMage",
		"common": "whopperflower"
	},
	"Dodoco Tales": {
		"rarity": 4,
		"type": "Catalyst",
		"source": "event",
		"weapon": "borealWolfTeeth",
		"elite": "abyssMage",
		"common": "hilichurl"
	},
	"Dragons Bane": {
		"rarity": 4,
		"type": "Polearm",
		"title": "Dragon's Bane",
		"weapon": "elixirs",
		"elite": "fatuiCicinMage",
		"common": "samachurl"
	},
	"Dragonspine Spear": {
		"rarity": 4,
		"type": "Polearm",
		"weapon": "borealWolfTeeth",
		"elite": "fatuiCicinMage",
		"common": "fatuiSkirmisher"
	},
	"End of the Line": {
		"rarity": 4,
		"type": "Bow",
		"source": "bought",
		"weapon": "scorchingMights",
		"elite": "fungusStateShifted",
		"common": "fungus"
	},
	"Eye of Perception": {
		"rarity": 4,
		"type": "Catalyst",
		"weapon": "elixirs",
		"elite": "fatuiCicinMage",
		"common": "hilichurl"
	},
	"Fading Twilight": {
		"rarity": 4,
		"type": "Bow",
		"source": "event",
		"weapon": "aerosiderite",
		"elite": "fatuiPyroAgent",
		"common": "samachurl"
	},
	"Favonius Codex": {
		"rarity": 4,
		"type": "Catalyst",
		"weapon": "decarabianTiles",
		"elite": "mitachurl",
		"common": "samachurl"
	},
	"Favonius Greatsword": {
		"rarity": 4,
		"type": "Claymore",
		"weapon": "gladiatorShackles",
		"elite": "ruinHumainoid",
		"common": "fatuiSkirmisher"
	},
	"Favonius Lance": {
		"rarity": 4,
		"type": "Polearm",
		"weapon": "gladiatorShackles",
		"elite": "ruinHumainoid",
		"common": "slime"
	},
	"Favonius Sword": {
		"rarity": 4,
		"type": "Sword",
		"weapon": "decarabianTiles",
		"elite": "mitachurl",
		"common": "hilichurlShooter"
	},
	"Favonius Warbow": {
		"rarity": 4,
		"type": "Bow",
		"weapon": "gladiatorShackles",
		"elite": "ruinHumainoid",
		"common": "whopperflower"
	},
	"Festering Desire": {
		"rarity": 4,
		"type": "Sword",
		"source": "event",
		"weapon": "gladiatorShackles",
		"elite": "mitachurl",
		"common": "fatuiSkirmisher"
	},
	"Finale of the Deep": {
		"rarity": 4,
		"type": "Sword",
		"weapon": "pureSacredDewdrop",
		"elite": "taintedWater",
		"common": "nobushi"
	},
	"Fleuve Cendre Ferryman": {
		"rarity": 4,
		"type": "Sword",
		"weapon": "ancientChord",
		"elite": "taintedWater",
		"common": "transoceanic"
	},
	"Flowing Purity": {
		"rarity": 4,
		"type": "Catalyst",
		"weapon": "pureSacredDewdrop",
		"elite": "taintedWater",
		"common": "transoceanic"
	},
	"Forest Regalia": {
		"rarity": 4,
		"type": "Claymore",
		"weapon": "forestDewTalismans",
		"elite": "ruinDrake",
		"common": "eremites"
	},
	"Frostbearer": {
		"rarity": 4,
		"type": "Catalyst",
		"weapon": "gladiatorShackles",
		"elite": "ruinHumainoid",
		"common": "whopperflower"
	},
	"Fruit of Fulfillment": {
		"rarity": 4,
		"type": "Catalyst",
		"weapon": "oasisGardens",
		"elite": "blackSerpents",
		"common": "fungus"
	},
	"Hakushin Ring": {
		"rarity": 4,
		"type": "Catalyst",
		"weapon": "distantSeaBranches",
		"elite": "mirrorMaiden",
		"common": "samachurl"
	},
	"Hamayumi": {
		"rarity": 4,
		"type": "Bow",
		"weapon": "narukami",
		"elite": "mirrorMaiden",
		"common": "hilichurlShooter"
	},
	"Ibis Piercer": {
		"rarity": 4,
		"type": "Bow",
		"source": "event",
		"weapon": "forestDewTalismans",
		"elite": "hilichurlRogue",
		"common": "eremites"
	},
	"Iron Sting": {
		"rarity": 4,
		"type": "Sword",
		"weapon": "aerosiderite",
		"elite": "vishap",
		"common": "whopperflower"
	},
	"Kagotsurube Isshin": {
		"rarity": 4,
		"type": "Sword",
		"source": "quest",
		"maxRefinement": 1,
		"weapon": "oniMasks",
		"elite": "blackSerpents",
		"common": "specter"
	},
	"Katsuragikiri Nagamasa": {
		"rarity": 4,
		"type": "Claymore",
		"weapon": "narukami",
		"elite": "ruinSentinel",
		"common": "nobushi"
	},
	"Kings Squire": {
		"rarity": 4,
		"type": "Bow",
		"title": "King's Squire",
		"weapon": "scorchingMights",
		"elite": "fungusStateShifted",
		"common": "hilichurlShooter"
	},
	"Kitain Cross Spear": {
		"rarity": 4,
		"type": "Polearm",
		"weapon": "oniMasks",
		"elite": "ruinSentinel",
		"common": "treasureHoarder"
	},
	"Lions Roar": {
		"rarity": 4,
		"type": "Sword",
		"title": "Lion's Roar",
		"weapon": "guyunPillars",
		"elite": "fatuiPyroAgent",
		"common": "treasureHoarder"
	},
	"Lithic Blade": {
		"rarity": 4,
		"type": "Claymore",
		"weapon": "guyunPillars",
		"elite": "fatuiPyroAgent",
		"common": "hilichurlShooter"
	},
	"Lithic Spear": {
		"rarity": 4,
		"type": "Polearm",
		"weapon": "aerosiderite",
		"elite": "vishap",
		"common": "hilichurlShooter"
	},
	"Luxurious Sea-Lord": {
		"rarity": 4,
		"type": "Claymore",
		"source": "event",
		"weapon": "aerosiderite",
		"elite": "vishap",
		"common": "slime"
	},
	"Mailed Flower": {
		"rarity": 4,
		"type": "Claymore",
		"source": "event",
		"weapon": "gladiatorShackles",
		"elite": "consecratedBeast",
		"common": "specter"
	},
	"Makhaira Aquamarine": {
		"rarity": 4,
		"type": "Claymore",
		"weapon": "scorchingMights",
		"elite": "ruinDrake",
		"common": "treasureHoarder"
	},
	"Mappa Mare": {
		"rarity": 4,
		"type": "Catalyst",
		"weapon": "aerosiderite",
		"elite": "vishap",
		"common": "slime"
	},
	"Missive Windspear": {
		"rarity": 4,
		"type": "Polearm",
		"source": "event",
		"weapon": "borealWolfTeeth",
		"elite": "blackSerpents",
		"common": "slime"
	},
	"Mitternachts Waltz": {
		"rarity": 4,
		"type": "Bow",
		"weapon": "decarabianTiles",
		"elite": "mitachurl",
		"common": "treasureHoarder"
	},
	"Moonpiercer": {
		"rarity": 4,
		"type": "Polearm",
		"weapon": "oasisGardens",
		"elite": "ruinDrake",
		"common": "fatuiSkirmisher"
	},
	"Mouuns Moon": {
		"rarity": 4,
		"type": "Bow",
		"title": "Mouun's Moon",
		"weapon": "narukami",
		"elite": "mirrorMaiden",
		"common": "specter"
	},
	"Talking Stick": {
		"rarity": 4,
		"type": "Claymore",
		"weapon": "oasisGardens",
		"elite": "consecratedBeast",
		"common": "slime"
	},
	"Oathsworn Eye": {
		"rarity": 4,
		"type": "Catalyst",
		"source": "event",
		"weapon": "distantSeaBranches",
		"elite": "riftwolf",
		"common": "specter"
	},
	"Predator": {
		"rarity": 4,
		"type": "Bow",
		"source": "event",
		"weapon": "narukami",
		"elite": "mirrorMaiden",
		"common": "hilichurlShooter"
	},
	"Prototype Amber": {
		"rarity": 4,
		"type": "Catalyst",
		"weapon": "elixirs",
		"elite": "fatuiCicinMage",
		"common": "hilichurlShooter"
	},
	"Prototype Archaic": {
		"rarity": 4,
		"type": "Claymore",
		"weapon": "aerosiderite",
		"elite": "vishap",
		"common": "hilichurl"
	},
	"Prototype Crescent": {
		"rarity": 4,
		"type": "Bow",
		"weapon": "elixirs",
		"elite": "fatuiCicinMage",
		"common": "treasureHoarder"
	},
	"Prototype Rancour": {
		"rarity": 4,
		"type": "Sword",
		"weapon": "elixirs",
		"elite": "fatuiCicinMage",
		"common": "fatuiSkirmisher"
	},
	"Prototype Starglitter": {
		"rarity": 4,
		"type": "Polearm",
		"weapon": "aerosiderite",
		"elite": "vishap",
		"common": "hilichurl"
	},
	"Rainslasher": {
		"rarity": 4,
		"type": "Claymore",
		"weapon": "elixirs",
		"elite": "fatuiCicinMage",
		"common": "samachurl"
	},
	"Rightful Reward": {
		"rarity": 4,
		"type": "Polearm",
		"weapon": "pristineSeaGoblet",
		"elite": "breacherPrimuses",
		"common": "clockworkMeka"
	},
	"Royal Bow": {
		"rarity": 4,
		"type": "Bow",
		"weapon": "gladiatorShackles",
		"elite": "ruinHumainoid",
		"common": "samachurl"
	},
	"Royal Greatsword": {
		"rarity": 4,
		"type": "Claymore",
		"weapon": "gladiatorShackles",
		"elite": "ruinHumainoid",
		"common": "slime"
	},
	"Royal Grimoire": {
		"rarity": 4,
		"type": "Catalyst",
		"weapon": "decarabianTiles",
		"elite": "mitachurl",
		"common": "fatuiSkirmisher"
	},
	"Royal Longsword": {
		"rarity": 4,
		"type": "Sword",
		"weapon": "decarabianTiles",
		"elite": "mitachurl",
		"common": "hilichurlShooter"
	},
	"Royal Spear": {
		"rarity": 4,
		"type": "Polearm",
		"weapon": "elixirs",
		"elite": "fatuiCicinMage",
		"common": "fatuiSkirmisher"
	},
	"Rust": {
		"rarity": 4,
		"type": "Bow",
		"weapon": "guyunPillars",
		"elite": "fatuiPyroAgent",
		"common": "hilichurl"
	},
	"Sacrificial Bow": {
		"rarity": 4,
		"type": "Bow",
		"weapon": "borealWolfTeeth",
		"elite": "abyssMage",
		"common": "slime"
	},
	"Sacrificial Fragments": {
		"rarity": 4,
		"type": "Catalyst",
		"weapon": "gladiatorShackles",
		"elite": "ruinHumainoid",
		"common": "treasureHoarder"
	},
	"Sacrificial Greatsword": {
		"rarity": 4,
		"type": "Claymore",
		"weapon": "borealWolfTeeth",
		"elite": "abyssMage",
		"common": "hilichurlShooter"
	},
	"Sacrificial Jade": {
		"rarity": 4,
		"type": "Catalyst",
		"weapon": "guyunPillars",
		"elite": "fatuiCicinMage",
		"common": "samachurl"
	},
	"Sacrificial Sword": {
		"rarity": 4,
		"type": "Sword",
		"weapon": "gladiatorShackles",
		"elite": "ruinHumainoid",
		"common": "samachurl"
	},
	"Sapwood Blade": {
		"rarity": 4,
		"type": "Sword",
		"weapon": "forestDewTalismans",
		"elite": "ruinDrake",
		"common": "eremites"
	},
	"Scion of the Blazing Sun": {
		"rarity": 4,
		"type": "Bow",
		"weapon": "scorchingMights",
		"elite": "hilichurlRogue",
		"common": "fungus"
	},
	"Serpent Spine": {
		"rarity": 4,
		"type": "Claymore",
		"weapon": "aerosiderite",
		"elite": "vishap",
		"common": "whopperflower"
	},
	"Snow-Tombed Starsilver": {
		"rarity": 4,
		"type": "Claymore",
		"weapon": "decarabianTiles",
		"elite": "mitachurl",
		"common": "slime"
	},
	"Solar Pearl": {
		"rarity": 4,
		"type": "Catalyst",
		"weapon": "guyunPillars",
		"elite": "fatuiPyroAgent",
		"common": "whopperflower"
	},
	"Song of Stillness": {
		"rarity": 4,
		"type": "Bow",
		"weapon": "ancientChord",
		"elite": "taintedWater",
		"common": "hilichurlShooter"
	},
	"Sword of Descension": {
		"rarity": 4,
		"type": "Sword",
		"source": "event",
		"weapon": "borealWolfTeeth",
		"elite": "abyssMage",
		"common": "treasureHoarder"
	},
	"The Alley Flash": {
		"rarity": 4,
		"type": "Sword",
		"weapon": "decarabianTiles",
		"elite": "mitachurl",
		"common": "samachurl"
	},
	"The Bell": {
		"rarity": 4,
		"type": "Claymore",
		"weapon": "decarabianTiles",
		"elite": "mitachurl",
		"common": "whopperflower"
	},
	"The Black Sword": {
		"rarity": 4,
		"type": "Sword",
		"weapon": "borealWolfTeeth",
		"elite": "abyssMage",
		"common": "slime"
	},
	"The Flute": {
		"rarity": 4,
		"type": "Sword",
		"weapon": "borealWolfTeeth",
		"elite": "abyssMage",
		"common": "slime"
	},
	"The Stringless": {
		"rarity": 4,
		"type": "Bow",
		"weapon": "decarabianTiles",
		"elite": "mitachurl",
		"common": "hilichurlShooter"
	},
	"The Viridescent Hunt": {
		"rarity": 4,
		"type": "Bow",
		"weapon": "decarabianTiles",
		"elite": "mitachurl",
		"common": "hilichurlShooter"
	},
	"The Widsith": {
		"rarity": 4,
		"type": "Catalyst",
		"weapon": "borealWolfTeeth",
		"elite": "abyssMage",
		"common": "hilichurl"
	},
	"Tidal Shadow": {
		"rarity": 4,
		"type": "Claymore",
		"weapon": "pristineSeaGoblet",
		"elite": "breacherPrimuses",
		"common": "clockworkMeka"
	},
	"Toukabou Shigure": {
		"rarity": 4,
		"type": "Sword",
		"source": "event",
		"weapon": "narukami",
		"elite": "primalConstruct",
		"common": "nobushi"
	},
	"Wandering Evenstar": {
		"rarity": 4,
		"type": "Catalyst",
		"weapon": "oasisGardens",
		"elite": "fungusStateShifted",
		"common": "fungus"
	},
	"Wavebreakers Fin": {
		"rarity": 4,
		"type": "Polearm",
		"title": "Wavebreaker's Fin",
		"weapon": "oniMasks",
		"elite": "riftwolf",
		"common": "nobushi"
	},
	"Whiteblind": {
		"rarity": 4,
		"type": "Claymore",
		"weapon": "guyunPillars",
		"elite": "fatuiPyroAgent",
		"common": "treasureHoarder"
	},
	"Windblume Ode": {
		"rarity": 4,
		"type": "Bow",
		"source": "event",
		"weapon": "gladiatorShackles",
		"elite": "abyssMage",
		"common": "whopperflower"
	},
	"Wine and Song": {
		"rarity": 4,
		"type": "Catalyst",
		"weapon": "borealWolfTeeth",
		"elite": "abyssMage",
		"common": "treasureHoarder"
	},
	"Wolf-Fang": {
		"rarity": 4,
		"type": "Sword",
		"weapon": "decarabianTiles",
		"elite": "ruinHumainoid",
		"common": "hilichurl"
	},
	"Xiphos Moonlight": {
		"rarity": 4,
		"type": "Sword",
		"title": "Xiphos' Moonlight",
		"weapon": "forestDewTalismans",
		"elite": "primalConstruct",
		"common": "eremites"
	},
	"A Thousand Floating Dreams": {
		"rarity": 5,
		"type": "Catalyst",
		"weapon": "oasisGardens",
		"elite": "primalConstruct",
		"common": "fungus"
	},
	"Amos Bow": {
		"rarity": 5,
		"type": "Bow",
		"title": "Amos' Bow",
		"weapon": "gladiatorShackles",
		"elite": "ruinHumainoid",
		"common": "slime"
	},
	"Aqua Simulacra": {
		"rarity": 5,
		"type": "Bow",
		"weapon": "guyunPillars",
		"elite": "blackSerpents",
		"common": "specter"
	},
	"Aquila Favonia": {
		"rarity": 5,
		"type": "Sword",
		"weapon": "decarabianTiles",
		"elite": "mitachurl",
		"common": "hilichurlShooter"
	},
	"Beacon of the Reed Sea": {
		"rarity": 5,
		"type": "Claymore",
		"weapon": "scorchingMights",
		"elite": "consecratedBeast",
		"common": "eremites"
	},
	"Calamity Queller": {
		"rarity": 5,
		"type": "Polearm",
		"weapon": "elixirs",
		"elite": "fatuiCicinMage",
		"common": "whopperflower"
	},
	"Elegy for the End": {
		"rarity": 5,
		"type": "Bow",
		"weapon": "borealWolfTeeth",
		"elite": "mitachurl",
		"common": "fatuiSkirmisher"
	},
	"Engulfing Lightning": {
		"rarity": 5,
		"type": "Polearm",
		"weapon": "oniMasks",
		"elite": "ruinSentinel",
		"common": "nobushi"
	},
	"Everlasting Moonglow": {
		"rarity": 5,
		"type": "Catalyst",
		"weapon": "distantSeaBranches",
		"elite": "mirrorMaiden",
		"common": "specter"
	},
	"Freedom-Sworn": {
		"rarity": 5,
		"type": "Sword",
		"weapon": "gladiatorShackles",
		"elite": "ruinHumainoid",
		"common": "samachurl"
	},
	"Haran Geppaku Futsu": {
		"rarity": 5,
		"type": "Sword",
		"weapon": "narukami",
		"elite": "blackSerpents",
		"common": "nobushi"
	},
	"Hunters Path": {
		"rarity": 5,
		"type": "Bow",
		"title": "Hunter's Path",
		"weapon": "scorchingMights",
		"elite": "fungusStateShifted",
		"common": "eremites"
	},
	"Jadefalls Splendor": {
		"rarity": 5,
		"type": "Catalyst",
		"title": "Jadefall's Splendor",
		"weapon": "guyunPillars",
		"elite": "hilichurlRogue",
		"common": "fungus"
	},
	"Kaguras Verity": {
		"rarity": 5,
		"type": "Catalyst",
		"title": "Kagura's Verity",
		"weapon": "oniMasks",
		"elite": "riftwolf",
		"common": "specter"
	},
	"Key of Khaj-Nisut": {
		"rarity": 5,
		"type": "Sword",
		"weapon": "forestDewTalismans",
		"elite": "primalConstruct",
		"common": "eremites"
	},
	"Light of Foliar Incision": {
		"rarity": 5,
		"type": "Sword",
		"weapon": "forestDewTalismans",
		"elite": "consecratedBeast",
		"common": "eremites"
	},
	"Lost Prayer to the Sacred Winds": {
		"rarity": 5,
		"type": "Catalyst",
		"weapon": "gladiatorShackles",
		"elite": "ruinHumainoid",
		"common": "slime"
	},
	"Memory of Dust": {
		"rarity": 5,
		"type": "Catalyst",
		"weapon": "aerosiderite",
		"elite": "vishap",
		"common": "hilichurl"
	},
	"Mistsplitter Reforged": {
		"rarity": 5,
		"type": "Sword",
		"weapon": "distantSeaBranches",
		"elite": "ruinSentinel",
		"common": "nobushi"
	},
	"Polar Star": {
		"rarity": 5,
		"type": "Bow",
		"weapon": "oniMasks",
		"elite": "riftwolf",
		"common": "specter"
	},
	"Primordial Jade Cutter": {
		"rarity": 5,
		"type": "Sword",
		"weapon": "elixirs",
		"elite": "fatuiCicinMage",
		"common": "treasureHoarder"
	},
	"Primordial Jade Winged-Spear": {
		"rarity": 5,
		"type": "Polearm",
		"weapon": "guyunPillars",
		"elite": "fatuiPyroAgent",
		"common": "fatuiSkirmisher"
	},
	"Redhorn Stonethresher": {
		"rarity": 5,
		"type": "Claymore",
		"weapon": "narukami",
		"elite": "riftwolf",
		"common": "nobushi"
	},
	"Skyward Atlas": {
		"rarity": 5,
		"type": "Catalyst",
		"weapon": "borealWolfTeeth",
		"elite": "abyssMage",
		"common": "hilichurlShooter"
	},
	"Skyward Blade": {
		"rarity": 5,
		"type": "Sword",
		"weapon": "borealWolfTeeth",
		"elite": "abyssMage",
		"common": "slime"
	},
	"Skyward Harp": {
		"rarity": 5,
		"type": "Bow",
		"weapon": "borealWolfTeeth",
		"elite": "abyssMage",
		"common": "hilichurlShooter"
	},
	"Skyward Pride": {
		"rarity": 5,
		"type": "Sword",
		"weapon": "borealWolfTeeth",
		"elite": "abyssMage",
		"common": "slime"
	},
	"Skyward Spine": {
		"rarity": 5,
		"type": "Polearm",
		"weapon": "gladiatorShackles",
		"elite": "ruinHumainoid",
		"common": "samachurl"
	},
	"Song of Broken Pines": {
		"rarity": 5,
		"type": "Claymore",
		"weapon": "decarabianTiles",
		"elite": "mitachurl",
		"common": "hilichurl"
	},
	"Staff of Homa": {
		"rarity": 5,
		"type": "Polearm",
		"weapon": "aerosiderite",
		"elite": "abyssMage",
		"common": "slime"
	},
	"Staff of the Scarlet Sands": {
		"rarity": 5,
		"type": "Polearm",
		"weapon": "oasisGardens",
		"elite": "ruinDrake",
		"common": "fungus"
	},
	"Summit Shaper": {
		"rarity": 5,
		"type": "Sword",
		"weapon": "guyunPillars",
		"elite": "fatuiPyroAgent",
		"common": "hilichurl"
	},
	"The First Great Magic": {
		"rarity": 5,
		"type": "Bow",
		"weapon": "ancientChord",
		"elite": "taintedWater",
		"common": "transoceanic"
	},
	"The Unforged": {
		"rarity": 5,
		"type": "Claymore",
		"weapon": "elixirs",
		"elite": "fatuiCicinMage",
		"common": "treasureHoarder"
	},
	"Thundering Pulse": {
		"rarity": 5,
		"type": "Bow",
		"weapon": "narukami",
		"elite": "mirrorMaiden",
		"common": "hilichurlShooter"
	},
	"Tulaytullahs Remembrance": {
		"rarity": 5,
		"type": "Catalyst",
		"title": "Tulaytullah's Remembrance",
		"weapon": "scorchingMights",
		"elite": "fungusStateShifted",
		"common": "fungus"
	},
	"Vortex Vanquisher": {
		"rarity": 5,
		"type": "Polearm",
		"weapon": "aerosiderite",
		"elite": "vishap",
		"common": "treasureHoarder"
	},
	"Wolfs Gravestone": {
		"rarity": 5,
		"type": "Claymore",
		"title": "Wolf's Gravestone",
		"weapon": "gladiatorShackles",
		"elite": "ruinHumainoid",
		"common": "samachurl"
	}
}
const allBows = [];
const allCatalysts = [];
const allClaymores = [];
const allPolearms = [];
const allSwords = [];
const allWeaponTypes = ["Bow","Catalyst","Claymore","Polearm","Sword"];
const allWeapons = [allBows,allCatalysts,allClaymores,allPolearms,allSwords];
for (let i in weapDB) {
	for (let j in allWeaponTypes) {
		if(weapDB[i].type == allWeaponTypes[j]){allWeapons[j].push(i)}
	}
}