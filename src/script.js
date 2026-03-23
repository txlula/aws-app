document.querySelectorAll('input[name="mood"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    const mood = document.querySelector('input[name="mood"]:checked').value;
    const moodImage = document.getElementById("moodImage");

    if (mood === "happy") {
      moodImage.src = "images/happy face.png";
      moodImage.alt = "Happy Face";
    } else if (mood === "neutral") {
      moodImage.src = "images/neutral face.png";
      moodImage.alt = "Neutral Face";
    } else if (mood === "sad") {
      moodImage.src = "images/sad face.png";
      moodImage.alt = "Sad Face";
    }
  });
});

document.getElementById("energyLevel").addEventListener("change", function () {
  const energyLevel = document.getElementById("energyLevel").value;
  document.getElementById("energyLevelValue").textContent = energyLevel;
});


document.getElementById("submitButton").addEventListener("click", function (e) {
  e.preventDefault();

  let score = 0;
  const mood = document.querySelector('input[name="mood"]:checked').value;
  const energyLevel = document.getElementById("energyLevel").value;

  if (mood ==="happy") { 
    score += 50;
  }
  else if (mood === "neutral") {
    score += 25;
  }
  else if (mood === "sad") {
    score += 0;
  }

  score += (energyLevel / 100) * 50;

  document.getElementById("score").textContent = `Your score: ${score.toFixed(2)}`;

  if (score >= 75) {
    document.getElementById("resultsContent").textContent = "Great job! You are doing well. Appreciate the work you have done today and keep it up!";
  }
  else if (score >= 50 && score < 75) {
    document.getElementById("resultsContent").textContent = "Not bad! Keep it up. Remember to take breaks and do something you enjoy to boost your mood and energy.";
  }
  else {
    document.getElementById("resultsContent").textContent = "It seems like you're having a tough day. Consider taking a break or doing something you enjoy.";
  }

  document.getElementById("resultsDialog").showModal();
});

document.getElementById("closeDialogButton").addEventListener("click", function () {
  document.getElementById("resultsDialog").close();
});