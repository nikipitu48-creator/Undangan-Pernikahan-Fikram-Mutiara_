/* =========================================================
   FIKRAM & MUTIARA
   SCRIPT.JS — FIXED VERSION
   ✅ Sesuai nama kolom di spreadsheet
   ✅ Sistem cache hemat request SheetDB
   ✅ Timestamp & kehadiran tampil benar
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
  if (!lobby) {
    console.log("Sudah di halaman isi");
    return;
  }
  lobby.classList.add("hide");
  setTimeout(() => {
    window.location.href = "isii.html" + window.location.search;
  }, 800);
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

  function resize() {
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
  }

  resize();
  window.addEventListener("resize", resize);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,235,180,${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

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
    music.play().then(() => {
      if (musicButton) musicButton.textContent = "❚❚";
    }).catch(e => console.log("Musik gagal:", e));
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

  if (distance <= 0) {
    setCountdown(0, 0, 0, 0);
    return;
  }

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
   SISTEM CACHE — HEMAT REQUEST SHEETDB
========================================================= */
let localCache = {
  data: null,
  time: 0,
  ttl: 10 * 60 * 1000 // 10 menit
};

function isCacheValid() {
  return localCache.data && (Date.now() - localCache.time) < localCache.ttl;
}

/* =========================================================
   AMBIL DATA SHEETDB
========================================================= */
async function getWishes() {
  // Pakai cache kalau masih baru
  if (isCacheValid()) {
    console.log("✅ Pakai cache lokal");
    return localCache.data;
  }

  try {
    console.log("🔄 Ambil data baru dari SheetDB");
    const response = await fetch(WEDDING_CONFIG.sheetDB);
    
    if (!response.ok) throw new Error("Error: " + response.status);
    
    const data = await response.json();
    
    // Simpan ke cache
    localCache.data = Array.isArray(data) ? data : [];
    localCache.time = Date.now();
    
    return localCache.data;
  } catch (error) {
    console.error("❌ Gagal ambil data:", error);
    // Kalau gagal, tetap pakai cache lama kalau ada
    if (localCache.data) {
      console.log("⚠️ Pakai cache lama karena error");
      return localCache.data;
    }
    return [];
  }
}


/* =========================================================
   AMANKAN HTML
========================================================= */
function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


/* =========================================================
   KIRIM RSVP
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

  if (!name) { alert("Nama harus diisi."); return; }
  if (!attendance) { alert("Pilih konfirmasi kehadiran."); return; }
  if (!message) { alert("Ucapan harus diisi."); return; }

  const button = form.querySelector('button[type="submit"]');
  if (button) { button.disabled = true; button.textContent = "MENGIRIM..."; }

  try {
    const now = new Date().toLocaleString("id-ID");

    // ⚠️ NAMA KOLOM HARUS SAMA PERSIS DENGAN SPASI DI BELAKANG!
    const dataToSend = {
      "Timestamp": now,
      "Nama": name,
      "Konfirmasi Kehadiran ": attendance,
      "Ucapan ": message
    };

    const response = await fetch(WEDDING_CONFIG.sheetDB, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: dataToSend })
    });

    if (!response.ok) throw new Error("HTTP " + response.status);

    // Hapus cache biar data baru langsung muncul
    localCache.data = null;
    
    alert("✅ Konfirmasi berhasil dikirim! Terima kasih ❤️");
    form.reset();
    await tampilkanUcapan();

  } catch (error) {
    console.error("❌ Error kirim:", error);
    alert("❌ Gagal dikirim. Coba lagi nanti ya.");
  } finally {
    if (button) { button.disabled = false; button.textContent = "KIRIM UCAPAN"; }
  }
}


/* =========================================================
   TAMPILKAN UCAPAN — ✅ SESUAI NAMA KOLOM DI SHEET
========================================================= */
let showAllWishes = false;
let wishesDisplaying = false;

async function tampilkanUcapan() {
  const list = document.getElementById("wishList");
  if (!list) return;
  if (wishesDisplaying) return;
  
  wishesDisplaying = true;
  list.innerHTML = "";

  try {
    const wishes = await getWishes();

    if (wishes.length === 0) {
      list.innerHTML = `<div class="empty-wish">Belum ada ucapan. Jadilah yang pertama 🤍</div>`;
      return;
    }

    // Urutkan dari terbaru
    const reversed = [...wishes].reverse();
    const displayed = showAllWishes ? reversed : reversed.slice(0, 3);

    displayed.forEach(wish => {
      // ⚠️ PAKAI NAMA KOLOM PERSIS TERMASUK SPASI!
      const name = wish["Nama"] || "Tamu Undangan";
      const attendance = wish["Konfirmasi Kehadiran "] || "Belum Tahu";
      const message = wish["Ucapan "] || "";
      const timestamp = wish["Timestamp"] || "";

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

    // Tombol Lihat Semua
    if (reversed.length > 3) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "show-wishes-btn";
      btn.textContent = showAllWishes ? "Sembunyikan Ucapan" : "Lihat Semua Ucapan";
      btn.addEventListener("click", () => {
        showAllWishes = !showAllWishes;
        tampilkanUcapan();
      });
      list.appendChild(btn);
    }

  } catch (error) {
    console.error("❌ Tampil error:", error);
  } finally {
    wishesDisplaying = false;
  }
}


/* =========================================================
   COPY REKENING
========================================================= */
function copyAccount() {
  const account = document.getElementById("accountNumber");
  if (!account) return;
  const number = account.textContent.trim();
  
  if (navigator.clipboard) {
    navigator.clipboard.writeText(number)
      .then(() => alert("✅ Nomor rekening disalin!"))
      .catch(() => alert("❌ Gagal menyalin"));
  } else {
    alert("❌ Browser tidak mendukung");
  }
}


/* =========================================================
   INIT
========================================================= */
document.addEventListener("DOMContentLoaded", function () {
  showGuestName();
  if (document.getElementById("wishList")) {
    tampilkanUcapan();
  }
});
