const coupangBanner = document.querySelector('.result-banner');
const closeBtn = document.querySelector('.close-btn');

const adBannerObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      countdown(5, onCount, () => {
        closeBtn.innerText = 'X';
      });
    }
  });
});

coupangBanner && adBannerObserver.observe(coupangBanner);

function onCount(count) {
  closeBtn.classList.add('show');
  closeBtn.innerText = count;
}

function countdown(num, onCount = num => {}, onFinished = () => {}) {
  let count = num;
  const countdownTimer = setInterval(() => {
    onCount?.(count);
    count--;
    if (count < 0) {
      clearInterval(countdownTimer);
      onFinished?.();
      console.log('Countdown finished!');
    }
  }, 1000);
}

/**
 * TODO: 1. IntersectionObserver를 이용해서 광고 배너가 화면에 보이면 5초 카운트다운을 시작한다.
 * TODO: 2. 카운트다운이 끝나면 X 버튼을 노출 시킨다.
 * TODO: 3. X 버튼은 onClick 이벤트를 통해 배너를 숨긴다.
 *
 */
