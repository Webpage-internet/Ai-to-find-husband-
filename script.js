document.getElementById('unlock-btn').addEventListener('click', function () {
  const password = document.getElementById('password').value.trim().toLowerCase();
  const validPasswords = ["afzal", "mahira","mahira faisal"]; 

  if (validPasswords.includes(password)) {
    // Unlock the showcase
    document.getElementById('lock-screen').classList.add('hidden');
    document.getElementById('photo-showcase').classList.remove('hidden');
    document.getElementById('lock-screen').setAttribute('aria-hidden', 'true');
    document.getElementById('photo-showcase').setAttribute('aria-hidden', 'false');

    // Update view count
    let viewCount = localStorage.getItem('viewCount');
    if (!viewCount) {
      viewCount = 0;
    }
    viewCount = parseInt(viewCount) + 1;
    localStorage.setItem('viewCount', viewCount);
    updateViewCount();

    // Display a pop-up
    const popupText = password === 'afzal' ? 'I love you!' : 'Mahira Afzal loves you so much!';
    createPopup(popupText);

    // Lock again after 2 minutes 
    setTimeout(() => {
      lockShowcase();
    }, 120000); // 2 minutes 
  } else {
    document.getElementById('error-msg').textContent = "Incorrect name. Please try again!";
  }
});

// Update view count display
function updateViewCount() {
  const viewCount = localStorage.getItem('viewCount') || 0;
  document.getElementById('count-display').textContent = viewCount;
}

// Reset view button functionality
document.getElementById('reset-view').addEventListener('click', function () {
  const enteredPassword = prompt("Enter the password to reset views:");
  if (enteredPassword === "143") {
    localStorage.setItem('viewCount', 0); // Reset the view count
    updateViewCount();
    alert("View count has been reset!");
  } else {
    alert("Incorrect password. Unable to reset views.");
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
// Initialize the view count on page load
document.addEventListener('DOMContentLoaded', () => {
  updateViewCount();
});

// Check if previously unlocked (only during page load)
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('unlocked') === 'true') {
    document.getElementById('lock-screen').classList.add('hidden');
    document.getElementById('photo-showcase').classList.remove('hidden');

    // Automatically lock again after 2 minutes 
    setTimeout(() => {
      lockShowcase();
    }, 120000); // 2 minutes 
  }
});
