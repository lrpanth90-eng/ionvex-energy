import { db } from "../firebase/app.js";
import { collection, getDocs } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const totalEl = document.getElementById("total");
const activeEl = document.getElementById("active");
const pendingEl = document.getElementById("pending");

let total = 0, active = 0, pending = 0;

const snap = await getDocs(collection(db, "batteries"));

snap.forEach(doc => {
  total++;
  const d = doc.data();
  if (d.activated) active++;
  else pending++;
});

totalEl.innerText = total;
activeEl.innerText = active;
pendingEl.innerText = pending;
