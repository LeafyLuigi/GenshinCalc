// What's needed per level for Ascension and Talents
const ascValues = [
	{
		"cost": 20000,
		"common": {"count": 3, "rank": 0},
		"local": 3,
		"gem": {"count": 1, "rank": 0}
	},
	{
		"cost": 40000,
		"common": {"count": 15, "rank": 0},
		"local": 10,
		"gem": {"count": 3, "rank": 1},
		"boss": 2
	},
	{
		"cost": 60000,
		"common": {"count": 12, "rank": 1},
		"local": 20,
		"gem": {"count": 6, "rank": 1},
		"boss": 4
	},
	{
		"cost": 80000,
		"common": {"count": 18, "rank": 1},
		"local": 30,
		"gem": {"count": 3, "rank": 2},
		"boss": 8
	},
	{
		"cost": 100000,
		"common": {"count": 12, "rank": 2},
		"local": 45,
		"gem": {"count": 6, "rank": 2},
		"boss": 12
	},
	{
		"cost": 120000,
		"common": {"count": 24, "rank": 2},
		"local": 60,
		"gem": {"count": 6, "rank": 3},
		"boss": 20
	},
];
const talValues = [
	{
		"cost": 12500,
		"common": {"count": 6, "rank": 0},
		"books": {"count": 3, "rank": 0}
	},
	{
		"cost": 17500,
		"common": {"count": 3, "rank": 1},
		"books": {"count": 2, "rank": 1}
	},
	{
		"cost": 25000,
		"common": {"count": 4, "rank": 1},
		"books": {"count": 4, "rank": 1}
	},
	{
		"cost": 30000,
		"common": {"count": 6, "rank": 1},
		"books": {"count": 6, "rank": 1}
	},
	{
		"cost": 37500,
		"common": {"count": 9, "rank": 1},
		"books": {"count": 9, "rank": 1}
	},
	{
		"cost": 120000,
		"common": {"count": 4, "rank": 2},
		"books": {"count": 4, "rank": 2},
		"weeklyBoss": 1
	},
	{
		"cost": 260000,
		"common": {"count": 6, "rank": 2},
		"books": {"count": 6, "rank": 2},
		"weeklyBoss": 1
	},
	{
		"cost": 450000,
		"common": {"count": 9, "rank": 2},
		"books": {"count": 12, "rank": 2},
		"weeklyBoss": 2
	},
	{
		"cost": 700000,
		"common": {"count": 12, "rank": 2},
		"books": {"count": 16, "rank": 2},
		"weeklyBoss": 2,
		"crown": 1
	}
];
const charLevelValues = [
// Values below are PER LEVEL exp required. the total would need to be calculated.
/* 1 to 30 */ 1000,1325,1700,2150,2625,3150,3725,4350,5000,5700,6450,7225,8050,8925,9825,10750,11725,12725,13775,14875,16800,18000,19250,20550,21875,23250,24650,26100,27575,29100,
/* 31 to 60 */ 30650,32250,33875,35550,37250,38975,40750,42575,44425,46300,50625,52700,54775,56900,59075,61275,63525,65800,68125,70475,76500,79050,81650,84275,86950,89650,92400,95175,98000,100875,
/* 61 to 90 */ 108950,112050,115175,118325,121525,124775,128075,131400,134775,138175,148700,152375,156075,159825,163600,167425,171300,175225,179175,183175,216225,243025,273100,306800,344600,386950,434425,487625,547200
];
const charExpPerAsc = [
	120175,578325,579100,854125,1195925,1611875,3423125
];
const charAscAtLevels = [
	20,40,50,60,70,80
];
const charExpItems = [
	20000,5000,1000 // reverse order for this to make calculations easier
];
const weapRefinementCost = [
	null,
	null,
	[500,1000,2000,4000],
	[1000,2000,4000,8000],
	[2000,4000,8000,16000]
];
const weapAscValues = [
	[
		{
			"weapon": {"count": 1, "rank": 0},
			"elite": {"count": 1, "rank": 0},
			"common": {"count": 1, "rank": 0}
		},
		{
			"cost": 5000,
			"weapon": {"count": 1, "rank": 1},
			"elite": {"count": 4, "rank": 0},
			"common": {"count": 2, "rank": 0}
		},
		{
			"cost": 5000,
			"weapon": {"count": 2, "rank": 1},
			"elite": {"count": 2, "rank": 2},
			"common": {"count": 2, "rank": 1}
		},
		{
			"cost": 10000,
			"weapon": {"count": 1, "rank": 2},
			"elite": {"count": 4, "rank": 2},
			"common": {"count": 3, "rank": 1}
		}
	],
	[
		{
			"cost": 5000,
			"weapon": {"count": 1, "rank": 0},
			"elite": {"count": 1, "rank": 0},
			"common": {"count": 1, "rank": 0}
		},
		{
			"cost": 5000,
			"weapon": {"count": 1, "rank": 1},
			"elite": {"count": 5, "rank": 0},
			"common": {"count": 4, "rank": 0}
		},
		{
			"cost": 10000,
			"weapon": {"count": 3, "rank": 1},
			"elite": {"count": 3, "rank": 2},
			"common": {"count": 3, "rank": 2}
		},
		{
			"cost": 15000,
			"weapon": {"count": 1, "rank": 2},
			"elite": {"count": 5, "rank": 2},
			"common": {"count": 4, "rank": 2}
		}
	],
	[
		{
			"cost": 5000,
			"weapon": {"count": 2, "rank": 0},
			"elite": {"count": 2, "rank": 0},
			"common": {"count": 1, "rank": 0}
		},
		{
			"cost": 10000,
			"weapon": {"count": 2, "rank": 1},
			"elite": {"count": 8, "rank": 0},
			"common": {"count": 5, "rank": 0}
		},
		{
			"cost": 15000,
			"weapon": {"count": 4, "rank": 1},
			"elite": {"count": 4, "rank": 1},
			"common": {"count": 4, "rank": 1}
		},
		{
			"cost": 20000,
			"weapon": {"count": 2, "rank": 2},
			"elite": {"count": 8, "rank": 1},
			"common": {"count": 6, "rank": 1}
		},
		{
			"cost": 25000,
			"weapon": {"count": 4, "rank": 2},
			"elite": {"count": 6, "rank": 2},
			"common": {"count": 4, "rank": 2}
		},
		{
			"cost": 30000,
			"weapon": {"count": 3, "rank": 3},
			"elite": {"count": 12, "rank": 2},
			"common": {"count": 8, "rank": 2}
		}
	],
	[
		{
			"cost": 5000,
			"weapon": {"count": 3, "rank": 0},
			"elite": {"count": 3, "rank": 0},
			"common": {"count": 2, "rank": 0}
		},
		{
			"cost": 15000,
			"weapon": {"count": 3, "rank": 1},
			"elite": {"count": 12, "rank": 0},
			"common": {"count": 8, "rank": 0}
		},
		{
			"cost": 20000,
			"weapon": {"count": 6, "rank": 1},
			"elite": {"count": 6, "rank": 1},
			"common": {"count": 6, "rank": 1}
		},
		{
			"cost": 30000,
			"weapon": {"count": 3, "rank": 2},
			"elite": {"count": 12, "rank": 1},
			"common": {"count": 9, "rank": 1}
		},
		{
			"cost": 35000,
			"weapon": {"count": 6, "rank": 2},
			"elite": {"count": 9, "rank": 2},
			"common": {"count": 6, "rank": 2}
		},
		{
			"cost": 45000,
			"weapon": {"count": 4, "rank": 3},
			"elite": {"count": 18, "rank": 2},
			"common": {"count": 12, "rank": 2}
		}
	],
	[
		{
			"cost": 10000,
			"weapon": {"count": 5, "rank": 0},
			"elite": {"count": 5, "rank": 0},
			"common": {"count": 3, "rank": 0}
		},
		{
			"cost": 20000,
			"weapon": {"count": 5, "rank": 1},
			"elite": {"count": 18, "rank": 0},
			"common": {"count": 12, "rank": 0}
		},
		{
			"cost": 30000,
			"weapon": {"count": 9, "rank": 1},
			"elite": {"count": 9, "rank": 1},
			"common": {"count": 9, "rank": 1}
		},
		{
			"cost": 45000,
			"weapon": {"count": 5, "rank": 2},
			"elite": {"count": 18, "rank": 1},
			"common": {"count": 14, "rank": 1}
		},
		{
			"cost": 55000,
			"weapon": {"count": 9, "rank": 2},
			"elite": {"count": 14, "rank": 2},
			"common": {"count": 9, "rank": 2}
		},
		{
			"cost": 65000,
			"weapon": {"count": 6, "rank": 3},
			"elite": {"count": 27, "rank": 2},
			"common": {"count": 18, "rank": 2}
		}
	]
];