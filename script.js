// Personalize these four values before sharing; leave a bracketed placeholder to omit it.
const PERSONAL_DETAILS = {
  herName: "[HER NAME]",
  yourName: "[YOUR NAME]",
  nicknames: "Babi",
  specialMemory: "[OUR SPECIAL MEMORY]"
};

const letterText = "Seventy-one months of us. When I think about everything we’ve shared, I feel so grateful for every memory, every laugh, and every quiet moment that became ours. We’ve faced challenges along the way, and through them, my love for you has kept growing. Thank you for continuing to meet me with your heart and for sharing this life with me. I hope we get to make many more beautiful memories, months, and years together. Today and always, I’m so glad it’s you.";

const loveMessages = [
  "You make ordinary days feel like the best ones.",
  "My heart still does a little happy dance when I think of you.",
  "Loving you is my favorite thing to do.",
  "You make my world softer, brighter, and a little more magical.",
  "If I had to choose again, I’d still choose you. Every time.",
  "You are the sweetest part of every version of my day.",
  "My favorite place is wherever I get to be close to you.",
  "Thank you for being exactly, wonderfully you.",
  "I love the life we’re making, one little moment at a time.",
  "You are my favorite thought to come back to.",
  "With you, even the quiet feels like a love story.",
  "You make my heart feel understood.",
  "I’m so lucky that out of everyone, I get to love you.",
  "You’re the lovely little plot twist my heart always needed.",
  "Every month with you gives me one more reason to be grateful.",
  "My heart has a soft spot, and it’s shaped exactly like you.",
  "You bring out the gentlest, happiest parts of me.",
  "I hope you know how deeply and endlessly you are loved.",
  "The best thing about tomorrow is that I get to keep loving you.",
  "You make forever sound like the loveliest idea.",
  "I still get butterflies, and I have a feeling you’re responsible.",
  "You are my favorite reason to smile at my phone.",
  "No grand gesture needed. A life with you is already the grandest gift.",
  "Thank you for making room for my heart in yours.",
  "You are cherished in all the little moments and all the big ones.",
  "I love who I am beside you, and I love who you are all on your own.",
  "You’re the person I want beside me for every new chapter.",
  "Being loved by you is a feeling I never want to take for granted.",
  "Even my most ordinary days have a little sparkle because of you.",
  "If love is a language, you are my favorite thing to say.",
  "I’m proud of the love we keep choosing and growing together.",
  "Your happiness matters to me in a thousand little ways.",
  "You are my once-in-a-lifetime kind of wonderful.",
  "My heart feels right at home whenever it finds its way to you.",
  "Here’s to all our yesterdays, todays, and all the tomorrows we’ll share.",
  "I love you more than all the words I could fit on this little page."
];

const opening = document.querySelector("#opening");
const lovePage = document.querySelector("#love-page");
const openButton = document.querySelector("#open-surprise");
const typedLetter = document.querySelector("#typed-letter");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const effectsLayer = document.querySelector(".effect-layer");
let typingTimer;
let previousMessageIndex = -1;
let backgroundHeartCount = 0;

// Bracketed placeholders stay out of the finished letter until replaced with real details.
function personalValue(value) {
  const cleaned = value.trim();
  return cleaned && !/^\[.+\]$/.test(cleaned) ? cleaned : "";
}

function personalizeLetter() {
  const herName = personalValue(PERSONAL_DETAILS.herName);
  const yourName = personalValue(PERSONAL_DETAILS.yourName);
  const nicknames = personalValue(PERSONAL_DETAILS.nicknames);
  const memory = personalValue(PERSONAL_DETAILS.specialMemory);

  document.querySelector("#letter-salutation").textContent = herName
    ? `My dearest ${herName},`
    : "My dearest love,";
  document.querySelector("#letter-signoff").textContent = yourName
    ? `All my love, ${yourName} ♥`
    : "All my love, always ♥";

  if (nicknames) {
    const nicknameLine = document.createElement("p");
    nicknameLine.className = "letter__memory";
    nicknameLine.textContent = `To my ${nicknames}, with all my heart.`;
    document.querySelector("#letter-signoff").before(nicknameLine);
  }

  if (memory) {
    const memoryLine = document.querySelector("#memory-line");
    memoryLine.textContent = `One memory I hold close: ${memory}`;
    memoryLine.hidden = false;
  }
}

function typeLetter() {
  if (typingTimer) window.clearInterval(typingTimer);
  if (reducedMotion.matches) {
    typedLetter.textContent = letterText;
    typedLetter.classList.add("is-done");
    return;
  }

  let character = 0;
  typedLetter.textContent = "";
  typingTimer = window.setInterval(() => {
    typedLetter.textContent += letterText[character];
    character += 1;
    if (character >= letterText.length) {
      window.clearInterval(typingTimer);
      typedLetter.classList.add("is-done");
    }
  }, 24);
}

function bloomFlowers() {
  document.querySelectorAll(".flower").forEach((flower, index) => {
    window.setTimeout(() => flower.classList.add("is-open"), Math.min(index * 90, 540));
  });
}

openButton.addEventListener("click", () => {
  if (openButton.disabled) return;
  openButton.disabled = true;
  opening.classList.add("opening--closing");
  let revealComplete = false;
  const revealMain = () => {
    if (revealComplete) return;
    revealComplete = true;
    opening.hidden = true;
    lovePage.hidden = false;
    document.body.classList.add("is-open");
    personalizeLetter();
    typeLetter();
    bloomFlowers();
    document.querySelector("#top").scrollIntoView({ behavior: reducedMotion.matches ? "instant" : "smooth" });
  };
  opening.addEventListener("transitionend", (event) => {
    if (event.target === opening && event.propertyName === "opacity") revealMain();
  }, { once: true });

  // The fallback also covers browsers that do not emit transition events.
  window.setTimeout(revealMain, reducedMotion.matches ? 0 : 650);
});

function chooseLoveMessage() {
  let nextIndex = Math.floor(Math.random() * loveMessages.length);
  if (loveMessages.length > 1 && nextIndex === previousMessageIndex) {
    nextIndex = (nextIndex + 1 + Math.floor(Math.random() * (loveMessages.length - 1))) % loveMessages.length;
  }
  previousMessageIndex = nextIndex;
  return loveMessages[nextIndex];
}

document.querySelector("#another-message").addEventListener("click", () => {
  const note = document.querySelector(".message-note");
  note.classList.remove("is-changing");
  void note.offsetWidth;
  document.querySelector("#random-message").textContent = chooseLoveMessage();
  note.classList.add("is-changing");
});

const flowerSurpriseButton = document.querySelector("#flower-surprise-button");
flowerSurpriseButton.addEventListener("click", () => {
  const surprise = document.querySelector("#flower-surprise");
  const isOpening = surprise.hidden;
  surprise.hidden = !isOpening;
  flowerSurpriseButton.setAttribute("aria-expanded", String(isOpening));
  if (isOpening) {
    surprise.querySelectorAll(".flower").forEach((flower, index) => {
      window.setTimeout(() => flower.classList.add("is-open"), Math.min(index * 100, 500));
    });
    if (!reducedMotion.matches) burstHearts(12);
  }
});

const finalButton = document.querySelector("#final-button");
finalButton.addEventListener("click", () => {
  const message = document.querySelector("#final-message");
  message.hidden = !message.hidden;
  finalButton.setAttribute("aria-expanded", String(!message.hidden));
  finalButton.querySelector("span:first-child").textContent = message.hidden ? "Send You All My Love" : "All my love, sent";
  if (!message.hidden && !reducedMotion.matches) burstHearts(8);
});

function addHeart(x, y, isTap = false) {
  if (effectsLayer.childElementCount >= 24) return;
  const heart = document.createElement("span");
  heart.className = `floating-heart${isTap ? " floating-heart--tap" : ""}`;
  heart.textContent = Math.random() > .35 ? "♥" : "♡";
  heart.style.left = `${x}px`;
  heart.style.bottom = isTap ? `${Math.max(window.innerHeight - y, 0)}px` : "-30px";
  heart.style.setProperty("--drift", `${Math.round(Math.random() * 70 - 35)}px`);
  effectsLayer.append(heart);
  heart.addEventListener("animationend", () => heart.remove(), { once: true });
}

function burstHearts(count) {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  for (let index = 0; index < count; index += 1) {
    window.setTimeout(() => addHeart(centerX + Math.random() * 150 - 75, centerY + Math.random() * 100 - 50, true), index * 65);
  }
}

document.addEventListener("pointerdown", (event) => {
  if (reducedMotion.matches || event.target.closest("button, a")) return;
  addHeart(event.clientX, event.clientY, true);
});

// Keep the ambient effect bounded so it stays light on mobile devices.
if (!reducedMotion.matches) {
  window.setInterval(() => {
    if (lovePage.hidden || backgroundHeartCount >= 8) return;
    backgroundHeartCount += 1;
    addHeart(Math.random() * window.innerWidth, 0);
    window.setTimeout(() => { backgroundHeartCount = Math.max(0, backgroundHeartCount - 1); }, 5600);
  }, 1450);
}