document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    // Smooth loading screen removal
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 1000);
    }, 2500);

    const name1Input = document.getElementById('name1');
    const name2Input = document.getElementById('name2');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultContainer = document.getElementById('result');

    calculateBtn.addEventListener('click', () => {
        const name1 = name1Input.value.trim();
        const name2 = name2Input.value.trim();

        if (!name1 || !name2) {
            alert('Please enter both names to find your Valentine match!');
            return;
        }

        calculateBtn.disabled = true;
        calculateBtn.textContent = 'Reading Hearts...';
        resultContainer.classList.add('hidden');
        
        // Visual feedback
        spawnHearts();

        const score = getScore(name1, name2);
        const coupleName = getCoupleName(name1, name2);
        const message = getMessage(score);

        setTimeout(() => {
            showResults(score, coupleName, message);
            calculateBtn.disabled = false;
            calculateBtn.textContent = 'Ignite Love ❤️';
            // Scroll to results on mobile
            if (window.innerWidth < 768) {
                resultContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 2200);
    });
});

function getScore(n1, n2) {
    const combined = (n1 + n2).toLowerCase().replace(/\s/g, '');
    let sum = 0;
    for (let i = 0; i < combined.length; i++) {
        sum += combined.charCodeAt(i);
    }
    // Algorithm for consistent but seemingly random scores based on names
    let score = (sum * 17) % 41 + 60; 
    if (score > 100) score = 100;
    return score;
}

function getCoupleName(n1, n2) {
    const p1 = n1.slice(0, Math.ceil(n1.length / 2));
    const p2 = n2.slice(Math.floor(n2.length / 2));
    return (p1 + p2).toUpperCase();
}

function getMessage(score) {
    if (score >= 95) return "A legendary Valentine bond! You're written in the stars with golden ink.";
    if (score >= 85) return "Passionate and pure. A golden match that will never fade!";
    if (score >= 75) return "Beautiful chemistry. Your love tree is blooming with divine energy.";
    if (score >= 60) return "There is deep warmth here. Nurture it with care and chocolate.";
    return "A quiet spark that may need time to flame into something grand.";
}

function showResults(score, couple, msg) {
    const res = document.getElementById('result');
    const perc = document.getElementById('percentage');
    const name = document.getElementById('coupleName');
    const mess = document.getElementById('message');
    const fill = document.getElementById('progressFill');

    res.classList.remove('hidden');
    perc.textContent = `${score}%`;
    name.textContent = `Couple Name: ${couple}`;
    mess.textContent = msg;

    // Trigger progress bar animation
    fill.style.width = '0%';
    setTimeout(() => {
        fill.style.width = `${score}%`;
    }, 100);
}

function spawnHearts() {
    const icons = ['❤️', '💖', '✨', '🌹', '💎', '🥂', '💘', '💍'];
    const count = window.innerWidth < 768 ? 15 : 30;
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = icons[Math.floor(Math.random() * icons.length)];
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '110vh';
            // Apply golden glow to icons
            heart.style.filter = 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.8))';
            document.body.appendChild(heart);

            // Remove element after animation
            setTimeout(() => heart.remove(), 4000);
        }, i * 100);
    }
}