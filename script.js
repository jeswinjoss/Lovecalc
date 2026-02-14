document.addEventListener('DOMContentLoaded', () => {
    const name1Input = document.getElementById('name1');
    const name2Input = document.getElementById('name2');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultContainer = document.getElementById('result');

    calculateBtn.addEventListener('click', () => {
        const name1 = name1Input.value.trim();
        const name2 = name2Input.value.trim();

        if (!name1 || !name2) {
            alert('Please enter both names to find your destiny!');
            return;
        }

        // UI Feedback
        calculateBtn.disabled = true;
        calculateBtn.textContent = 'Consulting the Stars...';
        resultContainer.classList.add('hidden');

        spawnHearts();

        // Calculation Logic
        const score = getScore(name1, name2);
        const coupleName = getCoupleName(name1, name2);
        const message = getMessage(score);

        setTimeout(() => {
            showResults(score, coupleName, message);
            calculateBtn.disabled = false;
            calculateBtn.textContent = 'Calculate Love ❤️';
        }, 1500);
    });
});

function getScore(n1, n2) {
    const combined = (n1 + n2).toLowerCase().replace(/\s/g, '');
    let sum = 0;
    for (let i = 0; i < combined.length; i++) {
        sum += combined.charCodeAt(i);
    }
    // Deterministic but feels random: Use prime number and modulo
    let score = (sum * 7) % 61 + 40; 
    if (score > 100) score = 100;
    return score;
}

function getCoupleName(n1, n2) {
    const p1 = n1.slice(0, Math.ceil(n1.length / 2));
    const p2 = n2.slice(Math.floor(n2.length / 2));
    return (p1 + p2).toUpperCase();
}

function getMessage(score) {
    if (score >= 90) return "A match made in heaven! You are twin flames.";
    if (score >= 80) return "Pure electricity! You guys are perfect for each other.";
    if (score >= 70) return "Strong chemistry detected. Go for it!";
    if (score >= 50) return "Potential is there, but communication is key.";
    return "The stars suggest starting as friends first!";
}

function showResults(score, couple, msg) {
    const res = document.getElementById('result');
    const perc = document.getElementById('percentage');
    const name = document.getElementById('coupleName');
    const mess = document.getElementById('message');
    const fill = document.getElementById('progressFill');

    res.classList.remove('hidden');
    perc.textContent = `${score}%`;
    name.textContent = couple;
    mess.textContent = msg;
    
    fill.style.width = '0%';
    setTimeout(() => {
        fill.style.width = `${score}%`;
    }, 50);
}

function spawnHearts() {
    const hearts = ['❤️', '💖', '✨', '💕', '🌹'];
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '100vh';
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 3000);
        }, i * 100);
    }
}
