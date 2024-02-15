# Buggiewuggies

Currently broken pages:
Party

Partially broken pages:
Index
Characters and Equipment (formerly "Characters")

# Add missing stuff:

???

# General Stuff

Make classes for characters, weapons, artifacts, parties, set, selectedCharacters (S). they'll need:
	- to work somehow
	- [s] add weapon/artifact to set (makes new if id not found)
	- [c] create new, delete, reorder sets functions
		note: delete needs to update party's change active set if any party contains the char and uses that set
	- [c] change active set (does not effect parties)
	- [cw] update target stat(s)
	- [cwa] update stat(s)
	- [c-TravOnly] update element's stats/targets (calls above probably)
	- [wa] update usedIn (called from set)
	- [p] change character's active set for party
	- [p] add, remove, reorder characters
	- [pc] update note
	- [psc] update name
		note: char will only have this if they can be renamed
	- [S] add, remove character/weapon (extra traveler types need exception!!!)
	
	if all weapons and artifacts are only classes by type rather than individual items:
	- [wa] create new, delete weapon/artifact

check if possible to make a class for item element with input stuff then add both adjustStep and auto item saving to it

Make site usable without using mouse (ie keyboard nav):
	index:
		- on select of char/weap in dropdown, automatically move focus to "add char/weap" button
		- within dropdown, typing should search
		- allow item sources to be shown via tab on space/enter (scripts.js)
	
	inv:
		- allow sources to be shown via tab on space/enter

Time checker with server selector for "You can get these today" stuff -- might want to add a "refresh" button for timing?

Go back over once pages are more complete and add in aria stuff

One day make it easy to have translation strings.

Avoid usage of `==` in favour of `===`.

All previous localStorage stuff can be ignored.

Use `document.createElement()` rather than `innerHTML`.

Avoid inline events; use addEventListener() if possible. Functions will also need to be updated to no longer use `this` when referring to the element the event is on.

All function definitions should use the following format rather than `var|const|let $name = () => {}`

```JS
?async function $name {}
```

If ever I decide to have account creation and storing of the data for a server, all of these: `<button>, <form>, <fieldset>, <iframe>, <input>, <object>, <output>, <select>, <textarea>, <map>, <meta>, <param>` need to have a name attribute attached to them upon submitting of whatever form

# CSS:

## index.html

fixed: Weapon dropdown has white line on left. no idea why.

# Debug Page:

Repeat character check changes to weapons and artifacts

Make sure broken `null` things work for weapons.

e.g. "_$notYetImplementedCharacter_" has `null` as `conBonus` => Make error saying not yet implemented.

# index.html / main calc stuff / Home Page:

Rewrite.

Add delete button for weapons with confirm -- needs event

empty weapons and characters should be added to weapInfoIndex/charInfoIndex but removed upon "remove" button if nothing was filled out (ie only ID existed for weaps, empty object for character)

changing current stats should update charInfoIndex/weapInfoIndex

Potentially allow for "live updating" of sorts?
- changing values under "how many items do you have" should change the item count in the following way:
	1. "you need to obtain the following" item counts should change.
	2. "you need to further obtain the following items..." should change (inc converts if required)

Potentially add "required for" icons? these will be at end under "these are the items you need", "you need to obtain the following" and "you need to further obtain the following..." sections. basically little images for all chars/weaps that needs an item with maybe a "jump to char/weap" thing on click?

Fully Implement converting somehow.

Final item count for converting does not take current items into consideration

prior to "submit", convert element lacks title. also no idea how many convert materials are needed.

target exp not saved for chars (likely not weapons either)

Specific functions:
- showExistingWeapons:
	- none
- test:
	- exp icon should be replaced with "Character EXP" or "Weapon EXP" for final count
	- exp calculations are broken; esp for weapons -- level/exp remainder
		CHAR: (appears to work)
			testing at 1/0 => 90/0 works fine (expected and got 825, 675, 900, 875, 75, 125, 875 wasted)
			testing at 1/0 => 80/0 works fine as well (expected and got above minus last 875)
			testing at 1/175 => 20/0 works fine (expected and got 0 exp wasted)
		WEAP: (appears to work)
			RARITY 1:
				testing at 1/0 => 70/0 works fine (75, 250, 375, 75, 150 wasted)
				testing at 1/0 => 60/0 works fine (same as above sans 150)
				testing at 1/0 => 20/0 works fine
				testing at 3/0 => 20/0 works fine
			RARITY 2:
				testing at 1/0 => 70/0 gives (0,375,375,100,275)

	- add converts (partially done)
- getItemsRemaining:
	- make sure show converts stuff works

The following functions have at least one instance of `innerHTML` and should probably not use it.

- clearExistingWeapons
- getItemsRemaining
- resetItemLists

The following functions use or are HTML string generators:

- toggleConverts (commented function)


# Characters Page:

Fix up functions

Allow Traveler's "byElement" stuff to be removed (charWeapHandling saveCharacter)

Have shortcut to jump to whoever

potentially change "hideInfo" to be a `<details></details>` element?

add exp remainder number to char box; also change size to 8

add display stuff for artifacts and weapons in addItemToCharSet
add events for addItemToCharSet items (delete w/ confirm, weapons [addItemToCharSet], artis [addItemToCharSet], renaming [renameSet], changing [changeDisplayedSet], editing weap/arti [editEquipmentItem])
add reorderSets function that won't work if set count is 0 or 1
make changeDisplayedSet functional (used with dropdown on change)
make equipmentModule functional

move equipmentPopupContainer to somewhere that can easily be placed over edit button without opacity being 0

Functions:
	!!! ALWAYS INCLUDE ($weapon|$arti).usedIn{$char:[$setID]} !!!
	equipmentModule:
		- add "delete set" button (and functionality)
		- potentially make "makeEquipIcon" function for blank items?
	makeEquipIcon:
		- not sure at present
	changeDisplayedSet:
		- allows for adding of new sets to take priority (setID === "")
		- allows for reordering to take priority (setID === "undefined")
			- i still don't know how this should work
		- changes images and data-* stuff
	editEquipmentItem:
		- buttons currently do not get added!!!
		- allow editing of equipment stats; updates stuff on fly and saves
			- both arti and weap use popupMakeInputElems
			- stats currently do not get updated on the fly -- add this to popupMakeInputElems.
		- make the "extraItemsContainer" stuff prettier
		- allow removal from set (with optional replace with new/existing item)
		- allow outright delete (calls different function, needs confirm)
		- allow adding for unset items: (itemID === null)
			- events need to be added for weapons and artifacts
		- "check if other items exist" stuff for weapons should include if the item is used by other characters; buttons also need events
		- swapping weapon should also include option to change weapon entirely (ie swap from Hunter's Bow to (new) Amos' Bow)
	checkItems:
		- check if items already exist within category (ie Amos Bow weapons or a circlet of Lucky Dog)
			- yes: display a list and allow selection of any with add/cancel buttons
			- no + weap: call addItemToCharSet directly
			- no + arti: change content to stat stuff before adding
	popupMakeInputElems:
		- events need to be added for the following elements
			- itemLevel
			- itemLevelRem
			- (updating itemExpBar)
			- itemRefinement
			- itemMainStat
			- itemSubstat (all)
		- phase out artiMakeInputElems and weapMakeInputElems for this!!!
		- same stuff as those yeah
		(from old artiMakeInputElems)
		- functionality; also add events for rarityContainer to work and update stuff yk
		- add event for mainStatDropdown / substatDropdown(s) to remove existing options from list (and the blank from mainStatDropdown)
		- make sure existing artis work with it
		- level input and rem input need "updateBar" event chain equiv maybe?
		(from old weapMakeInputElems)
		- similar thing to artiMakeInputElems but for weapons
		- basically just editing level, exp remainder, ascension and refinement (if permitted)
		- will not include options to remove weapon (either swap or remove outright) nor delete -- these will be in editEquipmentItem
	addItemButtons:
		- events for buttons in question; swap/add combo, remove from set, delete w "u sure?"
		- swap/add combo button should prioritise existing items of same kind (ie multiple Hunter's Bow before showing other bow types)
		- functionality
	artiUpdateInputsR:
		- functionality
	artiUpdateStatOptions:
		- functionality
	popupGoToSwapList:
		- functionality
	addItemToCharSet:
		weapons:
			- changing displayed weapon in set
		artifacts:
			- changing displayed artifact in set
			- alters usedIn information
			- saving the data
	updateEquipmentItemVisuals:
		- works when adding things
	createPopup:
		- remove popupElem.classList.remove("rendering") line
		- allow scrolling again if closed
	finishPopup:
		- make sure popup gets placed roughly at where edit button is with popup being placed similar to tooltips on discord
	goBackPopup:
		- maybe change part of function to cycle between visible popupContent children?

# Inventory Page:

Remove inline events from HTML elements:

- input id `toggleExtraIcons` uses onchange
- button id `clearinvbutton` uses onclick

Avoid `this` usage for the following functions:

- saveItem (from newItem)
- newItem (uses `this` for saveItem, adjustStep and toggleClass)

# Party Page:

Rewrite.

# scripts.js

<details>
<summary>If the function isn't being deleted, the following functions need to be updated to the new proper format:</summary>

- val
- setVal
- adjustStep
- spaceToUnderscore
- underscoreToSpace
- removeQuotes
- parseHTMLSafe
- parseHTMLUnsafe
- pickChar
- pickWeapon
- addItem
- removeItem
- removeEmptyItems
- mergeItems
- orderItems
</details>


The following functions are HTML generators:

- makeImg (ONLY IF useHTML is set to true. this should NEVER be the case going forward.)

# ascdb.js

no idea yet; maybe make this a JSON file?

# scripts/

## charWeapHandling.js

removing initial trav should put level/exp stuff back into charbox

addCharBox needs to fix up target exp bar, NaN% lol + not work
addCharBox also needs to make sure weapons work with it, add refinements
addCharBox should use LS prefs -- seems to work?
addCharBox remove button using name not id for weaps

addCharacter needs current level inputs to use adjustStep
addCharacter and addWeapon should not use addSelectedChar

addCharacter and addWeapon should NOT use 0 as target exp

target exp for updateExp throws error

change updateExp, updateBar, saveExp to allow "different" ids to be used or something idfk

no idea yet for rest

The following functions should use new format:

- addSelectedChar
- editSelectedChar
- getSelectedChars
- removeSelectedChar
- createID
- removeID
- getID
- addWeapon
- forceValue
- saveCharacter
- updateExp
- updateBar
- saveExp
- saveTalents

The following functions should no longer use "html":
- removeID (sets outerHTML to empty string); 3 normal uses with 1 in comment
- addWeapon (string extender. contains a variable called html. sets innerHTML to said var.)

## cookieLocalStorage.js

potentially remove cookie stuff and rename file to "localStorage.js"?

The following functions should use new format:

- setLSItem
- updateLSItem
- getLSItem
- clearLSItem
- parseLSItem
- clearLS

## inventory.js

idk

## prefs.js

add a "setPref" function that does the reverse of getpref?


