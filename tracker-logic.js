document.addEventListener('DOMContentLoaded', () => {
    const hero = document.getElementById('hero');
    const form = document.getElementById('trackerForm');
    const logContainer = document.getElementById('log-container');
    let activities = [];

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) hero.classList.add('shrink');
        else hero.classList.remove('shrink');
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const type = document.getElementById('activity').value;
        const duration = document.getElementById('duration').value;
        
        const newEntry = {
            id: Date.now(),
            type: type,
            duration: duration,
            timestamp: new Date().toLocaleTimeString()
        };

        activities.unshift(newEntry);
        updateLogUI();
        form.reset();
    });

    function updateLogUI() {
        logContainer.innerHTML = '';
        if (activities.length === 0) {
            logContainer.innerHTML = '<div class="spec-box"><h4>NO_DATA</h4><p>Awaiting input...</p></div>';
            return;
        }

        activities.forEach(act => {
            const box = document.createElement('div');
            box.className = 'spec-box';
            box.style.borderLeft = "2px solid #00f2ff";
            box.innerHTML = `
                <h4>${act.type} // ${act.timestamp}</h4>
                <p>DURATION: <span class="cyan-glow">${act.duration} MIN</span></p>
            `;
            logContainer.appendChild(box);
        });
    }
});