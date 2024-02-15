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
let maxCharExp = 0;
charLevelValues.forEach(num => {maxCharExp+=num});

// this uses total exp
const charAscAtExp = [
	120175,698500,1277600,2131725,3327650,4939525
];
// [char] from level 1 wasted exp should be 825, 675, 900, 875, 75, 125, 875
// [weap 3*] from level 1 wasted exp should be 125, 0, 50, 200, 375, 275, 325 [estimates]
// [weap 4*] from level 1 wasted exp should be ????
const charAscAtLevels = [
	20,40,50,60,70,80
];
const charExpItems = [
	20000,5000,1000 // reverse order for this to make calculations easier
];
const weapExpItems = [
	10000,2000,400 // reverse order for easier calcs
	// might be worth noting that 3* weapons give 1800, 2* give 1200 and 1* give 600 exp
];
const weapLevelValues = [
	[125,200,275,350,475,575,700,850,1000,1150,1300,1475,1650,1850,2050,2250,2450,2675,2925,3150,3575,3825,4100,4400,4700,5000,5300,5600,5925,6275,6600,6950,7325,7675,8050,8425,8825,9225,9625,10025,10975,11425,11875,12350,12825,13300,13775,14275,14800,15300,16625,17175,17725,18300,18875,19475,20075,20675,21300,21925,23675,24350,25025,25700,26400,27125,27825,28550,29275],
	[175,275,400,550,700,875,1050,1250,1475,1700,1950,2225,2475,2775,3050,3375,3700,4025,4375,4725,5350,5750,6175,6600,7025,7475,7950,8425,8900,9400,9900,10450,10975,11525,12075,12650,13225,13825,14425,15050,16450,17125,17825,18525,19225,19950,20675,21425,22175,22950,24925,25750,26600,27450,28325,29225,30100,31025,31950,32875,35500,36500,37525,38575,39600,40675,41750,42825,43900],
	[275,425,600,800,1025,1275,1550,1850,2175,2500,2875,3250,3650,4050,4500,4950,5400,5900,6425,6925,7850,8425,9050,9675,10325,10975,11650,12350,13050,13800,14525,15300,16100,16900,17700,18550,19400,20275,21175,22050,24150,25125,26125,27150,28200,29250,30325,31425,32550,33650,36550,37775,39000,40275,41550,42850,44150,45500,46850,48225,52075,53550,55050,56550,58100,59650,61225,62800,64400,66025,71075,72825,74575,76350,78150,80000,81850,83700,85575,87500,103275,116075,130425,146500,164550,184775,207400,232775,261200],
	[400,625,900,1200,1550,1950,2350,2800,3300,3800,4350,4925,5525,6150,6800,7500,8200,8950,9725,10500,11900,12775,13700,14650,15625,16625,17650,18700,19775,20900,22025,23200,24375,25600,26825,28100,29400,30725,32075,33425,36575,38075,39600,41150,42725,44325,45950,47600,49300,51000,55375,57225,59100,61025,62950,64925,66900,68925,70975,73050,78900,81125,83400,85700,88025,90375,92750,95150,97575,100050,107675,110325,113000,115700,118425,121200,124000,126825,129675,132575,156475,175875,197600,221975,249300,279950,314250,352700,395775],
	[600,950,1350,1800,2325,2925,3525,4200,4950,5700,6525,7400,8300,9225,10200,11250,12300,13425,14600,15750,17850,19175,20550,21975,23450,24950,26475,28050,29675,31350,33050,34800,36575,38400,40250,42150,44100,46100,48125,50150,54875,57125,59400,61725,64100,66500,68925,71400,73950,76500,83075,85850,88650,91550,94425,97400,100350,103400,106475,109575,118350,121700,125100,128550,132050,135575,139125,142725,146375,150075,161525,165500,169500,173550,177650,181800,186000,190250,194525,198875,234725,263825,296400,332975,373950,419925,471375,529050,593675]
];
const maxWeapExp = [];
for(let i in weapLevelValues) {
	var sum = 0;
	weapLevelValues[i].forEach(num => sum+=num);
	maxWeapExp.push(sum);
}
const weapAscAtExp = [
	[24325,148875,274500,460025],
	[36400,223225,411650,689950],
	[53475,327475,603825,1011975,1583600,2353725],
	[81000,496125,914850,1533250,2399300,3566175],
	[121550,744350,1372500,2300175,3599300,5349675]
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
			"elite": {"count": 2, "rank": 1},
			"common": {"count": 2, "rank": 1}
		},
		{
			"cost": 10000,
			"weapon": {"count": 1, "rank": 2},
			"elite": {"count": 4, "rank": 1},
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
			"elite": {"count": 3, "rank": 1},
			"common": {"count": 3, "rank": 2}
		},
		{
			"cost": 15000,
			"weapon": {"count": 1, "rank": 2},
			"elite": {"count": 5, "rank": 1},
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

const artifactLevelValues = [
	[600,750,875,1025],
	[1200,1500,1775,2050],
	[1800,2225,2650,3100,3550,4000,4500,5000,5525,6075,6625,7225],
	[2400,2975,3550,4125,4725,5350,6000,6675,7375,8100,8850,9625,10425,12125,14075,16300],
	[3000,3725,4425,5150,5900,6675,7500,8350,9225,10125,11050,12025,13025,15150,17600,20375,23500,27050,31050,35575]
];
const maxArtifactExp = [];
for(let i in artifactLevelValues) {
	var sum = 0;
	artifactLevelValues[i].forEach(num => sum+=num);
	maxArtifactExp.push(sum);
}

// This will output the following as an array:
// [level,overflowExp]
var getLevelFromExp = (type,exp,rarity=1) => {
	var remainder = exp;
	let shouldSkip = false;
	let iterations = 0;
	var varUsed;
	if(type == "char") {
		varUsed = charLevelValues;
	} else if(type == "weap") {
		varUsed = weapLevelValues[rarity-1];
	} else if(type == "artifact") {
		varUsed = artifactLevelValues[rarity-1];
	}
	if(varUsed == undefined) {
		throw new Error("[getLevelFromExp] Unknown type used.");
	}
	varUsed.forEach(num => {
		if(shouldSkip) {
			return;
		}
		if(remainder-num < 0) {
			shouldSkip = true;
			return;
		}
		remainder-=num;
		iterations++;
	});
	return [iterations+1, remainder];
}
var getExpFromLevel = (type,level,rarity=1) => {
	let sum = 0;
	var varUsed;
	if(type == "char") {
		varUsed = charLevelValues;
	} else if(type == "weap") {
		varUsed = weapLevelValues[rarity-1];
	} else if(type == "artifact") {
		varUsed = artifactLevelValues[rarity-1];
	}
	if(varUsed == undefined) {
		throw new Error("[getExpFromLevel] Unknown type used.");
	}
	for(let i = 0; i < level - 1; i++) {
		sum+=varUsed[i];
	};
	return sum;
}