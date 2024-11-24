let lockTimeout;

function resetLockTimer() {
  clearTimeout(lockTimeout);
  lockTimeout = setTimeout(() => {
    // Lock the page and reset the password input
    document.getElementById('lock-screen').classList.remove('hidden');
    document.getElementById('photo-showcase').classList.add('hidden');
    document.getElementById('password').value = ''; // Clear the password field
    document.getElementById('password').focus(); // Focus on the password input field

    // Reset error message
    document.getElementById('error-msg').textContent = '';
  }, 30000); // 30 seconds timeout to lock the page
}

// Event listeners to reset the lock timer upon user interaction
document.body.addEventListener('mousemove', resetLockTimer);
document.body.addEventListener('click', resetLockTimer);
document.body.addEventListener('keypress', resetLockTimer);

// Unlock functionality
document.getElementById('unlock-btn').addEventListener('click', function () {
  const password = document.getElementById('password').value.trim().toLowerCase();
  const validPasswords = ["afzal", "mahira"];

  if (validPasswords.includes(password)) {
    // Unlock the showcase
    document.getElementById('lock-screen').classList.add('hidden');
    document.getElementById('photo-showcase').classList.remove('hidden');
    document.getElementById('lock-screen').setAttribute('aria-hidden', 'true');
    document.getElementById('photo-showcase').setAttribute('aria-hidden', 'false');

    // Save state in localStorage
    localStorage.setItem('unlocked', 'true');

    // Display a pop-up
    const popupText = password === 'afzal' ? 'I love you!' : 'Mahira Afzal love you so much!';
    createPopup(popupText);

    // Reset the lock timer after unlocking
    resetLockTimer();
  } else {
    document.getElementById('error-msg').textContent = "Incorrect name. Please try again!";
  }
});

function createPopup(message) {
  const popup = document.createElement('div');
  popup.classList.add('popup');
  popup.textContent = message;
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.classList.add('fade-out');
  }, 4000); // Start fading out after 4 seconds

  setTimeout(() => {
    popup.remove(); // Remove popup after fade-out
  }, 5000); // Total duration (5 seconds)
}

// Check if previously unlocked
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('unlocked') === 'true') {
    document.getElementById('lock-screen').classList.add('hidden');
    document.getElementById('photo-showcase').classList.remove('hidden');
    resetLockTimer(); // Reset the timeout if already unlocked
  }
});