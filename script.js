document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement;
    root.classList.add("motion-ready");

    const hamburger = document.querySelector(".hamburger");
    const navList = document.querySelector("nav ul");

    if (hamburger && navList) {
        const closeNav = () => {
            hamburger.classList.remove("active");
            navList.classList.remove("active");
            document.body.classList.remove("nav-open");
            hamburger.setAttribute("aria-expanded", "false");
            hamburger.setAttribute("aria-label", "Open navigation");
        };

        const openNav = () => {
            hamburger.classList.add("active");
            navList.classList.add("active");
            document.body.classList.add("nav-open");
            hamburger.setAttribute("aria-expanded", "true");
            hamburger.setAttribute("aria-label", "Close navigation");
        };

        hamburger.setAttribute("aria-expanded", "false");

        hamburger.addEventListener("click", () => {
            if (navList.classList.contains("active")) {
                closeNav();
            } else {
                openNav();
            }
        });

        navList.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                closeNav();
            });
        });

        document.addEventListener("click", (event) => {
            if (!hamburger.contains(event.target) && !navList.contains(event.target)) {
                closeNav();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeNav();
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href").slice(1);
            const target = document.getElementById(targetId);
            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    const revealSelectors = [
        ".hero > *",
        ".page-hero > *",
        ".tool-hero > *",
        ".card",
        ".tool",
        "article",
        ".content-panel",
        ".converter-card",
        ".trust-strip > *",
        "details"
    ];

    const revealItems = Array.from(document.querySelectorAll(revealSelectors.join(",")));
    revealItems.forEach((item, index) => {
        item.classList.add("reveal");
        item.style.setProperty("--reveal-delay", `${Math.min(index * 45, 360)}ms`);
    });

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        });

        revealItems.forEach((item) => observer.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add("is-visible"));
    }

    document.querySelectorAll("article").forEach((article) => {
        const words = article.textContent.trim().split(/\s+/).filter(Boolean).length;
        const minutes = Math.max(1, Math.round(words / 220));
        const title = article.querySelector("h1");

        if (title && !article.querySelector(".reading-time")) {
            const meta = document.createElement("p");
            meta.className = "reading-time";
            meta.textContent = `${minutes} min read`;
            title.insertAdjacentElement("afterend", meta);
        }
    });
});
