const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const closeBtn = document.getElementById("close");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let images = [];
let currentIndex = 0;


// Get images from gallery
function updateImages() {
    images = [];

    galleryItems.forEach(item => {
        if (item.style.display !== "none") {
            const img = item.querySelector("img");
            images.push(img.src);
        }
    });
}


// Open lightbox
galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        updateImages();

        const img = item.querySelector("img");

        currentIndex = images.indexOf(img.src);

        lightboxImg.src = img.src;

        lightbox.classList.add("show");
    });

});


// Next image
nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    lightboxImg.src = images[currentIndex];
});


// Previous image
prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }

    lightboxImg.src = images[currentIndex];
});


// Close lightbox
closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("show");
});


// Close when clicking background
lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {
        lightbox.classList.remove("show");
    }

});


// Keyboard navigation
document.addEventListener("keydown", (e) => {

    if (!lightbox.classList.contains("show")) return;

    if (e.key === "ArrowRight") {
        nextBtn.click();
    }

    if (e.key === "ArrowLeft") {
        prevBtn.click();
    }

    if (e.key === "Escape") {
        closeBtn.click();
    }

});


// Category filters
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Active button
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category = button.dataset.category;

        galleryItems.forEach(item => {

            if (
                category === "all" ||
                item.dataset.category === category
            ) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }

        });

    });

});