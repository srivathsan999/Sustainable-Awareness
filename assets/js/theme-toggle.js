// =========================================================
// Theme Toggle Logic
// Handles light / dark mode switching with persistence
// =========================================================

(function () {
    const toggleBtn = document.querySelectorAll("[data-theme-toggle]");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const storedTheme = localStorage.getItem("sa-theme");

    const applyTheme = (theme) => {
        const body = document.body;
        if (theme === "dark") {
            body.classList.add("theme-dark");
        } else {
            body.classList.remove("theme-dark");
        }
        localStorage.setItem("sa-theme", theme);
    };

    const initTheme = () => {
        if (storedTheme) {
            applyTheme(storedTheme);
            return;
        }
        applyTheme(prefersDark ? "dark" : "light");
    };

    initTheme();

    toggleBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            const nextTheme = document.body.classList.contains("theme-dark")
                ? "light"
                : "dark";
            applyTheme(nextTheme);
        });
    });
})();


