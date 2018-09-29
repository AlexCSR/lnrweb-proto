;(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var TOP = 'TOP';
    var BOTTOM = 'BOTTOM';
    var $header = document.getElementsByClassName('header')[0];
    var upscrolled = false;
    var lastScrollTop = 0;
    var scrollDirection = '';

    function getHeaderPadding() {
      return parseInt(window.getComputedStyle($header).paddingTop);
    }

    function getHeaderTransform() {
      return parseInt($header.getAttribute('style').match(/\d+/)[0]);
    }

    function setHeaderTransform(value) {
      var transform = 'translateY(' + value + 'px)';

      $header.style.webkitTransform = transform;
      $header.style.mozTransform = transform;
      $header.style.msTransform = transform;
      $header.style.oTransform = transform;
      $header.style.transform = transform;
    }

    function stickyNav() {
      var scrollTop = window.pageYOffset;
      var headerHeight = $header.clientHeight;
      var headerPadding = getHeaderPadding();

      scrollDirection = scrollTop > lastScrollTop ? BOTTOM : TOP;

      if (scrollDirection === BOTTOM) {
        if (scrollTop <= headerHeight) {
          if (upscrolled) {
            upscrolled = false;
            $header.classList.remove('-upscrolled');
          }
          setHeaderTransform(-scrollTop);
        } else {
          if (!upscrolled) {
            upscrolled = true;
            $header.classList.add('-upscrolled');
          }
          setHeaderTransform(-headerHeight);
        }
      }

      if (scrollDirection === TOP) {
        if (scrollTop <= headerHeight) {
          if (scrollTop <= headerPadding) {
            if (upscrolled) {
              upscrolled = false;
              $header.classList.remove('-upscrolled');
            }
            setHeaderTransform(-scrollTop);
          } else {
            if (!upscrolled) {
              setHeaderTransform(-scrollTop);
            }
          }
        } else {
          setHeaderTransform(-headerPadding);
        }
      }

      lastScrollTop = scrollTop;
    }

    stickyNav();
    window.addEventListener('scroll', stickyNav, false);
    window.addEventListener('resize', stickyNav, false);
    window.addEventListener('touchmove', stickyNav, false);
  }, false);
})();