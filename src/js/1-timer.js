import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startButton = document.querySelector('[data-start]');
const dateInput = document.getElementById('datetime-picker');
const countdownDisplay = document.querySelector('.timer');

startButton.disabled = true;

flatpickr(dateInput, {
    allowInput: true,
    disableMobile: true,
    defaultDate: new Date(),
    enableTime: true,
    minuteIncrement: 1,
    time_24hr: true,

    onClose: function (selectedDates, dateStr) {
        const selectedDate = new Date(dateStr);
        const now = new Date();

        if (selectedDate > now) {
            startButton.disabled = false;
            iziToast.success({
                title: 'Success',
            });
        } else {
            startButton.disabled = true;
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',
            });
        }
    },
});

startButton.addEventListener('click', () => {
    const selectedDate = new Date(dateInput.value);
    const countdownInterval = setInterval(updateCountdown, 1000);

    function updateCountdown() {
        const now = new Date();
        const timeLeft = selectedDate - now;

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            countdownDisplay.textContent = '00:00:00:00';
            iziToast.info({
                title: 'Info',
                message: 'Countdown timer has ended!',
            });
        } else {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            countdownDisplay.textContent = `${formatTime(days)}:${formatTime(
                hours
            )}:${formatTime(minutes)}:${formatTime(seconds)}`;
        }
    }

    function formatTime(time) {
        return time.toString().padStart(2, '0');
    }
});
