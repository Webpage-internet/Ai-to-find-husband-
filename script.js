// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoqFUvyTQZbOsvAwkEgybh_S7ESxv4_T4",
  authDomain: "ai-husband.firebaseapp.com",
  projectId: "ai-husband",
  storageBucket: "ai-husband.firebasestorage.app",
  messagingSenderId: "552606513853",
  appId: "1:552606513853:web:744828320f9bbc7e14d5d4",
  measurementId: "G-HBJWV8SS5R"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Firebase database reference for the view count
const viewCountRef = firebase.database().ref('viewCount');

// Function to increment view count
function incrementViewCount() {
  viewCountRef.transaction((currentCount) => {
    return (currentCount || 0) + 1; // Increment by 1
  });
}

// Function to display the current view count
function displayViewCount() {
  viewCountRef.on('value', (snapshot) => {
    const count = snapshot.val();
    document.getElementById('count-display').textContent = count || 0;
  });
}

// Unlock button functionality
document.getElementById('unlock-btn').addEventListener('click', function () {
  const password = document.getElementById('password').value.trim().toLowerCase();
  const validPasswords = ["afzal", "mahira", "mahira faisal", "honey", "haney", "hani"];

  if (validPasswords.includes(password)) {
    // Increment the view count in Firebase
    incrementViewCount();

    // Unlock the showcase
    document.getElementById('lock-screen').classList.add('hidden');
    document.getElementById('photo-showcase').classList.remove('hidden');
    document.getElementById('lock-screen').setAttribute('aria-hidden', 'true');
    document.getElementById('photo-showcase').setAttribute('aria-hidden', 'false');
  } else {
    document.getElementById('error-msg').textContent = "Incorrect name. Please try again!";
  }
});

  // Reset the password input
  document.getElementById('password').value = "";
  document.getElementById('error-msg').textContent = "";

  // Remove the unlocked state from localStorage
  localStorage.removeItem('unlocked');

// Reset view button functionality
document.getElementById('reset-view').addEventListener('click', function () {
  const enteredPassword = prompt("Enter the password to reset views:");
  if (enteredPassword === "143") {
    viewCountRef.set(0); // Reset the view count in Firebase
    alert("View count has been reset!");
  } else {
    alert("Incorrect password. Unable to reset views.");
  }
});

// Initialize the view count display on page load
document.addEventListener('DOMContentLoaded', displayViewCount);