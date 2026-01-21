document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bmiForm');
    const resultDisplay = document.getElementById('result-display');
    const hero = document.getElementById('hero');

    // Reuse your stacking shrink logic
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) hero.classList.add('shrink');
        else hero.classList.remove('shrink');
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const weight = parseFloat(document.getElementById('weight').value);
        const heightCm = parseFloat(document.getElementById('height').value);
        
        if (weight > 0 && heightCm > 0) {
            const heightM = heightCm / 100;
            const bmi = (weight / (heightM * heightM)).toFixed(1);
            
            displayResult(bmi);
        } else {
            alert("SYSTEM_ERROR: INVALID_BIOMETRIC_DATA");
        }
    });

    function displayResult(bmi) {
        const score = document.getElementById('bmi-score');
        const status = document.getElementById('bmi-status');
        const indicator = document.getElementById('bmi-indicator');
        
        resultDisplay.style.display = 'block';
        score.innerText = `SCORE: ${bmi}`;
        
        let color = "#00ff41"; // Default Healthy
        let label = "OPTIMAL_HEALTH";
        let width = "50%";

        if (bmi < 18.5) {
            color = "#00f2ff";
            label = "UNDER_WEIGHT";
            width = "25%";
        } else if (bmi >= 25 && bmi < 29.9) {
            color = "#ffcc00";
            label = "OVER_WEIGHT";
            width = "75%";
        } else if (bmi >= 30) {
            color = "#ff0055";
            label = "CRITICAL_MASS";
            width = "100%";
        }

        status.innerText = `STATUS: ${label}`;
        status.style.color = color;
        indicator.style.width = width;
        indicator.style.backgroundColor = color;
    }
});