// Main JS for QuantiCoral site

(function () {
    // Highlight active nav link for single-page anchors and normal pages
    try {
        var links = document.querySelectorAll('.nav-links a');
        function updateActive() {
            var hash = window.location.hash;
            var path = window.location.pathname;
            links.forEach(function (a) {
                var href = a.getAttribute('href') || '';
                var isAnchor = href.startsWith('#');
                var matched = false;
                if (isAnchor) {
                    matched = (hash ? hash : '#home') === href;
                } else {
                    matched = path.endsWith('/' + href) || (href === 'index.html' && (path.endsWith('/') || path.endsWith('/index.html')));
                }
                a.classList.toggle('active', matched);
            });
        }
        window.addEventListener('hashchange', updateActive);
        updateActive();
    } catch (e) { }

    // Privacy page dynamic include
    try {
        var privacyMount = document.getElementById('privacy-content');
        if (privacyMount) {
            fetch('assets/raw/privacy.html', { cache: 'no-store' })
                .then(function (res) {
                    if (!res.ok) throw new Error('Not found');
                    return res.text();
                })
                .then(function (html) {
                    privacyMount.innerHTML = html;
                })
                .catch(function () {
                    privacyMount.innerHTML = '<p class="muted">Privacy Policy will be available soon.</p>';
                });
        }
    } catch (e) { }

    // FAQ accordion
    try {
        document.querySelectorAll('.faq-q').forEach(function (q) {
            q.addEventListener('click', function () {
                var item = q.closest('.faq-item');
                if (item) item.classList.toggle('open');
            });
        });
    } catch (e) { }

    // Back to top
    try {
        var backTop = document.getElementById('backToTop');
        if (backTop) {
            window.addEventListener('scroll', function () {
                backTop.classList.toggle('show', window.scrollY > 400);
            });
            backTop.addEventListener('click', function (e) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    } catch (e) { }
})();


