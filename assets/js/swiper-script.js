document.addEventListener("DOMContentLoaded", function () {
	var swiperPartner = new Swiper(".swiper-post", {
		slidesPerView: 3,
		spaceBetween: 20,
		loop: true,
		loopedSlides: 5,
		grabCursor: false,
		observer: true,
		observeParents: true,
		speed: 1000,
		autoplay: {
			delay: 2000,
			disableOnInteraction: false,
			pauseOnMouseEnter: true,
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
			bulletClass: "swiper-pagination-bullet",
			bulletActiveClass: "swiper-pagination-bullet-active",
		},
		breakpoints: {
			0: { 
				slidesPerView: 1,
			},
			768: {
				slidesPerView: 2,
			},
			991: {
				slidesPerView: 3,
			},
		},
	});
});