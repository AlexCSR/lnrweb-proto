;(function () {
  var html = document.documentElement;
  var body = document.body;

  function getScrollTop() {
    return html.scrollTop || body.parentNode.scrollTop || body.scrollTop;
  }

  ;(function () {
    var progressBar = document.getElementsByClassName('progressbar')[0];

    function updateProgress() {
      var scrollTop = getScrollTop();
      var documentHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      var windowHeight = window.innerHeight;
      var progress = scrollTop / (documentHeight - windowHeight) * 100;

      progressBar.style.width = progress + '%';
    }

    if (progressBar) {
      window.addEventListener('scroll', updateProgress, false);
      window.addEventListener('resize', updateProgress, false);
      window.addEventListener('load', updateProgress, false);
    }
  })();
})();
