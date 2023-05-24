'use strict';
const chars = {
	"Albedo": {
		"rarity": 5,
		"type": "Geo",
		"gem": "Prithiva Topaz",
		"boss": "Basalt Pillar",
		"local": "Cecilia",
		"common": "samachurl",
		"books": "Ballad",
		"weeklyBoss": "Tusk of Monoceros Caeli"
	},
	"Alhaitham": {
		"rarity": 5,
		"type": "Dendro",
		"gem": "Nagadus Emerald",
		"boss": "Pseudo-Stamens",
		"local": "Sand Grease Pupa",
		"common": "eremites",
		"books": "Ingenuity",
		"weeklyBoss": "Mirror of Mushin"
	},
	"Aloy": {
		"rarity": 5,
		"type": "Cryo",
		"gem": "Shivada Jade",
		"boss": "Crystalline Bloom",
		"local": "Crystal Marrow",
		"common": "specter",
		"books": "Freedom",
		"weeklyBoss": "Molten Moment"
	},
	"Amber": {
		"rarity": 4,
		"type": "Pyro",
		"gem": "Agnidus Agate",
		"boss": "Everflame Seed",
		"local": "Small Lamp Grass",
		"common": "hilichurlShooter",
		"books": "Freedom",
		"weeklyBoss": "Dvalin's Sigh"
	},
	"Arataki Itto": {
		"rarity": 5,
		"type": "Geo",
		"gem": "Prithiva Topaz",
		"boss": "Riftborn Regalia",
		"local": "Onikabuto",
		"common": "slime",
		"books": "Elegance",
		"weeklyBoss": "Ashen Heart"
	},
	"Baizhu": {
		"rarity": 5,
		"type": "Dendro",
		"gem": "Nagadus Emerald",
		"boss": "Evergloom Ring",
		"local": "Violetgrass",
		"common": "fungus",
		"books": "Gold",
		"weeklyBoss": "Worldspan Fern"
	},
	"Barbara": {
		"rarity": 4,
		"type": "Hydro",
		"gem": "Varunada Lazurite",
		"boss": "Cleansing Heart",
		"local": "Philanemo Mushroom",
		"common": "samachurl",
		"books": "Freedom",
		"weeklyBoss": "Ring of Boreas"
	},
	"Beidou": {
		"rarity": 4,
		"type": "Electro",
		"gem": "Vajrada Amethyst",
		"boss": "Lightning Prism",
		"local": "Noctilucous Jade",
		"common": "treasureHoarder",
		"books": "Gold",
		"weeklyBoss": "Dvalin's Sigh"
	},
	"Bennett": {
		"rarity": 4,
		"type": "Pyro",
		"gem": "Agnidus Agate",
		"boss": "Everflame Seed",
		"local": "Windwheel Aster",
		"common": "treasureHoarder",
		"books": "Resistance",
		"weeklyBoss": "Dvalin's Plume"
	},
	"Candace": {
		"rarity": 4,
		"type": "Hydro",
		"gem": "Varunada Lazurite",
		"boss": "Light Guiding Tetrahedron",
		"local": "Henna Berry",
		"common": "eremites",
		"books": "Admonition",
		"weeklyBoss": "Tears of the Calamitous God"
	},
	"Chongyun": {
		"rarity": 4,
		"type": "Cryo",
		"gem": "Shivada Jade",
		"boss": "Hoarfrost Core",
		"local": "Cor Lapis",
		"common": "hilichurl",
		"books": "Diligence",
		"weeklyBoss": "Dvalin's Sigh"
	},
	"Collei": {
		"rarity": 4,
		"type": "Dendro",
		"gem": "Nagadus Emerald",
		"boss": "Majestic Hooked Beak",
		"local": "Rukkhashava Mushrooms",
		"common": "hilichurlShooter",
		"books": "Praxis",
		"weeklyBoss": "Tears of the Calamitous God"
	},
	"Cyno": {
		"rarity": 5,
		"type": "Electro",
		"gem": "Vajrada Amethyst",
		"boss": "Thunderclap Fruitcore",
		"local": "Scarab",
		"common": "samachurl",
		"books": "Admonition",
		"weeklyBoss": "Mudra of the Malefic General"
	},
	"Dehya": {
		"rarity": 5,
		"type": "Pyro",
		"gem": "Agnidus Agate",
		"boss": "Light Guiding Tetrahedron",
		"local": "Sand Grease Pupa",
		"common": "eremites",
		"books": "Praxis",
		"weeklyBoss": "Puppet Strings"
	},
	"Diluc": {
		"rarity": 5,
		"type": "Pyro",
		"gem": "Agnidus Agate",
		"boss": "Everflame Seed",
		"local": "Small Lamp Grass",
		"common": "fatuiSkirmisher",
		"books": "Resistance",
		"weeklyBoss": "Dvalin's Plume"
	},
	"Diona": {
		"rarity": 4,
		"type": "Cryo",
		"gem": "Shivada Jade",
		"boss": "Hoarfrost Core",
		"local": "Calla Lily",
		"common": "hilichurlShooter",
		"books": "Freedom",
		"weeklyBoss": "Shard of a Foul Legacy"
	},
	"Dori": {
		"rarity": 4,
		"type": "Electro",
		"gem": "Vajrada Amethyst",
		"boss": "Thunderclap Fruitcore",
		"local": "Kalpalata Lotus",
		"common": "eremites",
		"books": "Ingenuity",
		"weeklyBoss": "Bloodjade Branch"
	},
	"Eula": {
		"rarity": 5,
		"type": "Cryo",
		"gem": "Shivada Jade",
		"boss": "Crystalline Bloom",
		"local": "Dandelion Seed",
		"common": "hilichurl",
		"books": "Resistance",
		"weeklyBoss": "Dragon Lord's Crown"
	},
	"Faruzan": {
		"rarity": 4,
		"type": "Anemo",
		"gem": "Vayuda Turquoise",
		"boss": "Light Guiding Tetrahedron",
		"local": "Henna Berry",
		"common": "eremites",
		"books": "Admonition",
		"weeklyBoss": "Puppet Strings"
	},
	"Fischl": {
		"rarity": 4,
		"type": "Electro",
		"gem": "Vajrada Amethyst",
		"boss": "Lightning Prism",
		"local": "Small Lamp Grass",
		"common": "hilichurlShooter",
		"books": "Ballad",
		"weeklyBoss": "Spirit Locket of Boreas"
	},
	"Ganyu": {
		"rarity": 5,
		"type": "Cryo",
		"gem": "Shivada Jade",
		"boss": "Hoarfrost Core",
		"local": "Qingxin",
		"common": "whopperflower",
		"books": "Diligence",
		"weeklyBoss": "Shadow of the Warrior"
	},
	"Gorou": {
		"rarity": 4,
		"type": "Geo",
		"gem": "Prithiva Topaz",
		"boss": "Perpetual Heart",
		"local": "Sango Pearl",
		"common": "specter",
		"books": "Light",
		"weeklyBoss": "Molten Moment"
	},
	"Hu Tao": {
		"rarity": 5,
		"type": "Pyro",
		"gem": "Agnidus Agate",
		"boss": "Juvenile Jade",
		"local": "Silk Flower",
		"common": "whopperflower",
		"books": "Diligence",
		"weeklyBoss": "Shard of a Foul Legacy"
	},
	"Jean": {
		"rarity": 5,
		"type": "Anemo",
		"gem": "Vayuda Turquoise",
		"boss": "Hurricane Seed",
		"local": "Dandelion Seed",
		"common": "hilichurl",
		"books": "Resistance",
		"weeklyBoss": "Dvalin's Plume"
	},
	"Kaedehara Kazuha": {
		"rarity": 5,
		"type": "Anemo",
		"gem": "Vayuda Turquoise",
		"boss": "Marionette Core",
		"local": "Sea Ganoderma",
		"common": "treasureHoarder",
		"books": "Diligence",
		"weeklyBoss": "Gilded Scale"
	},
	"Kaeya": {
		"rarity": 4,
		"type": "Cryo",
		"gem": "Shivada Jade",
		"boss": "Hoarfrost Core",
		"local": "Calla Lily",
		"common": "treasureHoarder",
		"books": "Ballad",
		"weeklyBoss": "Spirit Locket of Boreas"
	},
	"Kamisato Ayaka": {
		"rarity": 5,
		"type": "Cryo",
		"gem": "Shivada Jade",
		"boss": "Perpetual Heart",
		"local": "Sakura Bloom",
		"common": "nobushi",
		"books": "Elegance",
		"weeklyBoss": "Bloodjade Branch"
	},
	"Kamisato Ayato": {
		"rarity": 5,
		"type": "Hydro",
		"gem": "Varunada Lazurite",
		"boss": "Dew of Repudiation",
		"local": "Sakura Bloom",
		"common": "nobushi",
		"books": "Elegance",
		"weeklyBoss": "Mudra of the Malefic General"
	},
	"Kaveh": {
		"rarity": 4,
		"type": "Dendro",
		"gem": "Nagadus Emerald",
		"boss": "Quelled Creeper",
		"local": "Mourning Flower",
		"common": "fungus",
		"books": "Ingenuity",
		"weeklyBoss": "Primordial Greenbloom"
	},
	"Keqing": {
		"rarity": 5,
		"type": "Electro",
		"gem": "Vajrada Amethyst",
		"boss": "Lightning Prism",
		"local": "Cor Lapis",
		"common": "whopperflower",
		"books": "Prosperity",
		"weeklyBoss": "Ring of Boreas"
	},
	"Kirara": {
		"rarity": 4,
		"type": "Dendro",
		"gem": "Nagadus Emerald",
		"boss": "Evergloom Ring",
		"local": "Amakumo Fruit",
		"common": "specter",
		"books": "Transience",
		"weeklyBoss": "Everamber"
	},
	"Klee": {
		"rarity": 5,
		"type": "Pyro",
		"gem": "Agnidus Agate",
		"boss": "Everflame Seed",
		"local": "Philanemo Mushroom",
		"common": "samachurl",
		"books": "Freedom",
		"weeklyBoss": "Ring of Boreas"
	},
	"Kujou Sara": {
		"rarity": 4,
		"type": "Electro",
		"gem": "Vajrada Amethyst",
		"boss": "Storm Beads",
		"local": "Dendrobium",
		"common": "hilichurl",
		"books": "Elegance",
		"weeklyBoss": "Ashen Heart"
	},
	"Kuki Shinobu": {
		"rarity": 4,
		"type": "Electro",
		"gem": "Vajrada Amethyst",
		"boss": "Runic Fang",
		"local": "Naku Weed",
		"common": "specter",
		"books": "Elegance",
		"weeklyBoss": "Tears of the Calamitous God"
	},
	"Layla": {
		"rarity": 4,
		"type": "Cryo",
		"gem": "Shivada Jade",
		"boss": "Perpetual Caliber",
		"local": "Nilotpala Lotus",
		"common": "samachurl",
		"books": "Ingenuity",
		"weeklyBoss": "Mirror of Mushin"
	},
	"Lisa": {
		"rarity": 4,
		"type": "Electro",
		"gem": "Vajrada Amethyst",
		"boss": "Lightning Prism",
		"local": "Valberry",
		"common": "slime",
		"books": "Ballad",
		"weeklyBoss": "Dvalin's Claw"
	},
	"Mika": {
		"rarity": 4,
		"type": "Cryo",
		"gem": "Shivada Jade",
		"boss": "Pseudo-Stamens",
		"local": "Wolfhook",
		"common": "fatuiSkirmisher",
		"books": "Ballad",
		"weeklyBoss": "Mirror of Mushin"
	},
	"Mona": {
		"rarity": 5,
		"type": "Hydro",
		"gem": "Varunada Lazurite",
		"boss": "Cleansing Heart",
		"local": "Philanemo Mushroom",
		"common": "whopperflower",
		"books": "Resistance",
		"weeklyBoss": "Ring of Boreas"
	},
	"Nahida": {
		"rarity": 5,
		"type": "Dendro",
		"gem": "Nagadus Emerald",
		"boss": "Quelled Creeper",
		"local": "Kalpalata Lotus",
		"common": "fungus",
		"books": "Ingenuity",
		"weeklyBoss": "Puppet Strings"
	},
	"Nilou": {
		"rarity": 5,
		"type": "Hydro",
		"gem": "Varunada Lazurite",
		"boss": "Perpetual Caliber",
		"local": "Padisarah",
		"common": "fungus",
		"books": "Praxis",
		"weeklyBoss": "Tears of the Calamitous God"
	},
	"Ningguang": {
		"rarity": 4,
		"type": "Geo",
		"gem": "Prithiva Topaz",
		"boss": "Basalt Pillar",
		"local": "Glaze Lily",
		"common": "fatuiSkirmisher",
		"books": "Prosperity",
		"weeklyBoss": "Spirit Locket of Boreas"
	},
	"Noelle": {
		"rarity": 4,
		"type": "Geo",
		"gem": "Prithiva Topaz",
		"boss": "Basalt Pillar",
		"local": "Valberry",
		"common": "hilichurl",
		"books": "Resistance",
		"weeklyBoss": "Dvalin's Claw"
	},
	"Qiqi": {
		"rarity": 5,
		"type": "Cryo",
		"gem": "Shivada Jade",
		"boss": "Hoarfrost Core",
		"local": "Violetgrass",
		"common": "samachurl",
		"books": "Prosperity",
		"weeklyBoss": "Tail of Boreas"
	},
	"Raiden Shogun": {
		"rarity": 5,
		"type": "Electro",
		"gem": "Vajrada Amethyst",
		"boss": "Storm Beads",
		"local": "Amakumo Fruit",
		"common": "nobushi",
		"books": "Light",
		"weeklyBoss": "Molten Moment"
	},
	"Razor": {
		"rarity": 4,
		"type": "Electro",
		"gem": "Vajrada Amethyst",
		"boss": "Lightning Prism",
		"local": "Wolfhook",
		"common": "hilichurl",
		"books": "Resistance",
		"weeklyBoss": "Dvalin's Claw"
	},
	"Rosaria": {
		"rarity": 4,
		"type": "Cryo",
		"gem": "Shivada Jade",
		"boss": "Hoarfrost Core",
		"local": "Valberry",
		"common": "fatuiSkirmisher",
		"books": "Ballad",
		"weeklyBoss": "Shadow of the Warrior"
	},
	"Sangonomiya Kokomi": {
		"rarity": 5,
		"type": "Hydro",
		"gem": "Varunada Lazurite",
		"boss": "Dew of Repudiation",
		"local": "Sango Pearl",
		"common": "specter",
		"books": "Transience",
		"weeklyBoss": "Hellfire Butterfly"
	},
	"Sayu": {
		"rarity": 4,
		"type": "Anemo",
		"gem": "Vayuda Turquoise",
		"boss": "Marionette Core",
		"local": "Crystal Marrow",
		"common": "whopperflower",
		"books": "Light",
		"weeklyBoss": "Gilded Scale"
	},
	"Shenhe": {
		"rarity": 5,
		"type": "Cryo",
		"gem": "Shivada Jade",
		"boss": "Dragonheir's False Fin",
		"local": "Qingxin",
		"common": "whopperflower",
		"books": "Prosperity",
		"weeklyBoss": "Hellfire Butterfly"
	},
	"Shikanoin Heizou": {
		"rarity": 4,
		"type": "Anemo",
		"gem": "Vayuda Turquoise",
		"boss": "Runic Fang",
		"local": "Onikabuto",
		"common": "treasureHoarder",
		"books": "Transience",
		"weeklyBoss": "The Meaning of Aeons"
	},
	"Sucrose": {
		"rarity": 4,
		"type": "Anemo",
		"gem": "Vayuda Turquoise",
		"boss": "Hurricane Seed",
		"local": "Windwheel Aster",
		"common": "whopperflower",
		"books": "Freedom",
		"weeklyBoss": "Spirit Locket of Boreas"
	},
	"Tartaglia": {
		"rarity": 5,
		"type": "Hydro",
		"gem": "Varunada Lazurite",
		"boss": "Cleansing Heart",
		"local": "Starconch",
		"common": "fatuiSkirmisher",
		"books": "Freedom",
		"weeklyBoss": "Shard of a Foul Legacy"
	},
	"Thoma": {
		"rarity": 4,
		"type": "Pyro",
		"gem": "Agnidus Agate",
		"boss": "Smoldering Pearl",
		"local": "Fluorescent Fungus",
		"common": "treasureHoarder",
		"books": "Transience",
		"weeklyBoss": "Hellfire Butterfly"
	},
	"Tighnari": {
		"rarity": 5,
		"type": "Dendro",
		"gem": "Nagadus Emerald",
		"boss": "Majestic Hooked Beak",
		"local": "Nilotpala Lotus",
		"common": "fungus",
		"books": "Admonition",
		"weeklyBoss": "The Meaning of Aeons"
	},
	"Venti": {
		"rarity": 5,
		"type": "Anemo",
		"gem": "Vayuda Turquoise",
		"boss": "Hurricane Seed",
		"local": "Cecilia",
		"common": "slime",
		"books": "Ballad",
		"weeklyBoss": "Tail of Boreas"
	},
	"Wanderer": {
		"rarity": 5,
		"type": "Anemo",
		"gem": "Vayuda Turquoise",
		"boss": "Perpetual Caliber",
		"local": "Rukkhashava Mushrooms",
		"common": "nobushi",
		"books": "Praxis",
		"weeklyBoss": "Daka's Bell"
	},
	"Xiangling": {
		"rarity": 4,
		"type": "Pyro",
		"gem": "Agnidus Agate",
		"boss": "Everflame Seed",
		"local": "Jueyun Chili",
		"common": "slime",
		"books": "Diligence",
		"weeklyBoss": "Dvalin's Claw"
	},
	"Xiao": {
		"rarity": 5,
		"type": "Anemo",
		"gem": "Vayuda Turquoise",
		"boss": "Juvenile Jade",
		"local": "Qingxin",
		"common": "slime",
		"books": "Prosperity",
		"weeklyBoss": "Shadow of the Warrior"
	},
	"Xingqiu": {
		"rarity": 4,
		"type": "Hydro",
		"gem": "Varunada Lazurite",
		"boss": "Cleansing Heart",
		"local": "Silk Flower",
		"common": "hilichurl",
		"books": "Gold",
		"weeklyBoss": "Tail of Boreas"
	},
	"Xinyan": {
		"rarity": 4,
		"type": "Pyro",
		"gem": "Agnidus Agate",
		"boss": "Everflame Seed",
		"local": "Violetgrass",
		"common": "treasureHoarder",
		"books": "Gold",
		"weeklyBoss": "Tusk of Monoceros Caeli"
	},
	"Yae Miko": {
		"rarity": 5,
		"type": "Electro",
		"gem": "Vajrada Amethyst",
		"boss": "Dragonheir's False Fin",
		"local": "Sea Ganoderma",
		"common": "nobushi",
		"books": "Light",
		"weeklyBoss": "The Meaning of Aeons"
	},
	"Yanfei": {
		"rarity": 4,
		"type": "Pyro",
		"gem": "Agnidus Agate",
		"boss": "Juvenile Jade",
		"local": "Noctilucous Jade",
		"common": "treasureHoarder",
		"books": "Gold",
		"weeklyBoss": "Bloodjade Branch"
	},
	"Yaoyao": {
		"rarity": 4,
		"type": "Dendro",
		"gem": "Nagadus Emerald",
		"boss": "Quelled Creeper",
		"local": "Jueyun Chili",
		"common": "slime",
		"books": "Diligence",
		"weeklyBoss": "Daka's Bell"
	},
	"Yelan": {
		"rarity": 5,
		"type": "Hydro",
		"gem": "Varunada Lazurite",
		"boss": "Runic Fang",
		"local": "Starconch",
		"common": "fatuiSkirmisher",
		"books": "Prosperity",
		"weeklyBoss": "Gilded Scale"
	},
	"Yoimiya": {
		"rarity": 5,
		"type": "Pyro",
		"gem": "Agnidus Agate",
		"boss": "Smoldering Pearl",
		"local": "Naku Weed",
		"common": "samachurl",
		"books": "Transience",
		"weeklyBoss": "Dragon Lord's Crown"
	},
	"Yun Jin": {
		"rarity": 4,
		"type": "Geo",
		"gem": "Prithiva Topaz",
		"boss": "Riftborn Regalia",
		"local": "Glaze Lily",
		"common": "hilichurl",
		"books": "Diligence",
		"weeklyBoss": "Ashen Heart"
	},
	"Zhongli": {
		"rarity": 5,
		"type": "Geo",
		"gem": "Prithiva Topaz",
		"boss": "Basalt Pillar",
		"local": "Cor Lapis",
		"common": "slime",
		"books": "Gold",
		"weeklyBoss": "Tusk of Monoceros Caeli"
	},
	"Traveler": {
		"rarity": 5,
		"gem": "Brilliant Diamond",
		"boss": null,
		"local": "Windwheel Aster",
		"common": "hilichurl",
		"regions": [
			{
				"region": "Mondstadt",
				"type": "Anemo",
				"books": ["Freedom", "Resistance", "Ballad"],
				"weeklyBoss": "Dvalin's Sigh",
				"common": "samachurl"
			},{
				"region": "Liyue",
				"type": "Geo",
				"books": ["Prosperity", "Diligence", "Gold"],
				"weeklyBoss": "Tail of Boreas",
				"common": "hilichurlShooter"
			},{
				"region": "Inazuma",
				"type": "Electro",
				"books": ["Transience", "Elegance", "Light"],
				"weeklyBoss": "Dragon Lord's Crown",
				"common": "nobushi"
			},{
				"region": "Sumeru",
				"type": "Dendro",
				"books": ["Admonition", "Ingenuity", "Praxis"],
				"weeklyBoss": "Mudra of the Malefic General",
				"common": "fungus"
			},{
				"region": null,
				"type": "Unaligned",
				"books": ["Freedom", "Resistance", "Ballad"],
				"weeklyBoss": "Dvalin's Sigh",
				"common": "samachurl"
			}
		]
	},
}