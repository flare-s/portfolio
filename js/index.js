const navButton = document.querySelector(".nav__toggle");
const navList = document.querySelector(".nav__list");
const project = document.querySelectorAll(".project");
const projectsSection = document.querySelector(".projects");
const projectsList = document.querySelector(".projects__list");
const overlay = document.querySelector(".overlay");
const header = document.querySelector(".header");
let lastScroll;

const projects = [
  {
    title: "Heavenly Bites",
    srcCode: "https://github.com/flare-s/heavenly-bites-code",
    livePage: "https://flare-s.github.io/heavenly-bites-code/",
  },
  {
    title: "Security Agency",
    srcCode: "https://github.com/flare-s/security-code",
    livePage: "https://flare-s.github.io/security-code/",
  },
  {
    title: "Velanova Studio",
    srcCode: "https://github.com/flare-s/design-studio-code",
    livePage: "https://flare-s.github.io/design-studio-code/",
  },
  {
    title: "Weather App",
    srcCode: "https://github.com/flare-s/weather-app",
    livePage: "https://flare-s.github.io/weather-app/",
  },
  {
    title: "Color Generator",
    srcCode: "https://github.com/flare-s/colors-generator",
    livePage: "https://flare-s.github.io/colors-generator/",
  },
  {
    title: "Wordle",
    srcCode: "https://github.com/flare-s/wordle",
    livePage: "https://flare-s.github.io/wordle/",
  },
  {
    title: "SEO Solutions",
    srcCode: "https://github.com/flare-s/seo-solutions",
    livePage: "https://flare-s.github.io/seo-solutions/",
  },
  {
    title: "Art & design",
    srcCode: "https://github.com/flare-s/blog-page",
    livePage: "https://flare-s.github.io/blog-page/",
  },
  {
    title: "Budget Tracker",
    srcCode: "https://github.com/flare-s/budget-tracker",
    livePage: "https://flare-s.github.io/budget-tracker/",
  },
  {
    title: "Expenses Tracker",
    srcCode: "https://github.com/flare-s/expenses-tracker",
    livePage: "https://flare-s.github.io/expenses-tracker/",
  },
];

// Hiding the navbar when scrolling down and showing it when scrolling up
window.addEventListener("scroll", () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScroll) {
    header.style.top = "-60px";
  } else {
    header.style.top = "0";
  }
  lastScroll = scrollTop;
});

// custom mouse
window.addEventListener("mousemove", (e) => {
  let newTrail = document.createElement("div");
  newTrail.setAttribute("aria-hidden", "true");
  newTrail.classList.add("trail");
  newTrail.setAttribute(
    "style",
    `top: ${e.clientY - 15}px; left: ${e.clientX - 15}px;`
  );
  document.body.prepend(newTrail);
  //deleting the created element when the animation ends
  newTrail.onanimationend = () => newTrail.remove();
});

// adding Intersection Observer polyfill if it's not supported by the browser
if (
  !"IntersectionObserver" in window ||
  !"IntersectionObserverEntry" in window ||
  !"intersectionRatio" in window.IntersectionObserverEntry.prototype ||
  !"isIntersecting" in window.IntersectionObserverEntry.prototype
) {
  const head = document.querySelector("head");
  const script = document.createElement("script");
  script.src = "./js/intersection-observer.js";
  script.type = "text/javascript";
  script.defer = "true";
  head.appendChild(script);
}

// handle the functionality of the navbar

const handleMenu = (state) => {
  if (state === "open") {
    navList.classList.add("active");
    overlay.classList.add("active");
    navButton.setAttribute("aria-label", "Close menu");
    navButton.classList.add("active");
    document.body.style.overflow = "hidden";
  } else if (state === "close") {
    navButton.classList.remove("active");
    navList.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "auto";
    navButton.setAttribute("aria-label", "Open menu");
  }
};

// remove the mobile nav functionality on the media query provided
const handleViewport = (mq) => {
  if (mq.matches) {
    handleMenu("close");
  }
};

const mq = window.matchMedia("(min-width: 992px)");
handleViewport(mq);
// track the changes to the viewport and update when necessary
mq.addEventListener("change", handleViewport);

// handle the navbar functionality when the menu button is clicked
navButton.addEventListener("click", function () {
  if (this.classList.contains("active")) {
    handleMenu("close");
  } else {
    handleMenu("open");
  }
});

// close the mobile navbar when the overlay is clicked
overlay.addEventListener("click", (e) => {
  handleMenu("close");
});

// handle the project section animations with Intersection Observer
let sectionObserver = new IntersectionObserver(
  (entries) => {
    for (let entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      } else {
        entry.target.classList.remove("active");
      }
    }
  },
  { rootMargin: "-80px" }
);

// tilt effict on elements when the mouse is moved on them
const tiltEl = (e, el) => {
  const target = el;
  const targetRect = target.getBoundingClientRect();
  const targetWidth = targetRect.width;
  const targetHeight = targetRect.height;
  // getting the position of the center of the element horizontally and vertically
  let targetXCenter = targetRect.left + targetWidth / 2;
  let targetYCenter = targetRect.top + targetHeight / 2;
  // getting the position of the mouse relative to the center of the element horizontally and vertically
  let mouseX = e.clientX - targetXCenter;
  let mouseY = e.clientY - targetYCenter;
  // setting the limit of the tilt effect when the mouse move on the element
  let rotateX = (15 * mouseY) / (targetHeight / 2);
  let rotateY = (-15 * mouseX) / (targetWidth / 2);
  target.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
};

projects.forEach((el) => {
  let li = document.createElement("li");
  li.classList.add("project");
  li.innerHTML = `
        <div class="project__overlay" aria-hidden="true"></div>
        <div class="project__content">
            <h3 class="project__title">${el.title}</h3>
            <div class="project__buttons">
                <a href="${el.srcCode}" target="_blank" class="btn">Source code</a>
                <a href="${el.livePage}" target="_blank" class="btn">Live version</a>
            </div>
        </div>
    `;
  sectionObserver.observe(li);
  li.addEventListener("mousemove", (e) => tiltEl(e, li));
  li.addEventListener(
    "mouseleave",
    () => (li.style.transform = `rotateX(0deg) rotateY(0deg)`)
  );

  projectsList.append(li);
});
