// TODO: 이 아래에 원하는 쿠팡링크를 걸어주면 됩니다.
const COUPANG_LINK = 'https://coupa.ng/bN1X9M';

var adSession = localStorage?.getItem('adSession') ?? null;

// DOM
const coupangBanner = document.querySelector('.result-banner');
const resultImage = document.querySelector('#img');
const closeBtn = document.querySelector('.close-btn');

// Constants
const MINUTE_FOR_TEST = 1000 * 60;
const HOUR = 1000 * 60 * 60;
const DAY = HOUR * 24;

const shouldShowAd = adSession === null || Date.now() - adSession > DAY;

const adBannerObserver = new IntersectionObserver(([{ isIntersecting }]) => {
  if (isIntersecting) {
    countdown(5, onCount, onCountFinished);
  }
});

coupangBanner && adBannerObserver.observe(coupangBanner);

// Event Listeners
closeBtn.addEventListener('click', onCloseBtnClick);
coupangBanner.addEventListener('click', onCloseBtnClick);
document.addEventListener('DOMContentLoaded', onMount);

// Util functions for handle ad banner
function showResultImage() {
  resultImage.classList.add('show');
}

function onMount() {
  if (shouldShowAd) {
    coupangBanner.classList.add('show');
  }
}

function onCloseBtnClick(e) {
  e.preventDefault();
  e.stopPropagation();

  if (![...e.target.classList].find(className => className === 'close-btn')) {
    window.open(COUPANG_LINK, '_blank', 'noopener');
  }

  coupangBanner.classList.remove('show');
  localStorage.setItem('adSession', Date.now());
  showResultImage();
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
