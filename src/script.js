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
