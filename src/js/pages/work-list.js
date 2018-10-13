import imagesLoaded from '../libs/imagesloaded.pkgd.min';

;(function () {
  // featured
  document.addEventListener('DOMContentLoaded', function () {
    var TIMEOUT = 750;
    var className = 'work-list__featured-item-preview';
    var previews = document.getElementsByClassName(className);
    var isScrolling = false;
    var autochange;
    var scrollWatcher;
    var firstPassWatcher;

    if (!previews) {
      return;
    }

    function goNext(el) {
      var prevImage = el.querySelector('.-active');
      var nextImage = prevImage.nextElementSibling || el.querySelector('img');

      prevImage.classList.remove('-active');
      nextImage.classList.add('-active');
    }

    function lazyLoad(images) {
      Array.prototype.forEach.call(images, function (img) {
        var src = img.getAttribute('data-src');

        if (src) {
          img.removeAttribute('data-src');
          img.setAttribute('src', src);
        }
      });
    }

    function initialLazyLoad() {
      var images = document.getElementsByTagName('img');

      lazyLoad(images);
    }

    function handleEnter(e) {
      var el = e.target;

      if (!el.classList.contains(className) || !document.hasFocus()) {
        return;
      }

      var images = el.getElementsByTagName('img');

      lazyLoad(images);
      goNext(el);

      imagesLoaded(el, function (instance) {
        clearInterval(autochange);

        autochange = setInterval(function () {
          goNext(el);
        }, TIMEOUT);
      });
    }

    function handleLeave() {
      clearInterval(autochange);
    }

    Array.prototype.forEach.call(previews, function (preview) {
      preview.addEventListener('mouseenter', handleEnter, false);
      preview.addEventListener('mouseleave', handleLeave, false);
    });

    window.addEventListener('blur', handleLeave, false);
    window.addEventListener('load', initialLazyLoad, false);
  }, false);

  // clients
  document.addEventListener('DOMContentLoaded', function () {
    var clients = document.getElementsByClassName('work-list__clients-item');
    var changed = [];
    var lastIndex = -1;

    if (!clients.length) {
      return;
    }

    function randomize(min, max) {
      var index = Math.floor(Math.random() * (max - min + 1) + min);

      if (changed.length === clients.length) {
        changed = [];
      }

      if (changed.indexOf(index) !== -1 || index === lastIndex) {
        return randomize(min, max);
      }

      changed.push(index);
      lastIndex = index;
      return index;
    }

    setInterval(function () {
      var nextIndex = randomize(0, clients.length - 1);
      var target = clients[nextIndex];
      var prevImage = target.getElementsByClassName('-active')[0];
      var nextImage = prevImage.nextElementSibling || target.getElementsByTagName('img')[0];

      prevImage.classList.remove('-active');
      nextImage.classList.add('-active');
    }, 2500);
  }, false);

  // brief
  document.addEventListener('DOMContentLoaded', function () {
    var $form = document.querySelector('.work-list__brief-form');

    if (!$form) {
      return;
    }

    var $input = $form.querySelector('.work-list__brief-form input');
    var $button = document.querySelector('.work-list__brief-form-button');
    var $error = document.querySelector('.work-list__brief-form-error');
    var $message = document.querySelector('.work-list__brief-form-error-message');

    function handleFocus() {
      $form.classList.add('-focused');
    }

    function handleBlur() {
      $form.classList.remove('-focused');
    }

    function handleInput(e) {
      var value = e.target.value;
      var method = !!value ? 'add' : 'remove';

      $form.classList[method]('-filled');
      $button.disabled = !value;
    }

    function submitForm(e) {
      e.preventDefault();

      var xhr = new XMLHttpRequest();
      var body = 'email=' + encodeURIComponent($input.value);

      $input.disabled = true;
      $button.disabled = true;
      $error.classList.remove('-active');

      xhr.open($form.method, $form.action, true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

      xhr.send(body);

      xhr.onreadystatechange = function () {
        if (this.readyState != 4) return;

        var res;

        try {
          res = JSON.parse(this.responseText);
        } catch (err) {
          console.error('Server response is not a JSON.');
        }

        $input.disabled = false;
        $button.disabled = false;

        if (this.status !== 200 || (res && res.status && res.status !== 'subscribed')) {
          var error;

          if (res && res.detail) {
            if (res.title && res.title === 'Member Exists') {
              error = $input.value + ' is already a list member.';
            } else {
              error = res.detail;
            }
          } else {
            error = 'Something went wrong. Please try again later.';
          }

          $error.classList.add('-active');
          $message.innerHTML = error;
          return;
        }

        $form.classList.add('-sent');
      }
    }

    $input.addEventListener('focus', handleFocus, false);
    $input.addEventListener('blur', handleBlur, false);
    $input.addEventListener('input', handleInput, false);
    $form.addEventListener('submit', submitForm, false);
  }, false);
})();
