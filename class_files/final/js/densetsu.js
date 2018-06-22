if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}



// service worker data

//Card Class

function card(cardSuit, cardValue, cardPercent, cardEffect){
	this.cardSuit = cardSuit;
	this.cardValue = cardValue;
	this.cardPercent = cardPercent;
	this.cardEffect = cardEffect;

}



//card class end

//deck notes: need a count

//creature class
function creature(curHP, maxHP,curSP, maxSP, exp, maxEXP, statStr, statDex, statCon, statInt, level){
	this.curHP = curHP;
	this.maxHP = maxHP;
	this.curSP = curSP;
	this.maxSP = maxSP;
	this.exp = exp;
	this.maxEXP = maxEXP;
	this.statStr = statStr;
	this.statDex = statDex;
	this.statCon = statCon;
	this.statInt = statInt;
	this.level = level;
}//Creature class end


// Global Variables
// Player Variables
var playerChar;
var playerHand = [];
var playerTempDeck = [];
var playerDeck =[];
var intPlayerAttack;
var blnPlayerDefend;
var blnPlayerStrike;
var clickedCard;
var eventCount = 0;
// Monster Variables
var monChar;
var monEffects = [];
var logarea = document.getElementById('gamelog');

function createDeck(){
	for (var i = 0; i < 30; i++){//Loop that generates the deck
		var suitInt = Math.floor((Math.random() * 4)); //picks 0 through 3
		var effectInt = Math.floor((Math.random() * 10)); //picks 0 through 9
		var suitList = ["Strength", "Dexterity", "Constitution", "Intelligence"];
		var effectlist = ["Drain", "Poison", "Stun", "Sleep", "Weaken", "Stupify", "Slow", "Cripple","Heal", "Energize"];
		var newCard = new card(suitList[suitInt], Math.floor((Math.random() * 15) + 1),Math.floor((Math.random() * 100) + 1), effectlist[effectInt] );
		playerDeck.push(newCard);
	}
}



//write the combat function

var playerChar = new creature(100, 100, 50, 50, 0, 1, 1, 1, 1, 1, 1);
//clear and generate playerdeck here.
//clear playerhand here.

function comEvent(){// start a monster battle.
	monChar = new creature(50 + (playerChar.level*2) , 50 + (playerChar.level*2), 10, 10, 0, 1, 1, 1, 1, 1, 1);
	monEffects = [];

	
	switch (Math.floor((Math.random() * 5))){
		case 0:
			logarea.value += "Incoming deadly goblin!" + '\n';
			logarea.scrollTop = logarea.scrollHeight;
			document.getElementById("monChar").src = "./images/mongob.png";
			break;
		case 1:
			logarea.value += "Alert! A mystic orc approaches" + '\n';
			logarea.scrollTop = logarea.scrollHeight;
			document.getElementById("monChar").src = "./images/monorc.png";
			break;
		case 2:
			logarea.value += "Watch out! A scorpion is here!" + '\n';
			logarea.scrollTop = logarea.scrollHeight;
			document.getElementById("monChar").src = "./images/monscorp.png";
			break;
		case 3:
			logarea.value += "The dead have arisen, a skeleton attacks!" + '\n';
			logarea.scrollTop = logarea.scrollHeight;
			document.getElementById("monChar").src = "./images/monskel.png";
			break;
		case 4:
			logarea.value += "Usually comes in swarms.. but a lone zombie attacks." + '\n';
			logarea.scrollTop = logarea.scrollHeight;
			document.getElementById("monChar").src = "./images/monzomb.png";
	}
			
					
	eventCount += 1;
	document.getElementById("battles").innerHTML = eventCount;
	//start combatphase
	playerTempDeck = playerDeck.slice(); //loads the deck
	//put playerDeckArray into a temp playerdeck array
	loadHand();//loads the hand
	//loadHand
	
	
}

function adjustBars(){// Adjust Stamina Bars. Call after all stamina effecting functions
	var elem = document.getElementById("hpbarvalue");
	elem.style.width = playerChar.curHP / playerChar.maxHP + '%';
	document.getElementById("curhp").innerHTML = playerChar.curHP;
	document.getElementById("maxhp").innerHTML = playerChar.maxHP;
	
	var elem2 = document.getElementById("spbarvalue");
	elem2.style.width = playerChar.curSP / playerChar.maxSP + '%';
	document.getElementById("cursp").innerHTML = playerChar.curSP;
	document.getElementById("maxsp").innerHTML = playerChar.maxSP;
	
	document.getElementById("strnum").innerHTML = playerChar.statStr;
	document.getElementById("dexnum").innerHTML = playerChar.statDex;
	document.getElementById("connum").innerHTML = playerChar.statCon;
	document.getElementById("intnum").innerHTML = playerChar.statInt;
}

function monAttack(){// Monster Attack Phasse
  var index;
	var intMonAtk;
	intMonAtk = Math.floor((Math.random() * 15) + 1) + playerChar.level;
	// > -1 if these effects don't work
	if (monEffects.indexOf("Stun") >- 1){
		//Get index of Stun in the list
		index = monEffects.indexOf("Stun");
		if (index > -1) {
			monEffects.splice(index, 1);
		}
		logarea.value += "You stunned the monster!" + '\n';
			logarea.scrollTop = logarea.scrollHeight;
		//skip damage phase
		logarea.value += "The monster was stunned!" + '\n';
		logarea.scrollTop = logarea.scrollHeight;
	} else if (monEffects.indexOf("Sleep") >- 1) {
		var intMonSleep = (Math.floor((Math.random() * 100) + 1));
		if (intMonSleep <= 50) { //Monster must score over 50% to awaken
			index = monEffects.indexOf("Sleep");
			if (index > -1) {
				monEffects.splice(index, 1);
				logarea.value += "The monster has awoken from its slumber" + '\n';
				logarea.scrollTop = logarea.scrollHeight;
			} else { //end slep removal
			logarea.value += "The monster still sleeps!" + '\n';
			logarea.scrollTop = logarea.scrollHeight;
			}// end else
		}
	} else { //monster actually attacks
		if (blnPlayerDefend === true) {
			//deal half damage if defending
			playerChar.curHP -= Math.ceil(intMonAtk/2);
			blnPlayerDefend = false;
			logarea.value += "You put your guard up! The monster deals " + Math.ceil(intMonAtk/2) + " damage to you" + '\n';
			logarea.scrollTop = logarea.scrollHeight;
		} else {
			//deal full damage
			playerChar.curHP -= intMonAtk;
		}	
	}// end monster attack phase
	
	adjustBars();

}

function playerAttack() {// player attack phase
	var intDrain;
	if (clickedCard.newEffect == "Heal"){ //Check for healing card
		playerChar.curHP += intPlayerAttack * 4;
		if (playerChar.curHP > playerChar.maxHP){ //This check prevents the HP from overflowing
			playerChar.curHP = playerChar.maxHP;
		}
			
		logarea.value += "You healed for " + intPlayerAttack*4 + " HP." + '\n';
		logarea.scrollTop = logarea.scrollHeight;
	
	} else if (clickedCard.newEffect == "Energize"){ //Check for healing card
		playerChar.curSP += intPlayerAttack * 2;
		if (playerChar.curSP > playerChar.maxSP){ //This check prevents the HP from overflowing
				playerChar.curSP = playerChar.maxSP;
			}
		logarea.value += "You energize for " + intPlayerAttack*2 + " SP." + '\n';
		logarea.scrollTop = logarea.scrollHeight;
	} else { //Start Player Attack
		if (blnPlayerStrike === true) {
			monChar.curHP -= (intPlayerAttack*2);
			intDrain = (intPlayerAttack*2); 
			logarea.value += "You use a powerful swing, and deal " + intPlayerAttack*2 + " damage to the monster." + '\n';
			logarea.scrollTop = logarea.scrollHeight;
			blnPlayerStrike = false;
			document.getElementById("powerstrike").disable = false;
		} else {
		monChar.curHP -= intPlayerAttack;
		intDrain = intPlayerAttack; 
		logarea.value += "You deal " + intPlayerAttack + " damage to the monster." + '\n';
		logarea.scrollTop = logarea.scrollHeight;
		}
	} 
	
	// End Damage phasse
	// Start Status Phase
	
	var intPATKPer = Math.floor((Math.random() * 100) + 1);
	if (intPATKPer >= clickedCard.cPercent) {
		if (monEffects.indexOf(clickedCard.cEffect) > -1) {
			//If it is in the array, do nothing
		} else {
			//Add to the list
			monEffects.push(clickedCard.cEffect);
		}
	}
	
	if (clickedCard.newEffect == "Drain"){
		playerChar.curHP += intDrain;
			if (playerChar.curHP > playerChar.maxHP){ //This check prevents the HP from overflowing
				playerChar.curHP = playerChar.maxHP;
			}
		logarea.value += "Your attack drains " + intPlayerAttack*2 + " damage from the monster." + '\n';
		logarea.scrollTop = logarea.scrollHeight;
		
	} else if (monEffects.indexOf("Poison") >- 1) {
		monChar.curHP -= Math.ceil(monChar.maxHP*0.1);
		logarea.value += "The monster isn't looking too good, it takes " + Math.ceil(monChar.maxHP*0.1) + " damage." + '\n';
		logarea.scrollTop = logarea.scrollHeight;
	}
	
	// End Status Phase
	
	deleteCard(clickedCard.num);
	if (monChar.curHP <= 0) {
		gainExp();
		comEvent();
	} else{
	monAttack();
	}
}

function drawCard() {// As you might have guessed, this draws a card
	if ((playerTempDeck.length === 0) === false) { //Empty Deck Check
		var card;
		var randomCardNum = Math.floor((Math.random() * (playerTempDeck.length+1)));
		if (playerHand.length < 5) { //If the card hand is 4 and below;
			playerHand.push(playerTempDeck[randomCardNum]); //Pull randomly from the deck, push it into hand.
			playerTempDeck.splice(randomCardNum, 1); //Destroy a card at this index.
			var cardLoc = playerHand.length-1;
			if (cardLoc.cardSuit == "Strength"){
				document.getElementById('card' + cardLoc).src = "./images/cardstr.png"
				document.getElementById("cValue" + cardLoc).innerHTML = playerHand[cardLoc].cardValue;
				document.getElementById("cPercent" + cardLoc).innerHTML = playerHand[cardLoc].cardPercent;
				document.getElementById("cEffect" + cardLoc).innerHTML = playerHand[cardLoc].cardEffect;
			}else if (playerHand[cardLoc].cardSuit == "Dexterity"){
				document.getElementById("card" + cardLoc).src = "./images/carddex.png"
				document.getElementById("cValue" + cardLoc).innerHTML = playerHand[cardLoc].cardValue;
				document.getElementById("cPercent" + cardLoc).innerHTML = playerHand[cardLoc].cardPercent;
				document.getElementById("cEffect" + cardLoc).innerHTML = playerHand[cardLoc].cardEffect;	
			}else if (playerHand[cardLoc].cardSuit == "Constitution"){
				document.getElementById("card" + cardLoc).src = "./images/cardcon.png"
				document.getElementById("cValue" + cardLoc).innerHTML = playerHand[cardLoc].cardValue;
				document.getElementById("cPercent" + cardLoc).innerHTML = playerHand[cardLoc].cardPercent;
				document.getElementById("cEffect" + cardLoc).innerHTML = playerHand[cardLoc].cardEffect;
			}else if (playerHand[cardLoc].cardSuit == "Intelligence"){
				document.getElementById("card" + cardLoc).src = "./images/cardint.png"
				document.getElementById("cValue" + cardLoc).innerHTML = playerHand[cardLoc].cardValue;
				document.getElementById("cPercent" + cardLoc).innerHTML = playerHand[cardLoc].cardPercent;
				document.getElementById("cEffect" + cardLoc).innerHTML = playerHand[cardLoc].cardEffect;
			}
		} else{
			//destroy a card
			playerTempDeck.splice(randomCardNum, 1);
			logarea.value += "You're at capacity for hand size! The card you've drawn is lost!" + '\n';
			logarea.scrollTop = logarea.scrollHeight;
		}	
	} else {
		logarea.value += "You're out of cards in your deck!" + '\n';
		logarea.scrollTop = logarea.scrollHeight;
	} // end empty deck check

	

}

function loadHand() {// Load the player's hand with cards
	playerHand = [];
	for(var i = 0; i<5; i++){
		drawCard();
		console.log("Card Drawn")
		}}

function loadGame() {// Loads the game data, can be used to reset the game.
  //use onLoad, and on game overs
	playerDeck = []; //clear playerdeck
	playerTempDeck = [];
	playerHand = [];
	createDeck();
	//for loop for generating cards goes here. Use Array.push
	//Check if I actually made the playerTempDeck var global or not
	playerChar = new creature(100, 100, 50, 50, 0, 1, 1, 1, 1, 1, 1); //reset player
	adjustBars();
	comEvent();
	console.log("Game loaded");
}

function deleteCard(i) {//deletes card at parameter index, then moves all the cards over
	var card;
  if (playerHand.length > 0){
		
		playerHand.splice(i, 1); //remove at index, check for playerHand with all lowercase
		for (var x = 0; x < playerHand.length-1; x++) { //for each in playerhand
		switch (playerHand[x].cardSuit) {
      case "Strength":
				//set image
				document.getElementById('card' + x).src = "./images/cardstr.png"
				document.getElementById("cValue" + x).innerHTML = playerHand[x].cardValue;
				document.getElementById("cPercent" + x).innerHTML = playerHand[x].cardPercent;
				document.getElementById("cEffect" + x).innerHTML = playerHand[x].cardEffect;
				break;
				
      case "Dexterity":
				//set image
				document.getElementById('card' + x).src = "./images/carddex.png"
				document.getElementById("cValue" + x).innerHTML = playerHand[x].cardValue;
				document.getElementById("cPercent" + x).innerHTML = playerHand[x].cardPercent;
				document.getElementById("cEffect" + x).innerHTML = playerHand[x].cardEffect;
				break;
				
      case "Constitution":
				document.getElementById('card' + x).src = "./images/cardcon.png"
				document.getElementById("cValue" + x).innerHTML = playerHand[x].cardValue;
				document.getElementById("cPercent" + x).innerHTML = playerHand[x].cardPercent;
				document.getElementById("cEffect" + x).innerHTML = playerHand[x].cardEffect;
				break;
				
      case "Intelligence":
				//set image
				document.getElementById('card' + x).src = "./images/cardint.png"
				document.getElementById("cValue" + x).innerHTML = playerHand[x].cardValue;
				document.getElementById("cPercent" + x).innerHTML = playerHand[x].cardPercent;
				document.getElementById("cEffect" + x).innerHTML = playerHand[x].cardEffect;
				break;
			} //end switch	
		} // end of slot checcking loop
		//hides and removes the rest of the cards.
		for (var q = playerHand.length; q < 5; q++){
			document.getElementById('card' + x).src = ""
		}
	}
}


function getClicked(i) { //gets data for the card that is clicked
	clickedCard = {cSuit:playerHand[i].cardSuit, cValue:playerHand[i].cardValue, cPercent:playerHand[i].CardPercent, cEffect:playerHand.cardEffect, cNum:i };
	
	switch (clickedCard.cSuit){
		case "Strength" :
			intPlayerAttack = clickedCard.cValue + playerChar.statStr;
			break;
		case "Dexterity" :
			intPlayerAttack = clickedCard.cValue + playerChar.statDex;
			break;
		case "Constitution":
			intPlayerAttack = clickedCard.cValue + playerChar.statCon;
			break;
		case "Intelligence":
			intPlayerAttack = clickedCard.cValue + playerChar.statInt;
	}
}

function openLevelModal(){ // get data from the modal for the player level.
	var modal = document.getElementById('levelModal');
	modal.style.display = "block";
}

function strUP(){
	playerChar.statStr += 3;
	var modal = document.getElementById('levelModal');
	modal.style.display = "none";
	}
function dexUP(){
	playerChar.statDex += 3;
	var modal = document.getElementById('levelModal');
	modal.style.display = "none";
	}
function conUP(){
	playerChar.statCon += 3;
	var modal = document.getElementById('levelModal');
	modal.style.display = "none";
	}
function intUP(){
	playerChar.statInt += 3;
	var modal = document.getElementById('levelModal');
	modal.style.display = "none";
	}	

function gainExp(){ //incomplete need to write the modal
	playerChar.exp += 1;
	if ((playerChar.exp / playerChar.maxEXP) === 1) {
		openLevelModal() ;
		adjustBars();
	}
}

function defend(){ // Player Defend function
	drawCard();
	logarea.value += "You ready your shield, and prepare your next attack." + '\n';
	logarea.scrollTop = logarea.scrollHeight;
	blnPlayerDefend = true;
	monAttack();
}

function charpower() { // Player Poweer
	if (playerChar.curSP >= 10){
		document.getElementById("powerStrike").disable = true;
		blnPlayerStrike = true;
		playerChar.curSP -= 10;
		adjustBars();
		logarea.value += "You channel energy into your weapon for the next attack, it will deal double damage." + '\n';
		logarea.scrollTop = logarea.scrollHeight;
	} else {
		logarea.value += "Not enough stamina points." + '\n';
		logarea.scrollTop = logarea.scrollHeight;
	}
}

function clickCard0 (){
	getClicked(0);
  playerAttack();
}

function clickCard1 (){
	getClicked(1);
  playerAttack();
}

function clickCard2 (){
	getClicked(2);
  playerAttack();
}

function clickCard3 (){
	getClicked(3);
  playerAttack();
}

function clickCard4 (){
	getClicked(4);
  playerAttack();
}
window.onload = function () { loadGame() }
console.log("This is for breakpointg")

