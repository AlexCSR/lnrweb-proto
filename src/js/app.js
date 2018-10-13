require('./document');
require('./partials/nav');
require('./partials/header');
require('./pages/work-list');
require('./pages/news-list');
require('./pages/news-single');

// JS Goes here - ES6 supported
if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    console.log(user)
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}
