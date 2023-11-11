import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";


    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
  
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    
    const firebaseConfig = {
      apiKey: "AIzaSyCXVieiq7etrSogPTC3m_shUUrF9OLMgic",
      authDomain: "bzstream.firebaseapp.com",
      databaseURL: "https://bzstream-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "bzstream",
      storageBucket: "bzstream.appspot.com",
      messagingSenderId: "792376628631",
      appId: "1:792376628631:web:68b92259a4919b6b1460d2",
      measurementId: "G-66J361RH03"
    };
  

  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const database = getDatabase(app);
    const auth = getAuth();

    const signIn = document.getElementById('signIn');

    signIn.addEventListener('click',(e) => {

      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
  
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
  
          const user = userCredential.user;
          
          alert('User Loged In!');
  
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
  
          alert(errorMessage);
      });
  });

  

function checkAuthState() {
  auth.onAuthStateChanged((user) => {
      if (user) {
          // L'utilisateur est connecté
          // Vous pouvez ajouter ici la logique pour gérer la session de l'utilisateur
      } else {
          // L'utilisateur n'est pas connecté
          // Rediriger vers la page de connexion
          window.location.href = 'login.html';
      }
  });
}

// Fonction pour se déconnecter
function signOut() {
  auth.signOut().then(() => {
      // Rediriger vers la page de connexion après la déconnexion
      window.location.href = 'login.html';
  });
}

// Exportez les fonctions dont vous avez besoin dans d'autres fichiers
export { checkAuthState, signOut };