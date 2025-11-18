/* countdown.js — 72-hour timer showing hours, minutes, and seconds */

(function () {
  const HOURS_EL = document.getElementById("cd-hours");
  const MINS_EL  = document.getElementById("cd-mins");
  const SECS_EL  = document.getElementById("cd-secs"); // NEW
  const DEADLINE_TEXT = document.querySelector(".deadline-date");

  if (!HOURS_EL || !MINS_EL || !SECS_EL) return;

  let intervalId = null;

  function startCountdown(msFromNow) {
    const endTs = Date.now() + msFromNow;

    if (DEADLINE_TEXT) {
      const end = new Date(endTs);
      DEADLINE_TEXT.textContent = end.toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
    }

    if (intervalId) clearInterval(intervalId);
    tick();
    intervalId = setInterval(tick, 1000);

    function tick() {
      const remaining = Math.max(0, endTs - Date.now());
      const totalSec = Math.floor(remaining / 1000);

      const hours = Math.floor(totalSec / 3600);
      const mins  = Math.floor((totalSec % 3600) / 60);
      const secs  = totalSec % 60;

      HOURS_EL.textContent = String(hours).padStart(2, "0");
      MINS_EL.textContent  = String(mins).padStart(2, "0");
      SECS_EL.textContent  = String(secs).padStart(2, "0");

      if (remaining <= 0) clearInterval(intervalId);
    }
  }

  document.querySelector("#holiday-deal").addEventListener("click", () => {
    startCountdown(72 * 60 * 60 * 1000);
  });

  startCountdown(72 * 60 * 60 * 1000);
})();
