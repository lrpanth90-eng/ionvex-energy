import { protectPage } from "../firebase/auth.js";

protectPage((user) => {
  if (user.role !== "admin") {
    alert("Access denied");
    location.href = "/";
  }
});
