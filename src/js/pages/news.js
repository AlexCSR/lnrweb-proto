;(function () {
  const $search = document.querySelector('.news__search');
  const $searchForm = document.querySelector('.news__search-overlay-form');
  const $searchInput = document.querySelector('.news__search-overlay-form input');
  const $searchOpenButton = document.querySelector('.news__search-handler.-closed');
  const $searchCloseButton = document.querySelector('.news__search-handler.-opened');

  let isSearchOpened = false;
  let isInputFilled = false;

  function openSearch() {
    if (!isSearchOpened) {
      isSearchOpened = true;
      $searchForm.addEventListener('transitionend', autofocus, false);
      $search.classList.add('-active');
    }
  }

  function closeSearch() {
    if (isSearchOpened) {
      isSearchOpened = false;
      isInputFilled = false;
      $searchForm.removeEventListener('transitionend', autofocus, false);
      $searchForm.classList.remove('-filled');
      $search.classList.remove('-active');
      $searchInput.value = '';
    }
  }

  function autofocus() {
    $searchInput.focus();
  }

  function doSearch(e) {
    e.preventDefault();

    const { value } = $searchInput;

    if (!value) {
      return;
    }
  }

  function handleInput() {
    const { value } = $searchInput;

    if (value && !isInputFilled) {
      isInputFilled = true;
      $searchForm.classList.add('-filled');
    }

    if (!value && isInputFilled) {
      isInputFilled = false;
      $searchForm.classList.remove('-filled');
    }
  }

  function handleEscape(e) {
    const keyCode = e.keyCode || e.charCode;

    if (isSearchOpened && keyCode === 27) {
      closeSearch();
    }
  }

  $searchOpenButton.addEventListener('click', openSearch, false);
  $searchCloseButton.addEventListener('click', closeSearch, false);
  $searchForm.addEventListener('submit', doSearch, false);
  $searchInput.addEventListener('input', handleInput, false);
  window.addEventListener('keyup', handleEscape, false);
})();
