import { auth, db } from "../firebase/app.js";
import { signInWithEmailAndPassword } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { doc, getDoc } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const msg = document.getElementById("msg");

  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCred.user.uid;

    // 🔥 get role from Firestore
    const userDoc = await getDoc(doc(db, "users", uid));

    if (!userDoc.exists()) {
      msg.innerText = "User role not found";
      return;
    }

    const role = userDoc.data().role;

    if (role === "admin") {
      window.location.href = "/admin/dashboard.html";
    } 
    else if (role === "dealer") {
      window.location.href = "/dealer/dashboard.html";
    } 
    else {
      msg.innerText = "Invalid role";
    }

  } catch (err) {
    msg.innerText = err.message;
  }
};
