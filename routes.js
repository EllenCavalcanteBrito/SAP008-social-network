import login from './pages/login/app.js';
import register from './pages/register/app.js';
import initialPage from './pages/initialPage/app.js';
import profile from './pages/profile/app.js';
import about from './pages/about/app.js';

const main = document.querySelector('#root');

const init = () => {
  window.addEventListener('hashchange', () => {
    switch (window.location.hash) {
      case '':
        main.appendChild(login());
        break;
      case '#register':
        main.innerHTML = '';
        main.appendChild(register());
        break;
      case '#page':
        main.innerHTML = '';
        main.appendChild(initialPage());
        break;
      case '#aboutUs':
        main.innerHTML = '';
        main.appendChild(about());
        break;
      case '#profile':
        main.innerHTML = '';
        main.appendChild(profile());
        break;

      default: main.appendChild(login());
    }
  });
};

window.addEventListener('load', () => {
  main.appendChild(login());
  init();
});
