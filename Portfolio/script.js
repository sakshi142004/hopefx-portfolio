const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isFinePointer = window.matchMedia("(pointer: fine)").matches;

const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.16, rootMargin: "0px 0px -70px" });

revealItems.forEach((item) => revealObserver.observe(item));

if (!prefersReducedMotion && isFinePointer) {
    const heroStage = document.querySelector("[data-parallax-root]");
    const orbitSystem = document.querySelector(".orbit-system");
    const heroVisual = document.querySelector(".hero-visual");

    if (heroStage && orbitSystem && heroVisual) {
        heroStage.addEventListener("mousemove", (event) => {
            const rect = heroStage.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            orbitSystem.style.transform = `rotateX(${y * -8}deg) rotateY(${x * 12}deg) translate3d(${x * 18}px, ${y * 16}px, 0)`;
            heroVisual.style.setProperty("--mouse-x", x.toFixed(3));
            heroVisual.style.setProperty("--mouse-y", y.toFixed(3));
        });

        heroStage.addEventListener("mouseleave", () => {
            orbitSystem.style.transform = "";
        });
    }

    document.querySelectorAll(".tilt-card").forEach((card) => {
        card.addEventListener("mousemove", (event) => {
            const rect = card.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const rotateY = ((x / rect.width) - 0.5) * 10;
            const rotateX = ((y / rect.height) - 0.5) * -10;

            card.style.setProperty("--x", `${x}px`);
            card.style.setProperty("--y", `${y}px`);
            card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });

    document.querySelectorAll(".magnetic").forEach((button) => {
        button.addEventListener("mousemove", (event) => {
            const rect = button.getBoundingClientRect();
            const x = event.clientX - rect.left - rect.width / 2;
            const y = event.clientY - rect.top - rect.height / 2;
            button.style.transform = `translate(${x * 0.16}px, ${y * 0.18}px)`;
        });

        button.addEventListener("mouseleave", () => {
            button.style.transform = "";
        });
    });
}

const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalTech = document.getElementById("modalTech");
const modalFeatures = document.getElementById("modalFeatures");
const modalStatus = document.getElementById("modalStatus");

function openModal(data) {
    const [title, tech, features, status] = data.split("|");
    modalTitle.textContent = title || "Project Preview";
    modalTech.innerHTML = `<strong>Technologies:</strong> ${tech || "Project technology stack"}`;
    modalFeatures.innerHTML = `<strong>Features:</strong> ${features || "Project feature set"}`;
    modalStatus.innerHTML = `<strong>Status:</strong> ${status || "Available on request"}`;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
}

function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

document.querySelectorAll(".preview-btn").forEach((button) => {
    button.addEventListener("click", () => openModal(button.dataset.modal || ""));
});

document.querySelectorAll("[data-close-modal]").forEach((button) => {
    button.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
        closeModal();
    }
});

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const submit = contactForm.querySelector("button[type='submit']");
        const originalText = submit.textContent;
        submit.textContent = "Message Ready";
        window.setTimeout(() => {
            submit.textContent = originalText;
        }, 1800);
    });
}
