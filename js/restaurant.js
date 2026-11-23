// Reservation requests are prepared in Gmail. Nothing is sent automatically.
function createReservationUrl(details) {
  const dateParts = details.date.split("-");
  const formattedDate = `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`;
  const message = [
    "Hello Sushi Fish,",
    "",
    "I would like to request a table:",
    `Name: ${details.name}`,
    `Email: ${details.email}`,
    `Date: ${formattedDate}`,
    `Time: ${details.time}`,
    `Guests: ${details.guests}`,
    "",
    `Message: ${details.note || "No additional requests."}`,
    "",
    "Please confirm whether the reservation is available.",
    "Thank you!"
  ].join("\n");
  const parameters = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: "sushifish0000@gmail.com",
    su: `Reservation Request – ${formattedDate}, ${details.time}`,
    body: message
  });
  return `https://mail.google.com/mail/?${parameters.toString()}`;
}

// Maintain the original background, including a fallback without animation.
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reduceMotion || !window.jQuery || !window.jQuery.fn.parallax) {
  document.body.classList.add("no-parallax");
  document.querySelector(".parallax-window").removeAttribute("data-parallax");
} else {
  document.body.classList.remove("no-parallax");
}

// The Bootstrap mobile menu closes after choosing a section.
const navigationLinks = document.querySelectorAll(".tm-navbar .nav-link");
navigationLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navigationLinks.forEach((item) => {
      item.parentElement.classList.remove("active");
      item.removeAttribute("aria-current");
    });
    link.parentElement.classList.add("active");
    link.setAttribute("aria-current", "location");
    if (window.innerWidth < 992 && window.jQuery && window.jQuery.fn.collapse) {
      window.jQuery("#navbarNav").collapse("hide");
    }
  });
});

const reservationForm = document.getElementById("reservation-form");
const dateInput = document.getElementById("visit-date");
const timeInput = document.getElementById("visit-time");
const statusMessage = document.getElementById("reservation-status");

function getLocalDateString(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
dateInput.min = getLocalDateString(new Date());
reservationForm.addEventListener("input", () => {
  dateInput.setCustomValidity("");
  timeInput.setCustomValidity("");
  statusMessage.hidden = true;
});

reservationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // Refresh the minimum date if the page was left open overnight.
  const now = new Date();
  dateInput.min = getLocalDateString(now);
  if (!reservationForm.reportValidity()) return;

  const visit = new Date(`${dateInput.value}T${timeInput.value}:00`);
  if (visit <= now) {
    timeInput.setCustomValidity("Please choose a future date and time.");
    timeInput.reportValidity();
    return;
  }

  const fields = reservationForm.elements;
  const url = createReservationUrl({
    name: fields.namedItem("guest_name").value.trim(),
    email: fields.namedItem("guest_email").value.trim(),
    date: dateInput.value,
    time: timeInput.value,
    guests: fields.namedItem("guest_count").value,
    note: fields.namedItem("guest_note").value.trim()
  });

  window.open(url, "_blank", "noopener,noreferrer");
  statusMessage.replaceChildren(document.createTextNode("Your request is ready. Please send it in Gmail. If no window opens: "));
  const fallbackLink = document.createElement("a");
  fallbackLink.href = url;
  fallbackLink.target = "_blank";
  fallbackLink.rel = "noopener noreferrer";
  fallbackLink.textContent = "Open Gmail";
  statusMessage.append(fallbackLink);
  statusMessage.hidden = false;
});

// Enable submission only after the Gmail handler is ready.
document.getElementById("reservation-submit").disabled = false;
