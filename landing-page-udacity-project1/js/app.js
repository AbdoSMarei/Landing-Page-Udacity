/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
// define global variables
const sections = document.querySelectorAll('section'),
      fragment = document.createDocumentFragment(),
      navBarList = document.getElementById('navbar__list'), 
      toTop = document.getElementById("to-top"),
      header = document.querySelector(".page__header");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// go to top smoothly when click on the icon top
toTop.addEventListener("click", () => {
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
  });

// disappear the header (navBar) after 8 sec and appear again when scroll
let isScrolling;   
document.onscroll = () => {
  header.style.display = "block"
  clearTimeout(isScrolling)
   isScrolling = setTimeout(() => {
    header.style.display = "none";
  }, 4000);

// appear the top icon when scroll down after 450px
  window.scrollY > 450    
    ? (toTop.style.display = "block")
    : (toTop.style.display = "none");
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
sections.forEach((section) => {
    const li = document.createElement('li'),
          link = document.createElement('a'),
          aText = document.createTextNode(section.getAttribute('data-nav'));

        /////// Scroll to section on link click        
        
        link.addEventListener(('click'), () => {
            section.scrollIntoView({
                behavior:'smooth',
                block:'center',
            });
        }); 

        link.setAttribute('id',section.id); 
        link.setAttribute('class','menu__link');  
        link.appendChild(aText);
        li.appendChild(link);
        fragment.appendChild(li);


// Scroll to anchor ID using scrollTO event
// Set sections as active
// using intersection to hold the active link & section
const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("your-active-class");
            link.classList.add('active');
        }
        else {
            entry.target.classList.remove("your-active-class");
            link.classList.remove('active');
        }
    })
 }, {
        root : null,
        rootMargin:'-7px 50px -7px 30px',
        threshold: 0.5,
    })
    observer.observe(section);
})
navBarList.appendChild(fragment);  // append fragment to navBar

/**
 * End Main Functions
 * Begin Events
 * 
*/
