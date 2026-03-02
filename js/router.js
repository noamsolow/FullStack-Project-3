// router.js

window.Router = {

    routes: {},

    init: function() {
        window.addEventListener('hashchange', Router._navigate.bind(Router));
        Router._navigate();
    },

    navigate: function(hash) {
        window.location.hash = hash;
        
    },

    _navigate: function() {
        let hash = window.location.hash.replace('#', '').trim();

        if (!hash || !Router.routes[hash]) {
            hash = 'login';
            window.location.hash = hash;
            return;
        }

        if (hash === 'contacts' && !window.AppSession) {
            window.location.hash = 'login';
            return;
        }

        Router._loadFragment(hash, function() {
            const initFn = Router.routes[hash];
            if (typeof initFn === 'function') {
                initFn();
            }
        });
    },

    _loadFragment: function(name, callback) {
        const tpl = document.getElementById('tpl-' + name);
        if (!tpl) {
            document.getElementById('app').innerHTML =
                '<p style="color:red;padding:2rem;">Template not found: tpl-' + name + '</p>';
            return;
        }
        const app = document.getElementById('app');
        app.innerHTML = '';
        app.appendChild(document.importNode(tpl.content, true));
        callback();
    }
};
