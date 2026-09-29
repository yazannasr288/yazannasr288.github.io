const projectData = {
  ecommerce: {
    kicker: '01 / FLUTTER E-COMMERCE SYSTEM',
    title: 'Flutter E-Commerce System',
    description: 'A complete multi-application e-commerce system with customer, admin and delivery apps connected to a shared PHP/MySQL backend.',
image: 'assets/ecommerce.png',
    repo: 'https://github.com/yazannasr288/flutter-ecommerce-system',
    features: ['Customer shopping flow with search, favorites, cart, coupons and checkout', 'Admin dashboard for products, categories, offers, coupons, deliveries and orders', 'Delivery workflow with assigned orders, tracking and map integration', 'Push notifications, Arabic/English localization and Google Maps integration'],
    tech: ['Flutter', 'Dart', 'GetX', 'PHP', 'MySQL', 'Firebase Cloud Messaging', 'Google Maps', 'SQLite']
  },
  chat: {
    kicker: '02 / ALWATANYA CHAT',
    title: 'University Communication & Group Chat',
    description: 'A university-focused communication platform built around real-time groups, secure role management, media sharing and server-side administrative workflows.',
image: 'assets/chat.png',    repo: 'https://github.com/yazannasr288/university-chat-app',
    features: ['Real-time group chat with text, image, video, file and audio sharing', 'Role-based access with multiple administrative levels', 'Push and local notifications plus managed notification campaigns', 'Admin dashboard for users, groups, events, credentials and audit-oriented workflows'],
    tech: ['Flutter', 'Firebase Auth', 'Firestore', 'Storage', 'Cloud Functions', 'TypeScript', 'FCM', 'Secure Storage']
  },
  callme: {
    kicker: '03 / CALLME',
    title: 'Voice & Video Calling',
    description: 'A Flutter calling application that combines a simple user directory with real-time voice and video calls through ZEGO UI Kit and backend integration.',
image: 'assets/callme.png',    repo: 'https://github.com/yazannasr288/callme-flutter',
    features: ['Username and ID based registration/sign-in', 'User directory backed by PHP endpoints', 'One-tap voice and video calling', 'Persistent login state and ZEGO signaling/calling integration'],
    tech: ['Flutter', 'Dart', 'ZEGO UI Kit', 'ZEGO Signaling', 'PHP', 'Firebase', 'HTTP', 'Shared Preferences']
  },
  wedding: {
    kicker: '04 / WEDDING QR LOCAL APP',
    title: 'Offline Invitation & QR Control',
    description: 'An offline-first event entry system for creating invitations, generating compact QR codes and validating one-time guest entry locally.',
image: 'assets/wedding.png',    repo: 'https://github.com/yazannasr288/wedding-qr-local-app',
    features: ['Create single or bulk invitations and generate unique QR codes', 'Camera scanning with one-time validation and reuse prevention', 'Local SQLite storage and scan logging without a remote backend', 'Dashboard, search, invitation editing and Arabic RTL interface'],
    tech: ['Flutter', 'Dart', 'SQLite', 'Sqflite', 'QR Flutter', 'Mobile Scanner', 'UUID', 'Material 3']
  },
  shopsmart: {
    kicker: '05 / SHOPSMART',
    title: 'Modern Flutter Shopping App',
    description: 'A clean shopping experience using Firebase services for authentication and cloud product data, with a responsive Material-based interface.',
image: 'assets/shopsmart.png',    repo: 'https://github.com/yazannasr288/shopsmart',
    features: ['Email/password and Google authentication', 'Categories, search, product browsing and recently viewed items', 'Shopping cart, wishlist, orders and address management', 'Light/dark mode with persisted user preference'],
    tech: ['Flutter', 'Dart', 'Firebase Auth', 'Firestore', 'Google Sign-In', 'Provider', 'Shared Preferences', 'Material Design']
  },
  quraan: {
    kicker: '06 / QURAAN APP',
    title: 'Offline Arabic Qur’an Reader',
    description: 'A lightweight Flutter reader with local Surah data, right-to-left Arabic support and a focused Material 3 reading experience.',
image: 'assets/quraan.png',    repo: 'https://github.com/yazannasr288/quraan-app',
    features: ['Browse all Surahs from an organized list', 'Read verses from local application assets', 'Offline-first reading experience', 'RTL Arabic support with custom branding and lightweight navigation'],
    tech: ['Flutter', 'Dart', 'Material 3', 'Local Assets', 'RTL UI']
  }
};

const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const menuBtn = document.getElementById('menuBtn');
const header = document.querySelector('.site-header');
const backTop = document.getElementById('backTop');
const cursorGlow = document.getElementById('cursorGlow');
const modal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');

function setTheme(light) {
  root.classList.toggle('light', light);
  themeIcon.textContent = light ? '☾' : '☼';
  localStorage.setItem('yazan-theme', light ? 'light' : 'dark');
}

setTheme(localStorage.getItem('yazan-theme') === 'light');
themeToggle?.addEventListener('click', () => setTheme(!root.classList.contains('light')));

menuBtn?.addEventListener('click', () => {
  const open = header.classList.toggle('nav-open');
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menuBtn.textContent = open ? '×' : '☰';
});

document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => {
  header.classList.remove('nav-open');
  menuBtn.textContent = '☰';
}));

window.addEventListener('mousemove', e => {
  if (!cursorGlow) return;
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

window.addEventListener('scroll', () => backTop.classList.toggle('show', window.scrollY > 700));
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.project-card');
filterButtons.forEach(btn => btn.addEventListener('click', () => {
  filterButtons.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const filter = btn.dataset.filter;
  cards.forEach(card => {
    const tags = card.dataset.tags.split(' ');
    const show = filter === 'all' || tags.includes(filter);
    card.classList.toggle('is-hidden', !show);
  });
}));

function openProject(key) {
  const data = projectData[key];
  if (!data) return;
  document.getElementById('modalKicker').textContent = data.kicker;
  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalDescription').textContent = data.description;
  const features = document.getElementById('modalFeatures');
  features.innerHTML = data.features.map(item => `<li>${item}</li>`).join('');
  document.getElementById('modalTech').innerHTML = data.tech.map(item => `<span>${item}</span>`).join('');
  document.getElementById('modalRepo').href = data.repo;
  const media = document.getElementById('modalMedia');
  media.innerHTML = `<img src="${data.image}" alt="${data.title}" onerror="this.style.display='none'" />`;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeProject() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.project-open').forEach(btn => btn.addEventListener('click', () => openProject(btn.dataset.project)));
modalClose.addEventListener('click', closeProject);
document.querySelector('[data-close-modal]')?.addEventListener('click', closeProject);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeProject(); });
