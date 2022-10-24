import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyAH_rMfT3mNjmcwRYU-xvRWcDZVNC79EBo",
  authDomain: "testnoti-sw-arch.firebaseapp.com",
  projectId: "testnoti-sw-arch",
  storageBucket: "testnoti-sw-arch.appspot.com",
  messagingSenderId: "787748284241",
  appId: "1:787748284241:web:a288505addac8bcbf99570",
  measurementId: "G-P5RE3FTB7Y",
};

function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");

      //******************************* */
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);

      // Initialize Firebase Cloud Messaging and get a reference to the service
      const messaging = getMessaging(app);
      getToken(messaging, {
        vapidKey:
          "BPP7QPJAQ9xck9cgYTAaaVZBMi77gYUdZVFKM-2koRc2QuP_aZb5fBDvnKUS7PT77QlXvDNDmkJXnHq1jgD5glY",
      }).then((currentToken) => {
        if (currentToken) {
          console.log("currentToken: ", currentToken);
        } else {
          console.log("Can not get token");
        }
      });
      //******************************** */
      
    } else {
      console.log("Do not have permission!");
    }
  });
}

requestPermission();
