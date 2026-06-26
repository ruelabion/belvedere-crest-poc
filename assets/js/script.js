$(function() {
    initNavLink();
    initSidebar();
    initSidebarDropdown();
    initRoomViews();
    initOdometerCounter();
    initDropdownFormCustom();
    initFlatpickrCalendar();
    initAnimationScroll();
    initTestimonialSlider();
    initCopyrightYear();
});

function initNavLink() {
    const currentUrl = window.location.href;
    $(".navbar-nav .nav-link").each(function() {
        if (this.href === currentUrl) {
            $(this).addClass("active");
        }
    });
    $(".navbar-nav .dropdown-menu .dropdown-item").each(function() {
        if (this.href === currentUrl) {
            $(this).addClass("active");
            $(this).closest(".dropdown").find(".nav-link.dropdown-toggle").addClass("active");
        }
    });
}

function initSidebar() {
    $(document).on("click", ".nav-btn", function() {
        $(".sidebar-overlay").addClass("active");
        setTimeout(() => $(".sidebar").addClass("active"), 200);
    });

    $(document).on("click", ".close-btn, .sidebar-overlay", function() {
        $(".sidebar").removeClass("active");
        setTimeout(() => $(".sidebar-overlay").removeClass("active"), 200);
    });
}

function initSidebarDropdown() {
    $(document).on("click", ".sidebar-dropdown-btn", function() {
        const $dropdownMenu = $(this).parent().next(".sidebar-dropdown-menu");
        const isOpen = $dropdownMenu.hasClass("active");

        $(".sidebar-dropdown-menu").not($dropdownMenu).removeClass("active");

        $dropdownMenu.toggleClass("active", !isOpen);
    });
}

function initRoomViews() {
    const $tabNavs = $('.room-selection .tab-nav');
    const $roomImages = $('.room-image');
    const $roomDetails = $('.room-detail');

    function resetRooms() {
        $tabNavs.removeClass('active');
        $roomImages.removeClass('active');
        $roomDetails.removeClass('active');
    }

    $('.room-selection').on('click', '.tab-nav', function (e) {
        e.preventDefault();
        const targetRoom = $(this).data('target-room');
        resetRooms();
        $(this).addClass('active');
        $roomImages.filter('[data-room="' + targetRoom + '"]').addClass('active');
        $roomDetails.filter('[data-room="' + targetRoom + '"]').addClass('active');
    });

    const $initialTab = $tabNavs.filter('.active').first();

    if ($initialTab.length) {
        const initialRoom = $initialTab.data('target-room');
        $roomImages.filter('[data-room="' + initialRoom + '"]').addClass('active');
        $roomDetails.filter('[data-room="' + initialRoom + '"]').addClass('active');
    } else {
        const fallbackRoom = $tabNavs.first().data('target-room');
        $tabNavs.first().addClass('active');
        $roomImages.filter('[data-room="' + fallbackRoom + '"]').addClass('active');
        $roomDetails.filter('[data-room="' + fallbackRoom + '"]').addClass('active');
    }
}

function initOdometerCounter() {
    let hasStarted = false;

    function startOdometer() {
        if (hasStarted) return;
        hasStarted = true;

        $('.odometer').each(function () {
            const $el = $(this);
            const rawValue = parseInt($el.attr('data-raw-value'), 10);
            let displayValue = '';
            let suffix = '';

            if (rawValue >= 1000000) {
                displayValue = (rawValue / 1000000).toFixed(1);
                suffix = 'M';
            } else if (rawValue >= 1000) {
                displayValue = (rawValue / 1000).toFixed(1);
                suffix = 'K';
            } else {
                displayValue = rawValue;
            }

            if (displayValue.toString().startsWith('.')) {
                displayValue = '0' + displayValue;
            }

            $el.text(displayValue);

            $el.next('.odometer-suffix').text(suffix);
        });
    }

    const $odometers = $('.odometer');
    if ($odometers.length === 0) return;

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                startOdometer();
                observer.disconnect();
            }
        });
    }, { threshold: 0.3 });

    observer.observe($odometers.get(0));
}

function initDropdownFormCustom() {
    $(document).on('click', '.dropdown-select', function(e) {
        e.stopPropagation();
        const $container = $(this).closest('.dropdown-container');
        $container.toggleClass('active');
    });

    $(document).on('click', '.dropdown-option', function() {
        const $container = $(this).closest('.dropdown-container');
        const value = $(this).data('value');
        const text = $(this).text();
        
        $container.find('.dropdown-option').removeClass('selected');
        $(this).addClass('selected');
        
        $container.find('.selected-text').text(text);
        $container.find('.dropdown-value').val(value);
        $container.removeClass('active');
    });

    $(document).on('click', function(e) {
        if (!$(e.target).closest('.dropdown-container').length) {
            $('.dropdown-container').removeClass('active');
        }
    });
}

function initFlatpickrCalendar() {
    var $checkin = $("#checkin");
    var $checkout = $("#checkout");

    $checkin.flatpickr({
        dateFormat: "d M Y",
        onClose: function(selectedDates) {
            var checkoutPicker = $checkout[0]._flatpickr;
            if (checkoutPicker && selectedDates[0]) {
                checkoutPicker.set("minDate", selectedDates[0]);
            }
        }
    });

    $checkout.flatpickr({
        dateFormat: "d M Y"
    });
}

function initAnimationScroll() {
    const elements = document.querySelectorAll('[data-animation]');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const el = entry.target;
            const animation = el.dataset.animation;

            const styles = getComputedStyle(el);

            const duration = el.dataset.duration 
                || styles.getPropertyValue('--anim-duration').trim() 
                || '1s';

            const delay = el.dataset.delay 
                || styles.getPropertyValue('--anim-delay').trim() 
                || '0s';

            el.style.animationName = animation;
            el.style.animationDuration = duration;
            el.style.animationDelay = delay;
            el.style.animationPlayState = 'running';
            el.classList.add('animated');

            observer.unobserve(el);
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(el => {
        el.style.animationPlayState = 'paused';
        el.style.opacity = '0';
        observer.observe(el);
    });
}


function initTestimonialSlider() {
    const $slider = $('.testimonial-container');
    let currentIndex = 0;
    const totalSlides = $slider.find('.testimonial-content').length;

    function updateSlider() {
        const translateX = -currentIndex * 100;
        $slider.find('.testimonial-track').css('transform', `translateX(${translateX}%)`);
    }

    $(document).on('click', '.testimonial-btn-next', function () {
        currentIndex++;
        if (currentIndex >= totalSlides) currentIndex = 0;
        updateSlider();
    });

    $(document).on('click', '.testimonial-btn-prev', function () {
        currentIndex--;
        if (currentIndex < 0) currentIndex = totalSlides - 1;
        updateSlider();
    });
}

function initCopyrightYear(){
    $('#copyright-year').text(new Date().getFullYear());
}