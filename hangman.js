// Global Variables

let wordList = 
    ['event','shake','flight','giants','visitor','stream','apparatus',
    'measure','wealth','process','rainstorm','competition','woman','achiever',
    'agreement','insurance','weather','aftermath','crown','mouth','experience',
    'scissors','learning','amount','turkey','lettuce','governor','colour','birthday',
    'machine','clocks','number','sweater','cherries','leather','magic','grandmother',
    'geese','flange','bicycle','radiator','groceries','stain','pizza','microphone'];
var selectedWord, displayedWord;

// Functions

function startGame () {

    // choose a random word from the list

    let offSet = Math.floor( Math.random() * wordList.length ), targetElement;
    selectedWord = wordList[offSet].toUpperCase();

    // reset the graphic to the gallows

    let gallows = document.getElementsByClassName("hanging");
    for (let i = 0; i < gallows.length; i++) {
        gallows[i].style.display = "none";
    }
    gallows[0].style.display = "inline";

    // reset all the letter buttons to selectable

    let buttonOptions = document.getElementsByTagName("button");
    for (i = 0; i < buttonOptions.length; i++){
        buttonOptions[i].disabled = false;
    } 

    // add blank spaces for each letter of the selected word

    displayedWord = "";
    for ( i = 0; i < selectedWord.length; i++){

        displayedWord += "_";

    }

    // display the blanks for the word

    targetElement = document.getElementById("word");
    targetElement.innerText = displayedWord;

    // add a message to the user

    targetElement = document.getElementById("message");
    targetElement.innerText = "Choose a letter"
}

function pressButton (pressed) {

    // disable the letter button pressed

    let i = 0, targetElement, newDisplayWord = "", endTheGame = true, letterFound = false;
    let buttonOptions = document.getElementsByTagName("button");

    while (buttonOptions[i].innerText != pressed){
        i++;
    }

    buttonOptions[i].disabled = true;

    // reveal any matches for the letter
    
    for (i = 0; i < selectedWord.length; i++){

        if (selectedWord[i] == pressed ){
            newDisplayWord += pressed;
            letterFound = true;
        }
        else{
            newDisplayWord += displayedWord[i];
        }
    }

    displayedWord = newDisplayWord;

    targetElement = document.getElementById("word");
    targetElement.innerText = displayedWord;

    // check to see if all of the letters are revealed
    // if yes end game as a win

    for (i = 0; i < displayedWord.length; i++){

        if (displayedWord[i] == '_'){
            endTheGame = false;
        }

    }

    if (endTheGame) {

        endGame (true);
        
    }

    // if no and no characters were found then reveal the next body part

    else if (!letterFound){

        let gallows = document.getElementsByClassName("hanging");
        let i = 0;
        while (i < 6) {
            if (gallows[i].style.display == "inline"){
                gallows[i].style.display = "none";
                gallows[++i].style.display = "inline";
                if (i > 5) {
                    endTheGame = true;
                }
            }
            i++;
        }

    // check to see if the body is complete
    // if yes end game as a lose

        if (endTheGame){

            endGame(false);

        }
    }
}

function endGame (win) {

    // disable all letter buttons

    let buttonOptions = document.getElementsByTagName("button");
    for (i = 0; i < (buttonOptions.length - 1); i++){
        buttonOptions[i].disabled = true;
    } 

    // if win reset graphic

    if (win){

        let gallows = document.getElementsByClassName("hanging");
        for (let i = 0; i < gallows.length; i++) {
            gallows[i].style.display = "none";
        }
        gallows[0].style.display = "inline";

    // if win add winning message

        targetElement = document.getElementById("message");
        targetElement.innerText = "Awesome! You Won!"

    }
    else {

    // if lose reveal letters in word

    targetElement = document.getElementById("word");
    targetElement.innerText = selectedWord.toUpperCase();

    // if lose add losing message

        targetElement = document.getElementById("message");
        targetElement.innerText = "Too bad you lost."

    // if lose reveal dead person

    let gallows = document.getElementsByClassName("hanging");

    gallows[6].style.display = "none";
    gallows[7].style.display = "inline";

    }
}


