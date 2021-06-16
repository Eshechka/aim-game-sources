const startButton = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const board = document.querySelector('.board');
const timeEl = document.querySelector('#time');
const COLORS = ['#E27D60','#85DCB','#E8A87C','#C38D9E','#41B3A3','#379683','#8EE4AF'];
let time = 0;
let score = 0;

startButton.addEventListener('click', (e) => {
    e.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', (e) => {
    if (e.target.classList.contains('time-btn')) {
        time = parseInt(e.target.dataset['timeValue']);
        startGame();
    }
});

board.addEventListener('click', (e) => {
    if (e.target.classList.contains('circle')) {
        score++;
        e.target.remove();
        createRandomCircle();
    }
});

function startGame() {
    screens[1].classList.add('up');
    setTime(time);
    createRandomCircle();
    setInterval(() => {
        decreaseTime();
    }, 1000);

    winTheGame();
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        --time;
        let currentTime = time < 10 ? `0${time}` : time;
        setTime(currentTime);
    }
}

function setTime(val) {
    timeEl.innerHTML = `00:${val}`;
}

function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `
        <h1>Счет: 
            <span class='primary'>${score}</span>
        </h1>
    `
}

function createRandomCircle() {
    const circle = document.createElement('div');
    circle.classList.add('circle');

    const size = getRandomNum(20, 50);
    circle.style.height = `${size}px`;
    circle.style.width = `${size}px`;

    const {width, height} = board.getBoundingClientRect();

    const posX = getRandomNum(10, width - 10 - size);
    const posY = getRandomNum(10, height - 10 - size);
    circle.style.left = `${posX}px`;
    circle.style.top = `${posY}px`;

    const color = COLORS[getRandomNum(0, COLORS.length-1)];
    circle.style.background = `${color}`; 

    board.append(circle);
}

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function winTheGame() {
    
    const kill = setInterval(() => {
        const circle = document.querySelector('.circle');
        if (circle) {
            circle.click();
        } else {
            clearInterval(kill);
        }
    }, 100);
    
}
