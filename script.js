const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const letterButtonsContainer = document.querySelector('.letter-buttons');
const canvas = document.getElementById('hangman');
const ctx = canvas.getContext('2d');

const words = ['application', 'programming', 'interface', 'wizard'];
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

function drawFigure(part) {
    switch (part) {
        case 'base':
            ctx.moveTo(10, 190);
            ctx.lineTo(190, 190);
            break;
        case 'pole':
            ctx.moveTo(50, 190);
            ctx.lineTo(50, 10);
            break;
        case 'beam':
            ctx.moveTo(50, 10);
            ctx.lineTo(150, 10);
            break;
        case 'rope':
            ctx.moveTo(150, 10);
            ctx.lineTo(150, 30);
            break;
        case 'head':
            ctx.arc(150, 50, 20, 0, Math.PI * 2, true);
            break;
        case 'body':
            ctx.moveTo(150, 70);
            ctx.lineTo(150, 130);
            break;
        case 'leftArm':
            ctx.moveTo(150, 90);
            ctx.lineTo(120, 110);
            break;
        case 'rightArm':
            ctx.moveTo(150, 90);
            ctx.lineTo(180, 110);
            break;
        case 'leftLeg':
            ctx.moveTo(150, 130);
            ctx.lineTo(120, 160);
            break;
        case 'rightLeg':
            ctx.moveTo(150, 130);
            ctx.lineTo(180, 160);
            break;
    }
    ctx.stroke();
}

function displayWord() {
    wordEl.innerHTML = `
        ${selectedWord
            .split('')
            .map(
                letter => `
                <span class="letter">
                    ${correctLetters.includes(letter) ? letter : ''}
                </span>
            `
            )
            .join('')}
    `;

    const innerWord = wordEl.innerText.replace(/\n/g, '');

    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations! You won!';
        popup.style.display = 'flex';
    }
}

function updateWrongLettersEl() {
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    const parts = ['base', 'pole', 'beam', 'rope', 'head', 'body', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg'];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    wrongLetters.forEach((letter, index) => {
        drawFigure(parts[index]);
    });

    if (wrongLetters.length === parts.length) {
        finalMessage.innerText = 'Unfortunately you lost.';
        popup.style.display = 'flex';
    }
}

function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

alphabet.forEach(letter => {
    const button = document.createElement('button');
    button.classList.add('letter-button');
    button.setAttribute('data-letter', letter);
    button.innerText = letter.toUpperCase();
    letterButtonsContainer.appendChild(button);

    button.addEventListener('click', () => {
        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }
    });
});

playAgainBtn.addEventListener('click', () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();
    updateWrongLettersEl();

    popup.style.display = 'none';
});

displayWord();
