(function () {
  "use strict";

  document.documentElement.classList.add("js");

  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) =>
    Array.from(parent.querySelectorAll(selector));

  // ---------------------------------------------------
  // Settings you may want to edit
  // ---------------------------------------------------
  const WHATSAPP_NUMBER = "9779855080078"; // country code + number, no "+"
  const WHATSAPP_DEFAULT_TEXT =
    "Hello, I would like to inquire about booking a stay.";
  // Approximate exchange rate used only for the "≈ US$" guide prices.
  // Update this occasionally, or set to 0 to hide US dollar amounts.
  const NPR_PER_USD = 135;

  // Web-optimised copies of the resort photos live in images/web/
  // (-md = 900px thumbnail, plain = 1600px full size).
  const img = (name, size = "md") =>
    `images/web/${name}${size === "md" ? "-md" : ""}.jpg`;

  const IMAGES = {
    exterior: "hero-exterior",
    room: "room",
    garden: "hero-garden",
    sunset: "hero-sunset",
    river: "hero-river",
    bird: "hero-birdwatch",
    sign: "sign",
    reception: "reception",
    safari: "safari",
    dinner: "dinner",
    culture: "culture",
  };

  function escapeHTML(value) {
    return String(value).replace(
      /[&<>"']/g,
      (character) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[character],
    );
  }

  const formatNPR = (value) => `NPR ${Number(value).toLocaleString("en-US")}`;
  const formatUSD = (npr) =>
    NPR_PER_USD > 0
      ? `≈ US$ ${Math.max(1, Math.round(npr / NPR_PER_USD)).toLocaleString("en-US")}`
      : "";

  // ---------------------------------------------------
  // Experiences
  // ---------------------------------------------------
  const experiences = [
    {
      title: "Jeep & Jungle Safari",
      description:
        "Explore the forest with local naturalists and look for wildlife in its natural habitat.",
      image: IMAGES.safari,
    },
    {
      title: "Elephant Experiences",
      description:
        "Discover local wildlife stories and learn about the region's natural environment.",
      image: IMAGES.sunset,
    },
    {
      title: "River & Bird Watching",
      description:
        "Enjoy peaceful riverside scenery and discover the rich birdlife of the Chitwan region.",
      image: IMAGES.bird,
    },
    {
      title: "Tharu Cultural Experiences",
      description:
        "Discover the living traditions, local hospitality and cultural heritage of Sauraha.",
      image: IMAGES.culture,
    },
    {
      title: "Jungle Tower & Nature",
      description:
        "Experience the landscape from a different perspective and enjoy quiet moments in nature.",
      image: IMAGES.garden,
    },
    {
      title: "Village & Local Life",
      description:
        "Explore the rural surroundings and discover the culture and everyday life of the region.",
      image: IMAGES.river,
    },
  ];

  const experienceContainer = $("#exp");
  if (experienceContainer) {
    experienceContainer.innerHTML = experiences
      .map(
        (item, index) => `
        <article class="experience-card reveal" tabindex="0">
          <div class="experience-image">
            <img src="${img(item.image)}" alt="${escapeHTML(item.title)}" loading="lazy">
          </div>
          <span class="experience-index">${String(index + 1).padStart(2, "0")}</span>
          <div class="experience-body">
            <h3>${escapeHTML(item.title)}</h3>
            <p>${escapeHTML(item.description)}</p>
          </div>
        </article>`,
      )
      .join("");
  }

  // ---------------------------------------------------
  // Packages
  // ---------------------------------------------------
  const packages = [
    {
      title: "Weekend Gateway Pack",
      duration: "2 nights / 3 days · Cottage for a couple",
      price: 8100,
      image: IMAGES.exterior,
      items: [
        "Breakfast, dinner and bonfire",
        "Free bus stand / airport pick-up and drop",
        "Welcome drinks and water bottle",
        "Wi-Fi and laundry",
      ],
      type: "Weekend Gateway Pack",
    },
    {
      title: "Adventure / Eco Pack",
      duration: "2 nights / 3 days · Cottage for a couple",
      price: 10100,
      image: IMAGES.safari,
      items: [
        "Breakfast, dinner and bonfire",
        "Jungle pass and professional guide",
        "Free bus stand / airport pick-up and drop",
        "Welcome drinks, water bottle, Wi-Fi and laundry",
      ],
      type: "Adventure / Eco Pack",
    },
    {
      title: "Festive / Seasonal Pack",
      duration: "2 nights / 3 days · Couple rooms for groups",
      image: IMAGES.dinner,
      items: [
        "Live music, DJ music, gala dinner and gift hamper",
        "Free bus stand / airport pick-up and drop",
        "Welcome drinks, water bottle, Wi-Fi and laundry",
      ],
      rates: [
        ["10 people", 44000],
        ["30 people", 117000],
        ["50 people", 167500],
      ],
      type: "Festive / Seasonal Pack",
    },
  ];

  const packageContainer = $("#packs");
  if (packageContainer) {
    packageContainer.innerHTML = packages
      .map((item) => {
        const itemList = item.items
          .map((text) => `<li>${escapeHTML(text)}</li>`)
          .join("");

        const pricing = item.rates
          ? `<table class="group-rates" aria-label="Group package rates"><tbody>
              ${item.rates
                .map(
                  (rate) => `<tr>
                    <td>${escapeHTML(rate[0])}</td>
                    <td>${formatNPR(rate[1])}</td>
                  </tr>`,
                )
                .join("")}
            </tbody></table>`
          : `<div class="package-price">${formatNPR(item.price)} <small>per package</small></div>
             <span class="package-usd">${formatUSD(item.price)}</span>`;

        return `
          <article class="package-card reveal">
            <img src="${img(item.image)}" alt="${escapeHTML(item.title)}" loading="lazy">
            <div class="package-body">
              <h3>${escapeHTML(item.title)}</h3>
              <p class="package-duration">${escapeHTML(item.duration)}</p>
              <ul>${itemList}</ul>
              ${pricing}
              <button class="btn btn-forest pick" type="button"
                data-type="${escapeHTML(item.type)}">
                Enquire about package
              </button>
            </div>
          </article>`;
      })
      .join("");
  }

  // USD hint under the room price
  $$(".price-usd").forEach((el) => {
    el.textContent = formatUSD(Number(el.dataset.npr));
  });

  // ---------------------------------------------------
  // Facilities
  // ---------------------------------------------------
  const facilities = [
    {
      title: "Reception",
      description:
        "A friendly front desk to help with tour arrangements and local experiences.",
      image: IMAGES.reception,
    },
    {
      title: "Restaurant",
      description:
        "Local, Continental, Nepalese and Tharu dishes prepared with quality ingredients.",
      image: IMAGES.dinner,
    },
    {
      title: "Conference & Events",
      description:
        "A venue for meetings, gatherings and events with arrangements available on request.",
      image: IMAGES.exterior,
    },
    {
      title: "Outdoor Spaces",
      description:
        "Garden landscapes and outdoor spaces for a peaceful break between adventures.",
      image: IMAGES.garden,
    },
  ];

  const facilityContainer = $("#fac");
  if (facilityContainer) {
    facilityContainer.innerHTML = facilities
      .map(
        (item) => `
        <article class="facility-card reveal">
          <div class="fac-img">
            <img src="${img(item.image)}" alt="${escapeHTML(item.title)}" loading="lazy">
          </div>
          <h3>${escapeHTML(item.title)}</h3>
          <p>${escapeHTML(item.description)}</p>
        </article>`,
      )
      .join("");
  }

  // ---------------------------------------------------
  // Gallery
  // ---------------------------------------------------
  const gallery = [
    { title: "The resort in bloom", category: "stay", image: IMAGES.exterior },
    { title: "Jeep safari", category: "wild", image: IMAGES.safari },
    { title: "Rhino at sunset", category: "wild", image: IMAGES.sunset },
    { title: "A peaceful stay", category: "stay", image: IMAGES.room },
    {
      title: "Tharu dance & music",
      category: "culture",
      image: IMAGES.culture,
      size: "tall",
    },
    {
      title: "Riverside at sunset",
      category: "culture",
      image: IMAGES.river,
      size: "wide",
    },
    { title: "Birdwatching", category: "wild", image: IMAGES.bird },
    {
      title: "Dining moments",
      category: "stay",
      image: IMAGES.dinner,
      size: "tall",
    },
    {
      title: "Garden pathways",
      category: "wild",
      image: IMAGES.garden,
      size: "wide",
    },
    { title: "Reception & lounge", category: "stay", image: IMAGES.reception },
    {
      title: "Welcome to Chitwan Safari Resort",
      category: "stay",
      image: IMAGES.sign,
      size: "wide",
    },
  ];

  const galleryContainer = $("#gal");
  if (galleryContainer) {
    galleryContainer.innerHTML = gallery
      .map(
        (item) => `
        <figure class="gallery-item ${item.size || ""}"
          data-category="${item.category}"
          data-caption="${escapeHTML(item.title)}"
          data-full="${img(item.image, "full")}"
          tabindex="0" role="button"
          aria-label="Open image: ${escapeHTML(item.title)}">
          <img src="${img(item.image)}" alt="${escapeHTML(item.title)}" loading="lazy">
          <figcaption class="gallery-caption">${escapeHTML(item.title)}</figcaption>
        </figure>`,
      )
      .join("");
  }

  // ---------------------------------------------------
  // Header
  // ---------------------------------------------------
  const header = $("#head");
  function updateHeader() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 40);
  }
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // Mobile navigation
  const burger = $("#burger");
  const menu = $("#menu");

  function setMenu(open) {
    if (!burger || !menu) return;
    menu.classList.toggle("open", open);
    document.body.classList.toggle("nav-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  }

  if (burger && menu) {
    burger.addEventListener("click", () =>
      setMenu(!menu.classList.contains("open")),
    );
    menu.addEventListener("click", (event) => {
      if (event.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setMenu(false);
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 960) setMenu(false);
    });
  }

  // ---------------------------------------------------
  // Hero slider
  // ---------------------------------------------------
  const slidesContainer = $("#slides");
  const slides = slidesContainer ? $$(".slide", slidesContainer) : [];
  const dotsContainer = $("#dots");
  const counter = $("#slideCounter");
  const previous = $("#prevSlide");
  const next = $("#nextSlide");

  let currentSlide = 0;
  let sliderTimer = null;
  const slideDuration = 6500;

  if (dotsContainer) {
    dotsContainer.innerHTML = "";
    slides.forEach((slide, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", `Show slide ${index + 1}`);
      dot.addEventListener("click", () => showSlide(index, true));
      dotsContainer.appendChild(dot);
    });
  }
  const dots = dotsContainer ? $$("button", dotsContainer) : [];

  function showSlide(index, restartTimer = false) {
    if (!slides.length) return;
    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      const active = i === currentSlide;
      slide.classList.toggle("active", active);
      slide.setAttribute("aria-hidden", String(!active));
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlide);
      dot.setAttribute("aria-current", i === currentSlide ? "true" : "false");
    });
    if (counter) {
      counter.textContent =
        `${String(currentSlide + 1).padStart(2, "0")} / ` +
        `${String(slides.length).padStart(2, "0")}`;
    }
    if (restartTimer) startSlider();
  }

  function startSlider() {
    clearInterval(sliderTimer);
    sliderTimer = null;
    if (document.hidden || slides.length < 2) return;
    sliderTimer = setInterval(() => showSlide(currentSlide + 1), slideDuration);
  }

  if (previous) previous.addEventListener("click", () => showSlide(currentSlide - 1, true));
  if (next) next.addEventListener("click", () => showSlide(currentSlide + 1, true));

  showSlide(0);
  startSlider();
  document.addEventListener("visibilitychange", startSlider);

  // ---------------------------------------------------
  // Reveal on scroll + counters
  // ---------------------------------------------------
  const revealItems = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.1 },
    );
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }

  function animateCounter(element) {
    const target = Number(element.dataset.count);
    const suffix = element.dataset.suffix || "";
    const duration = 1300;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const stats = $$(".stats [data-count]");
  if ("IntersectionObserver" in window) {
    const statObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.6 },
    );
    stats.forEach((stat) => statObserver.observe(stat));
  }

  // ---------------------------------------------------
  // Gallery filters + lightbox
  // ---------------------------------------------------
  const tabs = $("#tabs");
  const galleryElement = $("#gal");

  if (tabs && galleryElement) {
    $$("#tabs button").forEach((button) => {
      button.addEventListener("click", () => {
        $$("#tabs button").forEach((item) => item.classList.remove("active"));
        button.classList.add("active");

        const category = button.dataset.category;
        galleryElement.classList.toggle("filtered", category !== "all");

        $$(".gallery-item", galleryElement).forEach((item) => {
          const show = category === "all" || item.dataset.category === category;
          item.classList.toggle("is-hidden", !show);
        });
      });
    });
  }

  const lightbox = $("#lb");
  const lightboxImage = $("#lbi");
  const lightboxCaption = $("#lbc");
  const lightboxClose = $("#lbx");

  function openLightbox(figure) {
    if (!lightbox || !lightboxImage) return;
    const thumb = $("img", figure);
    if (!thumb) return;
    lightboxImage.src = figure.dataset.full || thumb.src;
    lightboxImage.alt = thumb.alt;
    lightboxCaption.textContent = figure.dataset.caption || thumb.alt;
    lightbox.hidden = false;
    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    if (lightboxImage) lightboxImage.removeAttribute("src");
  }

  $$(".gallery-item").forEach((figure) => {
    figure.addEventListener("click", () => openLightbox(figure));
    figure.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(figure);
      }
    });
  });
  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });

  // ---------------------------------------------------
  // Booking form
  // ---------------------------------------------------
  const bookingForm = $("#bform");
  const typeSelect = $("#bType");
  const checkIn = $("#bIn");
  const checkOut = $("#bOut");
  const guestsInput = $("#bGuests");
  const estimate = $("#estimate");
  const message = $("#ok");
  const whatsappBtn = $("#whatsappBtn");

  const packagePrices = {
    "Standard Room": 3000,
    "Weekend Gateway Pack": 8100,
    "Adventure / Eco Pack": 10100,
  };

  function localDateString(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  const today = localDateString(new Date());

  // Hero availability bar fields
  const hIn = $("#hIn");
  const hOut = $("#hOut");
  const hGuests = $("#hGuests");
  const availForm = $("#availForm");

  [checkIn, checkOut, hIn, hOut].forEach((el) => {
    if (el) el.min = today;
  });

  function linkDates(inEl, outEl) {
    if (!inEl || !outEl) return;
    inEl.addEventListener("change", () => {
      outEl.min = inEl.value || today;
      if (inEl.value && outEl.value && outEl.value <= inEl.value) {
        outEl.value = "";
      }
    });
  }
  linkDates(checkIn, checkOut);
  linkDates(hIn, hOut);

  function updateEstimate() {
    if (!typeSelect || !estimate || !checkIn || !checkOut) return;

    const selected = typeSelect.value;

    if (selected === "Festive / Seasonal Pack") {
      estimate.value = "Group rate — confirm with resort";
      return;
    }
    if (selected !== "Standard Room") {
      const price = packagePrices[selected];
      estimate.value = price
        ? `${formatNPR(price)} ${formatUSD(price)}`.trim()
        : "Confirm rate with resort";
      return;
    }

    const inDate = checkIn.value;
    const outDate = checkOut.value;
    if (!inDate || !outDate || outDate <= inDate) {
      estimate.value = "Select valid dates";
      return;
    }

    const nights = Math.round(
      (new Date(`${outDate}T12:00:00`) - new Date(`${inDate}T12:00:00`)) /
        86400000,
    );
    const total = nights * 3000;
    estimate.value =
      `${formatNPR(total)} ${formatUSD(total)} · ` +
      `${nights} night${nights === 1 ? "" : "s"}`.replace("  ", " ");
  }

  // WhatsApp button: starts with the default text, then adds the details
  // the guest has already typed into the form.
  function updateWhatsApp() {
    if (!whatsappBtn) return;

    const lines = [WHATSAPP_DEFAULT_TEXT];
    const name = $("#bName")?.value.trim();
    const details = [];

    if (name) details.push(`Name: ${name}`);
    if (typeSelect?.value) details.push(`Stay type: ${typeSelect.value}`);
    if (checkIn?.value) details.push(`Check-in: ${checkIn.value}`);
    if (checkOut?.value) details.push(`Check-out: ${checkOut.value}`);
    if (guestsInput?.value) details.push(`Guests: ${guestsInput.value}`);

    const hasDetails = name || checkIn?.value || checkOut?.value;
    if (hasDetails) lines.push("", ...details);

    whatsappBtn.href =
      `https://wa.me/${WHATSAPP_NUMBER}?text=` +
      encodeURIComponent(lines.join("\n"));
  }

  if (bookingForm) {
    bookingForm.addEventListener("input", updateWhatsApp);
    bookingForm.addEventListener("change", () => {
      updateEstimate();
      updateWhatsApp();
    });
  }

  function goToBooking() {
    const section = $("#book");
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      const nameField = $("#bName");
      if (nameField) nameField.focus({ preventScroll: true });
    }, 600);
  }

  // Hero "Check availability" -> copy into the booking form
  if (availForm) {
    availForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!availForm.reportValidity()) return;

      if (hOut.value <= hIn.value) {
        hOut.setCustomValidity("Check-out must be after check-in.");
        hOut.reportValidity();
        hOut.setCustomValidity("");
        return;
      }

      checkIn.value = hIn.value;
      checkOut.value = hOut.value;
      checkOut.min = hIn.value;
      guestsInput.value = hGuests.value || 2;
      updateEstimate();
      updateWhatsApp();
      goToBooking();
    });
  }

  // Package / room buttons preselect the matching stay type
  document.addEventListener("click", (event) => {
    const button = event.target.closest(".pick");
    if (!button || !typeSelect) return;

    typeSelect.value = button.dataset.type;
    updateEstimate();
    updateWhatsApp();
    goToBooking();
  });

  updateEstimate();
  updateWhatsApp();

  if (bookingForm) {
    bookingForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!bookingForm.reportValidity()) return;

      if (checkOut.value <= checkIn.value) {
        message.hidden = false;
        message.textContent =
          "Please select a check-out date after your check-in date.";
        checkOut.focus();
        return;
      }

      const booking = {
        name: $("#bName").value.trim(),
        phone: $("#bPhone").value.trim(),
        email: $("#bEmail").value.trim(),
        type: typeSelect.value,
        checkIn: checkIn.value,
        checkOut: checkOut.value,
        guests: Number(guestsInput.value || 0),
        note: $("#bNote").value.trim(),
        submittedAt: new Date().toISOString(),
      };

      // This front-end only stores the request in this browser.
      // Connect it to your booking system / email service to receive it.
      try {
        const storageKey = "csr_booking_requests";
        const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
        saved.push(booking);
        localStorage.setItem(storageKey, JSON.stringify(saved));
      } catch (error) {
        /* storage unavailable - message below still applies */
      }

      message.hidden = false;
      message.textContent =
        "Your booking request is ready, but it has not been sent to the " +
        "resort yet. Tap “Book via WhatsApp” below to send it to our team " +
        "with your details, or call or email the resort to confirm.";
      updateWhatsApp();
      message.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }

  // Footer year
  const yearElement = $("#yr");
  if (yearElement) yearElement.textContent = new Date().getFullYear();
})();
