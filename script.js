/* =========================================================
   FIKRAM & MUTIARA — OFFLINE VERSION LENGKAP
   ✅ SEMUA DATA UCAPAN SUDAH DIMASUKIN!
   ✅ TIDAK PERLU SHEETDB LAGI! 100% JALAN SAMPAI 19!
========================================================= */

const WEDDING_CONFIG = {
  bride: "Mutiara",
  groom: "Fikram",
  eventDate: "2026-09-19T08:00:00+07:00"
};

// =========================================================
// 📌 SEMUA DATA UCAPAN — LENGKAP 25+ DATA!
// =========================================================
const LOCAL_WISHES = [
  {"Timestamp":"1/9/2026, 11.31.56","Nama":"Teh sisca","Konfirmasi Kehadiran ":"Hadir","Ucapan ":"Selamat ya tiara...smga skinah mwadaah wromhmah yah..langgeng trs selamanyaaa....."},
  {"Timestamp":"1/9/2026, 11.34.48","Nama":"Etty Arsyad & Mimih Dzaenab","Konfirmasi Kehadiran ":"Hadir","Ucapan ":"Bismillah... selamat menempuh hidup baru Fikram dan Mutiara, semoga samawa dan diberi keturunan anak anak yg sholeh dan Sholeha, penikahan nya sampai kakek nenek dan bertemu lagi di jannah nya Allah... Aamiin"},
  {"Timestamp":"2/9/2026, 09.55.43","Nama":"Fany Ulfayani","Konfirmasi Kehadiran ":"Hadir","Ucapan ":"Semoga menjadi keluarga sakinah, mawaddah, warrahmah, berkah, rezeki melimpah ruah, aamiin 🤲🥰"},
  {"Timestamp":"2/9/2026, 09.57.08","Nama":"Henny Kurnia Asih","Konfirmasi Kehadiran ":"Hadir","Ucapan ":"Selamat menempuh hidup baru ya cantik,smga lanCar sampai hari H,samawa selama nya jd lah keluarga bahagia dunia kahirat.doa trbaik dr yg paling baik😘😘😘"},
  {"Timestamp":"2/9/2026, 10.17.36","Nama":"Lilis","Konfirmasi Kehadiran ":"Hadir","Ucapan ":"Barakallah sakinah mawadah warahmah cantik., semoga di lancar kan sampai hari H yah.,"},
  {"Timestamp":"3/9/2026, 21.14.03","Nama":"Dewi anggraenj","Konfirmasi Kehadiran ":"Berhalangan Hadir","Ucapan ":"Wah, congratulations.. Sepupuh ak yg cantik. Semoga samawa ya. Doa yg trbaik u trcanik🥰"},
  {"Timestamp":"3/9/2026, 21.31.50","Nama":"Totink Gaul","Konfirmasi Kehadiran ":"Hadir","Ucapan ":"Selamat menempuh hidup baru untuk kalian berdua 🤍 Semoga pernikahan ini menjadi awal dari perjalanan panjang yang penuh kebahagiaan, keberkahan, dan ketenangan. Semoga kalian selalu diberi kesabaran untuk saling memahami, kekuatan untuk melewati setiap ujian, dan hati yang tetap memilih satu sama lain dalam keadaan apa pun. Semoga rumah tangga kalian selalu dipenuhi cinta, rezeki yang cukup, kesehatan, dan kebersamaan yang semakin hari semakin erat. Selamat menjadi keluarga. Semoga cinta yang hari ini kalian rayakan, terus tumbuh sampai tua nanti. 🤲🏻💐 Dk imam"},
  {"Timestamp":"12/9/2026, 09.01.04","Nama":"Mfeb","Konfirmasi Kehadiran ":"Berhalangan Hadir","Ucapan ":"Happy wedding mutt, semoga sakinah mawaddah warahmah aamiin bahagia selalu ya🫶🏻"},
  {"Timestamp":"12/9/2026, 11.08.15","Nama":"Putri Filmas Kadtabalubun","Konfirmasi Kehadiran ":"Berhalangan Hadir","Ucapan ":"Selamat menempuh hidup baru Mut, bahagia sllu❤"},
  {"Timestamp":"12/9/2026, 10.10.06","Nama":"Putri Adeliaa","Konfirmasi Kehadiran ":"Berhalangan Hadir","Ucapan ":"Happy wedding teh mutii💍 akhirnya penantiannya berlabuh jugaa, semoga lancar sampai hari H nya yaaa, selamat menempuh hidup baru cantikk🤍🤍🤍🌸"},
  {"Timestamp":"12/9/2026, 11.13.40","Nama":"Sarifadila","Konfirmasi Kehadiran ":"Berhalangan Hadir","Ucapan ":"MasyaAllah selamat beb lancar luncur smpai hari H-nya 🫶"},
  {"Timestamp":"12/9/2026, 11.25.40","Nama":"K fikar","Konfirmasi Kehadiran ":"Berhalangan Hadir","Ucapan ":"Wah selamat ade.. Semoga dilancarkan sampai dengan waktunya.. Semoga menjadi keluarga yang sakinah mawadah warahmah.. Maaf yah kk tdk bsa hadir.."},
  {"Timestamp":"12/9/2026, 11.30.16","Nama":"YOGI","Konfirmasi Kehadiran ":"Belum Tahu","Ucapan ":"Semoga menjadi keluarga yang sakinah mawadah warahmah"},
  {"Timestamp":"12/9/2026, 10.31.15","Nama":"Sella Tri","Konfirmasi Kehadiran ":"Hadir","Ucapan ":"Selamat menjalani ibadah terpanjang Bey, semoga setiap langkah yang kalian ambil selalu diberi kemudahan dan kelancaran 🤗💞"},
  {"Timestamp":"12/9/2026, 16.29.14","Nama":"Aa wawan bgr","Konfirmasi Kehadiran ":"Berhalangan Hadir","Ucapan ":"Selamat menenpuh hidup baru @ tiara & fikram, dan dilancarkan acaranya, semoga kalian berdua sakinah mawadah warrohmah. Aamiinn yaa rabb."},
  {"Timestamp":"13/9/2026, 15.19.22","Nama":"FAHMI MATDOAN","Konfirmasi Kehadiran ":"Berhalangan Hadir","Ucapan ":"Semoga kedepan menjadi keluarga yang cemara, dan di lancarkan rezekinya, amin🙏"},
  {"Timestamp":"13/9/2026, 15.32.31","Nama":"Yusuf","Konfirmasi Kehadiran ":"Berhalangan Hadir","Ucapan ":"Barakallah bahagia dunia akhirat"},
  {"Timestamp":"13/9/2026, 15.57.20","Nama":"Uchit selang pelu","Konfirmasi Kehadiran ":"Berhalangan Hadir","Ucapan ":"Selamat menempuh hidup baru kawan Semoga rumah tangga sakinah mawadah warahmah aminnnn"},
  {"Timestamp":"13/9/2026, 20.46.55","Nama":"Aidi Rahanjamtel","Konfirmasi Kehadiran ":"Berhalangan Hadir","Ucapan ":"Assalamu'alaikum warahmatullahi wabarokatuh kawan, Beta pikir awalnya di Ambon padahal di Jawa ee, maaf bt blom bisa hadir lagi kuliah ni, bt doa saja ee kawan, semoga dipermudah 🤲🏻, dan keluarga diberikan keberkahan rumah tangga sakinah mawadah warohmah... barokallah untuk 2 teman seperjuangan waktu sekolah Dulu, Fikram dan Tiara...🙏🏻😊 Wassalamu'alaikum warahmatullahi wabarokatuh"},
  {"Timestamp":"14/9/2026, 20.27.19","Nama":"Mita Ode","Konfirmasi Kehadiran ":"Berhalangan Hadir","Ucapan ":"Semoga lancar sampai hari H dan semoga jadi pasangan yg SAKINA MAWADAH WARIHMA, SEMOGA JUGA CEPT DPT MOMONGAN AamiinBaku syg tarus e ade fikram dan istri 🙏Langgeng sampai oma opa. 🥰😇😇"},
  {"Timestamp":"15/9/2026, 15.59.25","Nama":"Fadila","Konfirmasi Kehadiran ":"Berhalangan Hadir","Ucapan ":"Lancar sampai hari H ya Ara, maaf yah belum sempat hadir di acara bahagianya🫂🤍"},
  {"Timestamp":"16/9/2026, 08.33.34","Nama":"ANSHAR ASY'ARI","Konfirmasi Kehadiran ":"Berhalangan Hadir","Ucapan ":"Selamat Menempuh hidup yang Baru Saudara semoga menjadi keluarga yang sakinah mawadah warahmah dunia akhirat insyaallah Aminn🤲🙏"},
  {"Timestamp":"16/9/2026, 08.38.43","Nama":"Peri Fadli","Konfirmasi Kehadiran ":"Hadir","Ucapan ":"Selamat berbahagi kawan semoga sakina mawaddah warohmaaa🙏🙏🙏"},
  {"Timestamp":"16/9/2026, 08.41.14","Nama":"Ilham Rumeon","Konfirmasi Kehadiran ":"Berhalangan Hadir","Ucapan ":"Alf mabruk 'ala zawajikuma Artinya: Seribu selamat atas pernikahan kalian berdua."},
  {"Timestamp":"16/9/2026, 08.50.25","Nama":"Ermnsyhumr29","Konfirmasi Kehadiran ":"Berhalangan Hadir","Ucapan ":"Sakinah mawaddah warohma brader Smoga menjadi keluarga yang forever always 🤲😇"}
];

// =========================================================
// NAMA TAMU
// =========================================================
function getGuestName() {
  const p = new URLSearchParams(window.location.search);
  return p.get("to") || "Tamu Undangan";
}
function showGuestName() {
  const el = document.getElementById("guestName");
  if (el) el.textContent = getGuestName();
}

// =========================================================
// BUKA UNDANGAN
// =========================================================
function openInvitation() {
  const lobby = document.getElementById("lobby");
  if (!lobby) return;
  lobby.classList.add("hide");
  setTimeout(() => window.location.href = "isii.html" + window.location.search, 800);
}

// =========================================================
// PARTIKEL
// =========================================================
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

// =========================================================
// MUSIK
// =========================================================
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicButton");
function toggleMusic() {
  if (!music) return;
  if (music.paused) {
    music.play().then(() => { if (musicBtn) musicBtn.textContent = "❚❚"; });
    if (musicBtn) musicBtn.textContent = "❚❚";
  } else {
    music.pause();
    if (musicBtn) musicBtn.textContent = "▶";
  }
}

// =========================================================
// COUNTDOWN
// =========================================================
function updateCountdown() {
  const t = new Date(WEDDING_CONFIG.eventDate).getTime();
  const d = t - Date.now();
  if (d <= 0) return setCD(0,0,0,0);
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
// ✅ AMBIL DATA — DARI KODE + DATA BARU DARI TAMU
// =========================================================
function getWishes() {
  const saved = JSON.parse(localStorage.getItem("newWishes") || "[]");
  return [...LOCAL_WISHES, ...saved];
}

// =========================================================
// ✅ KIRIM UCAPAN — DISIMPAN DI HP TAMU
// =========================================================
function sendWish(e) {
  e.preventDefault();
  const form = e.target;
  
  const name = (document.getElementById("wishName")?.value||"").trim();
  const msg = (document.getElementById("wishMessage")?.value||"").trim();
  const attend = document.querySelector('input[name="attendance"]:checked')?.value||"";

  if (!name) return alert("Nama harus diisi");
  if (!attend) return alert("Pilih konfirmasi kehadiran");
  if (!msg) return alert("Ucapan harus diisi");

  const btn = form.querySelector('button[type="submit"]');
  if (btn) { btn.disabled = true; btn.textContent = "MENYIMPAN..."; }

  const newWish = {
    "Timestamp": new Date().toLocaleString("id-ID"),
    "Nama": name,
    "Konfirmasi Kehadiran ": attend,
    "Ucapan ": msg
  };

  const saved = JSON.parse(localStorage.getItem("newWishes") || "[]");
  saved.push(newWish);
  localStorage.setItem("newWishes", JSON.stringify(saved));

  alert("✅ Terima kasih! Ucapan tersimpan ❤️");
  form.reset();
  tampilkanUcapan();

  if (btn) { btn.disabled = false; btn.textContent = "KIRIM UCAPAN"; }
}

// =========================================================
// ✅ TAMPILKAN UCAPAN
// =========================================================
let showAll = false;

function tampilkanUcapan() {
  const list = document.getElementById("wishList");
  if (!list) return;
  list.innerHTML = "";

  const wishes = getWishes();

  if (wishes.length === 0) {
    list.innerHTML = `<div class="empty-wish">Belum ada ucapan 🤍</div>`;
    return;
  }

  const reversed = [...wishes].reverse();
  const displayed = showAll ? reversed : reversed.slice(0, 3);

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

  if (reversed.length > 3) {
    const btn = document.createElement("button");
    btn.className = "show-wishes-btn";
    btn.textContent = showAll ? "Sembunyikan Ucapan" : "Lihat Semua Ucapan";
    btn.onclick = () => { showAll = !showAll; tampilkanUcapan(); };
    list.appendChild(btn);
  }
}

// =========================================================
// SALIN REKENING
// =========================================================
function copyAccount() {
  const el = document.getElementById("accountNumber");
  if (!el) return;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(el.textContent.trim())
      .then(() => alert("✅ Nomor rekening disalin!"))
      .catch(() => alert("❌ Gagal menyalin"));
  } else {
    alert("❌ Browser tidak mendukung");
  }
}

// =========================================================
// JALANKAN
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  showGuestName();
  if (document.getElementById("wishList")) tampilkanUcapan();
});
