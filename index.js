let player = null;
let score = 0;
let timeLeft = 20;
let gameInterval;
let timerInterval;

document.addEventListener("keydown", function(e) {
  if (e.code === "Space" && document.getElementById("start-screen").style.display !== "none") {
    startGame();
  }
});

function startGame() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("game").style.display = "block";

  player = document.getElementById("player");

  // Player movement
  document.addEventListener("mousemove", (e) => {
    player.style.left = e.clientX - 20 + "px";
    player.style.top = e.clientY - 20 + "px";
  });

  // Spawn fragments + shadows
  gameInterval = setInterval(spawnObjects, 800);

  // Timer
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = "Time: " + timeLeft;

    if (timeLeft <= 0) endGame(false);
  }, 1000);
}

function spawnObjects() {
  const game = document.getElementById("game");

  // Fragment
  const frag = document.createElement("div");
  frag.classList.add("fragment");
  frag.style.left = Math.random() * window.innerWidth + "px";
  frag.style.top = Math.random() * window.innerHeight + "px";
  game.appendChild(frag);

  // Shadow
  const shadow = document.createElement("div");
  shadow.classList.add("shadow");
  shadow.style.left = Math.random() * window.innerWidth + "px";
  shadow.style.top = Math.random() * window.innerHeight + "px";
  game.appendChild(shadow);

  // Collision check
  const check = setInterval(() => {
    if (!frag || !shadow) return;

    if (isColliding(player, frag)) {
      score++;
      document.getElementById("score").textContent = "Fragments: " + score;
      frag.remove();
      clearInterval(check);
    }

    if (isColliding(player, shadow)) {
      endGame(false);
      clearInterval(check);
    }
  }, 50);

  // Remove after time
  setTimeout(() => {
    frag.remove();
    shadow.remove();
  }, 3000);
}

function isColliding(a, b) {
  const rect1 = a.getBoundingClientRect();
  const rect2 = b.getBoundingClientRect();

  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

function endGame(win) {
  clearInterval(gameInterval);
  clearInterval(timerInterval);

  document.getElementById("game").style.display = "none";
  document.getElementById("end-screen").style.display = "block";

  if (win || score >= 10) {
    document.getElementById("end-title").textContent = "You Escaped the Dream!";
    document.getElementById("end-message").textContent = "You collected enough fragments to wake up.";
  } else {
    document.getElementById("end-title").textContent = "The Nightmare Caught You";
    document.getElementById("end-message").textContent = "You didn’t collect enough fragments in time.";
  }
}

