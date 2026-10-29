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
  // Only these names have a separate full-size file. Everything else falls
  // back to its -md copy, so the lightbox never points at a missing file.
  const FULL_AVAILABLE = ["Chitwan -Safari-Resort-Banner1"];
  const img = (name, size = "md") =>
    size === "full" && FULL_AVAILABLE.includes(name)
      ? `images/web/${name}.jpg`
      : `images/web/${name}-md.jpg`;

  // Extra photos live in images/images/ and use their full file name
  // (with extension), so any .jpg / .jpeg / .png file works here.
  // Small originals (141-324 px) have enlarged, sharpened copies in
  // images/hd/ so they look clean in the grid and when opened.
  const BIG_ORIGINALS = [
    "culter1.jpg",
    "culter35.jpg",
    "culter36.jpg",
    "wild5.jpg",
    "rhino-at-gate.jpg",
  ];
  const pic = (file) =>
    encodeURI(
      `${BIG_ORIGINALS.includes(file) ? "images/images" : "images/hd"}/${file}`,
    );

  // Google rating page for the resort. Fill in score / reviews below
  // (e.g. score: "4.6", reviews: "120") to show the number on the badge.
  const GOOGLE_RATING = {
    url: "https://www.google.com/travel/search?ts=CAESCgoCCAMKAggDEAAaHBIaEhQKBwjqDxALGA8SBwjqDxALGBAYATICEAAqBwoFOgNJTlI&qs=CAEyFENnc0l6cXVzNzdQSTctYUVBUkFCOApCCRGsO2_BYU_C0kIJERWU2pZoemXaQgkRhgjUkhzy9yFaQjJAqgE9EAEyHhABIhpafWw9n0IIGhd0SejwqV9Ao1dHQ-aUpTwo-jIZEAIiFWNoaXR3YW4gc2FmYXJpIHJlc29ydA&utm_campaign=sharing&utm_medium=link_btn&utm_source=htls",
    score: "",
    reviews: "",
  };

  const IMAGES = {
    jeep: "Chitwan-Safari-Resort-Banner2",
    tower: "tower",
    exterior: "conferenceroom",
    room: "room",
    garden: "hero-garden",
    sunset: "Elephant-Experiences",
    river: "hero-river",
    village: "Chitwan-Safari-Resort-Banner3",
    bird: "hero-birdwatch",
    sign: "sign",
    reception: "reception",
    safari: "Chitwan-Safari-Resort-Banner1",
    dinner: "dinner",
    culture: "culture",
    bird: "bird",
    all1: "all-1",
    all2: "all-2",
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
      image: IMAGES.jeep,
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
      image: IMAGES.tower,
    },
    {
      title: "Village & Local Life",
      description:
        "Explore the rural surroundings and discover the culture and everyday life of the region.",
      image: IMAGES.village,
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
      image: IMAGES.tower,
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
    {
      title: "Birdlife",
      category: "wild",
      image: IMAGES.bird,
      size: "wide",
    },
    {
      title: "A peaceful stay",
      category: "stay",
      image: IMAGES.all1,
      size: "wide",
    },
    {
      title: "The resort experience",
      category: "stay",
      image: IMAGES.all2,
      size: "wide",
    },
    { title: "Reception & lounge", category: "stay", image: IMAGES.reception },
  ];

  // Extra photos from images/images/ — grouped by theme.
  // category: wild | stay | culture | grounds
  const extraGallery = [
    // Resort & grounds
    {
      title: "Welcome at the resort gate",
      category: "grounds",
      file: "culter1.jpg",
    },
    {
      title: "The resort signboard",
      category: "grounds",
      file: "culter20.jpg",
    },
    {
      title: "Signboard among the trees",
      category: "grounds",
      file: "culter29.jpg",
    },
    { title: "Garden pathway", category: "grounds", file: "culter14.jpg" },
    { title: "Courtyard greenery", category: "grounds", file: "culter15.jpg" },
    { title: "Cottage and garden", category: "grounds", file: "culter16.jpg" },
    {
      title: "Verandah and courtyard",
      category: "grounds",
      file: "culter17.jpg",
    },
    {
      title: "Thatched gazebo in the garden",
      category: "grounds",
      file: "culter18.jpg",
    },
    { title: "Garden gazebo", category: "grounds", file: "culter21.jpg" },
    {
      title: "Walkway along the cottages",
      category: "grounds",
      file: "culter22.jpg",
    },
    { title: "The main lodge", category: "grounds", file: "culter23.jpg" },
    {
      title: "Shaded garden corner",
      category: "grounds",
      file: "culter24.jpg",
    },
    { title: "Courtyard seating", category: "grounds", file: "culter26.jpg" },
    {
      title: "The garden from above",
      category: "grounds",
      file: "culter28.jpg",
    },
    { title: "Thatched sit-out", category: "grounds", file: "culter30.jpg" },
    { title: "The lodge at night", category: "grounds", file: "culter32.jpg" },
    {
      title: "Lodge through the trees",
      category: "grounds",
      file: "culter34.jpg",
    },
    {
      title: "Resort office courtyard",
      category: "grounds",
      file: "culter35.jpg",
    },
    {
      title: "Resort grounds from above",
      category: "grounds",
      file: "culter36.jpg",
    },
    { title: "Lodge and verandah", category: "grounds", file: "culter7.jpg" },
    {
      title: "Lodge in the greenery",
      category: "grounds",
      file: "culter8.jpg",
    },
    // Stay & dine
    { title: "Spacious twin room", category: "stay", file: "stay1.jpg" },
    { title: "A cosy room", category: "stay", file: "stay2.jpg" },
    {
      title: "Warm, comfortable interiors",
      category: "stay",
      file: "stay3.jpg",
    },
    { title: "Comfortable double bed", category: "stay", file: "stay4.jpg" },
    { title: "Garden cottage", category: "stay", file: "culter2.jpg" },
    { title: "Cottage exterior", category: "stay", file: "culter4.jpg" },
    { title: "Cottage porch", category: "stay", file: "culter5.jpg" },
    { title: "Cottage row", category: "stay", file: "culter9.jpg" },
    { title: "Cottage verandah", category: "stay", file: "culter12.jpg" },
    {
      title: "Clean attached bathroom",
      category: "stay",
      file: "culter31.jpg",
    },
    {
      title: "Meeting & workshop space",
      category: "stay",
      file: "culter11.jpg",
    },
    {
      title: "Traditional Nepali thali",
      category: "stay",
      file: "culter6.jpg",
    },
    { title: "Dinner with friends", category: "stay", file: "culter.jpg" },
    { title: "Group dining", category: "stay", file: "culter13.jpg" },
    // Wildlife
    {
      title: "Rhinos at the resort gate",
      category: "wild",
      file: "wild6.jpg",
    },
    {
      title: "Rhinos grazing in the grassland",
      category: "wild",
      file: "wild2.jpg",
    },
    {
      title: "Stag beneath the full moon",
      category: "wild",
      file: "wild3.jpg",
    },
    { title: "Jungle watchtower", category: "wild", file: "culter33.jpg" },
    // Culture & adventure
    { title: "Canoe ride on the river", category: "culture", file: "wild.jpg" },
    { title: "Paddling the river", category: "culture", file: "culter27.jpg" },
    {
      title: "Elephant safari ride",
      category: "culture",
      file: "culter25.jpg",
    },
    { title: "Meeting the elephants", category: "culture", file: "wild5.jpg" },
  ];
  extraGallery.forEach((item) => {
    gallery.push({
      title: item.title,
      category: item.category,
      src: pic(item.file),
    });
  });

  // Videos — shown in the "Video" tab. Add more entries here.
  const videos = [
    {
      title: "Chitwan Safari Resort — video tour",
      poster: "video/resort-video-poster.jpg",
      src: "video/resort-video.mp4",
    },
  ];
  videos.forEach((item) => {
    gallery.push({
      title: item.title,
      category: "video",
      src: item.poster,
      video: item.src,
    });
  });

  const galleryContainer = $("#gal");
  if (galleryContainer) {
    galleryContainer.innerHTML = gallery
      .map(
        (item) => `
        <figure class="gallery-item ${item.size || ""}"
          data-category="${item.category}"
          data-caption="${escapeHTML(item.title)}"
          data-full="${item.src || img(item.image, "full")}"
          ${item.video ? `data-video="${item.video}"` : ""}
          tabindex="0" role="button"
          aria-label="${item.video ? "Play video" : "Open image"}: ${escapeHTML(item.title)}">
          <img src="${item.src || img(item.image)}" data-fallback="${img(item.image || "")}" alt="${escapeHTML(item.title)}" loading="lazy" decoding="async">
          ${item.video ? `<span class="gallery-play" aria-hidden="true"></span>` : ""}
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
    burger.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation",
    );
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

  if (previous)
    previous.addEventListener("click", () => showSlide(currentSlide - 1, true));
  if (next)
    next.addEventListener("click", () => showSlide(currentSlide + 1, true));

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

  // The gallery keeps its original height: only the first photos of each
  // view are shown, and "More photos" reveals the rest.
  const galleryMore = $("#galMore");
  const GALLERY_LIMIT = { all: 13, other: 8 };
  let galleryCategory = "all";
  let galleryExpanded = false;

  function updateGallery() {
    if (!galleryElement) return;
    const limit =
      galleryCategory === "all" ? GALLERY_LIMIT.all : GALLERY_LIMIT.other;
    galleryElement.classList.toggle("filtered", galleryCategory !== "all");

    let shown = 0;
    let total = 0;
    $$(".gallery-item", galleryElement).forEach((item) => {
      const inCategory =
        galleryCategory === "all"
          ? item.dataset.category !== "video"
          : item.dataset.category === galleryCategory;
      let show = inCategory;
      if (inCategory) {
        total += 1;
        show = galleryExpanded || total <= limit;
      }
      item.classList.toggle("is-hidden", !show);
      if (show) shown += 1;
    });

    if (galleryMore) {
      galleryMore.hidden = total <= limit;
      galleryMore.textContent = galleryExpanded
        ? "Show fewer photos"
        : `More photos (${total - shown})`;
      galleryMore.setAttribute("aria-expanded", String(galleryExpanded));
    }
  }

  if (tabs && galleryElement) {
    $$("#tabs button").forEach((button) => {
      button.addEventListener("click", () => {
        $$("#tabs button").forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        galleryCategory = button.dataset.category;
        galleryExpanded = false;
        updateGallery();
      });
    });
    if (galleryMore) {
      galleryMore.addEventListener("click", () => {
        galleryExpanded = !galleryExpanded;
        updateGallery();
        if (!galleryExpanded) {
          galleryElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }
    updateGallery();
  }

  // Google rating badge
  const ratingLink = $("#googleRating");
  if (ratingLink) {
    ratingLink.href = GOOGLE_RATING.url;
    const ratingText = $("#googleRatingText");
    if (ratingText && GOOGLE_RATING.score) {
      ratingText.textContent = `${GOOGLE_RATING.score} on Google${
        GOOGLE_RATING.reviews ? ` · ${GOOGLE_RATING.reviews} reviews` : ""
      }`;
    }
  }
  $$("a[data-google-rating]").forEach((a) => (a.href = GOOGLE_RATING.url));

  const lightbox = $("#lb");
  const lightboxImage = $("#lbi");
  const lightboxVideo = $("#lbv");
  const lightboxCaption = $("#lbc");
  const lightboxClose = $("#lbx");
  let lastFocused = null;

  function openLightbox(figure) {
    if (!lightbox || !lightboxImage) return;
    const thumb = $("img", figure);
    if (!thumb) return;
    lastFocused = document.activeElement;

    const caption = figure.dataset.caption || thumb.alt;
    lightboxCaption.textContent = caption;

    if (figure.dataset.video && lightboxVideo) {
      lightboxImage.hidden = true;
      lightboxImage.removeAttribute("src");
      lightboxVideo.hidden = false;
      lightboxVideo.poster = thumb.getAttribute("src");
      lightboxVideo.src = figure.dataset.video;
      lightboxVideo.play().catch(() => {});
    } else {
      if (lightboxVideo) {
        lightboxVideo.hidden = true;
        lightboxVideo.pause();
        lightboxVideo.removeAttribute("src");
      }
      lightboxImage.hidden = false;
      // If the full-size file is missing, fall back to the grid image.
      lightboxImage.onerror = () => {
        lightboxImage.onerror = null;
        lightboxImage.src = thumb.currentSrc || thumb.src;
      };
      lightboxImage.src = figure.dataset.full || thumb.src;
      lightboxImage.alt = thumb.alt;
    }

    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    document.body.style.overflow = "";
    if (lightboxImage) {
      lightboxImage.onerror = null;
      lightboxImage.removeAttribute("src");
    }
    if (lightboxVideo) {
      lightboxVideo.pause();
      lightboxVideo.removeAttribute("src");
      lightboxVideo.load();
    }
    if (lastFocused && lastFocused.focus)
      lastFocused.focus({ preventScroll: true });
  }

  // Grid thumbnails: if one is missing, use its -md copy instead.
  $$(".gallery-item img").forEach((thumb) => {
    thumb.addEventListener("error", () => {
      const fallback = thumb.dataset.fallback;
      if (fallback && !thumb.src.endsWith(fallback)) thumb.src = fallback;
    });
  });

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

  // ---------------------------------------------------
  // Booking submission via EmailJS (registered once)
  // ---------------------------------------------------
  const MSG_SUCCESS =
    "Your booking enquiry has been sent successfully. The resort team will confirm availability.";
  const MSG_FAIL =
    "We couldn't send your enquiry. Please try again or contact us by phone or WhatsApp.";

  function showMessage(text) {
    if (!message) return;
    message.hidden = false;
    message.textContent = text;
    message.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function emailJsReady() {
    const cfg = window.EMAILJS_CONFIG || {};
    return (
      typeof window.emailjs !== "undefined" &&
      cfg.SERVICE_ID &&
      cfg.TEMPLATE_ID &&
      cfg.PUBLIC_KEY &&
      !/^YOUR_/.test(cfg.SERVICE_ID + cfg.TEMPLATE_ID + cfg.PUBLIC_KEY)
    );
  }

  if (bookingForm && !bookingForm.dataset.emailBound) {
    bookingForm.dataset.emailBound = "1";
    bookingForm.setAttribute("novalidate", "novalidate");
    let sending = false;
    const submitBtn = $('button[type="submit"]', bookingForm);
    const submitLabel = submitBtn ? submitBtn.textContent.trim() : "";

    // Show the message right above the buttons so it is always visible
    if (message && submitBtn) {
      submitBtn.parentNode.insertBefore(message, submitBtn);
      message.style.marginBottom = "16px";
    }

    function fail(text, field) {
      showMessage(text);
      if (field) field.focus({ preventScroll: true });
    }

    function runSubmit() {
      if (sending) return;

      const nameEl = $("#bName");
      const phoneEl = $("#bPhone");
      const emailEl = $("#bEmail");

      if (!nameEl.value.trim())
        return fail("Please enter your full name.", nameEl);
      if (!phoneEl.value.trim())
        return fail("Please enter your phone / WhatsApp number.", phoneEl);
      if (!emailEl.value.trim() || !emailEl.checkValidity())
        return fail("Please enter a valid email address.", emailEl);
      if (!checkIn.value)
        return fail("Please select your check-in date.", checkIn);
      if (!checkOut.value || checkOut.value <= checkIn.value)
        return fail(
          "Please select a check-out date after your check-in date.",
          checkOut,
        );

      const guests = Number(guestsInput.value || 0);
      if (!guests || guests < 1)
        return fail("Please enter the number of guests.", guestsInput);

      if (!emailJsReady()) {
        console.error("EmailJS SDK not loaded or not configured.");
        showMessage(MSG_FAIL);
        return;
      }

      updateEstimate();
      const name = nameEl.value.trim();
      const phone = phoneEl.value.trim();
      const email = emailEl.value.trim();
      const note = $("#bNote").value.trim() || "None";
      const summary =
        `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n` +
        `Stay type: ${typeSelect.value}\nCheck-in: ${checkIn.value}\n` +
        `Check-out: ${checkOut.value}\nGuests: ${guests}\n` +
        `Estimated cost: ${estimate.value}\nSpecial requests: ${note}`;

      // Several alias names so the template works whichever variables it uses
      const params = {
        name,
        from_name: name,
        user_name: name,
        phone,
        user_phone: phone,
        email,
        from_email: email,
        user_email: email,
        reply_to: email,
        type: typeSelect.value,
        stay_type: typeSelect.value,
        checkin: checkIn.value,
        check_in: checkIn.value,
        checkout: checkOut.value,
        check_out: checkOut.value,
        guests: String(guests),

        estimated_cost: estimate.value,
        note,
        special_requests: note,
        message: summary,
        subject: `New booking enquiry from ${name}`,
        to_email: "chitwansafariresort001@gmail.com",
      };
      params.estimate = estimate.value;

      sending = true;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";
      }
      showMessage("Sending your enquiry…");

      const cfg = window.EMAILJS_CONFIG;
      window.emailjs
        .send(cfg.SERVICE_ID, cfg.TEMPLATE_ID, params, {
          publicKey: cfg.PUBLIC_KEY,
        })
        .then((res) => {
          if (res && res.status === 200) {
            bookingForm.reset();
            updateEstimate();
            updateWhatsApp();
            showMessage(MSG_SUCCESS);
          } else {
            showMessage(MSG_FAIL);
          }
        })
        .catch((error) => {
          console.error("EmailJS send failed:", error);
          const detail = error && (error.text || error.message);
          showMessage(detail ? `${MSG_FAIL} (${detail})` : MSG_FAIL);
        })
        .finally(() => {
          sending = false;
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = submitLabel;
          }
        });
    }

    bookingForm.addEventListener("submit", (event) => {
      event.preventDefault();
      runSubmit();
    });
    if (submitBtn) {
      submitBtn.addEventListener("click", (event) => {
        event.preventDefault();
        runSubmit();
      });
    }
  }

  // Footer year
  const yearElement = $("#yr");
  if (yearElement) yearElement.textContent = new Date().getFullYear();
})();
