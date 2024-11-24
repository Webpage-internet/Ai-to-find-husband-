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

// Check if previously unlocked
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('unlocked') === 'true') {
    document.getElementById('lock-screen').classList.add('hidden');
    document.getElementById('photo-showcase').classList.remove('hidden');
  }
});