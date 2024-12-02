document.addEventListener('DOMContentLoaded', () => {
    const cssInput = document.getElementById('cssInput');
    const checkButton = document.getElementById('checkCenter');
    const previewDiv = document.getElementById('previewDiv');
    const previewParent = document.getElementById('previewParent');
    const feedback = document.getElementById('feedback');
    const tolerance = 5;

    // Success messages
    const successMessages = [
        "You did it! Your div is more centered than your life.",
        "Perfect! You're the div whisperer!",
        "Centered like a boss!",
        "Your div alignment skills are over 9000!",
        "This is the way.",
        "Oops! Your div is lost in space.",
        "Not even close. Try again.",
        "The div refuses to cooperate.",
        "Your div is on a vacation... somewhere far off.",
        "Uh-oh, looks like your div is confused.",
        "Almost there... but not quite.",
        "Your div is playing hard to get.",
        "This div's attitude is off-center.",
        "Not quite the center of attention, huh?",
        "That's... definitely not how it's done.",
        "The div is still trying to find itself."
    ];

    // Reset preview div styles
    function resetPreviewDiv() {
        previewDiv.style = '';
        previewDiv.style.width = '100px';
        previewDiv.style.height = '100px';
        previewDiv.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
        previewDiv.style.borderRadius = '8px';
        previewDiv.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.2)';
    }

    // Apply CSS to preview div
    function applyCSS() {
        resetPreviewDiv();
        const css = cssInput.value;
        previewDiv.style.cssText += css;
    }

    // Check if div is centered
    function checkCentering() {
        const computedStyle = window.getComputedStyle(previewDiv);
        const position = computedStyle.getPropertyValue('position');
        const top = computedStyle.getPropertyValue('top');
        const left = computedStyle.getPropertyValue('left');
        const transform = computedStyle.getPropertyValue('transform');

        // Check for absolute positioning method
        if (position === 'absolute' && 
            top === '50%' && 
            left === '50%' && 
            transform.includes('matrix') && 
            transform.includes('-50')) {
            return true;
        }

        // Get the center points for pixel-based validation
        const parentRect = previewParent.getBoundingClientRect();
        const divRect = previewDiv.getBoundingClientRect();

        const parentCenterX = parentRect.left + parentRect.width / 2;
        const parentCenterY = parentRect.top + parentRect.height / 2;
        const divCenterX = divRect.left + divRect.width / 2;
        const divCenterY = divRect.top + divRect.height / 2;

        // Check if the div is centered within tolerance
        const isCenteredX = Math.abs(parentCenterX - divCenterX) <= tolerance;
        const isCenteredY = Math.abs(parentCenterY - divCenterY) <= tolerance;

        return isCenteredX && isCenteredY;
    }

    // Get random message from array
    function getRandomMessage(messages) {
        return messages[Math.floor(Math.random() * messages.length)];
    }

    // Event listeners
    cssInput.addEventListener('input', applyCSS);

    checkButton.addEventListener('click', () => {
        const isCentered = checkCentering();
        feedback.textContent = isCentered
            ? getRandomMessage(successMessages.slice(0, 5))  // Only use the first 5 (success) messages
            : getRandomMessage(successMessages.slice(5));    // Use the rest as failure messages
        feedback.className = `feedback ${isCentered ? 'success' : 'error'}`;
    });

    // Initialize with placeholder CSS
    cssInput.value = `/* Write your CSS here */
width: 100px;
height: 100px;
/* Add your centering magic below */
`;
    applyCSS();

    // Modal functionality
    const modal = document.getElementById('premiumModal');
    const premiumBtn = document.getElementById('premiumBtn');
    const closeModal = document.querySelector('.close-modal');
    const planButtons = document.querySelectorAll('.plan-btn');

    // Open modal
    premiumBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Handle plan selection
    planButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const plan = button.closest('.plan');
            const planName = plan.querySelector('h3').textContent;
            alert(`Thank you for choosing the ${planName} plan! We'll contact you soon.`);
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
});
