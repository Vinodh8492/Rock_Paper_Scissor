let userscore = parseInt(localStorage.getItem("userscore")) || 0;
let computerscore = parseInt(localStorage.getItem("computerscore")) || 0;
const userscore_span = document.getElementById("user-score");
const computerscore_span = document.getElementById("computer-score");
const result_div = document.querySelector(".result");

function toggleRules() {
    const rulesImage = document.getElementById("myImage");
    if (rulesImage) {
        rulesImage.classList.toggle('hidden');
    }
}

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

function displayChoices(userChoice, computerChoice) {
    const choicesRowContainer = document.getElementById("choices-row-container");

    // Create a container for the row
    const rowContainer = document.createElement("div");
    rowContainer.classList.add("choices-row");

    // Hide all choices before displaying the selected ones
    hideAllChoices();

    // Display user choice and corresponding outer image
    displayChoiceWithOuterImage(rowContainer, userChoice);

    // Display Play Again button
    showPlayAgainButton(rowContainer);

    // Display computer choice and corresponding outer image
    displayChoiceWithOuterImage(rowContainer, computerChoice);

    // Append the row container to the main container
    choicesRowContainer.appendChild(rowContainer);
}

function hideAllChoices() {
    const choices = ['overlay-image1', 'overlay-image2', 'overlay-image3'];

    choices.forEach(choice => {
        const elementId = "img" + choice.slice(-1);
        toggleImage(choice, 'none');
        toggleImage(elementId, 'none');
    });
}

function displayChoiceWithOuterImage(container, choice) {
    const outerImageId = "img" + choice.slice(-1);

    // Create elements
    const choiceContainer = document.createElement("div");
    choiceContainer.classList.add("choice-container");

    const choiceImage = document.createElement("img");
    choiceImage.src = document.getElementById(choice).src;

    // Append elements to container
    choiceContainer.appendChild(choiceImage);
    container.appendChild(choiceContainer);
}

function checkWinAndRedirect() {
    if (userscore >= 1) {
        localStorage.setItem("userscore", userscore);
        localStorage.setItem("computerscore", computerscore);
        window.location.assign("index.html");
    }
}

function win(userChoice, computerChoice) {
    userscore++;
    result_div.innerHTML = "YOU WIN AGAINST COMPUTER";
    localStorage.setItem("userscore", userscore);
    localStorage.setItem("computerscore", computerscore);
    checkWinAndRedirect();
    updateScores();
}

function lose(userChoice, computerChoice) {
    computerscore++;
    result_div.innerHTML = "YOU LOST AGAINST COMPUTER";
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

    // Display Play Again button after replaying
    showPlayAgainButton();
}

function hideChoices() {
    const choicesContainer = document.getElementById("choices-row-container");

    if (choicesContainer) {
        choicesContainer.innerHTML = "";
    }
}

function showPlayAgainButton() {
    const playAgainButton = document.getElementById("play-again");
    if (playAgainButton) {
        playAgainButton.style.display = "block";
    }
}

function hidePlayAgainButton() {
    const playAgainButton = document.getElementById("play-again");
    if (playAgainButton) {
        playAgainButton.style.display = "none";
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

    const rulesButton = document.getElementById("showbutton");
    if (rulesButton) {
        rulesButton.addEventListener('click', function () {
            toggleRules();
        });
    }
});
