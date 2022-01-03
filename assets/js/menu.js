function openMenu(){document.getElementById("nav").className='';document.getElementById("menu").className='fadeIn animated';document.querySelector(".menu").className='menu'}function closeMenu(){document.getElementById("menu").className='fadeOut animated';setTimeout(function(){document.querySelector(".menu").className='menu hide2'},300)};
document.getElementById('burger-open').onclick = openMenu;
document.getElementById('burger-close').onclick = closeMenu;
