document.getElementById('unlock-btn').addEventListener('click', function () {
  const password = document.getElementById('password').value.trim().toLowerCase();
  const validPasswords = ["afzal", "mahira"]; 

  if (validPasswords.includes(password)) {
    // Unlock the showcase
    document.getElementById('lock-screen').classList.add('hidden');
    document.getElementById('photo-showcase').classList.remove('hidden');
    document.getElementById('lock-screen').setAttribute('aria-hidden', 'true');
    document.getElementById('photo-showcase').setAttribute('aria-hidden', 'false');

    // Display a pop-up
    const popupText = password === 'afzal' ? 'I love you!' : 'Mahira Afzal loves you so much!';
    createPopup(popupText);

    // Lock again after 15 seconds
    setTimeout(() => {
      lockShowcase();
    }, 15000); // 15 seconds
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
    popup.style.display = 'none';
  }, 5000);
}

// Function to lock the showcase
function lockShowcase() {
  document.getElementById('lock-screen').classList.remove('hidden');
  document.getElementById('photo-showcase').classList.add('hidden');
  document.getElementById('lock-screen').setAttribute('aria-hidden', 'false');
  document.getElementById('photo-showcase').setAttribute('aria-hidden', 'true');

  // Reset the password input
  document.getElementById('password').value = "";
  document.getElementById('error-msg').textContent = "";

  // Remove the unlocked state from localStorage
  localStorage.removeItem('unlocked');
}

// Check if previously unlocked (only during page load)
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('unlocked') === 'true') {
    document.getElementById('lock-screen').classList.add('hidden');
    document.getElementById('photo-showcase').classList.remove('hidden');

    // Automatically lock again after 15 seconds
    setTimeout(() => {
      lockShowcase();
    }, 15000); // 15 seconds
  }
});