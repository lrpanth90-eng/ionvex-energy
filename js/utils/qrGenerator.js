import QRCode from "https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js";

export function generateQR(serial) {
  const url = `https://ionvex-energy.vercel.app/customer/battery.html?serial=${serial}`;
  QRCode.toCanvas(document.getElementById("qr"), url);
}
