    
document.body.style = "background-color: var(--bs-dark); transition: 0.5s;";

var theme = localStorage.getItem('theme') || "light"; // Retrieve theme from localStorage or default to 'light'
const root = document.querySelector(":root");
const container = document.getElementsByClassName("theme-container")[0];
const themeIcon = document.getElementById("theme-icon"); // Ensure this ID is correct and matches your HTML



// Set initial theme to light
setLight(); // Apply light theme settings initially
if (theme === "dark") {
    setDark();
} else {
    setLight();
}
container.addEventListener("click", setTheme);

function setTheme() {
  if (theme === "light") {
    setDark();
    theme = "dark";
  } else {
    setLight();
    theme = "light";
  }
  localStorage.setItem('theme', theme); // Save theme preference to localStorage

}



function setLight() {
  // Update the CSS variable for light mode
  document.documentElement.style.setProperty('--text-color-light-mode', '#000'); // Revert to light mode text color


  root.style.setProperty("--bs-dark", "linear-gradient(318.32deg, #c3d1e4 0%, #dde7f3 55%, #d4e0ed 100%)");
  root.style.setProperty("--primary", "#0463FA"); // Assuming this is your light mode primary color

  container.classList.remove("shadow-dark");
  document.body.classList.remove('dark-mode');
  const containerFluid = document.querySelector('.container-fluid');
 containerFluid.classList.remove('bg-dark'); 
  containerFluid.classList.add('bg-light');
  const h1Elements = document.querySelectorAll('h1');
  h1Elements.forEach(function(h1) {
       h1.style.color = ''; // Remove the inline style to revert to default
  });
  const h5Elements = document.querySelectorAll('h5');
  h5Elements.forEach(function(h5) {
       h5.style.color = ''; // Remove the inline style to revert to default
  });
  const containerFluids = document.querySelectorAll('.container-fluid');
  containerFluids.forEach(function(container) {
      if (container.classList.contains('bg-dark-mode-primary')) {
          container.classList.remove('bg-dark-mode-primary');
          container.classList.add('bg-primary');
      }
  });

  const logoImage = document.querySelector('.logo'); // Ensure the class 'logo' matches your HTML
  logoImage.src = 'img/alnada.png'; // Path to light mode logo image
  setTimeout(() => {
    container.classList.add("shadow-light");
    // Change the icon to the sun if it's not already set
    themeIcon.classList.remove("fa-moon", "change");
    themeIcon.classList.add("fa-sun", "change");
  }, 300);




  document.querySelectorAll('.bg-dark').forEach(function(element) {
    element.classList.remove('bg-dark');
    element.classList.add('bg-light');
  });



}

function setDark() {
  // Update the CSS variable for dark mode

  document.documentElement.style.setProperty('--text-color-light-mode', '#fff'); // Use dark mode text color

  root.style.setProperty("--bs-dark", "#212529");
  root.style.setProperty("--primary", "#071a6f");
  container.classList.remove("shadow-light");
  document.body.classList.add('dark-mode');
  const containerFluid = document.querySelector('.container-fluid');
  containerFluid.classList.remove('bg-light');

  containerFluid.classList.add('bg-dark'); // Ensure you have a bg-dark class defined or adjust styles directly
  const h1Elements = document.querySelectorAll('h1');
  h1Elements.forEach(function(h1) {
      // If you're using a class to change the text color
      //h1.classList.add('text-dark-mode');
      
      // Or directly changing the style
       h1.style.color = '#EFF5FF'; // Example light color for dark mode
  });
  const h5Elements = document.querySelectorAll('h5');
  h5Elements.forEach(function(h5) {
       h5.style.color = '#4E9CAF'; // Remove the inline style to revert to default
  });

  const containerFluids = document.querySelectorAll('.container-fluid');
  containerFluids.forEach(function(container) {
      if (container.classList.contains('bg-primary')) {
          container.classList.remove('bg-primary');
          container.classList.add('bg-dark-mode-primary');
      }
  });

  const logoImage = document.querySelector('.logo'); // Ensure the class 'logo' matches your HTML
  logoImage.src = 'img/alnadadr.png'; // Path to dark mode logo image
  setTimeout(() => {
    container.classList.add("shadow-dark");
    // Change the icon to the moon
    themeIcon.classList.remove("fa-sun", "change");
    themeIcon.classList.add("fa-moon", "change");
  }, 300);



  document.querySelectorAll('.bg-light').forEach(function(element) {
    element.classList.remove('bg-light');
    element.classList.add('bg-dark');
  });



}









(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Date and time picker
    $('.date').datetimepicker({
        format: 'L'
    });
    $('.time').datetimepicker({
        format: 'LT'
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: false,
        animateOut: 'fadeOutLeft',
        items: 1,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });

    
})(jQuery);

// utility functions
if(!Util) function Util () {};

Util.addClass = function(el, className) {
  var classList = className.split(' ');
  el.classList.add(classList[0]);
  if (classList.length > 1) Util.addClass(el, classList.slice(1).join(' '));
};

Util.removeClass = function(el, className) {
  var classList = className.split(' ');
  el.classList.remove(classList[0]);
  if (classList.length > 1) Util.removeClass(el, classList.slice(1).join(' '));
};

Util.toggleClass = function(el, className, bool) {
  if(bool) Util.addClass(el, className);
  else Util.removeClass(el, className);
};

Util.moveFocus = function (element) {
  if( !element ) element = document.getElementsByTagName('body')[0];
  element.focus();
  if (document.activeElement !== element) {
    element.setAttribute('tabindex','-1');
    element.focus();
  }
};

Util.getIndexInArray = function(array, el) {
  return Array.prototype.indexOf.call(array, el);
};


// utility functions
if(!Util) function Util () {};

Util.addClass = function(el, className) {
  var classList = className.split(' ');
  el.classList.add(classList[0]);
  if (classList.length > 1) Util.addClass(el, classList.slice(1).join(' '));
};

Util.removeClass = function(el, className) {
  var classList = className.split(' ');
  el.classList.remove(classList[0]);
  if (classList.length > 1) Util.removeClass(el, classList.slice(1).join(' '));
};

Util.toggleClass = function(el, className, bool) {
  if(bool) Util.addClass(el, className);
  else Util.removeClass(el, className);
};

Util.moveFocus = function (element) {
  if( !element ) element = document.getElementsByTagName('body')[0];
  element.focus();
  if (document.activeElement !== element) {
    element.setAttribute('tabindex','-1');
    element.focus();
  }
};

Util.getIndexInArray = function(array, el) {
  return Array.prototype.indexOf.call(array, el);
};

  const toggleButton = document.getElementById('dark-mode-toggle');
  const body = document.body;

  toggleButton.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
  });

