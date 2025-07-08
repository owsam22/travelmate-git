
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
  import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
  
  // Firebase configuration object
  const firebaseConfig = {
    apiKey: "AIzaSyDYUebHG2oMXrLBxgXaNIx6FN5BikmyOt0",
    authDomain: "travel-e06fe.firebaseapp.com",
    projectId: "travel-e06fe",
    storageBucket: "travel-e06fe.firebasestorage.app",
    messagingSenderId: "418352787689",
    appId: "1:418352787689:web:cce496c8c0ebc739ccc078"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  export { auth, onAuthStateChanged };
  
  // Google login function
  window.googleLogin = function () {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        updateSidebar(user);  // Update the sidebar after login
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  // Listen for auth state changes
  onAuthStateChanged(auth, (user) => {
    if (user) {
      updateSidebar(user);  // Update sidebar with user info
    } else {
      resetSidebar();  // Reset sidebar if no user is logged in
    }
  });
  
  // Update Sidebar with user info
  function updateSidebar(user) {
    const userPhoto = document.getElementById("userPhoto");
    const userName = document.getElementById("userName");
    const userEmail = document.getElementById("userEmail");
    
    // Show user info in sidebar
    document.getElementById("userInfo").style.display = 'block';  // Show the user info div
  
    // Set the profile photo, name, and email
    userPhoto.src = user.photoURL || 'https://example.com/default-photo.png';  // Fallback to a default image URL
    userName.textContent = user.displayName || 'No Name';
    userEmail.textContent = user.email || 'No Email';
    
    // Hide login/sign-up buttons and show logout button
    document.getElementById("loginBtn").style.display='none'
    document.getElementById("logoutBtn").style.display = 'block';
  }
  
  // Reset Sidebar when logged out
  function resetSidebar() {
    document.getElementById("userInfo").style.display = 'none';  // Hide the user info
    document.getElementById("loginBtn").style.display = 'block';  // Show login button
    document.getElementById("logoutBtn").style.display = 'none';  // Hide logout button
  }
  
  // Logout function
  window.logout = function () {
    signOut(auth).then(() => {
      resetSidebar();  // Reset sidebar after logout
    }).catch((error) => {
      console.error(error);
    });
  };
