/**
 * ANTI ANEMIA
 * FINAL SCRIPT
 * Navbar + Dark Mode + Scroll Reveal + Modal + Particle Canvas
 */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    /* =========================================================
       1. LOADING SCREEN
       ========================================================= */

    const loadingScreen =
        document.getElementById("loading-screen");

    function hideLoader() {
        if (
            loadingScreen &&
            !loadingScreen.classList.contains("hidden")
        ) {
            loadingScreen.classList.add("hidden");
        }
    }

    window.setTimeout(hideLoader, 800);
    window.setTimeout(hideLoader, 3500);


    /* =========================================================
       2. ELEMENT NAVBAR
       ========================================================= */

    const navbarContainer = 
    document.querySelector(".navbar-container");

    const navMenu =
        document.getElementById("nav-menu");

    const hamburger =
        document.getElementById("hamburger");

    const navLinks =
        navMenu
            ? navMenu.querySelectorAll(".nav-link")
            : [];

    if (!navbar) {
        console.error(
            "ANTI ANEMIA: #navbar tidak ditemukan."
        );
    }

    if (!navMenu) {
        console.error(
            "ANTI ANEMIA: #nav-menu tidak ditemukan."
        );
    }


    /* =========================================================
       3. NAV INDICATOR
       Selector putih menggunakan offsetLeft.
       ========================================================= */

    let indicator = null;

    if (navMenu) {

        indicator =
            navMenu.querySelector(".nav-indicator");

        if (!indicator) {
            indicator =
                document.createElement("span");

            indicator.className =
                "nav-indicator";

            navMenu.insertBefore(
                indicator,
                navMenu.firstChild
            );
        }
    }


    function moveIndicator(link) {

        if (!indicator || !link) {
            return;
        }

        if (window.innerWidth <= 768) {
            indicator.style.opacity = "0";
            return;
        }

        const left =
            link.offsetLeft;

        const width =
            link.offsetWidth;

        indicator.style.width =
            width + "px";

        indicator.style.transform =
            "translate3d(" +
            left +
            "px, 0, 0)";

        indicator.style.opacity = "1";
    }


    function setActiveLink(link) {

        if (!link) {
            return;
        }

        navLinks.forEach(function (item) {
            item.classList.remove("active");
        });

        link.classList.add("active");

        moveIndicator(link);
    }


    /* =========================================================
       4. NAVBAR SCROLL
       ========================================================= */

    function updateNavbar() {

    if (!navbarContainer) {
        return;
    }

    if (window.scrollY > 40) {
        navbarContainer.classList.add("scrolled");
    } else {
        navbarContainer.classList.remove("scrolled");
    }
}


    /* =========================================================
       5. ACTIVE SECTION
       ========================================================= */

    function updateActiveSection() {

        if (!navMenu || !navLinks.length) {
            return;
        }

        const sections =
            document.querySelectorAll(
                "section[id]"
            );

        if (!sections.length) {
            return;
        }

        const scrollPosition =
            window.scrollY + 180;

        let currentId = "home";

        sections.forEach(function (section) {

            const top =
                section.offsetTop;

            const height =
                section.offsetHeight;

            if (
                scrollPosition >= top &&
                scrollPosition < top + height
            ) {
                currentId =
                    section.getAttribute("id");
            }
        });

        const activeLink =
            navMenu.querySelector(
                '.nav-link[href="#' +
                currentId +
                '"]'
            );

        if (activeLink) {
            setActiveLink(activeLink);
        }
    }


    function handleScroll() {
        updateNavbar();
        updateActiveSection();
    }

    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );


    /* =========================================================
       6. NAV LINK CLICK
       ========================================================= */

    navLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const href =
                    link.getAttribute("href");

                if (
                    !href ||
                    href.charAt(0) !== "#"
                ) {
                    return;
                }

                const id =
                    href.substring(1);

                const target =
                    document.getElementById(id);

                if (!target) {
                    return;
                }

                event.preventDefault();

                const offset =
                    window.innerWidth <= 768
                        ? 85
                        : 105;

                const targetTop =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    offset;

                window.scrollTo({
                    top: targetTop,
                    behavior: "smooth"
                });

                setActiveLink(link);

                closeMobileMenu();
            }
        );
    });


    /* =========================================================
       7. MOBILE MENU
       ========================================================= */

    function openMobileMenu() {

        if (!navMenu) {
            return;
        }

        navMenu.classList.add("active");

        if (hamburger) {
            hamburger.classList.add("active");

            hamburger.setAttribute(
                "aria-expanded",
                "true"
            );
        }
    }


    function closeMobileMenu() {

        if (navMenu) {
            navMenu.classList.remove("active");
        }

        if (hamburger) {
            hamburger.classList.remove("active");

            hamburger.setAttribute(
                "aria-expanded",
                "false"
            );
        }
    }


    if (hamburger && navMenu) {

        hamburger.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                if (
                    navMenu.classList.contains(
                        "active"
                    )
                ) {
                    closeMobileMenu();
                } else {
                    openMobileMenu();
                }
            }
        );
    }


    /* =========================================================
       8. CLICK OUTSIDE MOBILE MENU
       ========================================================= */

    document.addEventListener(
        "click",
        function (event) {

            if (window.innerWidth > 768) {
                return;
            }

            if (
                !navMenu ||
                !navMenu.classList.contains(
                    "active"
                )
            ) {
                return;
            }

            if (
                navbarContainer &&
                navbarContainer.contains(event.target)
            ) {
                return;
            }

            closeMobileMenu();
        }
    );


    /* =========================================================
       9. RESIZE
       ========================================================= */

    window.addEventListener(
        "resize",
        function () {

            if (window.innerWidth > 768) {

                closeMobileMenu();

                const activeLink =
                    navMenu
                        ? navMenu.querySelector(
                            ".nav-link.active"
                        )
                        : null;

                if (activeLink) {
                    moveIndicator(activeLink);
                }

            } else {

                if (indicator) {
                    indicator.style.opacity =
                        "0";
                }
            }
        }
    );


    /* =========================================================
       10. DARK MODE
       ========================================================= */

    const themeToggleBtn =
        document.getElementById(
            "theme-toggle"
        );

    const htmlElement =
        document.documentElement;

    let savedTheme = "light";

    try {
        savedTheme =
            localStorage.getItem("theme") ||
            "light";
    } catch (error) {
        savedTheme = "light";
    }

    if (
        savedTheme !== "dark" &&
        savedTheme !== "light"
    ) {
        savedTheme = "light";
    }

    htmlElement.setAttribute(
        "data-theme",
        savedTheme
    );


    function updateThemeIcon(theme) {

        if (!themeToggleBtn) {
            return;
        }

        const icon =
            themeToggleBtn.querySelector("i");

        if (!icon) {
            return;
        }

        if (theme === "dark") {
            icon.className =
                "fa-solid fa-sun";
        } else {
            icon.className =
                "fa-solid fa-moon";
        }
    }


    updateThemeIcon(savedTheme);


    if (themeToggleBtn) {

        themeToggleBtn.addEventListener(
            "click",
            function () {

                const currentTheme =
                    htmlElement.getAttribute(
                        "data-theme"
                    );

                const newTheme =
                    currentTheme === "dark"
                        ? "light"
                        : "dark";

                htmlElement.setAttribute(
                    "data-theme",
                    newTheme
                );

                try {
                    localStorage.setItem(
                        "theme",
                        newTheme
                    );
                } catch (error) {
                    console.warn(
                        "LocalStorage tidak tersedia."
                    );
                }

                updateThemeIcon(newTheme);
            }
        );
    }


    /* =========================================================
       11. SCROLL REVEAL
       ========================================================= */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );

    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                function (
                    entries,
                    observer
                ) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add("active");

                                observer.unobserve(
                                    entry.target
                                );
                            }
                        }
                    );
                },
                {
                    root: null,
                    threshold: 0.15
                }
            );

        revealElements.forEach(
            function (element) {
                revealObserver.observe(
                    element
                );
            }
        );

    } else {

        revealElements.forEach(
            function (element) {
                element.classList.add(
                    "active"
                );
            }
        );
    }

    // Bagian modal obat dan particle canvas
    // juga tetap ada di file FINAL.
});
        /* =========================================================
                            PARTICLE BACKGROUND
                ========================================================= */

                const canvas = document.getElementById(
                    "particle-canvas"
                );

                if(canvas){

                const ctx = canvas.getContext("2d");

                let particles=[];

                function resizeCanvas(){

                    canvas.width =
                    window.innerWidth;

                    canvas.height =
                    window.innerHeight;
                }

                resizeCanvas();

                window.addEventListener(
                "resize",
                resizeCanvas
                );


                for(let i=0;i<80;i++){

                particles.push({

                x:Math.random()*canvas.width,

                y:Math.random()*canvas.height,

                size:Math.random()*3+1,

                speedX:(Math.random()-0.5)*0.5,

                speedY:(Math.random()-0.5)*0.5

                });

                }


                function animateParticles(){

                ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
                );


                particles.forEach(p=>{

                ctx.beginPath();

                ctx.arc(
                p.x,
                p.y,
                p.size,
                0,
                Math.PI*2
                );

                ctx.fillStyle=
                "rgba(2,132,199,0.4)";

                ctx.fill();


                p.x+=p.speedX;
                p.y+=p.speedY;


                if(
                p.x<0||
                p.x>canvas.width
                )
                p.speedX*=-1;


                if(
                p.y<0||
                p.y>canvas.height
                )
                p.speedY*=-1;


                });


                requestAnimationFrame(
                animateParticles
                );

                }

                animateParticles();

}
            /* =========================================================
            MODAL OBAT
            ========================================================= */

                const modalButtons =
                document.querySelectorAll(".open-modal");

                const modal =
                document.querySelector(".modal");

                const closeModal =
                document.querySelector(".close-modal");


                modalButtons.forEach(btn=>{

                btn.addEventListener(
                "click",
                ()=>{

                modal.style.display="flex";

});

});


            if(closeModal){

                closeModal.onclick=()=>{

                    modal.style.display="none";

                };

                }


                window.onclick=function(e){

                if(e.target===modal){

                modal.style.display="none";

                }

};
window.addEventListener(
"load",
()=>{

const active =
document.querySelector(
".nav-link.active"
);

if(active){
moveIndicator(active);
}

});
