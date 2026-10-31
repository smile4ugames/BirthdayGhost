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
    sparkle.style.fontSize = (Math.random() * 10 + 10) + 'px';
    sparkle.style.left = (x + (Math.random() * 16 - 8)) + 'px';
    sparkle.style.top = (y + (Math.random() * 16 - 8)) + 'px';
    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 700);
}

const reasons = [
    { 
        text: "You're such a wonderfully kind spirit, and I feel eternally lucky to share this haunted bond with Dr. Ghost! ⭐", 
        emoji: "🌟",
        img: "./c2.jpg"
    },
    { 
        text: "May your day be filled with endless laughter, pumpkin spice, creepy treats, and supreme good vibes! 🎃", 
        emoji: "👑",
        img: "./c3.jpg"
    },
    { 
        text: "Wishing you ultimate phantom success, supreme happiness, and everything your shining heart desires! 🏆", 
        emoji: "🤝",
        img: "./c4.jpg"
    },
    { 
        text: "Stay the amazingly radiant ghoul you are—always bringing wicked good energy everywhere! Have a blast! 🥳", 
        emoji: "✨",
        img: "./c5.jpg"
    }
];

let currentReasonIndex = 0;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
let isTransitioning = false;

function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';
    
    const imgContainer = document.createElement('div');
    imgContainer.className = 'reason-img-container';
    imgContainer.innerHTML = `<img src="${reason.img}" alt="Ghost Memory" onerror="this.src='https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&q=80'">`;

    const text = document.createElement('div');
    text.className = 'reason-text';
    text.innerHTML = `${reason.emoji} ${reason.text}`;
    
    card.appendChild(imgContainer);
    card.appendChild(text);
    
    gsap.from(card, {
        opacity: 0,
        y: 40,
        scale: 0.9,
        duration: 0.5,
        ease: "back.out"
    });

    return card;
}

function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        const card = createReasonCard(reasons[currentReasonIndex]);
        reasonsContainer.appendChild(card);
        
        reasonCounter.textContent = `Spell ${currentReasonIndex + 1} of ${reasons.length}`;
        currentReasonIndex++;

        if (currentReasonIndex === reasons.length) {
            gsap.to(shuffleButton, {
                scale: 1.1,
                duration: 0.5,
                ease: "elastic.out",
                onComplete: () => {
                    shuffleButton.textContent = "Enter Haunted Gallery ✨";
                    shuffleButton.classList.add('story-mode');
                }
            });
        }

        createFloatingElement();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 400);
    } else {
        gsap.to('body', {
            opacity: 0,
            duration: 0.8,
            onComplete: () => {
                window.location.href = 'last.html';
            }
        });
    }
}

shuffleButton.addEventListener('click', () => {
    gsap.to(shuffleButton, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    displayNewReason();
});

function createFloatingElement() {
    const elements = ['🎃', '👻', '🦇', '🏆', '👑', '🤝'];
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = Math.random() * window.innerHeight + 'px';
    element.style.fontSize = (Math.random() * 20 + 12) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -400,
        duration: Math.random() * 6 + 6,
        opacity: 0,
        onComplete: () => element.remove()
    });
}

setInterval(createFloatingElement, 2000);