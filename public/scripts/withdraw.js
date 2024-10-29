// Sidebar Menu Toggle
function toggleMenu() {
  document.getElementById("menu").classList.toggle("open");
}

// Navigation Function (client-side navigation using HTML files)
function navigateTo(page) {
  window.location.href = page;
}

// Social Sharing Functions
function share_wa() {
  window.location.href = `whatsapp://send?text=${encodeURIComponent(
    "https://earnease.shop/22034937370364911/?s=wt"
  )}`;
}

function share_ms() {
  window.location.href = `fb-messenger://share/?link=${encodeURIComponent(
    "https://earnease.shop/22034937370364911/?s=ms"
  )}`;
}

function share_fb() {
  window.location.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    "https://earnease.shop/22034937370364911/?s=fb"
  )}`;
}

// Placeholder functions for alert-based menu items
function menuFAQ() {
  alert("FAQ clicked");
}

function menuLanguage() {
  alert("Language clicked");
}

function menuRule() {
  alert("Rules clicked");
}
