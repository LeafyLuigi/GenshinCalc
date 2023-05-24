'use strict';
const itemDB = {
	"Mora": {
		"rarity": 3,
		"type": "other"
	},
	"Crown of Insight": {
		"rarity": 5,
		"type": "other"
	},
	
	"Basalt Pillar": {
		"rarity": 4,
		"type": "boss"
	},
	"Cleansing Heart": {
		"rarity": 4,
		"type": "boss"
	},
	"Crystalline Bloom": {
		"rarity": 4,
		"type": "boss"
	},
	"Dew of Repudiation": {
		"rarity": 4,
		"type": "boss"
	},
	"Dragonheir's False Fin": {
		"rarity": 4,
		"type": "boss"
	},
	"Everflame Seed": {
		"rarity": 4,
		"type": "boss"
	},
	"Evergloom Ring": {
		"rarity": 4,
		"type": "boss"
	},
	"Hoarfrost Core": {
		"rarity": 4,
		"type": "boss"
	},
	"Hurricane Seed": {
		"rarity": 4,
		"type": "boss"
	},
	"Juvenile Jade": {
		"rarity": 4,
		"type": "boss"
	},
	"Light Guiding Tetrahedron": {
		"rarity": 4,
		"type": "boss"
	},
	"Lightning Prism": {
		"rarity": 4,
		"type": "boss"
	},
	"Majestic Hooked Beak": {
		"rarity": 4,
		"type": "boss"
	},
	"Marionette Core": {
		"rarity": 4,
		"type": "boss"
	},
	"Perpetual Caliber": {
		"rarity": 4,
		"type": "boss"
	},
	"Perpetual Heart": {
		"rarity": 4,
		"type": "boss"
	},
	"Pseudo-Stamens": {
		"rarity": 4,
		"type": "boss"
	},
	"Quelled Creeper": {
		"rarity": 4,
		"type": "boss"
	},
	"Riftborn Regalia": {
		"rarity": 4,
		"type": "boss"
	},
	"Runic Fang": {
		"rarity": 4,
		"type": "boss"
	},
	"Smoldering Pearl": {
		"rarity": 4,
		"type": "boss"
	},
	"Storm Beads": {
		"rarity": 4,
		"type": "boss"
	},
	"Thunderclap Fruitcore": {
		"rarity": 4,
		"type": "boss"
	},

	"Adventurer's Experience": {
		"rarity": 3,
		"type": "charExp"
	},
	"Hero's Wit": {
		"rarity": 4,
		"type": "charExp"
	},
	"Wanderer's Advice": {
		"rarity": 2,
		"type": "charExp"
	},

	"Crystalline Cyst Dust": {
		"rarity": 3,
		"type": "common"
	},
	"Damaged Mask": {
		"rarity": 1,
		"type": "common"
	},
	"Divining Scroll": {
		"rarity": 1,
		"type": "common"
	},
	"Energy Nectar": {
		"rarity": 3,
		"type": "common"
	},
	"Faded Red Satin": {
		"rarity": 1,
		"type": "common"
	},
	"Famed Handguard": {
		"rarity": 3,
		"type": "common"
	},
	"Firm Arrowhead": {
		"rarity": 1,
		"type": "common"
	},
	"Forbidden Curse Scroll": {
		"rarity": 3,
		"type": "common"
	},
	"Fungal Spores": {
		"rarity": 1,
		"type": "common"
	},
	"Golden Raven Insignia": {
		"rarity": 3,
		"type": "common"
	},
	"Kageuchi Handguard": {
		"rarity": 2,
		"type": "common"
	},
	"Lieutenant's Insignia": {
		"rarity": 3,
		"type": "common"
	},
	"Luminescent Pollen": {
		"rarity": 2,
		"type": "common"
	},
	"Old Handguard": {
		"rarity": 1,
		"type": "common"
	},
	"Ominous Mask": {
		"rarity": 3,
		"type": "common"
	},
	"Recruit's Insignia": {
		"rarity": 1,
		"type": "common"
	},
	"Rich Red Brocade": {
		"rarity": 3,
		"type": "common"
	},
	"Sealed Scroll": {
		"rarity": 2,
		"type": "common"
	},
	"Sergeant's Insignia": {
		"rarity": 2,
		"type": "common"
	},
	"Sharp Arrowhead": {
		"rarity": 2,
		"type": "common"
	},
	"Shimmering Nectar": {
		"rarity": 2,
		"type": "common"
	},
	"Silver Raven Insignia": {
		"rarity": 2,
		"type": "common"
	},
	"Slime Concentrate": {
		"rarity": 3,
		"type": "common"
	},
	"Slime Condensate": {
		"rarity": 1,
		"type": "common"
	},
	"Slime Secretions": {
		"rarity": 2,
		"type": "common"
	},
	"Spectral Heart": {
		"rarity": 2,
		"type": "common"
	},
	"Spectral Husk": {
		"rarity": 1,
		"type": "common"
	},
	"Spectral Nucleus": {
		"rarity": 3,
		"type": "common"
	},
	"Stained Mask": {
		"rarity": 2,
		"type": "common"
	},
	"Treasure Hoarder Insignia": {
		"rarity": 1,
		"type": "common"
	},
	"Trimmed Red Silk": {
		"rarity": 2,
		"type": "common"
	},
	"Weathered Arrowhead": {
		"rarity": 3,
		"type": "common"
	},
	"Whopperflower Nectar": {
		"rarity": 1,
		"type": "common"
	},

	"A Flower Yet to Bloom": {
		"rarity": 2,
		"type": "elite"
	},
	"Agent's Sacrificial Knife": {
		"rarity": 3,
		"type": "elite"
	},
	"Black Bronze Horn": {
		"rarity": 3,
		"type": "elite"
	},
	"Black Crystal Horn": {
		"rarity": 4,
		"type": "elite"
	},
	"Chaos Axis": {
		"rarity": 3,
		"type": "elite"
	},
	"Chaos Bolt": {
		"rarity": 4,
		"type": "elite"
	},
	"Chaos Circuit": {
		"rarity": 3,
		"type": "elite"
	},
	"Chaos Core": {
		"rarity": 4,
		"type": "elite"
	},
	"Chaos Device": {
		"rarity": 2,
		"type": "elite"
	},
	"Chaos Gear": {
		"rarity": 2,
		"type": "elite"
	},
	"Chaos Module": {
		"rarity": 3,
		"type": "elite"
	},
	"Chaos Oculus": {
		"rarity": 4,
		"type": "elite"
	},
	"Chaos Storage": {
		"rarity": 2,
		"type": "elite"
	},
	"Concealed Claw": {
		"rarity": 2,
		"type": "elite"
	},
	"Concealed Talon": {
		"rarity": 4,
		"type": "elite"
	},
	"Concealed Unguis": {
		"rarity": 3,
		"type": "elite"
	},
	"Crystal Prism": {
		"rarity": 3,
		"type": "elite"
	},
	"Damaged Prism": {
		"rarity": 2,
		"type": "elite"
	},
	"Dark Statuette": {
		"rarity": 3,
		"type": "elite"
	},
	"Dead Ley Line Branch": {
		"rarity": 2,
		"type": "elite"
	},
	"Dead Ley Line Leaves": {
		"rarity": 3,
		"type": "elite"
	},
	"Deathly Statuette": {
		"rarity": 4,
		"type": "elite"
	},
	"Desiccated Shell": {
		"rarity": 2,
		"type": "elite"
	},
	"Dismal Prism": {
		"rarity": 2,
		"type": "elite"
	},
	"Dormant Fungal Nucleus": {
		"rarity": 3,
		"type": "elite"
	},
	"Fossilized Bone Shard": {
		"rarity": 4,
		"type": "elite"
	},
	"Fragile Bone Shard": {
		"rarity": 2,
		"type": "elite"
	},
	"Gloomy Statuette": {
		"rarity": 2,
		"type": "elite"
	},
	"Heavy Horn": {
		"rarity": 2,
		"type": "elite"
	},
	"Hunter's Sacrificial Knife": {
		"rarity": 2,
		"type": "elite"
	},
	"Inactivated Fungal Nucleus": {
		"rarity": 2,
		"type": "elite"
	},
	"Inspector's Sacrificial Knife": {
		"rarity": 4,
		"type": "elite"
	},
	"Ley Line Sprout": {
		"rarity": 4,
		"type": "elite"
	},
	"Marked Shell": {
		"rarity": 4,
		"type": "elite"
	},
	"Mist Grass Pollen": {
		"rarity": 2,
		"type": "elite"
	},
	"Mist Grass Wick": {
		"rarity": 4,
		"type": "elite"
	},
	"Mist Grass": {
		"rarity": 3,
		"type": "elite"
	},
	"Polarizing Prism": {
		"rarity": 4,
		"type": "elite"
	},
	"Radiant Prism": {
		"rarity": 4,
		"type": "elite"
	},
	"Robust Fungal Nucleus": {
		"rarity": 4,
		"type": "elite"
	},
	"Sturdy Bone Shard": {
		"rarity": 3,
		"type": "elite"
	},
	"Sturdy Shell": {
		"rarity": 3,
		"type": "elite"
	},
	"Treasured Flower": {
		"rarity": 3,
		"type": "elite"
	},
	"Turbid Prism": {
		"rarity": 3,
		"type": "elite"
	},
	"Wanderer's Blooming Flower": {
		"rarity": 4,
		"type": "elite"
	},

	"Agnidus Agate Chunk": {
		"rarity": 4,
		"type": "gem"
	},
	"Agnidus Agate Fragment": {
		"rarity": 3,
		"type": "gem"
	},
	"Agnidus Agate Gemstone": {
		"rarity": 5,
		"type": "gem"
	},
	"Agnidus Agate Sliver": {
		"rarity": 2,
		"type": "gem"
	},
	"Brilliant Diamond Chunk": {
		"rarity": 4,
		"type": "gem"
	},
	"Brilliant Diamond Fragment": {
		"rarity": 3,
		"type": "gem"
	},
	"Brilliant Diamond Gemstone": {
		"rarity": 5,
		"type": "gem"
	},
	"Brilliant Diamond Sliver": {
		"rarity": 2,
		"type": "gem"
	},
	"Nagadus Emerald Chunk": {
		"rarity": 4,
		"type": "gem"
	},
	"Nagadus Emerald Fragment": {
		"rarity": 3,
		"type": "gem"
	},
	"Nagadus Emerald Gemstone": {
		"rarity": 5,
		"type": "gem"
	},
	"Nagadus Emerald Sliver": {
		"rarity": 2,
		"type": "gem"
	},
	"Shivada Jade Chunk": {
		"rarity": 4,
		"type": "gem"
	},
	"Shivada Jade Fragment": {
		"rarity": 3,
		"type": "gem"
	},
	"Shivada Jade Gemstone": {
		"rarity": 5,
		"type": "gem"
	},
	"Shivada Jade Sliver": {
		"rarity": 2,
		"type": "gem"
	},
	"Prithiva Topaz Sliver": {
		"rarity": 2,
		"type": "gem"
	},
	"Prithiva Topaz Fragment": {
		"rarity": 3,
		"type": "gem"
	},
	"Prithiva Topaz Chunk": {
		"rarity": 4,
		"type": "gem"
	},
	"Prithiva Topaz Gemstone": {
		"rarity": 5,
		"type": "gem"
	},
	"Vajrada Amethyst Chunk": {
		"rarity": 4,
		"type": "gem"
	},
	"Vajrada Amethyst Fragment": {
		"rarity": 3,
		"type": "gem"
	},
	"Vajrada Amethyst Gemstone": {
		"rarity": 5,
		"type": "gem"
	},
	"Vajrada Amethyst Sliver": {
		"rarity": 2,
		"type": "gem"
	},
	"Varunada Lazurite Chunk": {
		"rarity": 4,
		"type": "gem"
	},
	"Varunada Lazurite Fragment": {
		"rarity": 3,
		"type": "gem"
	},
	"Varunada Lazurite Gemstone": {
		"rarity": 5,
		"type": "gem"
	},
	"Varunada Lazurite Sliver": {
		"rarity": 2,
		"type": "gem"
	},
	"Vayuda Turquoise Chunk": {
		"rarity": 4,
		"type": "gem"
	},
	"Vayuda Turquoise Fragment": {
		"rarity": 3,
		"type": "gem"
	},
	"Vayuda Turquoise Gemstone": {
		"rarity": 5,
		"type": "gem"
	},
	"Vayuda Turquoise Sliver": {
		"rarity": 2,
		"type": "gem"
	},

	"Guide to Admonition": {
		"rarity": 3,
		"type": "books"
	},
	"Guide to Ballad": {
		"rarity": 3,
		"type": "books"
	},
	"Guide to Diligence": {
		"rarity": 3,
		"type": "books"
	},
	"Guide to Elegance": {
		"rarity": 3,
		"type": "books"
	},
	"Guide to Freedom": {
		"rarity": 3,
		"type": "books"
	},
	"Guide to Gold": {
		"rarity": 3,
		"type": "books"
	},
	"Guide to Ingenuity": {
		"rarity": 3,
		"type": "books"
	},
	"Guide to Light": {
		"rarity": 3,
		"type": "books"
	},
	"Guide to Praxis": {
		"rarity": 3,
		"type": "books"
	},
	"Guide to Prosperity": {
		"rarity": 3,
		"type": "books"
	},
	"Guide to Resistance": {
		"rarity": 3,
		"type": "books"
	},
	"Guide to Transience": {
		"rarity": 3,
		"type": "books"
	},
	"Philosophies of Admonition": {
		"rarity": 4,
		"type": "books"
	},
	"Philosophies of Ballad": {
		"rarity": 4,
		"type": "books"
	},
	"Philosophies of Diligence": {
		"rarity": 4,
		"type": "books"
	},
	"Philosophies of Elegance": {
		"rarity": 4,
		"type": "books"
	},
	"Philosophies of Freedom": {
		"rarity": 4,
		"type": "books"
	},
	"Philosophies of Gold": {
		"rarity": 4,
		"type": "books"
	},
	"Philosophies of Ingenuity": {
		"rarity": 4,
		"type": "books"
	},
	"Philosophies of Light": {
		"rarity": 4,
		"type": "books"
	},
	"Philosophies of Praxis": {
		"rarity": 4,
		"type": "books"
	},
	"Philosophies of Prosperity": {
		"rarity": 4,
		"type": "books"
	},
	"Philosophies of Resistance": {
		"rarity": 4,
		"type": "books"
	},
	"Philosophies of Transience": {
		"rarity": 4,
		"type": "books"
	},
	"Teachings of Admonition": {
		"rarity": 2,
		"type": "books"
	},
	"Teachings of Ballad": {
		"rarity": 2,
		"type": "books"
	},
	"Teachings of Diligence": {
		"rarity": 2,
		"type": "books"
	},
	"Teachings of Elegance": {
		"rarity": 2,
		"type": "books"
	},
	"Teachings of Freedom": {
		"rarity": 2,
		"type": "books"
	},
	"Teachings of Gold": {
		"rarity": 2,
		"type": "books"
	},
	"Teachings of Ingenuity": {
		"rarity": 2,
		"type": "books"
	},
	"Teachings of Light": {
		"rarity": 2,
		"type": "books"
	},
	"Teachings of Praxis": {
		"rarity": 2,
		"type": "books"
	},
	"Teachings of Prosperity": {
		"rarity": 2,
		"type": "books"
	},
	"Teachings of Resistance": {
		"rarity": 2,
		"type": "books"
	},
	"Teachings of Transience": {
		"rarity": 2,
		"type": "books"
	},

	"Amakumo Fruit": {
		"rarity": 1,
		"type": "local"
	},
	"Crystal Marrow": {
		"rarity": 1,
		"type": "local"
	},
	"Glaze Lily": {
		"rarity": 1,
		"type": "local"
	},
	"Mourning Flower": {
		"rarity": 1,
		"type": "local"
	},
	"Onikabuto": {
		"rarity": 1,
		"type": "local"
	},
	"Rukkhashava Mushrooms": {
		"rarity": 1,
		"type": "local"
	},
	"Scarab": {
		"rarity": 1,
		"type": "local"
	},
	"Starconch": {
		"rarity": 1,
		"type": "local"
	},
	"Windwheel Aster": {
		"rarity": 1,
		"type": "local"
	},
	"Calla Lily": {
		"rarity": 1,
		"type": "local"
	},
	"Dandelion Seed": {
		"rarity": 1,
		"type": "local"
	},
	"Henna Berry": {
		"rarity": 1,
		"type": "local"
	},
	"Naku Weed": {
		"rarity": 1,
		"type": "local"
	},
	"Padisarah": {
		"rarity": 1,
		"type": "local"
	},
	"Sakura Bloom": {
		"rarity": 1,
		"type": "local"
	},
	"Sea Ganoderma": {
		"rarity": 1,
		"type": "local"
	},
	"Trishiraite": {
		"rarity": 1,
		"type": "local"
	},
	"Wolfhook": {
		"rarity": 1,
		"type": "local"
	},
	"Cecilia": {
		"rarity": 1,
		"type": "local"
	},
	"Dendrobium": {
		"rarity": 1,
		"type": "local"
	},
	"Jueyun Chili": {
		"rarity": 1,
		"type": "local"
	},
	"Nilotpala Lotus": {
		"rarity": 1,
		"type": "local"
	},
	"Philanemo Mushroom": {
		"rarity": 1,
		"type": "local"
	},
	"Sand Grease Pupa": {
		"rarity": 1,
		"type": "local"
	},
	"Silk Flower": {
		"rarity": 1,
		"type": "local"
	},
	"Valberry": {
		"rarity": 1,
		"type": "local"
	},
	"Cor Lapis": {
		"rarity": 1,
		"type": "local"
	},
	"Fluorescent Fungus": {
		"rarity": 1,
		"type": "local"
	},
	"Kalpalata Lotus": {
		"rarity": 1,
		"type": "local"
	},
	"Noctilucous Jade": {
		"rarity": 1,
		"type": "local"
	},
	"Qingxin": {
		"rarity": 1,
		"type": "local"
	},
	"Sango Pearl": {
		"rarity": 1,
		"type": "local"
	},
	"Small Lamp Grass": {
		"rarity": 1,
		"type": "local"
	},
	"Violetgrass": {
		"rarity": 1,
		"type": "local"
	},

	"Bit of Aerosiderite": {
		"rarity": 4,
		"type": "weaponAsc"
	},
	"Boreal Wolf's Broken Fang": {
		"rarity": 4,
		"type": "weaponAsc"
	},
	"Boreal Wolf's Cracked Tooth": {
		"rarity": 3,
		"type": "weaponAsc"
	},
	"Boreal Wolf's Milk Tooth": {
		"rarity": 2,
		"type": "weaponAsc"
	},
	"Boreal Wolf's Nostalgia": {
		"rarity": 5,
		"type": "weaponAsc"
	},
	"Chains of the Dandelion Gladiator": {
		"rarity": 3,
		"type": "weaponAsc"
	},
	"Chunk of Aerosiderite": {
		"rarity": 5,
		"type": "weaponAsc"
	},
	"Copper Talisman of the Forest Dew": {
		"rarity": 2,
		"type": "weaponAsc"
	},
	"Coral Branch of a Distant Sea": {
		"rarity": 2,
		"type": "weaponAsc"
	},
	"Debris of Decarabian's City": {
		"rarity": 3,
		"type": "weaponAsc"
	},
	"Divine Body from Guyun": {
		"rarity": 5,
		"type": "weaponAsc"
	},
	"Dream of Scorching Might": {
		"rarity": 4,
		"type": "weaponAsc"
	},
	"Dream of the Dandelion Gladiator": {
		"rarity": 5,
		"type": "weaponAsc"
	},
	"Echo of Scorching Might": {
		"rarity": 2,
		"type": "weaponAsc"
	},
	"Fetters of the Dandelion Gladiator": {
		"rarity": 2,
		"type": "weaponAsc"
	},
	"Fragment of Decarabian's Epic": {
		"rarity": 4,
		"type": "weaponAsc"
	},
	"Golden Branch of a Distant Sea": {
		"rarity": 5,
		"type": "weaponAsc"
	},
	"Golden Talisman of the Forest Dew": {
		"rarity": 5,
		"type": "weaponAsc"
	},
	"Grain of Aerosiderite": {
		"rarity": 2,
		"type": "weaponAsc"
	},
	"Iron Talisman of the Forest Dew": {
		"rarity": 3,
		"type": "weaponAsc"
	},
	"Jade Branch of a Distant Sea": {
		"rarity": 4,
		"type": "weaponAsc"
	},
	"Jeweled Branch of a Distant Sea": {
		"rarity": 3,
		"type": "weaponAsc"
	},
	"Luminous Sands from Guyun": {
		"rarity": 2,
		"type": "weaponAsc"
	},
	"Lustrous Stone from Guyun": {
		"rarity": 3,
		"type": "weaponAsc"
	},
	"Mask of the Kijin": {
		"rarity": 5,
		"type": "weaponAsc"
	},
	"Mask of the One-Horned": {
		"rarity": 4,
		"type": "weaponAsc"
	},
	"Mask of the Tiger's Bite": {
		"rarity": 3,
		"type": "weaponAsc"
	},
	"Mask of the Wicked Lieutenant": {
		"rarity": 2,
		"type": "weaponAsc"
	},
	"Mist Veiled Gold Elixir": {
		"rarity": 4,
		"type": "weaponAsc"
	},
	"Mist Veiled Lead Elixir": {
		"rarity": 2,
		"type": "weaponAsc"
	},
	"Mist Veiled Mercury Elixir": {
		"rarity": 3,
		"type": "weaponAsc"
	},
	"Mist Veiled Primo Elixir": {
		"rarity": 5,
		"type": "weaponAsc"
	},
	"Narukami's Affection": {
		"rarity": 4,
		"type": "weaponAsc"
	},
	"Narukami's Joy": {
		"rarity": 3,
		"type": "weaponAsc"
	},
	"Narukami's Valor": {
		"rarity": 5,
		"type": "weaponAsc"
	},
	"Narukami's Wisdom": {
		"rarity": 2,
		"type": "weaponAsc"
	},
	"Oasis Garden's Kindness": {
		"rarity": 3,
		"type": "weaponAsc"
	},
	"Oasis Garden's Mourning": {
		"rarity": 4,
		"type": "weaponAsc"
	},
	"Oasis Garden's Reminiscence": {
		"rarity": 2,
		"type": "weaponAsc"
	},
	"Oasis Garden's Truth": {
		"rarity": 5,
		"type": "weaponAsc"
	},
	"Olden Days of Scorching Might": {
		"rarity": 5,
		"type": "weaponAsc"
	},
	"Piece of Aerosiderite": {
		"rarity": 3,
		"type": "weaponAsc"
	},
	"Relic from Guyun": {
		"rarity": 4,
		"type": "weaponAsc"
	},
	"Remnant Glow of Scorching Might": {
		"rarity": 3,
		"type": "weaponAsc"
	},
	"Scattered Piece of Decarabian's Dream": {
		"rarity": 5,
		"type": "weaponAsc"
	},
	"Shackles of the Dandelion Gladiator": {
		"rarity": 4,
		"type": "weaponAsc"
	},
	"Silver Talisman of the Forest Dew": {
		"rarity": 4,
		"type": "weaponAsc"
	},
	"Tile of Decarabian's Tower": {
		"rarity": 2,
		"type": "weaponAsc"
	},

	"Ashen Heart": {
		"rarity": 5,
		"type": "weeklyBoss"
	},
	"Bloodjade Branch": {
		"rarity": 5,
		"type": "weeklyBoss"
	},
	"Daka's Bell": {
		"rarity": 5,
		"type": "weeklyBoss"
	},
	"Dragon Lord's Crown": {
		"rarity": 5,
		"type": "weeklyBoss"
	},
	"Dvalin's Claw": {
		"rarity": 5,
		"type": "weeklyBoss"
	},
	"Dvalin's Plume": {
		"rarity": 5,
		"type": "weeklyBoss"
	},
	"Dvalin's Sigh": {
		"rarity": 5,
		"type": "weeklyBoss"
	},
	"Everamber": {
		"rarity": 5,
		"type": "weeklyBoss"
	},
	"Gilded Scale": {
		"rarity": 5,
		"type": "weeklyBoss"
	},
	"Hellfire Butterfly": {
		"rarity": 5,
		"type": "weeklyBoss"
	},
	"Mirror of Mushin": {
		"rarity": 5,
		"type": "weeklyBoss"
	},
	"Molten Moment": {
		"rarity": 5,
		"type": "weeklyBoss"
	},
	"Mudra of the Malefic General": {
		"rarity": 5,
		"type": "weeklyBoss"
	},
	"Primordial Greenbloom": {
		"rarity": 5,
		"type": "weeklyBoss"
	},
	"Puppet Strings": {
		"rarity": 5,
		"type": "weeklyBoss"
	},
	"Ring of Boreas": {
		"rarity": 5,
		"type": "weeklyBoss"
	},
	"Shadow of the Warrior": {
		"rarity": 5,
		"type": "weeklyBoss"
	},
	"Shard of a Foul Legacy": {
		"rarity": 5,
		"type": "weeklyBoss"
	},
	"Spirit Locket of Boreas": {
		"rarity": 5,
		"type": "weeklyBoss"
	},
	"Tail of Boreas": {
		"rarity": 5,
		"type": "weeklyBoss"
	},
	"Tears of the Calamitous God": {
		"rarity": 5,
		"type": "weeklyBoss"
	},
	"The Meaning of Aeons": {
		"rarity": 5,
		"type": "weeklyBoss"
	},
	"Tusk of Monoceros Caeli": {
		"rarity": 5,
		"type": "weeklyBoss"
	},
	"Worldspan Fern": {
		"rarity": 5,
		"type": "weeklyBoss"
	},
};

const itemGroupDB = {
	// NOTE:
	// THIS LIST DOES NOT CONTAIN BOOKS BECAUSE I HAVE NOT SORTED THEM YET.
	// WEEKLY BOSS DROPS ARE NOT INCLUDED HERE EITHER.
	// LOCALS AND BOSS DROPS LACK GROUPS.

	// common mats
	"slime": {
		"priority": 0,
		"items":["Slime Condensate", "Slime Secretions", "Slime Concentrate"]
	},
	"hilichurl": {
		"priority": 1,
		"items":["Damaged Mask", "Stained Mask", "Ominous Mask"]
	},
	"samachurl": {
		"priority": 2,
		"items":["Divining Scroll", "Sealed Scroll", "Forbidden Curse Scroll"]
	},
	"hilichurlShooter": {
		"priority": 3,
		"items":["Firm Arrowhead", "Sharp Arrowhead", "Weathered Arrowhead"]
	},
	"fatuiSkirmisher": {
		"priority": 4,
		"items":["Recruit's Insignia", "Sergeant's Insignia", "Lieutenant's Insignia"]
	},
	"treasureHoarder": {
		"priority": 5,
		"items":["Treasure Hoarder Insignia", "Silver Raven Insignia", "Golden Raven Insignia"]
	},
	"whopperflower": {
		"priority": 6,
		"items":["Whopperflower Nectar", "Shimmering Nectar", "Energy Nectar"]
	},
	"nobushi": {
		"priority": 7,
		"items":["Old Handguard", "Kageuchi Handguard", "Famed Handguard"]
	},
	"specter": {
		"priority": 8,
		"items":["Spectral Husk", "Spectral Heart", "Spectral Nucleus"]
	},
	"fungus": {
		"priority": 9,
		"items":["Fungal Spores", "Luminescent Pollen", "Crystalline Cyst Dust"]
	},
	"eremites": {
		"priority": 10,
		"items":["Faded Red Satin", "Trimmed Red Silk", "Rich Red Brocade"]
	},

	// elite mats
	"mitachurl": {
		"priority": 0,
		"items":["Heavy Horn", "Black Bronze Horn", "Black Crystal Horn"]
	},
	"abyssMage": {
		"priority": 1,
		"items":["Dead Ley Line Branch", "Dead Ley Line Leaves", "Ley Line Sprout"]
	},
	"ruinHumainoid": {
		"priority": 2,
		"items":["Chaos Device", "Chaos Circuit", "Chaos Core"]
	},
	"fatuiCicinMage": {
		"priority": 3,
		"items":["Mist Grass Pollen", "Mist Grass", "Mist Grass Wick"]
	},
	"fatuiPyroAgent": {
		"priority": 4,
		"items":["Hunter's Sacrificial Knife", "Agent's Sacrificial Knife", "Inspector's Sacrificial Knife"]
	},
	"vishap": {
		"priority": 5,
		"items":["Fragile Bone Shard", "Sturdy Bone Shard", "Fossilized Bone Shard"]
	},
	"ruinSentinel": {
		"priority": 6,
		"items":["Chaos Gear", "Chaos Axis", "Chaos Oculus"]
	},
	"mirrorMaiden": {
		"priority": 7,
		"items":["Dismal Prism", "Crystal Prism", "Polarizing Prism"]
	},
	"riftwolf": {
		"priority": 8,
		"items":["Concealed Claw", "Concealed Unguis", "Concealed Talon"]
	},
	"blackSerpents": {
		"priority": 9,
		"items":["Gloomy Statuette", "Dark Statuette", "Deathly Statuette"]
	},
	"fungusStateShifted": {
		"priority": 10,
		"items":["Inactivated Fungal Nucleus", "Dormant Fungal Nucleus", "Robust Fungal Nucleus"]
	},
	"ruinDrake": {
		"priority": 11,
		"items":["Chaos Storage", "Chaos Module", "Chaos Bolt"]
	},
	"primalConstruct": {
		"priority": 12,
		"items":["Damaged Prism", "Turbid Prism", "Radiant Prism"]
	},
	"consecratedBeast": {
		"priority": 13,
		"items":["Desiccated Shell", "Sturdy Shell", "Marked Shell"]
	},
	"hilichurlRogue": {
		"priority": 14,
		"items":["A Flower Yet to Bloom", "Treasured Flower", "Wanderer's Blooming Flower"]
	},
	
	// weapon asc mats
	"decarabianTiles": {
		"priority": 0,
		"items":["Tile of Decarabian's Tower","Debris of Decarabian's City","Fragment of Decarabian's Epic","Scattered Piece of Decarabian's Dream"]
	},
	"borealWolfTeeth": {
		"priority": 0,
		"items":["Boreal Wolf's Milk Tooth","Boreal Wolf's Cracked Tooth","Boreal Wolf's Broken Fang","Boreal Wolf's Nostalgia"]
	},
	"gladiatorShackles": {
		"priority": 0,
		"items":["Fetters of the Dandelion Gladiator","Chains of the Dandelion Gladiator","Shackles of the Dandelion Gladiator","Dream of the Dandelion Gladiator"]
	},
	"guyunPillars": {
		"priority": 0,
		"items":["Luminous Sands from Guyun","Lustrous Stone from Guyun","Relic from Guyun","Divine Body from Guyun"]
	},
	"elixirs": {
		"priority": 0,
		"items":["Mist Veiled Lead Elixir","Mist Veiled Mercury Elixir","Mist Veiled Gold Elixir","Mist Veiled Primo Elixir"]
	},
	"aerosiderite": {
		"priority": 0,
		"items":["Grain of Aerosiderite","Piece of Aerosiderite","Bit of Aerosiderite","Chunk of Aerosiderite"]
	},
	"distantSeaBranches": {
		"priority": 0,
		"items":["Coral Branch of a Distant Sea","Jeweled Branch of a Distant Sea","Jade Branch of a Distant Sea","Golden Branch of a Distant Sea"]
	},
	"narukami": {
		"priority": 0,
		"items":["Narukami's Wisdom","Narukami's Joy","Narukami's Affection","Narukami's Valor"]
	},
	"oniMasks": {
		"priority": 0,
		"items":["Mask of the Wicked Lieutenant","Mask of the Tiger's Bite","Mask of the One-Horned","Mask of the Kijin"]
	},
	"forestDewTalismans": {
		"priority": 0,
		"items":["Copper Talisman of the Forest Dew","Iron Talisman of the Forest Dew","Silver Talisman of the Forest Dew","Golden Talisman of the Forest Dew"]
	},
	"oasisGardens": {
		"priority": 0,
		"items":["Oasis Garden's Reminiscence","Oasis Garden's Kindness","Oasis Garden's Mourning","Oasis Garden's Truth"]
	},
	"scorchingMights": {
		"priority": 0,
		"items":["Echo of Scorching Might","Remnant Glow of Scorching Might","Dream of Scorching Might","Olden Days of Scorching Might"]
	},

	// gem groups - sorted by element in loading screen bar
	"Brilliant Diamond": {
		"priority": 0,
		"craftUp": false,
		"items": ["Brilliant Diamond Sliver","Brilliant Diamond Fragment","Brilliant Diamond Chunk","Brilliant Diamond Gemstone"]
	},
	"Agnidus Agate": {
		"priority": 1,
		"items": ["Agnidus Agate Sliver","Agnidus Agate Fragment","Agnidus Agate Chunk","Agnidus Agate Gemstone"]
	},
	"Varunada Lazurite": {
		"priority": 2,
		"items": ["Varunada Lazurite Sliver","Varunada Lazurite Fragment","Varunada Lazurite Chunk","Varunada Lazurite Gemstone"]
	},
	"Vayuda Turquoise": {
		"priority": 3,
		"items": ["Vayuda Turquoise Sliver","Vayuda Turquoise Fragment","Vayuda Turquoise Chunk","Vayuda Turquoise Gemstone"]
	},
	"Vajrada Amethyst": {
		"priority": 4,
		"items": ["Vajrada Amethyst Sliver","Vajrada Amethyst Fragment","Vajrada Amethyst Chunk","Vajrada Amethyst Gemstone"]
	},
	"Nagadus Emerald": {
		"priority": 5,
		"items": ["Nagadus Emerald Sliver","Nagadus Emerald Fragment","Nagadus Emerald Chunk","Nagadus Emerald Gemstone"]
	},
	"Shivada Jade": {
		"priority": 6,
		"items": ["Shivada Jade Sliver","Shivada Jade Fragment","Shivada Jade Chunk","Shivada Jade Gemstone"]
	},
	"Prithiva Topaz": {
		"priority": 7,
		"items": ["Prithiva Topaz Sliver","Prithiva Topaz Fragment","Prithiva Topaz Chunk","Prithiva Topaz Gemstone"]
	},
	
	// books or talent materials
	"Admonition": {
		"priority": 9,
		"items": ["Teachings of Admonition", "Guide to Admonition", "Philosophies of Admonition"]
	},
	"Ballad": {
		"priority": 2,
		"items": ["Teachings of Ballad", "Guide to Ballad", "Philosophies of Ballad"]
	},
	"Diligence": {
		"priority": 4,
		"items": ["Teachings of Diligence", "Guide to Diligence", "Philosophies of Diligence"]
	},
	"Elegance": {
		"priority": 7,
		"items": ["Teachings of Elegance", "Guide to Elegance", "Philosophies of Elegance"]
	},
	"Freedom": {
		"priority": 0,
		"items": ["Teachings of Freedom", "Guide to Freedom", "Philosophies of Freedom"]
	},
	"Gold": {
		"priority": 5,
		"items": ["Teachings of Gold", "Guide to Gold", "Philosophies of Gold"]
	},
	"Ingenuity": {
		"priority": 10,
		"items": ["Teachings of Ingenuity", "Guide to Ingenuity", "Philosophies of Ingenuity"]
	},
	"Light": {
		"priority": 8,
		"items": ["Teachings of Light", "Guide to Light", "Philosophies of Light"]
	},
	"Praxis": {
		"priority": 11,
		"items": ["Teachings of Praxis", "Guide to Praxis", "Philosophies of Praxis"]
	},
	"Prosperity": {
		"priority": 3,
		"items": ["Teachings of Prosperity", "Guide to Prosperity", "Philosophies of Prosperity"]
	},
	"Resistance": {
		"priority": 1,
		"items": ["Teachings of Resistance", "Guide to Resistance", "Philosophies of Resistance"]
	},
	"Transience": {
		"priority": 6,
		"items": ["Teachings of Transience", "Guide to Transience", "Philosophies of Transience"]
	},
}
// adds the group to the item
for (var groupItem in itemGroupDB) {
	for (var _i = 0; _i < itemGroupDB[groupItem].items.length; _i++) {
		itemDB[itemGroupDB[groupItem].items[_i]].group = groupItem;
	}
}