// booking.js
// Shows the menu and packages, calculates the estimate, and submits the booking.

// ----- Free API key (Web3Forms) -----
// 1. Go to https://web3forms.com and enter your email to get a FREE access key.
// 2. Paste the key below. Bookings will then be emailed to you.
var WEB3FORMS_KEY = "PASTE_YOUR_FREE_ACCESS_KEY_HERE";

var OWNER_WHATSAPP = "919043972076";

// ----- Show the menu -----
function showMenu(filter) {
  var html = "";
  for (var i = 0; i < menuItems.length; i++) {
    var item = menuItems[i];
    if (filter === "All" || item.type === filter) {
      html += '<div class="card-3d bg-white rounded-3xl p-6 border border-purple-100">' +
                '<span class="text-4xl">' + item.icon + '</span>' +
                '<h3 class="text-xl font-semibold mt-3">' + item.name + '</h3>' +
                '<p class="text-sm text-gray-500">' + item.type + '</p>' +
                '<p class="text-purple-600 font-semibold mt-2">Rs. ' + item.price + ' / plate</p>' +
              '</div>';
    }
  }
  document.getElementById("menuList").innerHTML = html;
}

// ----- Show the packages and fill the dropdown -----
function showPackages() {
  var cards = "";
  var options = '<option value="" class="text-black">Select a package</option>';

  for (var i = 0; i < packages.length; i++) {
    var p = packages[i];
    cards += '<div class="card-3d bg-white rounded-3xl p-6 border border-amber-200 text-center">' +
               '<h4 class="text-xl font-semibold">' + p.name + '</h4>' +
               '<p class="text-sm text-gray-500 my-3">' + p.details + '</p>' +
               '<p class="text-purple-600 font-bold text-2xl">Rs. ' + p.pricePerPlate + '</p>' +
               '<p class="text-xs text-gray-400">per plate</p>' +
             '</div>';
    options += '<option value="' + i + '" class="text-black">' + p.name + ' (Rs. ' + p.pricePerPlate + '/plate)</option>';
  }

  document.getElementById("packageList").innerHTML = cards;
  document.getElementById("package").innerHTML = options;
}

// ----- Estimated cost -----
function updateEstimate() {
  var index = document.getElementById("package").value;
  var guests = Number(document.getElementById("guests").value);
  var estimate = document.getElementById("estimate");

  if (index === "" || guests <= 0) {
    estimate.innerText = "";
    return;
  }
  var total = packages[index].pricePerPlate * guests;
  estimate.innerText = "Estimated cost: Rs. " + total.toLocaleString("en-IN") + " (" + guests + " guests)";
}

// ----- Menu filter buttons -----
var filterButtons = document.querySelectorAll(".filter-btn");
for (var i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener("click", function () {
    for (var j = 0; j < filterButtons.length; j++) {
      filterButtons[j].className = "filter-btn bg-white border border-purple-200 px-6 py-2 rounded-full";
    }
    this.className = "filter-btn bg-purple-600 text-white px-6 py-2 rounded-full";
    showMenu(this.getAttribute("data-filter"));
  });
}

// ----- Submit the booking -----
document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  var status = document.getElementById("formStatus");
  var packageIndex = document.getElementById("package").value;
  var guests = document.getElementById("guests").value;

  var booking = {
    id: "SU" + Date.now().toString().slice(-6),   // simple booking number
    name: document.getElementById("name").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    email: document.getElementById("email").value.trim(),
    date: document.getElementById("date").value,
    guests: guests,
    packageName: packageIndex === "" ? "Not selected" : packages[packageIndex].name,
    estimate: packageIndex === "" ? "-" : "Rs. " + (packages[packageIndex].pricePerPlate * guests),
    details: document.getElementById("details").value.trim()
  };

  // Keep a copy of every booking in the browser
  var saved = JSON.parse(localStorage.getItem("bookings") || "[]");
  saved.push(booking);
  localStorage.setItem("bookings", JSON.stringify(saved));

  // If the key is not added yet, send through WhatsApp only
  if (WEB3FORMS_KEY === "PASTE_YOUR_FREE_ACCESS_KEY_HERE") {
    sendToWhatsApp(booking);
    status.innerText = "Booking " + booking.id + " saved. Opening WhatsApp...";
    return;
  }

  status.innerText = "Sending...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject: "New Booking " + booking.id + " - Sun Udhayam Catering",
      from_name: booking.name,
      name: booking.name,
      phone: booking.phone,
      email: booking.email,
      event_date: booking.date,
      guests: booking.guests,
      package: booking.packageName,
      estimate: booking.estimate,
      details: booking.details
    })
  })
    .then(function (response) { return response.json(); })
    .then(function (result) {
      if (result.success) {
        status.innerText = "Booking " + booking.id + " submitted! We will contact you soon.";
        document.getElementById("bookingForm").reset();
        updateEstimate();
        sendToWhatsApp(booking);
      } else {
        status.innerText = "Could not send: " + result.message;
      }
    })
    .catch(function () {
      status.innerText = "Network error. Sending through WhatsApp instead.";
      sendToWhatsApp(booking);
    });
});

function sendToWhatsApp(booking) {
  var message = "*New Booking " + booking.id + " - Sun Udhayam Catering*\n" +
    "Name: " + booking.name + "\n" +
    "Phone: " + booking.phone + "\n" +
    "Date: " + booking.date + "\n" +
    "Guests: " + booking.guests + "\n" +
    "Package: " + booking.packageName + "\n" +
    "Estimate: " + booking.estimate + "\n" +
    "Details: " + booking.details;
  window.open("https://wa.me/" + OWNER_WHATSAPP + "?text=" + encodeURIComponent(message), "_blank");
}

// ----- Start -----
showMenu("All");
showPackages();
document.getElementById("package").addEventListener("change", updateEstimate);
document.getElementById("guests").addEventListener("input", updateEstimate);
