// =========================================================
// Sharshal Enterprises — Interactivity (Phase 4)
// =========================================================

// ---------- 1. Mobile nav toggle (+ backdrop) ----------
const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.querySelector('.primary-nav');
const navBackdrop = document.getElementById('navBackdrop');

function closeNav() {
  primaryNav.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navBackdrop.classList.remove('active');
}

function toggleNav() {
  const isOpen = primaryNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
  navBackdrop.classList.toggle('active', isOpen);
}

navToggle.addEventListener('click', toggleNav);
navBackdrop.addEventListener('click', closeNav);

document.querySelectorAll('.primary-nav a').forEach((link) => {
  link.addEventListener('click', closeNav);
});


// ---------- 2. Service card accordion ----------
// Each service card starts collapsed; clicking the heading expands it.
document.querySelectorAll('.service-card').forEach((card) => {
  const heading = card.querySelector('h3');
  const list = card.querySelector('ul');

  list.classList.add('collapsed');
  heading.setAttribute('aria-expanded', 'false');
  heading.setAttribute('tabindex', '0');

  function toggleCard() {
    const isCollapsed = list.classList.toggle('collapsed');
    heading.setAttribute('aria-expanded', String(!isCollapsed));
  }

  heading.addEventListener('click', toggleCard);
  heading.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleCard();
    }
  });
});


// ---------- 3. Contact form validation + mailto send ----------
// Plain HTML forms with action="mailto:..." are unreliable across
// browsers, so instead we validate the fields ourselves, then build
// a mailto: link (with the message pre-filled) and open it directly.

const contactForm = document.getElementById('contactForm');

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const messageInput = document.getElementById('message');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const messageError = document.getElementById('messageError');

// Simple patterns — good enough for front-end validation,
// not meant to catch every technically-invalid input.
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+\-\s()]{7,}$/;

function showError(input, errorEl, message) {
  input.classList.add('invalid');
  errorEl.textContent = message;
}

function clearError(input, errorEl) {
  input.classList.remove('invalid');
  errorEl.textContent = '';
}

function validateForm() {
  let isValid = true;

  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const phoneValue = phoneInput.value.trim();
  const messageValue = messageInput.value.trim();

  if (nameValue === '') {
    showError(nameInput, nameError, 'Please enter your name.');
    isValid = false;
  } else {
    clearError(nameInput, nameError);
  }

  if (emailValue === '') {
    showError(emailInput, emailError, 'Please enter your email.');
    isValid = false;
  } else if (!emailPattern.test(emailValue)) {
    showError(emailInput, emailError, 'Please enter a valid email address.');
    isValid = false;
  } else {
    clearError(emailInput, emailError);
  }

  // Phone is now required, same pattern as the other fields.
  if (phoneValue === '') {
    showError(phoneInput, phoneError, 'Please enter your phone number.');
    isValid = false;
  } else if (!phonePattern.test(phoneValue)) {
    showError(phoneInput, phoneError, 'Please enter a valid phone number.');
    isValid = false;
  } else {
    clearError(phoneInput, phoneError);
  }

  if (messageValue === '') {
    showError(messageInput, messageError, 'Please enter a message.');
    isValid = false;
  } else {
    clearError(messageInput, messageError);
  }

  return isValid;
}


// ---------- 4. Quick-message buttons ----------
// Clicking a pill fills the message box with a preset line, so the
// visitor can send an enquiry without typing anything if they don't want to.
document.querySelectorAll('.quick-message-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    messageInput.value = btn.dataset.message;
    messageInput.focus();

    document.querySelectorAll('.quick-message-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
  });
});


// ---------- 5. Submit handler ----------
contactForm.addEventListener('submit', (event) => {
  event.preventDefault(); // stop the default form submission every time

  if (!validateForm()) {
    return; // stop here if any field failed validation
  }

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  const message = messageInput.value.trim();

  const subject = encodeURIComponent(`Website enquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`);

  // Opens the visitor's email app with the message pre-filled,
  // addressed to Sharshal Enterprises.
  window.location.href = `mailto:sharshalenterprises17@gmail.com?subject=${subject}&body=${body}`;

  contactForm.reset();
});
