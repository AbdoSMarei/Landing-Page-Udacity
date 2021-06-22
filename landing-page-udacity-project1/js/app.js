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

toTop.addEventListener("click", () => {
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
  });
let isScrolling;
document.onscroll = () => {
  header.style.display = "block"
  clearTimeout(isScrolling)
   isScrolling = setTimeout(() => {
    header.style.display = "none";
  }, 4000);

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
const observer = new IntersectionObserver(
        function active(inputs) {
            inputs.forEach((input) => {
                if(input.isIntersecting) {
                    input.target.classList.add('your-active-class');
                    link.classList.add('active');
                    // location.hash = `${input.target.id}`;
                }
                else {
                    input.target.classList.remove('your-active-class');
                    link.classList.remove('active');
                }
            });
        },
        {//option   
            root: null,
            rootMargin:"-230px",
            threshold: 0.15
        }
    );
    observer.observe(section);
});
navBarList.appendChild(fragment);

/**
 * End Main Functions
 * Begin Events
 * 
*/








