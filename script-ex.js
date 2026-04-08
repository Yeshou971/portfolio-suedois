// Détection mobile (< 900px)
const isMobile = () => window.innerWidth <= 900;

//tourne la page quand on clique sur le boutton
const pageTurnBtn = document.querySelectorAll('.nextprev-btn');

pageTurnBtn.forEach((el, index) => {
    el.onclick = () => {
        if (isMobile()) return; // Désactivé sur mobile

        const pageTurnId = el.getAttribute('data-page');
        const pageTurn = document.getElementById(pageTurnId);

        if (pageTurn.classList.contains('turn')) {
            pageTurn.classList.remove('turn');
            setTimeout(() => {
                pageTurn.style.zIndex = 20 - index
            }, 500)
        }
        else {
            pageTurn.classList.add('turn');
            setTimeout(() => {
                pageTurn.style.zIndex = 20 + index
            }, 500)
        }
    }
})

//bouton contactez moi quand on click
const pages = document.querySelectorAll('.book-page.page-right');
const contactMeBtn = document.querySelector('.btn.contact-me');

contactMeBtn.onclick = () => {
    if (isMobile()) {
        // Sur mobile : scroll jusqu'à la section contact
        const contactSection = document.querySelector('.contact-box');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
        return;
    }

    pages.forEach((page, index) => {
        setTimeout(() => {
            page.classList.add('turn');

            setTimeout(() => {
                page.style.zIndex = 20 + index;
            }, 500)
        }, (index + 1) * 200 + 100)
    })
}

//Créer une fonction index
let totalPages = pages.length;
let pageNumber = 0;

function reverseIndex() {
    pageNumber--;
    if (pageNumber < 0) {
        pageNumber = totalPages - 1;
    }
}

//bouton de retour "profile" quand on clique
const backProfileBtn = document.querySelector('.back-profile');

backProfileBtn.onclick = () => {
    if (isMobile()) {
        // Sur mobile : scroll vers le haut
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    pages.forEach((_, index) => {
        setTimeout(() => {
            reverseIndex();
            pages[pageNumber].classList.remove('turn');

            setTimeout(() => {
                reverseIndex();
                pages[pageNumber].style.zIndex = 10 + index;
            }, 500)

        }, (index + 1) * 200 + 100)
    })
}

//animation d'ouverture (seulement sur desktop)
if (!isMobile()) {
    const coverRight = document.querySelector('.cover.cover-right');
    const pageLeft = document.querySelector('.book-page.page-left');

    //animation d'ouverture (coté droit)
    setTimeout(() => {
        coverRight.classList.add('turn');
    }, 2100)

    setTimeout(() => {
        coverRight.style.zIndex = -1;
    }, 2800)

    //animation d'ouverture (coté gauche)
    setTimeout(() => {
        pageLeft.style.zIndex = 20;
    }, 3200)

    //animation d'ouverture (toutes les pages coté droit)
    pages.forEach((_, index) => {
        setTimeout(() => {
            reverseIndex();
            pages[pageNumber].classList.remove('turn');

            setTimeout(() => {
                reverseIndex();
                pages[pageNumber].style.zIndex = 10 + index;
            }, 500)

        }, (index + 1) * 200 + 2100)
    })
}

// Modal functionality
const modal = document.getElementById("serviceModal");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");
const closeBtn = document.getElementsByClassName("close")[0];

// Get all modal buttons
const modalBtns = document.querySelectorAll(".modal-btn");

// Add click event to all modal buttons
modalBtns.forEach(btn => {
    btn.addEventListener("click", function(e) {
        e.preventDefault();
        modal.style.display = "block";
        modalTitle.textContent = this.getAttribute("data-title");
        modalContent.textContent = this.getAttribute("data-content");
    });
});

// Close modal when clicking the X
closeBtn.addEventListener("click", function() {
    modal.style.display = "none";
});

// Close modal when clicking outside
window.addEventListener("click", function(e) {
    if (e.target == modal) {
        modal.style.display = "none";
    }
});