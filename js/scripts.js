const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let keyPressAutorise = true;
let shuffledLetters;
let currentIndex;
const clapSound = new Audio('./sound/clap.mp3');
const failSound = new Audio('./sound/fail.mp3');

const falseAnim = () => {
    keyPressAutorise = false;
    failSound.play();
    console.log('falseAnim');
    document.getElementById('letter').classList.add('to-red');
    setTimeout(() => document.getElementById('letter').classList.remove('to-red'), 1000);
    keyPressAutorise = true;
};

const trouveAnim = () => {
    console.log('trouveAnim');
    keyPressAutorise = false;
    clapSound.play();
    document.getElementById('letter').classList.add('to-green');
    document.getElementById('mask').classList.add('to-visible');

    setTimeout(() => document.getElementById('letter').classList.remove('to-green'), 2000);

    new Promise(function(resolve, reject) {
            setTimeout(() => {
                document.getElementById('mask').classList.remove('to-visible');
                resolve();
            }, 4000);
    }).then(x => {
        showNextLetter();
        keyPressAutorise = true;
    });
    
};

const loadImg = () => {
    console.log('loadImag');
    document.getElementById('image').src = `./img/${shuffledLetters[currentIndex]}.png`;
};


const shuffleArray = (array) => {
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
}

const handlePress = (e) => {
    console.log('press');
    if (keyPressAutorise) {
        const letterPressed = String.fromCharCode(e.keyCode);
        if (letterPressed === shuffledLetters[currentIndex]) {
            trouveAnim();
        } else {
            falseAnim();
        }
    }
};

const showNextLetter = () => {
    console.log('showletter');
    currentIndex++;
    if (currentIndex >= shuffledLetters.length) {
        init();
        return;
    }
    document.getElementById('letter').innerHTML = shuffledLetters[currentIndex];
    loadImg();
};

const init = () => {
    console.log('init');
    currentIndex = -1;
    shuffledLetters = shuffleArray(letters);
    showNextLetter();
};


// -----------

document.body.addEventListener('keypress', handlePress);
init();