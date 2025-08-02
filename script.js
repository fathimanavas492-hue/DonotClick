const button = document.getElementById('doNotClick');
const message = document.getElementById('message');
const ghostSound = document.getElementById('ghostSound');
const glitchSound = document.getElementById('glitchSound');

let clickCount = 0;
let isEscaping = false;
let ghostShown = false;

button.addEventListener('click', () => {
  clickCount++;

  if (clickCount === 1) {
    message.innerText = "Warning: You were told not to click!";
  } else if (clickCount === 2) {
    document.body.classList.add('blood');
    message.innerText = "Too late now. Something's coming...";
  } else if (clickCount === 3) {
    button.classList.add('small');
    message.innerText = "You shouldn't have done that...";
    isEscaping = true;

    setTimeout(() => {
  if (!ghostShown) {
    document.body.style.background = 'black'; // 👈 Add this line
    ghostSound.play();
    glitchSound.play();
    const ghost = document.createElement('div');
    ghost.classList.add('ghost');
    document.body.appendChild(ghost);
    
    ghostShown = true;
    showBrokenMessage();
  }
}, 10000);

  }
});

document.addEventListener('mousemove', (e) => {
  if (!isEscaping) return;

  const btnRect = button.getBoundingClientRect();
  const distance = 100;

  const distX = Math.abs(e.clientX - (btnRect.left + btnRect.width / 2));
  const distY = Math.abs(e.clientY - (btnRect.top + btnRect.height / 2));

  if (distX < distance && distY < distance) {
    const newX = Math.random() * (window.innerWidth - 150);
    const newY = Math.random() * (window.innerHeight - 100);
    button.style.position = 'absolute';
    button.style.left = `${newX}px`;
    button.style.top = `${newY}px`;
  }
});

function showBrokenMessage() {
  message.innerHTML = "<span class='brokenText'>YOU BROKE THE WEB!</span>";
}

