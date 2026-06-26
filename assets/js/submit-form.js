function initAvailabilityForm() {
    $('#avaliablility-form').on('submit', function(event) {
        event.preventDefault();

        const $form = $(this);
        const $checkin = $('#checkin');
        const $checkout = $('#checkout');
        const $adult = $('#adult');
        const $children = $('#children');
        const $room = $('#room');

        const $successMessage = $('#success-message');
        const $errorMessage = $('#error-message');

        let isValid = true;

        function validateField($input) {
            if (!$input.val().trim()) {
                $input.closest('.dropdown-container, .input-wrapper')
                      .find('.dropdown-select, input')
                      .addClass('error-border');
                isValid = false;
            } else {
                $input.closest('.dropdown-container, .input-wrapper')
                      .find('.dropdown-select, input')
                      .removeClass('error-border');
            }
        }

        // Validasi masing-masing field
        validateField($checkin);
        validateField($checkout);
        validateField($adult);
        validateField($children);
        validateField($room);

        // Tampilkan hasil
        if (isValid) {
            $successMessage.removeClass('hidden');
            $errorMessage.addClass('hidden');

            $form[0].reset();
            $('.dropdown-option').removeClass('selected');

            // Reset selected-text
            $('.dropdown-container .selected-text').each(function () {
                const defaultText = $(this).attr('data-default') || $(this).text();
                $(this).text(defaultText);
            });

            setTimeout(() => $successMessage.addClass('hidden'), 3000);
        } else {
            $errorMessage.removeClass('hidden');
            $successMessage.addClass('hidden');
            setTimeout(() => $errorMessage.addClass('hidden'), 3000);
        }
    });
}

function initReservationForm() {
    $('#reservation-form').on('submit', function(event) {
        event.preventDefault();

        const $form = $(this);
        const $name = $('#name');
        const $email = $('#email');
        const $checkin = $('#checkin');
        const $checkout = $('#checkout');
        const $adult = $('#adult');
        const $children = $('#children');
        const $room = $('#room');

        const $successMessage = $('#success-message');
        const $errorMessage = $('#error-message');

        let isValid = true;

        function validateEmail(email) {
            const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return pattern.test(email);
        }

        function validateField($input) {
            if (!$input.val().trim()) {
                $input.closest('.dropdown-container, .input-wrapper')
                      .find('.dropdown-select, input')
                      .addClass('error-border');
                isValid = false;
            } else {
                $input.closest('.dropdown-container, .input-wrapper')
                      .find('.dropdown-select, input')
                      .removeClass('error-border');
            }
        }

        function validateEmailField($input) {
            const value = $input.val().trim();
            if (!value || !validateEmail(value)) {
                $input.addClass('error-border');
                isValid = false;
            } else {
                $input.removeClass('error-border');
            }
        }

        // Validasi masing-masing field
        validateField($name);
        validateEmailField($email);
        validateField($checkin);
        validateField($checkout);
        validateField($adult);
        validateField($children);
        validateField($room);

        // Tampilkan hasil
        if (isValid) {
            $successMessage.removeClass('hidden');
            $errorMessage.addClass('hidden');

            $form[0].reset();
            $('.dropdown-option').removeClass('selected');

            // Reset selected-text
            $('#reservation-form .dropdown-container .selected-text').each(function () {
                const defaultText = $(this).attr('data-default') || $(this).text();
                $(this).text(defaultText);
            });

            setTimeout(() => $successMessage.addClass('hidden'), 3000);
        } else {
            $errorMessage.removeClass('hidden');
            $successMessage.addClass('hidden');
            setTimeout(() => $errorMessage.addClass('hidden'), 3000);
        }
    });
}

function initSubmitContact() {
    $('#contact-form').on('submit', function (event) {
        event.preventDefault();

        const $form = $(this);
        const $name = $('#name');
        const $email = $('#email');
        const $subject = $('#subject');
        const $message = $('#message');

        const $successMessage = $('#success-message');
        const $errorMessage = $('#error-message');

        let isValid = true;

        function validateEmail(email) {
            const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return pattern.test(email);
        }

        function validateField($input) {
            const value = $input.val().trim();
            if (!value) {
                $input.addClass('error-border');
                isValid = false;
            } else {
                $input.removeClass('error-border');
            }
        }

        function validateEmailField($input) {
            const value = $input.val().trim();
            if (!value || !validateEmail(value)) {
                $input.addClass('error-border');
                isValid = false;
            } else {
                $input.removeClass('error-border');
            }
        }

        // Validasi masing-masing field
        validateField($name);
        validateEmailField($email);
        validateField($subject);
        validateField($message);

        // Tampilkan hasil
        if (isValid) {
            $successMessage.removeClass('hidden');
            $errorMessage.addClass('hidden');

            $form[0].reset();

            setTimeout(() => $successMessage.addClass('hidden'), 3000);
        } else {
            $errorMessage.removeClass('hidden');
            $successMessage.addClass('hidden');
            setTimeout(() => $errorMessage.addClass('hidden'), 3000);
        }
    });
}

function initSubmitNewsletter() {
    $('#newsletter-form').on('submit', function(event) {
        event.preventDefault();

        const $form = $(this);
        const $email = $('#newsletter');
        const $successMessage = $('#newsletter-success');
        const $errorMessage = $('#newsletter-error');

        let isValid = true;

        function validateEmail(email) {
            const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return pattern.test(email);
        }

        function validateField($input) {
            const value = $input.val().trim();
            if (!value || !validateEmail(value)) {
                $input.addClass('error-border');
                isValid = false;
            } else {
                $input.removeClass('error-border');
            }
        }

        validateField($email);

        if (isValid) {
            $successMessage.removeClass('hidden');
            $errorMessage.addClass('hidden');

            $form[0].reset();

            setTimeout(() => $successMessage.addClass('hidden'), 3000);
        } else {
            $errorMessage.removeClass('hidden');
            $successMessage.addClass('hidden');
            setTimeout(() => $errorMessage.addClass('hidden'), 3000);
        }
    });
}

$(document).ready(function() {
    initAvailabilityForm();
    initReservationForm();
    initSubmitContact();
    initSubmitNewsletter();
});

