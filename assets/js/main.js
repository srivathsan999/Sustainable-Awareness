// =========================================================
// Sustainable Awareness - Main JS
// Handles UI interactions shared across pages
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
    // Search overlay
    const searchTrigger = document.querySelectorAll("[data-search-trigger]");
    const searchOverlay = document.querySelector("#siteSearch");
    const searchClose = document.querySelector("[data-search-close]");
    const searchInput = searchOverlay ? searchOverlay.querySelector("input") : null;

    if (searchClose && !searchClose.hasAttribute("aria-label")) {
        searchClose.setAttribute("aria-label", "Close search");
    }
    if (searchInput && !searchInput.hasAttribute("aria-label")) {
        searchInput.setAttribute("aria-label", "Search Sustainable Awareness");
    }

    const toggleSearch = (state) => {
        if (!searchOverlay) return;
        if (state === "open") {
            searchOverlay.classList.add("active");
            if (searchInput) searchInput.focus();
        } else {
            searchOverlay.classList.remove("active");
        }
    };

    searchTrigger.forEach((btn) =>
        btn.addEventListener("click", () => toggleSearch("open"))
    );
    if (searchClose) {
        searchClose.addEventListener("click", () => toggleSearch("close"));
    }

    // Counters animation
    const counters = document.querySelectorAll("[data-counter]");
    if (counters.length) {
        const animateCounter = (entry) => {
            const el = entry.target;
            const target = parseInt(el.getAttribute("data-counter"), 10);
            const duration = 2000;
            let start = 0;
            const step = (timestamp) => {
                if (!el._startTime) el._startTime = timestamp;
                const progress = timestamp - el._startTime;
                const value = Math.min(
                    Math.floor((progress / duration) * target),
                    target
                );
                el.textContent = value.toLocaleString();
                if (progress < duration) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        };

        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateCounter(entry);
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.4 }
        );

        counters.forEach((counter) => observer.observe(counter));
    }

    // Testimonials - all visible at all times (slider removed)
    const testimonialContainer = document.querySelector("[data-testimonial-slider]");
    if (testimonialContainer) {
        const cards = testimonialContainer.querySelectorAll(".testimonial-card");
        cards.forEach((card) => {
            card.style.opacity = "1";
        });
    }

    // Blog search/filter
    const blogSearch = document.querySelector("#blogSearch");
    const blogTabs = document.querySelectorAll("[data-blog-filter]");
    const blogCards = document.querySelectorAll("[data-blog-card]");

    const filterBlog = () => {
        const query = blogSearch ? blogSearch.value.toLowerCase() : "";
        const activeTab = document.querySelector(".filter-tabs .nav-link.active");
        const category = activeTab ? activeTab.dataset.blogFilter : "all";

        blogCards.forEach((card) => {
            const title = card.querySelector("h5").textContent.toLowerCase();
            const cardCategory = card.dataset.blogCategory;
            const matchesCategory = category === "all" || cardCategory === category;
            const matchesQuery = title.includes(query);
            card.style.display = matchesCategory && matchesQuery ? "" : "none";
        });
    };

    if (blogSearch) {
        blogSearch.addEventListener("input", filterBlog);
    }

    blogTabs.forEach((tab) => {
        tab.addEventListener("click", (e) => {
            e.preventDefault();
            blogTabs.forEach((btn) => btn.classList.remove("active"));
            tab.classList.add("active");
            filterBlog();
        });
    });

    if (blogCards.length) {
        filterBlog();
    }

    // Services filter
    const serviceTabs = document.querySelectorAll("[data-service-filter]");
    const serviceCards = document.querySelectorAll("[data-service-card]");

    const filterServices = () => {
        const activeServiceTab = document.querySelector("[data-service-filter].active");
        const category = activeServiceTab ? activeServiceTab.dataset.serviceFilter : "all";
        serviceCards.forEach((card) => {
            const matches = category === "all" || card.dataset.serviceCategory === category;
            card.style.display = matches ? "" : "none";
        });
    };

    serviceTabs.forEach((tab) => {
        tab.addEventListener("click", (e) => {
            e.preventDefault();
            serviceTabs.forEach((btn) => btn.classList.remove("active"));
            tab.classList.add("active");
            filterServices();
        });
    });

    if (serviceCards.length && !document.querySelector("[data-service-filter].active")) {
        const firstTab = document.querySelector("[data-service-filter]");
        if (firstTab) firstTab.classList.add("active");
    }
    if (serviceCards.length) {
        filterServices();
    }

    // Pricing toggle
    const pricingToggle = document.querySelector("[data-pricing-toggle]");
    const planPrices = document.querySelectorAll("[data-plan-price]");

    const updatePricing = () => {
        const yearly = pricingToggle && pricingToggle.checked;
        planPrices.forEach((price) => {
            const value = yearly ? price.dataset.yearly : price.dataset.monthly;
            if (value) {
                price.innerHTML = `${value}<span class="fs-6 text-muted"> /mo</span>`;
            }
        });
    };

    if (pricingToggle) {
        pricingToggle.addEventListener("change", updatePricing);
        updatePricing();
    }

    // Newsletter form feedback
    document.querySelectorAll("[data-newsletter]").forEach((form) => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const feedback = form.querySelector(".form-text");
            if (feedback) {
                feedback.textContent = "Thanks for subscribing!";
                feedback.classList.add("text-success");
            }
            form.reset();
        });
    });

    // Coming soon countdown
    const countdownEls = document.querySelectorAll("[data-countdown]");
    if (countdownEls.length) {
        const deadline = new Date();
        deadline.setDate(deadline.getDate() + 30);

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = deadline.getTime() - now;
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            countdownEls.forEach((el) => {
                const unit = el.dataset.countdown;
                const value =
                    unit === "days"
                        ? days
                        : unit === "hours"
                        ? hours
                        : unit === "minutes"
                        ? minutes
                        : seconds;
                el.textContent = String(value).padStart(2, "0");
            });
        };

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
});


