import imagesLoaded from '../libs/imagesloaded.pkgd.min';

;(function () {
  const $cover = document.querySelector('.news-single__main-cover');
  const $article = document.querySelector('.news-single__main-article');

  let isCoverFixed = false;

  if (!$cover) {
    return;
  }

  function fixedCover() {
    const shouldFix = $article.getBoundingClientRect().bottom - window.innerHeight > 0;

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
  window.addEventListener('scroll', fixedCover, false);
  window.addEventListener('resize', fixedCover, false);
})();
