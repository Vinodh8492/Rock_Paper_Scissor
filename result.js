// result.js
document.addEventListener("DOMContentLoaded", function () {
    // Retrieve scores from local storage
    const storedUserScore = localStorage.getItem("userscore");
    const storedComputerScore = localStorage.getItem("computerscore");
  
    // Update scores on the original page
    const userScoreElement = document.getElementById("user-score");
    const computerScoreElement = document.getElementById("computer-score");
  
    if (storedUserScore !== null) {
      userScoreElement.textContent = storedUserScore;
    }
  
    if (storedComputerScore !== null) {
      computerScoreElement.textContent = storedComputerScore;
    }
  });
  

  function goToIndexPage() {
    window.location.assign("rough.html");
}

function toggleRules() {
  const rulesImage = document.getElementById("rulesImage");

  if (rulesImage) {
      // Toggle the visibility of the rules image
      rulesImage.style.display = (rulesImage.style.display === 'none') ? 'block' : 'none';
  }
}