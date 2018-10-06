require('./document');
require('./components/header');
// require('./pages/landing');
require('./pages/work');
require('./pages/news'); 

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
