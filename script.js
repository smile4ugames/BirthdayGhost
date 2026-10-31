// Spooky Custom Ghost Cursor Movement
const ghostCursor = document.getElementById('ghost-cursor');

document.addEventListener('mousemove', (e) => {
    ghostCursor.style.left = e.clientX + 'px';
    ghostCursor.style.top = e.clientY + 'px';

    if (Math.random() < 0.35) {
        createSparkle(e.clientX, e.clientY);
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'cursor-sparkle';
    const symbols = ['🎃', '👻', '🦇', '✨', '💀'];
    sparkle.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    sparkle.style.fontSize = (Math.random() * 10 + 12) + 'px';
    sparkle.style.left = (x + (Math.random() * 16 - 8)) + 'px';
    sparkle.style.top = (y + (Math.random() * 16 - 8)) + 'px';
    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 700);
}

// Typing effect for Halloween greeting
const greetingText = "Hey Dr. Ghost! You're the most legendary, spectral, and hilarious best friend in the afterlife! 🦇🎃";
const greetingElement = document.querySelector('.greeting');
let charIndex = 0;

function typeGreeting() {
    if (charIndex < greetingText.length) {
        greetingElement.textContent += greetingText.charAt(charIndex);
        charIndex++;
        setTimeout(typeGreeting, 50);
    }
}

// Spooky floating background entities
const floatingElements = ['👻', '🎃', '🦇', '💀', '🕷️', '✨'];
function createFloating() {
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = floatingElements[Math.floor(Math.random() * floatingElements.length)];
    element.style.left = Math.random() * 100 + 'vw';
    element.style.top = Math.random() * 100 + 'vh';
    element.style.fontSize = (Math.random() * 20 + 20) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        x: Math.random() * 100 - 50,
        rotation: Math.random() * 360,
        duration: Math.random() * 5 + 5,
        opacity: 0.8,
        ease: "none",
        onComplete: () => element.remove()
    });
}

// Animations on page load
window.addEventListener('load', () => {
    gsap.to('h1', {
        opacity: 1,
        duration: 1,
        y: 10,
        ease: "bounce.out"
    });

    gsap.to('.cta-button', {
        opacity: 1,
        duration: 1,
        y: -10,
        ease: "back.out"
    });

    typeGreeting();
    setInterval(createFloating, 1000);
});

// Page transition to cause.html
const button = document.querySelector('.cta-button');
button.addEventListener('click', () => {
    gsap.to('body', {
        opacity: 0,
        duration: 0.8,
        onComplete: () => {
            window.location.href = 'cause.html';
        }
    });
});