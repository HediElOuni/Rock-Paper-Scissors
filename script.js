const header = document.querySelector("header");
const score = document.querySelector(".score");
const main = document.querySelector("main");
const main1  = document.getElementById("main-1");
const main2  = document.getElementById("main-2");
const moves = document.querySelectorAll(".move");
const paper = document.querySelector(".paper");
const scissors = document.querySelector(".scissors");
const rock = document.querySelector(".rock");
const pick = document.querySelectorAll(".pick");
const user = document.querySelector(".user");
const house = document.querySelector(".house");
const plcHldrCrcl = document.querySelector('.plc-hldr-crcl');
const resultCont  = document.querySelector(".result-cont");
const result = document.querySelector(".result");
const restart = document.querySelector(".restart");
const footer =  document.querySelector('footer');
const rules = document.querySelector(".rules-display");
const rlsClrBtn = document.querySelector(".rd-1 button");
const rlsBtn = document.querySelector(".rules");
let scoreValue = localStorage.getItem('score') || 0;
let userChoice;
let computerChoice;

function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

function displayPicks(user, computer) {
    if (window.innerWidth >= 768) {
        let userPickInit = document.querySelector(`.${user}`);
        let computerPickInit = document.querySelector(`.${computer}`);

        let userPick = userPickInit.cloneNode(true);
        let computerPick = computerPickInit.cloneNode(true);

        let originalGradientIdUser = userPickInit.querySelector('linearGradient').getAttribute('id');
        let clonedGradientIdUser = originalGradientIdUser + '-cloned';
        userPick.querySelector('linearGradient').setAttribute('id', clonedGradientIdUser);
        userPick.getElementsByTagName('ellipse')[1].setAttribute('fill', 'url(#' + clonedGradientIdUser + ')');

        let originalGradientIdComp = computerPickInit.querySelector('linearGradient').getAttribute('id');
        let clonedGradientIdComp = originalGradientIdComp + '-cloned';
        computerPick.querySelector('linearGradient').setAttribute('id', clonedGradientIdComp);
        computerPick.getElementsByTagName('ellipse')[1].setAttribute('fill', 'url(#' + clonedGradientIdComp + ')');

        userPick.getElementsByTagName('ellipse')[0].setAttribute('cx', '150');
        userPick.getElementsByTagName('ellipse')[0].setAttribute('cy', '150');
        userPick.getElementsByTagName('ellipse')[0].setAttribute('rx', '150');
        userPick.getElementsByTagName('ellipse')[0].setAttribute('ry', '150');

        userPick.getElementsByTagName('ellipse')[1].setAttribute('cx', '150');
        userPick.getElementsByTagName('ellipse')[1].setAttribute('cy', '144');
        userPick.getElementsByTagName('ellipse')[1].setAttribute('rx', '150');
        userPick.getElementsByTagName('ellipse')[1].setAttribute('ry', '144');

        userPick.getElementsByTagName('ellipse')[2].setAttribute('cx', '150');
        userPick.getElementsByTagName('ellipse')[2].setAttribute('cy', '150');
        userPick.getElementsByTagName('ellipse')[2].setAttribute('rx', '114');
        userPick.getElementsByTagName('ellipse')[2].setAttribute('ry', '114');

        userPick.getElementsByTagName('ellipse')[3].setAttribute('cx', '150');
        userPick.getElementsByTagName('ellipse')[3].setAttribute('cy', '156');
        userPick.getElementsByTagName('ellipse')[3].setAttribute('rx', '114');
        userPick.getElementsByTagName('ellipse')[3].setAttribute('ry', '108');

        computerPick.getElementsByTagName('ellipse')[0].setAttribute('cx', '150');
        computerPick.getElementsByTagName('ellipse')[0].setAttribute('cy', '150');
        computerPick.getElementsByTagName('ellipse')[0].setAttribute('rx', '150');
        computerPick.getElementsByTagName('ellipse')[0].setAttribute('ry', '150');

        computerPick.getElementsByTagName('ellipse')[1].setAttribute('cx', '150');
        computerPick.getElementsByTagName('ellipse')[1].setAttribute('cy', '144');
        computerPick.getElementsByTagName('ellipse')[1].setAttribute('rx', '150');
        computerPick.getElementsByTagName('ellipse')[1].setAttribute('ry', '144');

        computerPick.getElementsByTagName('ellipse')[2].setAttribute('cx', '150');
        computerPick.getElementsByTagName('ellipse')[2].setAttribute('cy', '150');
        computerPick.getElementsByTagName('ellipse')[2].setAttribute('rx', '114');
        computerPick.getElementsByTagName('ellipse')[2].setAttribute('ry', '114');

        computerPick.getElementsByTagName('ellipse')[3].setAttribute('cx', '150');
        computerPick.getElementsByTagName('ellipse')[3].setAttribute('cy', '156');
        computerPick.getElementsByTagName('ellipse')[3].setAttribute('rx', '114');
        computerPick.getElementsByTagName('ellipse')[3].setAttribute('ry', '108');

        main1.style.display = "none";
        main2.style.display = "flex";

        pick[0].appendChild(userPick);
        setTimeout(() => {
            pick[1].appendChild(computerPick);
            pick[1].removeChild(plcHldrCrcl);
        }, 2000);
    } else {
        let userPickInit = document.querySelector(`.${user}`);
        let computerPickInit = document.querySelector(`.${computer}`);

        let userPick = userPickInit.cloneNode(true);
        let computerPick = computerPickInit.cloneNode(true);

        main1.style.display = "none";
        main2.style.display = "flex";

        pick[0].appendChild(userPick);
        setTimeout(() => {
            pick[1].appendChild(computerPick);
            pick[1].removeChild(plcHldrCrcl);
        }, 2000);
    }
}

score.textContent = scoreValue;

function displayResult(user, computer) {
    if (user === computer) {
        result.innerText = "DRAW";
    } else if ((user === "rock" && computer === "scissors") ||
        (user === "scissors" && computer === "paper") ||
        (user === "paper" && computer === "rock")) {
        scoreValue = parseInt(score.textContent) + 1;
        result.innerText = "YOU WIN";
    } else {
        scoreValue = parseInt(score.textContent) - 1;
        result.innerText = "YOU LOSE";
    }

    score.textContent = scoreValue;
    localStorage.setItem('score', scoreValue);
}

rock.addEventListener("click", () => userChoice = "rock");
paper.addEventListener("click", () => userChoice = "paper");
scissors.addEventListener("click", () => userChoice = "scissors");

moves.forEach((move) => {
    move.addEventListener("click", () => {
        computerChoice = getComputerChoice();
        if (window.innerWidth >= 768) {
            displayPicks(userChoice, computerChoice);
            setTimeout(() => {
                resultCont.style.display = "flex";
                displayResult(userChoice, computerChoice)
            }, 2000)
        } else {
            const picksCont = document.createElement("div");
            picksCont.classList.add("picks-cont");
            picksCont.appendChild(pick[0]);
            picksCont.appendChild(pick[1]);
            main2.appendChild(picksCont);
            main2.appendChild(resultCont);
            displayPicks(userChoice, computerChoice);
            setTimeout(() => {
                resultCont.style.visibility = "visible";
                displayResult(userChoice, computerChoice);
            }, 2000)
        }
    });
})

restart.addEventListener('click', () => {
    main2.style.display = "none";
    user.removeChild(user.lastChild);
    house.removeChild(house.querySelector(".move"));
    house.appendChild(plcHldrCrcl)

    main1.style.display = "flex";

    if (window.innerWidth >= 768) {
        resultCont.style.display = "none";
    } else {
        resultCont.style.visibility = "hidden";
    }
});

rlsBtn.addEventListener('click', function() {
    rules.style.display = 'flex';
    rlsClrBtn.addEventListener('click', function () {
        rules.style.display = 'none';
    })
    if (window.innerWidth >= 768) {
        header.style.opacity = "0.5";
        main.style.opacity = "0.5";
        footer.style.opacity = "0.5";

        rlsClrBtn.addEventListener('click', function () {
            header.style.opacity = "1";
            main.style.opacity = "1";
            footer.style.opacity = "1";
        })
    } else {
        rules.appendChild(rlsClrBtn)
    }
})

window.addEventListener('resize', function () {
    moves.forEach(function (move) {
        const ellipse1 = move.querySelectorAll('svg ellipse')[0];
        const ellipse2 = move.querySelectorAll('svg ellipse')[1];
        const ellipse3 = move.querySelectorAll('svg ellipse')[2];
        const ellipse4 = move.querySelectorAll('svg ellipse')[3];

        if (window.innerWidth < 768) {
            ellipse1.setAttribute('cx', '75');
            ellipse1.setAttribute('cy', '75');
            ellipse1.setAttribute('rx', '75');
            ellipse1.setAttribute('ry', '75');

            ellipse2.setAttribute('cx', '75');
            ellipse2.setAttribute('cy', '72');
            ellipse2.setAttribute('rx', '75');
            ellipse2.setAttribute('ry', '72');

            ellipse3.setAttribute('cx', '75');
            ellipse3.setAttribute('cy', '75');
            ellipse3.setAttribute('rx', '57');
            ellipse3.setAttribute('ry', '57');

            ellipse4.setAttribute('cx', '75');
            ellipse4.setAttribute('cy', '78');
            ellipse4.setAttribute('rx', '57');
            ellipse4.setAttribute('ry', '54');
        } else {
            ellipse1.setAttribute('cx', '100');
            ellipse1.setAttribute('cy', '100');
            ellipse1.setAttribute('rx', '100');
            ellipse1.setAttribute('ry', '100');

            ellipse2.setAttribute('cx', '100');
            ellipse2.setAttribute('cy', '96');
            ellipse2.setAttribute('rx', '100');
            ellipse2.setAttribute('ry', '96');

            ellipse3.setAttribute('cx', '100');
            ellipse3.setAttribute('cy', '100');
            ellipse3.setAttribute('rx', '76');
            ellipse3.setAttribute('ry', '76');

            ellipse4.setAttribute('cx', '100');
            ellipse4.setAttribute('cy', '104');
            ellipse4.setAttribute('rx', '76');
            ellipse4.setAttribute('ry', '72');
        }
    })
});

document.addEventListener("DOMContentLoaded", function() {
    moves.forEach(function (move) {
        const ellipse1 = move.querySelectorAll('svg ellipse')[0];
        const ellipse2 = move.querySelectorAll('svg ellipse')[1];
        const ellipse3 = move.querySelectorAll('svg ellipse')[2];
        const ellipse4 = move.querySelectorAll('svg ellipse')[3];

        if (window.innerWidth < 768) {
            ellipse1.setAttribute('cx', '75');
            ellipse1.setAttribute('cy', '75');
            ellipse1.setAttribute('rx', '75');
            ellipse1.setAttribute('ry', '75');

            ellipse2.setAttribute('cx', '75');
            ellipse2.setAttribute('cy', '72');
            ellipse2.setAttribute('rx', '75');
            ellipse2.setAttribute('ry', '72');

            ellipse3.setAttribute('cx', '75');
            ellipse3.setAttribute('cy', '75');
            ellipse3.setAttribute('rx', '57');
            ellipse3.setAttribute('ry', '57');

            ellipse4.setAttribute('cx', '75');
            ellipse4.setAttribute('cy', '78');
            ellipse4.setAttribute('rx', '57');
            ellipse4.setAttribute('ry', '54');
        }
    })
})