let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");

// ✅ Create Start button for mobile
let startBtn = document.createElement("button");
startBtn.innerText = "Start Game";
startBtn.classList.add("start-btn");
document.body.insertBefore(startBtn, document.querySelector(".btn-container"));

// ✅ Start game by keypress (for desktop)
document.addEventListener("keypress", function () {
    if (!started) {
        startGame();
    }
});

// ✅ Start game by button click (for mobile)
startBtn.addEventListener("click", function () {
    if (!started) {
        startGame();
    }
});

function startGame() {
    started = true;
    level = 0;
    gameSeq = [];
    userSeq = [];
    startBtn.style.display = "none"; // hide button when game starts
    levelUp();
}

function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 200);
}

function userflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 200);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}  |  High Score: ${highScore}`;
    let randomIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randomIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameflash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        if (level > highScore) {
            highScore = level;
        }

        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br>
        High Score: <b>${highScore}</b> <br>`;

        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);

        reset();
    }
}

function btnPress() {
    let btn = this;
    userflash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;

    // ✅ Show start button again after game over
    startBtn.style.display = "inline-block";
}
