// =========================================================
// RTL Toggle Logic
// Adds / removes rtl class and dir attribute
// =========================================================

(function () {
    const toggleButtons = document.querySelectorAll("[data-rtl-toggle]");
    const htmlElement = document.documentElement;

    const updateButtonLabels = (direction) => {
        toggleButtons.forEach((btn) => {
            btn.textContent = direction === "rtl" ? "AR" : "EN";
        });
    };

    const applyDirection = (direction) => {
        htmlElement.setAttribute("dir", direction);
        if (direction === "rtl") {
            htmlElement.classList.add("rtl");
        } else {
            htmlElement.classList.remove("rtl");
        }
        localStorage.setItem("sa-dir", direction);
        updateButtonLabels(direction);
    };

    const storedDir = localStorage.getItem("sa-dir");
    applyDirection(storedDir || "ltr");

    toggleButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const nextDir = htmlElement.getAttribute("dir") === "rtl" ? "ltr" : "rtl";
            applyDirection(nextDir);
        });
    });
})();


