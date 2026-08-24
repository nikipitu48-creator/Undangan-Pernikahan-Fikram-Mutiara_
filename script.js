/* =========================================================
   FIKRAM & MUTIARA
   SCRIPT.JS — SUDAH DIPERBAIKI
   SHEETDB RSVP
========================================================= */

/* =========================================================
   KONFIGURASI
========================================================= */
const WEDDING_CONFIG = {
  bride: "Mutiara",
  groom: "Fikram",
  eventDate: "2026-09-19T08:00:00+07:00",
  sheetDB: "https://sheetdb.io/api/v1/3xl1byibvp4iu"
};

/* =========================================================
   NAMA TAMU DARI URL
========================================================= */
function getGuestName() {
  const params = new URLSearchParams(window.location.search);
  return params.get("to") || "Tamu Undangan";
}

function showGuestName() {
  const guestName = document.getElementById("guestName");
  if (guestName) guestName.textContent = getGuestName();
}

/* =========================================================
   BUKA UNDANGAN
========================================================= */
function openInvitation() {
  const lobby = document.getElementById("lobby");
  const nextPage = "isii.html" + window.location.search;
  if (!lobby) return window.location.href = nextPage;
  lobby.classList.add("hide");
  setTimeout(() => window.location.href = nextPage, 800);
}

/* =========================================================
   PARTIKEL
========================================================= */
function createParticles(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let particles = [];
  const getCount = () => window.innerWidth < 600 ? 45 : 90;
  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    const count = getCount();
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -(Math.random() * 0.5 + 0.1),
        alpha: Math.random() * 0.6 + 0.2
      });
    }
  };
  resize();
  window.addEventListener("resize", resize);
  (function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,235,180,${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(animate);
  })();
}

/* =========================================================
   AKTIFKAN PARTIKEL
========================================================= */
createParticles("lobbyParticles");
createParticles("contentParticles");

/* =========================================================
   MUSIK
========================================================= */
const music = document.getElementById("bgMusic");
const musicButton = document.getElementById("musicButton");
function toggleMusic() {
  if (!music) return;
  if (music.paused) {
    music.play().then(() => { if (musicButton) musicButton.textContent = "❚❚"; })
      .catch(e => console.log("Musik gagal:", e));
  } else {
    music.pause();
    if (musicButton) musicButton.textContent = "▶";
  }
}

/* =========================================================
   COUNTDOWN
========================================================= */
function updateCountdown() {
  const target = new Date(WEDDING_CONFIG.eventDate).getTime();
  const now = Date.now();
  const distance = target - now;
  if (distance <= 0) return setCountdown(0, 0, 0, 0);
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  setCountdown(days, hours, minutes, seconds);
}
function setCountdown(days, hours, minutes, seconds) {
  const d = document.getElementById("days");
  const h = document.getElementById("hours");
  const m = document.getElementById("minutes");
  const s = document.getElementById("seconds");
  if (d) d.textContent = String(days).padStart(2, "0");
  if (h) h.textContent = String(hours).padStart(2, "0");
  if (m) m.textContent = String(minutes).padStart(2, "0");
  if (s) s.textContent = String(seconds).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* =========================================================
   🔧 FUNGSI BACA KOLOM — SUDAH DIPERBAIKI
========================================================= */
function normalizeKey(value) {
  return String(value || "")
    .trim()          // ← HAPUS SPASI DEPAN-BELAKANG OTOMATIS!
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[_\-\/\\]/g, "");
}

function getColumnValue(row, columnName) {
  if (!row) return "";
  const wanted = normalizeKey(columnName);
  for (const key of Object.keys(row)) {
    if (normalizeKey(key) === wanted) {
      return String(row[key] || "").trim(); // ← TRIM NILAINYA JUGA!
    }
  }
  return "";
}

/* =========================================================
   ESCAPE HTML
========================================================= */
function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

/* =========================================================
   AMBIL DATA SHEETDB
========================================================= */
async function getWishes() {
  try {
    const response = await fetch(WEDDING_CONFIG.sheetDB + "?t=" + Date.now(), {
      method: "GET", cache: "no-store"
    });
    if (!response.ok) throw new Error("SheetDB HTTP " + response.status);
    const data = await response.json();
    console.log("DATA SHEETDB:", data);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Gagal mengambil data:", error);
    return [];
  }
}

/* =========================================================
   📤 KIRIM RSVP — SUDAH DIPERBAIKI
========================================================= */
async function sendWish(event) {
  event.preventDefault();
  const form = event.target;
  const nameInput = document.getElementById("wishName");
  const messageInput = document.getElementById("wishMessage");
  const attendanceInput = document.querySelector('input[name="attendance"]:checked');

  const name = nameInput ? nameInput.value.trim() : "";
  const message = messageInput ? messageInput.value.trim() : "";
  const attendance = attendanceInput ? attendanceInput.value.trim() : "";

  if (!name) return alert("Nama harus diisi.");
  if (!attendance) return alert("Silakan pilih konfirmasi kehadiran.");
  if (!message) return alert("Ucapan harus diisi.");

  const button = form.querySelector('button[type="submit"]');
  if (button) { button.disabled = true; button.textContent = "MENGIRIM..."; }

  try {
    // ✅ KIRIM DENGAN NAMA KOLOM SESUAI SHEETDB
    const now = new Date().toLocaleString("id-ID");
    const dataToSend = {
      "Timestamp": now,               // ← Sesuai kolom asli
      "Nama": name,
      "Konfirmasi Kehadiran ": attendance, // ← Sesuai kolom + spasi!
      "Ucapan ": message              // ← Sesuai kolom + spasi!
    };

    console.log("DATA DIKIRIM:", dataToSend);

    const response = await fetch(WEDDING_CONFIG.sheetDB, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: dataToSend })
    });

    const result = await response.json();
    console.log("RESPON SHEETDB:", result);

    if (!response.ok) throw new Error("SheetDB HTTP " + response.status);

    alert("Konfirmasi berhasil dikirim ❤️");
    form.reset();
    await tampilkanUcapan();

  } catch (error) {
    console.error("ERROR RSVP:", error);
    alert("Konfirmasi gagal dikirim. Coba lagi.");
  } finally {
    if (button) { button.disabled = false; button.textContent = "KIRIM UCAPAN"; }
  }
}

/* =========================================================
   UCAPAN
========================================================= */
let showAllWishes = false;

/* =========================================================
   📄 TAMPILKAN UCAPAN — SUDAH DIPERBAIKI
========================================================= */
async function tampilkanUcapan() {
  const list = document.getElementById("wishList");
  if (!list) return;
  const wishes = await getWishes();
  list.innerHTML = "";

  if (wishes.length === 0) {
    list.innerHTML = `<div class="empty-wish">Belum ada ucapan. Jadilah yang pertama memberikan ucapan 🤍</div>`;
    return;
  }

  const reversed = [...wishes].reverse();
  const displayed = showAllWishes ? reversed : reversed.slice(0, 3);

  displayed.forEach(function (wish) {
    // ✅ BACA SEMUA KOLOM DENGAN FUNGSI NORMALISASI → PASTI KETEMU!
    const name = getColumnValue(wish, "Nama") || "Tamu Undangan";
    const attendance = getColumnValue(wish, "Konfirmasi Kehadiran") || "Belum Tahu";
    const message = getColumnValue(wish, "Ucapan") || "";
    const timestamp = getColumnValue(wish, "Timestamp") || "";

    const item = document.createElement("div");
    item.className = "wish";
    item.innerHTML = `
      <strong>${escapeHTML(name)}</strong>
      <span class="wish-attendance">${escapeHTML(attendance)}</span>
      <p>${escapeHTML(message)}</p>
      ${timestamp ? `<span class="wish-time">${escapeHTML(timestamp)}</span>` : ""}
    `;
    list.appendChild(item);
  });

  if (reversed.length > 3) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "show-wishes-btn";
    button.textContent = showAllWishes ? "Sembunyikan Ucapan" : "Lihat Semua Ucapan";
    button.addEventListener("click", () => {
      showAllWishes = !showAllWishes;
      tampilkanUcapan();
    });
    list.appendChild(button);
  }
}

/* =========================================================
   COPY NOMOR REKENING
========================================================= */
function copyAccount() {
  const account = document.getElementById("accountNumber");
  if (!account) return;
  const number = account.textContent.trim();
  if (navigator.clipboard) {
    navigator.clipboard.writeText(number)
      .then(() => alert("Nomor rekening berhasil disalin."))
      .catch(() => alert("Gagal menyalin nomor rekening."));
  }
}

/* =========================================================
   INIT
========================================================= */
document.addEventListener("DOMContentLoaded", function () {
  showGuestName();
  if (document.getElementById("wishList")) tampilkanUcapan();
});
