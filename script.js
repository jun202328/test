// DOM
const coupangBanner = document.querySelector('.result-banner');
const closeBtn = document.querySelector('.close-btn');

// Constants
const MINUTE_FOR_TEST = 1000 * 60;
const HOUR = 1000 * 60 * 60;
const DAY = HOUR * 24;

const adSession = localStorage?.getItem('adSession') ?? null;
const shouldShowAd = adSession === null || Date.now() - adSession > DAY;

const adBannerObserver = new IntersectionObserver(([{ isIntersecting }]) => {
  if (isIntersecting) {
    countdown(5, onCount, onCountFinished);
  }
});

coupangBanner && adBannerObserver.observe(coupangBanner);

// Event Listeners
closeBtn.addEventListener('click', onCloseBtnClick);
document.addEventListener('DOMContentLoaded', onMount);

// Util functions for handle ad banner
function onMount() {
  if (shouldShowAd) {
    coupangBanner.classList.add('show');
  }
}

function onCloseBtnClick(e) {
  coupangBanner.classList.remove('show');
  localStorage.setItem('adSession', Date.now());
}

function onCount(count) {
  closeBtn.disabled = true;
  closeBtn.classList.add('show');
  closeBtn.innerText = count;
}

function onCountFinished() {
  closeBtn.disabled = false;
  closeBtn.innerText = 'X';
}

function countdown(num, onCount = num => {}, onFinished = () => {}) {
  let count = num;
  const countdownTimer = setInterval(() => {
    onCount?.(count);
    count--;
    if (count < 0) {
      clearInterval(countdownTimer);
      onFinished?.();
    }
  }, 1000);
}
