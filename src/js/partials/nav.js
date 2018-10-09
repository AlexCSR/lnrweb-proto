;(function () {
  var $burger = document.querySelector('.header__menu-burger');
  var $menu = document.querySelector('.nav');
  var activeClassName = '-active';
  var fadeOutClassName = '-fade-out';
  var isActive = false;

  function toggleMenu() {
    if (isActive) {
      hideMenu();
    } else {
      showMenu();
    }
  }

  function showMenu() {
    if (!isActive) {
      $menu.classList.add(activeClassName);
      isActive = true;
    }
  }

  function hideMenu() {
    var handleTransitionEnd = function () {
      $menu.classList.remove(fadeOutClassName);
      $menu.removeEventListener('transitionend', handleTransitionEnd, false);
    };

    if (isActive) {
      $menu.addEventListener('transitionend', handleTransitionEnd, false);
      $menu.classList.add(fadeOutClassName);
      $menu.classList.remove(activeClassName);
      isActive = false;
    }
  }

  function handleSideClick(e) {
    var isMenu = e.target.closest('.nav');
    var isBurger = e.target.closest('.header__menu-burger');

    if (!isMenu && !isBurger) {
      hideMenu();
    }
  }

  $burger.addEventListener('click', toggleMenu, false);
  window.addEventListener('scroll', hideMenu, false);
  window.addEventListener('touchmove', hideMenu, false);
  document.addEventListener('click', handleSideClick, false);
})();
