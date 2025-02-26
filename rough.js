let userscore = parseInt(localStorage.getItem("userscore")) || 0;
let computerscore = parseInt(localStorage.getItem("computerscore")) || 0;
const userscore_span = document.getElementById("user-score");
const computerscore_span = document.getElementById("computer-score");
const result_div = document.querySelector(".result");

// ... Your existing JavaScript code ...

function toggleRules() {
    const rulesImage = document.getElementById("rulesImage");

    if (rulesImage) {
        // Toggle the visibility of the rules image
        rulesImage.style.display = (rulesImage.style.display === 'none') ? 'block' : 'none';
    }
}

// ... Your existing JavaScript code ...




function updateScores() {
    userscore_span.innerHTML = userscore;
    computerscore_span.innerHTML = computerscore;
}

function getComputerChoice() {
    const choices = ['overlay-image1', 'overlay-image2', 'overlay-image3'];
    const randomnumber = Math.floor(Math.random() * 3);
    return choices[randomnumber];
}

function toggleImage(elementId, displayValue) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = displayValue;
    }
}

function applyRadialGradient(winningChoice) {
    const winningOuterImage = document.querySelector(`.choice-container.${winningChoice} img:first-child`);
    if (winningOuterImage) {
        winningOuterImage.classList.add('winning-gradient');
    }
}

function displayChoiceWithOuterImage(container, choice, position) {
    const outerImageId = "img" + choice.slice(-1);

    // Create elements
    const choiceContainer = document.createElement("div");
    choiceContainer.classList.add("choice-container");

    const outerImage = document.createElement("img");
    outerImage.src = document.getElementById(outerImageId).src;

    const choiceImage = document.createElement("img");
    choiceImage.src = document.getElementById(choice).src;

    // Append elements to container
    choiceContainer.appendChild(outerImage);
    choiceContainer.appendChild(choiceImage);

    // Apply styling based on the position
    if (position === 'left') {
        choiceContainer.classList.add('left-choice');
    } else if (position === 'right') {
        choiceContainer.classList.add('right-choice');
    }

    container.appendChild(choiceContainer);
}

function hideAllChoices() {
    const choices = ['overlay-image1', 'overlay-image2', 'overlay-image3'];

    choices.forEach(choice => {
        const elementId = "img" + choice.slice(-1);
        toggleImage(choice, 'none');
        toggleImage(elementId, 'none');
    });
}

function showPlayAgainButton() {
    const playAgainButton = document.getElementById("play-again");
    if (playAgainButton) {
        playAgainButton.style.display = "block";
    }
}

function displayChoices(userChoice, computerChoice) {
    const choicesRowContainer = document.getElementById("choices-row-container");

    // Hide all choices before displaying the selected ones
    hideAllChoices();
    

    // Create a container for the row
    const rowContainer = document.createElement("div");
    rowContainer.classList.add("choices-row");

    displayPickedStatements(rowContainer, userChoice, computerChoice);

    // Display user choice and corresponding outer image to the left
    displayChoiceWithOuterImage(rowContainer, userChoice, 'left');

    // Display Play Again button
    showPlayAgainButton();
    
    // Display computer choice and corresponding outer image to the right
    displayChoiceWithOuterImage(rowContainer, computerChoice, 'right');

    // Append the row container to the main container
    choicesRowContainer.appendChild(rowContainer);

    // Add radial gradient to the winning outer image
    const winningChoice = getWinner(userChoice, computerChoice);
    applyRadialGradient(winningChoice);
}


function displayPickedStatements(rowContainer, userChoice, computerChoice) {
    // Display "You Picked" statement above the user's outer image
    const userPickedStatement = document.createElement("div");
    userPickedStatement.classList.add("picked-statement");
    userPickedStatement.innerHTML = "You Picked";

    // Display "PC Picked" statement above the computer's outer image
    const computerPickedStatement = document.createElement("div");
    computerPickedStatement.classList.add("picked-statement");
    computerPickedStatement.innerHTML = "PC Picked";

    // Create a container for the statements and set it to flex
    const statementsContainer = document.createElement("div");
    statementsContainer.classList.add("picked-statements-container");
    statementsContainer.appendChild(userPickedStatement);
    statementsContainer.appendChild(computerPickedStatement);

    // Append the statements container to the row container
    rowContainer.appendChild(statementsContainer);
}


function showNextButton() {
    const nextButton = document.getElementById("nextButton");
    if (nextButton) {
        nextButton.style.display = "block";
    }
}
function hideNextButton() {
    const nextButton = document.getElementById("nextButton");
    if (nextButton) {
        nextButton.style.display = "none";
    }
}
function redirectToIndex() {
    // Handle the redirection logic here
    window.location.assign("index.html");
}

function win(userChoice, computerChoice) {
    userscore++;
    result_div.innerHTML = "YOU WIN <br> AGAINST PC";
    localStorage.setItem("userscore", userscore);
    localStorage.setItem("computerscore", computerscore);
    
    updateScores();
    showNextButton(); 
}

function lose(userChoice, computerChoice) {
    computerscore++;
    result_div.innerHTML = "YOU LOST <br> AGAINST PC";
    localStorage.setItem("userscore", userscore);
    localStorage.setItem("computerscore", computerscore);
    updateScores();
}

function draw(userChoice, computerChoice) {
    result_div.innerHTML = "TIE GAME";
    localStorage.setItem("userscore", userscore);
    localStorage.setItem("computerscore", computerscore);
    updateScores();
}

function game(userChoice) {
    const computerChoice = getComputerChoice();
    displayChoices(userChoice, computerChoice);
    switch (userChoice + computerChoice) {
        case "overlay-image1overlay-image2":
        case "overlay-image3overlay-image1":
        case "overlay-image2overlay-image3":
            win(userChoice, computerChoice);
            break;

        case "overlay-image1overlay-image3":
        case "overlay-image3overlay-image2":
        case "overlay-image2overlay-image1":
            lose(userChoice, computerChoice);
            break;

        case "overlay-image1overlay-image1":
        case "overlay-image3overlay-image3":
        case "overlay-image2overlay-image2":
            draw(userChoice, computerChoice);
            break;
    }
}

function replay() {
    const choices = ['overlay-image1', 'overlay-image2', 'overlay-image3'];
    choices.forEach(choice => {
        toggleImage(choice, 'flex');
        toggleImage("img" + choice.slice(-1), 'flex');
    });

    // Hide the user choice and computer choice immediately
    hideChoices();

    result_div.innerHTML = "";

    hideNextButton()

    // Display Play Again button after replaying
    hidePlayAgainButton();
}

function hideChoices() {
    const choicesContainer = document.getElementById("choices-row-container");
    if (choicesContainer) {
        choicesContainer.innerHTML = "";
    }
}

function hidePlayAgainButton() {
    const playAgainButton = document.getElementById("play-again");
    if (playAgainButton) {
        playAgainButton.style.display = "none";
    }
}

function getWinner(userChoice, computerChoice) {
    if (
        (userChoice === 'overlay-image1' && computerChoice === 'overlay-image2') ||
        (userChoice === 'overlay-image3' && computerChoice === 'overlay-image1') ||
        (userChoice === 'overlay-image2' && computerChoice === 'overlay-image3')
    ) {
        return 'left-choice';
    } else if (
        (userChoice === 'overlay-image1' && computerChoice === 'overlay-image3') ||
        (userChoice === 'overlay-image3' && computerChoice === 'overlay-image2') ||
        (userChoice === 'overlay-image2' && computerChoice === 'overlay-image1')
    ) {
        return 'right-choice';
    }
}

// Add event listener to replay() during initialization
document.getElementById("play-again").addEventListener('click', replay);

document.addEventListener('DOMContentLoaded', function () {
    updateScores();

    document.getElementById("overlay-image1").addEventListener('click', function () {
        game("overlay-image1");
    });

    document.getElementById("overlay-image3").addEventListener('click', function () {
        game("overlay-image3");
    });

    document.getElementById("overlay-image2").addEventListener('click', function () {
        game("overlay-image2");
    });

    
});
