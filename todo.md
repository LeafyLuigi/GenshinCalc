# Buggiewuggies

Currently broken pages:
Characters
Party

Partially broken pages:
Index

# General Stuff

All previous localStorage stuff can be ignored.

Use `document.createElement()` rather than `innerHTML`.

Avoid inline events; use addEventListener() if possible. Functions will also need to be updated to no longer use `this` when referring to the element the event is on.

All function definitions should use the following format rather than `var|const|let $name = () => {}`

```JS
?async function $name {}
```

# CSS:

## index.html

Weapon dropdown has white line on left. no idea why.

# Debug Page:

Repeat character check changes to weapons and artifacts

Make sure broken `null` things work for weapons.

e.g. "_$notYetImplementedCharacter_" has `null` as `conBonus` => Make error saying not yet implemented.

# index.html / main calc stuff / Home Page:

Rewrite.

Potentially allow for "live updating" of sorts?
- changing values under "how many items do you have" should change the item count in the following way:
	1. "you need to obtain the following" item counts should change.
	2. "you need to further obtain the following items..." should change (inc converts if required)

Potentially add "required for" icons? these will be at end under "these are the items you need", "you need to obtain the following" and "you need to further obtain the following..." sections. basically little images for all chars/weaps that needs an item with maybe a "jump to char/weap" thing on click?

Fully Implement converting somehow.

Final item count for converting does not take current items into consideration

prior to "submit", convert element lacks title. also no idea how many convert materials are needed.

Specific functions:
- test:
	- exp calculations are broken.
	- add converts (partially done)
	- no more html for weapon calcs
- getItemsRemaining:
	- make sure show converts stuff works
	- reimplement text only box

Remove all inline events.
29 instances in HTML elements.
Total of 3 instances in the following functions:

- showExistingWeapons (3)

The following functions should use new function syntax:

- showExistingWeapons
- clearExistingWeapons
- searchDropdown
- dropdownFocus
- dropdownLoseFocus
- test
- getItemsRemaining
- resetItemLists

The following functions have at least one instance of `innerHTML` and should probably not use it.

- showExistingWeapons
- test
- getItemsRemaining
- resetItemLists

The following functions use or are HTML string generators:

- showExistingWeapons
- test
- getItemsRemaining (IN COMMENTED PARTS)


# Characters Page:

Rewrite.

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
addCharBox should use LS prefs
addCharBox remove button using name not id for weaps

addCharacter needs current level inputs to use adjustStep
addCharacter and addWeapon should not use addSelectedChar

addCharacter and addWeapon should NOT use 0 as target exp

no idea yet for rest

The following functions should use new format:

- loadIDs
- loadWeaponIDs
- loadArtifactIDs
- loadCharacterIDs
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

no idea yet

## inventory.js

The following functions should use new format:

- fixInv (might want to be deleted due to completely new localStorage)
- saveInventory
- loadInventory
- clearInventory

## prefs.js

add a "setPref" function that does the reverse of getpref?


