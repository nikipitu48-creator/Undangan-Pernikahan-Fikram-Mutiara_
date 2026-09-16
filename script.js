/* =========================================================
   FIKRAM & MUTIARA — VERSI DARURAT SAMPAI 19 SEPTEMBER
   ✅ TAMPILKAN DATA DARI CACHE WALAU SHEETDB ERROR
   ✅ KIRIM DATA TETAP BISA (antri sampai limit reset)
========================================================= */

const WEDDING_CONFIG = {
  bride: "Mutiara",
  groom: "Fikram",
  eventDate: "2026-09-19T08:00:00+07:00",
  sheetDB: "https://sheetdb.io/api/v1/3xl1byibvp4iu"
};

// =========================================================
// SISTEM PENYIMPANAN LOKAL — DATA TIDAK HILANG!
// =========================================================
function saveToLocal(data) {
  localStorage.setItem("wishesData", JSON.stringify(data));
  localStorage.setItem("wishesTime", Date.now().toString());
}

function getFromLocal() {
  const d = localStorage.getItem("wishesData");
  return d ? JSON.parse(d) : null;
}

// =========================================================
// NAMA TAMU & PARTIKEL & MUSIK & COUNTDOWN
// =========================================================
function getGuestName() {
  const p = new URLSearchParams(window.location.search);
  return p.get("to") || "Tamu Undangan";
}
function showGuestName() {
  const el = document.getElementById("guestName");
  if (el) el.textContent = getGuestName();
}

function openInvitation() {
  const lobby = document.getElementById("lobby");
  if (!lobby) return;
  lobby.classList.add("hide");
  setTimeout(() => window.location.href = "isii.html" + window.location.search, 800);
}

function createParticles(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let particles = [];
  const count = () => window.innerWidth < 600 ? 45 : 90;
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = Array.from({length: count()}, () => ({
      x: Math.random()*canvas.width, y: Math.random()*canvas.height,
      r: Math.random()*2+0.5, vx: (Math.random()-0.5)*0.35, vy: -(Math.random()*0.5+0.1),
      a: Math.random()*0.6+0.2
    }));
  }
  resize(); window.addEventListener("resize", resize);
  function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.y < -10) {p.y=canvas.height+10; p.x=Math.random()*canvas.width;}
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,235,180,${p.a})`; ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
}
createParticles("lobbyParticles");
createParticles("contentParticles");

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicButton");
function toggleMusic() {
  if (!music) return;
  music.paused ? music.play().then(()=>musicBtn&&(musicBtn.textContent="❚❚")) : (music.pause(), musicBtn&&(musicBtn.textContent="▶"));
}

function updateCountdown() {
  const t = new Date(WEDDING_CONFIG.eventDate).getTime();
  const d = t - Date.now();
  if (d<=0) return setCD(0,0,0,0);
  setCD(
    Math.floor(d/(1000*60*60*24)),
    Math.floor((d%(1000*60*60*24))/(1000*60*60)),
    Math.floor((d%(1000*60*60))/(1000*60)),
    Math.floor((d%(1000*60))/1000)
  );
}
function setCD(d,h,m,s) {
  document.getElementById("days")&&(document.getElementById("days").textContent=String(d).padStart(2,"0"));
  document.getElementById("hours")&&(document.getElementById("hours").textContent=String(h).padStart(2,"0"));
  document.getElementById("minutes")&&(document.getElementById("minutes").textContent=String(m).padStart(2,"0"));
  document.getElementById("seconds")&&(document.getElementById("seconds").textContent=String(s).padStart(2,"0"));
}
updateCountdown(); setInterval(updateCountdown,1000);

function escapeHTML(v) {
  return String(v??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");
}

// =========================================================
// AMBIL DATA — UTAMAKAN LOKAL, SHEETDB SEBAGAI TAMBAHAN
// =========================================================
async function getWishes() {
  const local = getFromLocal();
  try {
    const res = await fetch(WEDDING_CONFIG.sheetDB);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        saveToLocal(data);
        return data;
      }
    }
  } catch (e) {
    console.log("SheetDB tidak bisa diakses, pakai data lokal");
  }
  return local || [];
}

// =========================================================
// KIRIM DATA — DISIMPAN LOKAL DULU, DIKIRIM NANTI
// =========================================================
let pendingQueue = JSON.parse(localStorage.getItem("pendingQueue") || "[]");

async function sendWish(e) {
  e.preventDefault();
  const form = e.target;
  const name = (document.getElementById("wishName")?.value||"").trim();
  const msg = (document.getElementById("wishMessage")?.value||"").trim();
  const attend = document.querySelector('input[name="attendance"]:checked')?.value||"";

  if (!name) return alert("Nama harus diisi");
  if (!attend) return alert("Pilih kehadiran");
  if (!msg) return alert("Ucapan harus diisi");

  const btn = form.querySelector('button[type="submit"]');
  if (btn) { btn.disabled=true; btn.textContent="MENYIMPAN..."; }

  const data = {
    "Timestamp": new Date().toLocaleString("id-ID"),
    "Nama": name,
    "Konfirmasi Kehadiran ": attend,
    "Ucapan ": msg
  };

  // Simpan ke antrian lokal
  pendingQueue.push(data);
  localStorage.setItem("pendingQueue", JSON.stringify(pendingQueue));
  
  // Tambah langsung ke tampilan biar kelihatan
  const allData = getFromLocal() || [];
  allData.push(data);
  saveToLocal(allData);
  
  alert("✅ Terima kasih! Ucapan tersimpan ❤️");
  form.reset();
  tampilkanUcapan();

  // Coba kirim ke SheetDB di belakang layar
  trySendPending();

  if (btn) { btn.disabled=false; btn.textContent="KIRIM UCAPAN"; }
}

// Kirim antrian kalau bisa
async function trySendPending() {
  if (pendingQueue.length === 0) return;
  try {
    for (let i=0; i<pendingQueue.length; i++) {
      await fetch(WEDDING_CONFIG.sheetDB, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({data: pendingQueue[i]})
      });
    }
    pendingQueue = [];
    localStorage.setItem("pendingQueue", "[]");
    // Refresh data dari SheetDB kalau berhasil
    await getWishes();
    tampilkanUcapan();
  } catch (e) {
    console.log("Masih belum bisa kirim, nanti otomatis dicoba lagi");
  }
}

// =========================================================
// TAMPILKAN UCAPAN
// =========================================================
let showAll = false;
let loading = false;

async function tampilkanUcapan() {
  const list = document.getElementById("wishList");
  if (!list || loading) return;
  loading = true; list.innerHTML = "";

  const wishes = await getWishes();

  if (wishes.length === 0) {
    list.innerHTML = `<div class="empty-wish">Belum ada ucapan 🤍</div>`;
    loading = false; return;
  }

  const reversed = [...wishes].reverse();
  const displayed = showAll ? reversed : reversed.slice(0,3);

  displayed.forEach(w => {
    const item = document.createElement("div");
    item.className = "wish";
    item.innerHTML = `
      <strong>${escapeHTML(w["Nama"]||"Tamu Undangan")}</strong>
      <span class="wish-attendance">${escapeHTML(w["Konfirmasi Kehadiran "]||"Belum Tahu")}</span>
      <p>${escapeHTML(w["Ucapan "]||"")}</p>
      ${w["Timestamp"]?`<span class="wish-time">${escapeHTML(w["Timestamp"])}</span>`:""}
    `;
    list.appendChild(item);
  });

  if (reversed.length>3) {
    const btn = document.createElement("button");
    btn.className="show-wishes-btn";
    btn.textContent = showAll ? "Sembunyikan" : "Lihat Semua Ucapan";
    btn.onclick = () => { showAll=!showAll; tampilkanUcapan(); };
    list.appendChild(btn);
  }
  loading = false;
}

function copyAccount() {
  const el = document.getElementById("accountNumber");
  if (!el) return;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(el.textContent.trim()).then(()=>alert("✅ Disalin!"));
  } else alert("❌ Browser tidak mendukung");
}

document.addEventListener("DOMContentLoaded", () => {
  showGuestName();
  if (document.getElementById("wishList")) tampilkanUcapan();
  trySendPending(); // Coba kirim antrian lama
});
