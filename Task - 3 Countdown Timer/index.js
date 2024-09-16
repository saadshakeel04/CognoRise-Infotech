let countdown;
        let isPaused = false;
        let remTime = 0;

        const timerDisplay = document.querySelector('.DisplayTime');
        const startBtn = document.getElementById("start-btn");
        const pauseBtn = document.getElementById("pause-btn");
        const resetBtn = document.getElementById("reset-btn");

        flatpickr("#countdown", {
            enableTime: true,
            dateFormat: "Y-m-d h:i K",
            enableSeconds: true,
            minuteIncrement: 1,
            time_24hr: false,
            minDate: "today",
            theme: "dark",
            onClose: function(date, instance) {
                const now = new Date();
                if (date[0] <= now) {
                    instance.setDate(new Date(now.getTime() + 10000)); // Set to 10 seconds in the future
                    alert("Please select a future time. Setting to 10 seconds from now.");
                }
            }
        });

        startBtn.addEventListener("click", start);
        pauseBtn.addEventListener("click", pause);
        resetBtn.addEventListener("click", reset);

        function start() {
            const selectedDate = new Date(document.getElementById("countdown").value);
            const now = new Date();

            if (isNaN(selectedDate) || selectedDate <= now) {
                alert("Please select a future date and time.");
                return;
            }

            remTime = selectedDate.getTime() - now.getTime();

            countdown = setInterval(() => {
                const currentTime = new Date().getTime();
                remTime = selectedDate.getTime() - currentTime;

                if (remTime <= 0) {
                    finish();
                } else {
                    displayTime(remTime);
                    if (remTime <= 10000) {
                        timerDisplay.classList.add('animate');
                    }
                }
            }, 100); 

            isPaused = false;
            startBtn.disabled = true;
            pauseBtn.disabled = false;
        }

        function pause() {
            isPaused = true;
            clearInterval(countdown);
            startBtn.disabled = false;
            pauseBtn.disabled = true;
            timerDisplay.classList.remove('animate');
        }

        function reset() {
            clearInterval(countdown);
            displayTime(0);
            isPaused = false;
            remTime = 0;
            startBtn.disabled = false;
            pauseBtn.disabled = false;
            timerDisplay.classList.remove('animate');
        }

        function finish() {
            timerDisplay.classList.remove('animate');
            clearInterval(countdown);
            displayTime(0);
            alert("Countdown finished!");
            reset();
        }

        function displayTime(time) {
            const days = Math.floor(time / (1000 * 60 * 60 * 24));
            const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((time % (1000 * 60)) / 1000);

            document.getElementById("days").innerText = days.toString().padStart(2, "0");
            document.getElementById("hours").innerText = hours.toString().padStart(2, "0");
            document.getElementById("minutes").innerText = minutes.toString().padStart(2, "0");
            document.getElementById("seconds").innerText = seconds.toString().padStart(2, "0");
        }
