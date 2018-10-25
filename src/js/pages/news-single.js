import imagesLoaded from '../libs/imagesloaded.pkgd.min';

;(function () {
  const $cover = document.querySelector('.news-single__main-cover');
  const $article = document.querySelector('.news-single__main-article');

  let isCoverFixed = false;

  if (!$cover) {
    return;
  }

  function fixedCover() {
    const articleRect = $article.getBoundingClientRect();
    const shouldFix =
      (articleRect.height + articleRect.top > window.innerHeight) &&
      (articleRect.bottom - window.innerHeight > 0);

    if (!isCoverFixed && shouldFix) {
      isCoverFixed = true;
      $cover.classList.add('-fixed');
    }

    if (isCoverFixed && !shouldFix) {
      isCoverFixed = false;
      $cover.classList.remove('-fixed');
    }
  }

  fixedCover();
  imagesLoaded($article, fixedCover);
  window.addEventListener('focus', fixedCover, false);
  window.addEventListener('scroll', fixedCover, false);
  window.addEventListener('resize', fixedCover, false);
})();

;(function () {
  const $share = document.querySelector('.news-single__share');

  if (!$share) {
    return;
  }

  function share(e) {
    const $link = e.target.closest('a');
    const windowSettings = 'height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0';

    if (!$link) {
      return;
    }

    e.preventDefault();

    window.open($link.getAttribute('href'), $link.getAttribute('title'), windowSettings);
  }

  $share.addEventListener('click', share, false);
})();
