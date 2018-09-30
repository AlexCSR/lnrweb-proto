import isMobile from './libs/isMobile.min';

if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector ||
  Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var el = this;
    if (!document.documentElement.contains(el)) return null;
    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

;(function () {
  document.documentElement.classList.add(isMobile.any ? 'mobile' : 'no-mobile');

  // ;(function () {
  //   var scrollWatcher = null;

  //   function handleScroll(e) {
  //     document.documentElement.classList.add('is-scrolling');

  //     clearTimeout(scrollWatcher);
  //     scrollWatcher = setTimeout(function () {
  //       clearTimeout(scrollWatcher);
  //       document.documentElement.classList.remove('is-scrolling');
  //     }, 35);
  //   }

  //   window.addEventListener('scroll', handleScroll, false);
  // })();

  document.addEventListener('DOMContentLoaded', function () {
    var yearHolder = document.getElementById('year');

    if (yearHolder) {
      yearHolder.innerHTML = new Date().getFullYear();
    }
  }, false);
})();
