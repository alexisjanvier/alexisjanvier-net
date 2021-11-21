// var menuOpen = document.querySelector(".menu-icon");
// var menuClose = document.querySelector(".close-icon");

function openMenu() {
  document.getElementById("nav").className = '';
  document.getElementById("menu").className = 'fadeIn animated';
  document.querySelector(".menu").className = 'menu';
}

function closeMenu() {
  document.getElementById("menu").className = 'fadeOut animated';
  setTimeout(function () {
    document.querySelector(".menu").className = 'menu hide2';
  }, 300);
}

// document.querySelector(".menu-icon").addEventListener('onclick', openMenu);
// document.querySelector(".close-icon").addEventListener('onclick', closeMenu);

// $('.menu-icon-plop').on('click', function () {
//     console.log('click menu');
//     $('#nav').removeClass();
//     $('#menu').removeClass().addClass('fadeIn animated');
//     $('.menu').removeClass('hide2');
// });
// $('.close-icon-plop').on('click', function () {
//     console.log('click close');
//     $('#menu').removeClass().addClass('fadeOut animated').delay(300).queue(function (next) {
//         $('.menu').addClass('hide2');
//         next();
//     });
// });

// $('.menu-icon').on('click', function () {
//     console.log('click menu');
//     $('#nav').removeClass();
//     $('#menu').removeClass().addClass('fadeIn animated');
//     $('.menu').removeClass('hide2');
// });
// $('.close-icon').on('click', function () {
//     console.log('click close');
//     $('#menu').removeClass().addClass('fadeOut animated').delay(300).queue(function (next) {
//         $('.menu').addClass('hide2');
//         next();
//     });
// });

