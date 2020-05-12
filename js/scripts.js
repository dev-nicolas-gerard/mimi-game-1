const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let keyPressAutorise = true;
let shuffledLetters;
let currentIndex;
const clapSound = new Audio('./sound/clap.mp3');
const failSound = new Audio('./sound/fail.mp3');

const falseAnim = async () => {
    return new Promise(async function (resolve) {
        console.log('falseAnim');
        failSound.play();
        await addClass('letter', 'to-red', 1000);
        resolve();
    });
};

const trouveAnim = async () => {
    return new Promise(async function (resolve) {
        console.log('trouveAnim');
        clapSound.play();
        addClass('letter', 'to-green', 4000);
        await addClass('mask', 'to-visible', 4000);
        showNextLetter();
        resolve();
    });
};

const addClass = async (element, claz, timeToRemove) => {
    console.log('add class');
    document.getElementById(element).classList.add(claz);
    if (timeToRemove) {
        console.log('remove');
        return new Promise(function (resolve) {
            setTimeout(() => {
                document.getElementById(element).classList.remove(claz);
                resolve();
            }, timeToRemove);
        })
    }
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

const handlePress = async (e) => {
    console.log('press');
    if (!keyPressAutorise) {
        return;
    }
    keyPressAutorise = false;
    const letterPressed = String.fromCharCode(e.keyCode);
    if (letterPressed === shuffledLetters[currentIndex]) {
        await trouveAnim();
    } else {
        await falseAnim();
    }
    keyPressAutorise = true;
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