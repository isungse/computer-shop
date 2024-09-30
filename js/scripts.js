// Swiper 기능 구현
document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 50,
      navigation: true, // 네비게이션 활성화
      autoplay: {
        delay: 3000, // 3초마다 자동 전환
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  });
  