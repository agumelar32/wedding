/** @format */

// ==============================
// Ambil Nama Tamu dari URL
// ==============================
const urlParams = new URLSearchParams(window.location.search);
const namaTamu = urlParams.get("kepada") || "Tamu Spesial";
const spanTamu = document.querySelector(".nama_url");

// Tampilkan nama tamu
if (spanTamu) spanTamu.textContent = namaTamu;

// Tambahkan meta description dinamis
const meta = document.createElement("meta");
meta.name = "description";
meta.content = `Kepada yang Terhormat ${namaTamu}`;
document.head.appendChild(meta);

// ==============================
// Animasi Pembuka (GSAP)
// ==============================
const tombolBuka = document.querySelector(".tombol");
const music = document.getElementById("bgMusic");
const bottomNav = document.getElementById("bottomNav");

if (tombolBuka) {
  tombolBuka.addEventListener("click", () => {
    const cover = document.querySelector("#cover");
    const main = document.getElementById("home");
    const staggerElements = document.querySelectorAll(".stagger_animation");

    cover.classList.add("active");
    main.classList.add("show");
    staggerElements.forEach((el) => el.classList.add("active"));

    gsap.to(".active", {
      duration: 0.5,
      stagger: 0.3,
      clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
    });

    if (music && !musicPlayed) {
  music.volume = 0.7;
  music.play().then(() => {
    musicPlayed = true;
    console.log("Music started");
  }).catch(err => {
    console.log("Music blocked:", err);
  });
}

// ==============================
// Buka Undangan (Fade Out Cover)
// ==============================
const bukaUndangan = document.querySelector(".buka_undangan");

if (bukaUndangan) {
  bukaUndangan.addEventListener("click", () => {
    const cover = document.getElementById("cover");
    const mainContent = document.getElementById("mainContent");

    gsap.to(cover, {
      duration: 1,
      opacity: 0,
      onComplete: () => {
        cover.style.display = "none";
        mainContent.style.display = "block";

        gsap.from(mainContent, { duration: 1, opacity: 0, y: 50 });
        if (bottomNav) bottomNav.style.display = "flex";
        if (music) music.play();
      },
    });
  });
}

// ==============================
// Smooth Scroll Navigasi Bawah
// ==============================
const navLinks = document.querySelectorAll("#bottomNav ul li a");

navLinks.forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

// ==============================
// Highlight Menu Aktif Saat Scroll
// ==============================
const sections = document.querySelectorAll(
  "#cover, #coupleSection, #weddingEvent, #gallerySection, #wishesSection",
);

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// ==============================
// Countdown Timer
// ==============================
const targetDate = new Date("2025-07-22T18:00:00").getTime();
const hari = document.querySelector(".hari");
const jam = document.querySelector(".jam");
const menit = document.querySelector(".menit");
const detik = document.querySelector(".detik");

setInterval(() => {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) return;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (hari) hari.textContent = days;
  if (jam) jam.textContent = hours;
  if (menit) menit.textContent = minutes;
  if (detik) detik.textContent = seconds;
}, 1000);

// ==============================
// Inisialisasi Swiper Gallery
// ==============================
window.addEventListener("load", () => {
  new Swiper(".gallery-swiper", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    effect: "fade",
    speed: 800,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});

