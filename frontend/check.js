import { auth, onAuthStateChanged } from './firebase.js'; // Import Firebase auth and state change

document.addEventListener("DOMContentLoaded", () => {
  const exploreLink = document.querySelector(".ai-btn"); 
  // Function to check if the user is logged in and proceed accordingly
  const checkAuthAndProceed = (callback) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in, proceed with the action
        callback();
      } else  {
        document.getElementById("loginPrompt").style.display = "flex";

      document.getElementById("loginNow").onclick = () => {
        googleLogin();
        document.getElementById("loginPrompt").style.display = "none";
      };

      document.getElementById("cancelLogin").onclick = () => {
        document.getElementById("loginPrompt").style.display = "none";
      };

      return;
      } 
    });
  };

 

  // Handle click for the Explore Now link
  exploreLink.addEventListener("click", (event) => {
    event.preventDefault();
    checkAuthAndProceed(() => {
      window.location.href = exploreLink.href;
    });
  });

});

